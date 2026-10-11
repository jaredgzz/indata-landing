# Checklist antes de publicar en producción

Rama: `reposicionamiento/pymes`. Nada de esto se ha publicado en producción.
Marca cada punto antes de hacer merge a `main`.

## 1. Opciones de `leads.service`

**Verificado el 2026-10-10 (consulta de solo lectura al catálogo, sin escribir datos):**

- `service` es `text`, admite nulos y no tiene restricciones `CHECK` ni `enum`.
- La tabla `leads` no tiene triggers.
- La única política RLS es «Permitir envíos publicos»: `INSERT` para `anon` con
  `WITH CHECK (true)`, que no limita valores.
- Columnas: `id` (bigint), `created_at` (timestamptz), `full_name`, `email`
  (text, obligatorios), `company`, `message`, `service`, `state`, `tag`, `phone`
  (text, opcionales).

Conclusión: las 8 opciones son válidas y no hace falta migración. Repetir la
comprobación si el esquema cambia antes del despliegue a producción.

El formulario de contacto guarda en `leads.service` uno de estos valores canónicos
(definidos en `src/lib/leadOptions.js`; no se traducen):

| id | valor guardado | ¿nuevo? |
|---|---|---|
| gova | `Gova` | sí |
| miga | `Miga` | sí |
| automatizacion | `Automatización de Procesos` | ya existía |
| software | `Desarrollo de Software` | ya existía |
| ia | `Inteligencia Artificial` | ya existía |
| datos | `Datos e Integraciones` | sí |
| open | `InDaxion Open / Cursos` | sí |
| otro | `Otro` | ya existía |

El esquema de `leads` no está en el repositorio y la API de Supabase no permite
leerlo con la clave pública. Si `service` tuviera una restricción `CHECK` o un
tipo `enum`, los valores nuevos fallarían. El formulario mostraría un error
y no confirmaría el envío, pero ese lead se perdería.

### Comprobación controlada (solo lectura, para repetirla)

Ejecutar en Supabase → SQL Editor. Son consultas al catálogo: no modifican datos
ni configuración.

```sql
-- a) Columnas de leads: tipo y longitud de service
select column_name, data_type, udt_name, character_maximum_length, is_nullable
from information_schema.columns
where table_schema = 'public' and table_name = 'leads'
order by ordinal_position;

-- b) Restricciones CHECK de la tabla
select conname, pg_get_constraintdef(oid) as definicion
from pg_constraint
where conrelid = 'public.leads'::regclass and contype = 'c';

-- c) Triggers en leads (validaciones o envíos al insertar)
select tgname, pg_get_triggerdef(oid) as definicion
from pg_trigger
where tgrelid = 'public.leads'::regclass and not tgisinternal;
```

Resultado esperado: `service` es `text` (o `varchar` de 26 caracteres o más) y
ninguna restricción ni trigger limita sus valores. Si es así, las 8 opciones son
válidas y no hace falta ninguna migración.

Si aparece una restricción sobre `service` o un tipo `enum`, hay dos caminos:

1. Mapear las opciones nuevas a valores permitidos en `src/lib/leadOptions.js`
   (no requiere tocar la base), o
2. Preparar una migración que amplíe la restricción y aprobarla antes de aplicarla.

**No ejecutar inserts de prueba en producción.** Si hiciera falta probar un insert,
usar un proyecto de Supabase de pruebas o una transacción con `rollback`, y solo
después de revisar en (c) que ningún trigger envíe correos o llamadas externas.

## 2. Despliegue y modo de los formularios

### Cloudflare Workers Builds (hospedaje principal)

Worker `indaxion-landing`, conectado a `jaredgzz/indaxion-landing`:

- Production branch: `main`. Root directory: `/`.
- Build command: vacío.
- Deploy command: `npm run build:live && npx wrangler deploy`.
- Non-production branch builds: activado. Preview command:
  `npm run build && npx wrangler preview` (Worker Previews, Wrangler ≥ 4.135).
- Build variables: `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` **solo en Production**.
  Previews Base no lleva variables, así que la Preview ni siquiera conoce la URL de la
  base. **No** definir `VITE_LEADS_MODE`. Las variables de runtime del Worker no llegan a Vite.
- Domains: Preview URLs activadas (`<rama>-indaxion-landing.davidjared7.workers.dev`).
- El fallback de la SPA solo aplica a navegaciones del navegador (`Sec-Fetch-Mode: navigate`).
  Un `curl` sin esas cabeceras a `/open` recibe un 404 `Not found`, y es lo esperado. Las
  rutas como `/.env` nunca devuelven contenido real: dan 404 o `index.html`.

