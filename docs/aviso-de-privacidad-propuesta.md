# Aviso de privacidad

> **Publicado el 11 de octubre de 2026** en `/aviso-de-privacidad`, con enlace en
> el pie de página y aviso corto bajo el formulario de contacto. El texto vive en
> `src/content/es.js` (`privacy`). Responsable: David Jared González Vásquez,
> persona física (RESICO) con nombre comercial InDaxion, domicilio publicado como
> Escobedo, Nuevo León. Sigue pendiente la revisión de un abogado; al constituir
> la empresa, cambiar el responsable y el domicilio.
>
> Ley aplicable: LFPDPPP publicada en el DOF el 20 de marzo de 2025; la autoridad
> es la Secretaría Anticorrupción y Buen Gobierno.

Lo que sigue es el borrador original y el análisis que lo acompañó.

## Qué datos recoge hoy el sitio

| Dónde | Datos | Para qué |
|---|---|---|
| Formulario de contacto (`/#contacto`) | Nombre, correo electrónico, empresa (opcional), teléfono (opcional), interés y descripción de la necesidad | Responder la solicitud y dar seguimiento comercial |
| Descarga de programas (`/cursos/*`) | Nombre, correo electrónico, empresa (opcional), teléfono (opcional), programa de interés | Enviar el programa y dar seguimiento |

Proveedores que tratan esos datos por cuenta de InDaxion:

- **Supabase**: base de datos donde se guardan los leads.
- **Cloudflare**: hospedaje del sitio; registra datos técnicos como la IP.
- **Vercel**: hospedaje anterior, mientras dure la migración a Cloudflare.

Terceros que intervienen solo si el visitante los usa o al cargar la página:

- **Google Fonts**: la tipografía se carga desde Google, que recibe la IP del visitante.
- **WhatsApp**: solo si el visitante decide escribirnos por ahí.

El sitio no usa cookies de analítica ni de publicidad. Verificarlo antes de
publicar y actualizar esta sección si se agregan herramientas de medición.

## Ubicación propuesta en la web

1. **Página `/aviso-de-privacidad`** con el aviso integral, con el mismo diseño de
   las demás páginas y la fecha de última actualización.
2. **Enlace en el footer**, en la fila inferior junto al copyright:
   «Aviso de privacidad».
3. **Aviso corto bajo el botón «Enviar mensaje»** del formulario de contacto:
   > Usaremos tus datos para responder tu solicitud. Consulta nuestro
   > [Aviso de privacidad](/aviso-de-privacidad).
4. **El mismo aviso corto en el modal de descarga de programas**, en lugar de
   «Tu información está segura. Sin spam.».

Si en el futuro se usan los datos para finalidades secundarias (por ejemplo, enviar
novedades), el aviso corto debe permitir negarse a ellas. Por ejemplo, con una casilla
sin marcar.

## Texto propuesto (aviso integral)

**Aviso de privacidad integral**

**[Razón social o nombre del responsable]** («InDaxion»), con domicilio en
**[domicilio completo]**, es responsable del tratamiento de los datos personales que
nos proporcionas a través de este sitio web.

**Datos personales que recabamos.** Nombre, correo electrónico y, si decides
proporcionarlos, empresa o negocio, teléfono, el producto o servicio de tu interés y
la descripción de tu necesidad. No recabamos datos personales sensibles.

**Finalidades.** Utilizamos tus datos para:

- Responder tus solicitudes de información.
- Darte seguimiento comercial sobre la solicitud que nos hiciste.
- Enviarte el programa del curso que solicitaste.

**[Finalidades secundarias, si aplican: describirlas y el medio para negarse.]**

**Encargados y transferencias.** Tus datos se almacenan en servicios de
infraestructura que los tratan por cuenta de InDaxion: Supabase (base de datos) y
Cloudflare (hospedaje). No transferimos tus datos a terceros sin tu consentimiento, salvo
en los casos previstos por la ley. **[Confirmar ubicación de los servidores y si hay
transferencias internacionales.]**

**Derechos ARCO y revocación del consentimiento.** Puedes acceder a tus datos,
rectificarlos, cancelarlos u oponerte a su tratamiento, así como revocar tu
consentimiento, enviando una solicitud a **[correo para privacidad]**. La solicitud
debe incluir **[requisitos: nombre, medio de respuesta, documento que acredite la
identidad, descripción clara de los datos y del derecho que se ejerce]**.
Responderemos en un plazo de **[plazo legal]**.

**Limitación del uso o divulgación.** **[Mecanismo, por ejemplo, el mismo correo de
privacidad.]**

**Uso de tecnologías de rastreo.** Este sitio no utiliza cookies de analítica ni de
publicidad. **[Actualizar si cambia.]**

**Cambios a este aviso.** Cualquier cambio se publicará en esta página con su fecha de
actualización.

**Última actualización:** **[fecha]**

## Pendientes antes de publicar

- [x] Responsable, domicilio (ciudad) y correo de privacidad (`contacto@indaxion.com`).
- [ ] Revisión legal del texto completo y de la ley aplicable.
- [ ] Confirmar las finalidades secundarias (por ejemplo, newsletter).
- [ ] Confirmar la región de los servidores de Supabase y Cloudflare.
- [x] Página, enlace del footer y aviso corto del formulario (el modal de cursos
      sigue oculto).
