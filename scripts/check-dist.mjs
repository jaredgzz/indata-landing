/* global process */
// Revisa la carpeta del build antes de publicarla: falla si hay archivos que
// no deberían salir a internet. Uso: node scripts/check-dist.mjs [carpeta]
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative, extname } from 'node:path'
import { pathToFileURL } from 'node:url'

// Extensiones publicables, según el inventario real de public/ y del build de Vite.
// Para publicar un tipo nuevo (p. ej. 'pdf', 'woff2', 'jpg', 'ico'), agrégalo aquí
// a propósito: un tipo no listado hace fallar el build.
const ALLOWED_EXTENSIONS = ['html', 'js', 'css', 'svg', 'png', 'webp', 'txt', 'xml']

// Nunca se publican, aunque se amplíe la lista anterior
const BLOCKED_NAMES = [
  { test: name => name.startsWith('.env'), why: 'archivo de variables de entorno' },
  { test: name => name.startsWith('.git'), why: 'archivo de git' },
  { test: name => name.endsWith('.map'), why: 'source map' },
  { test: name => name.startsWith('wrangler.'), why: 'configuración de Wrangler' },
  { test: name => /^package(-lock)?\.json$/.test(name), why: 'manifiesto de npm' },
  { test: name => /\.(pem|key)$/.test(name), why: 'clave o certificado' },
]
const BLOCKED_CONTENT = [/service_role/, /SUPABASE_SERVICE/]
const TEXT_EXTENSIONS = new Set(['html', 'js', 'css', 'svg', 'txt', 'xml'])

function listFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name)
    return entry.isDirectory() ? listFiles(path) : [path]
  })
}

export function checkDist(dir) {
  const problems = []
  for (const path of listFiles(dir)) {
    const rel = relative(dir, path).replaceAll('\\', '/')
    const name = rel.split('/').pop()
    const blocked = BLOCKED_NAMES.find(rule => rule.test(name))
    if (blocked) {
      problems.push(`${rel}: ${blocked.why}`)
      continue
    }
    const ext = extname(name).slice(1).toLowerCase()
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      problems.push(`${rel}: extensión .${ext || '(ninguna)'} no permitida (ver ALLOWED_EXTENSIONS en scripts/check-dist.mjs)`)
      continue
    }
    if (TEXT_EXTENSIONS.has(ext)) {
      const text = readFileSync(path, 'utf8')
      const match = BLOCKED_CONTENT.find(re => re.test(text))
      if (match) problems.push(`${rel}: contiene ${match.source}`)
    }
  }
  return problems
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const dir = process.argv[2] || 'dist'
  const problems = checkDist(dir)
  if (problems.length) {
    console.error(`check-dist: ${dir} no se puede publicar:\n- ${problems.join('\n- ')}`)
    process.exit(1)
  }
  console.log(`check-dist: ${dir} OK`)
}