Modo de los formularios, en `src/lib/leadsMode.js`. Falla cerrado:

| Build | Leads |
|---|---|
| `npm run build:live` (solo el deploy de producción) | guarda |
| Vercel Production (temporal, mientras siga Vercel) | guarda |
| Worker Preview, Vercel Preview, `npm run build` local, `npm run dev`, entorno desconocido | simula |

- `build:live` falla salvo en Workers Builds sobre `main` con las dos variables de Supabase,
  o en las E2E locales contra el Supabase falso. Las pruebas están en `npm run test:build-modes`.
- `VITE_LEADS_MODE=test` fuerza la simulación. `live` se ignora.
- Cada build publica `<meta name="indaxion-build" content="leads=live|test; sha=…">`.
  Para revisar una URL sin enviar formularios, lee ese meta.
- `scripts/check-dist.mjs` corre después de cada build. Bloquea archivos sensibles y
  extensiones no listadas.
- Es un control de despliegue, no de seguridad. La clave anon es pública, y lo que
  protege la tabla `leads` es RLS.

### Vercel (temporal, hasta decidir su retiro)

**Revisado el 2026-10-10, sin cambios:** `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`
están definidas para «Production and Preview». Es decir, una Preview usa la misma
base de producción. *Enable access to System Environment Variables* está activo.

- **Production** debe tener `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
- **Preview** no puede crear leads reales: en Vercel el código solo guarda cuando
  `VERCEL=1` y `VERCEL_ENV=production` (ver `src/lib/leadsMode.js`). En una Preview, los
  formularios muestran «Vista previa» y simulan el envío.
- Para que esto funcione, en Vercel → Settings → Environment Variables debe estar
  activo *Automatically expose System Environment Variables* (activo por defecto).
  Comprobación rápida: en la URL de Preview, el formulario de contacto debe mostrar
  el aviso «Vista previa: este formulario no envía datos».
- El workflow `supabase-keepalive.yml` no cambia: sigue leyendo `public.keepalive`.

## 3. Aviso de privacidad

Ver la propuesta en [`aviso-de-privacidad-propuesta.md`](aviso-de-privacidad-propuesta.md).
Requiere revisión legal antes de publicarse. Mientras tanto, el sitio recoge datos
personales (formulario y descarga de programas) sin aviso de privacidad.

## 4. Afirmaciones por confirmar

En las páginas de cursos ya se retiraron «Certificado oficial», «Ruta Certificada» y
«Bootcamp Certificado». Quedan por confirmar:

- «Certificado incluido» (LangFlow y Mastering Claude): mantener solo si InDaxion
  emitirá una constancia de participación.
- Biografías del instructor:
  - LangFlow: «más de 5 años desarrollando soluciones de IA para empresas en LATAM».
  - AI Engineer: «Junto a un equipo de docentes con experiencia en consultorías de
    IA generativa».
  - Mastering Claude: «Experto en estrategia de datos e implementación de IA
    generativa a nivel corporativo. Lidera la adopción de Claude en equipos de
    ingeniería y datos».
- Inicio (Nosotros): «con proyectos en Azure, Databricks y Microsoft Fabric», que
  viene de la biografía anterior.

### PDF descargables (no se modificaron)

Los tres PDF de `public/docs/` conservan contenido anterior al reposicionamiento:

- Marca antigua «InDatA» en todo el documento.
- «Certificado oficial», «Bootcamp Certificado» y «Acreditación válida…».
- AI Engineer: «+3.000 alumnos activos», «Mentorías con docentes top de la
  industria (Intercorp, Interseguro, InDatA)», «bolsa de empleo», «red de empresas
  aliadas» y datos para pagos (transferencia, Western Union, cuentas en soles).
- Mastering Claude: Jair Martínez sigue como coinstructor (ya no aparece en el
  sitio), su biografía menciona «clientes de LATAM y EE.UU.», además de «Bolsa de
  Trabajo» y «Referencias directas del equipo».
- LangFlow: «Acceso a la comunidad InDatA».

Recomendación: regenerar los PDF o retirar temporalmente las descargas antes de
publicar.

## 5. Otros pendientes

- La página 404 se muestra con estado HTTP 200 (el rewrite de Vercel sirve
  `index.html` en cualquier ruta). Lleva `noindex` para que no se indexe. Un 404
  real requiere listar las rutas en `vercel.json`. Es opcional.
- `og:image`, `og:url`, canonical y sitemap: pendientes hasta tener el dominio
  definitivo.
