// Writes the home page into dist/index.html, so the browser can paint the name, the photo and
// the projects from the HTML alone, before any JavaScript runs. React then hydrates that markup.

import { readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = resolve(ROOT, 'dist')
const SSR_DIST = resolve(ROOT, 'dist-ssr')
const ROOT_ELEMENT = '<div id="root"></div>'

const template = readFileSync(resolve(DIST, 'index.html'), 'utf-8')
if (!template.includes(ROOT_ELEMENT)) {
  throw new Error(`${ROOT_ELEMENT} was not found in dist/index.html`)
}

// /admin is client-only, so it is served from this copy with an empty root.
writeFileSync(resolve(DIST, 'spa.html'), template)

const { render } = await import(pathToFileURL(resolve(SSR_DIST, 'entry-server.js')).href)

const headTags = []
const headingFont = readdirSync(resolve(DIST, 'assets')).find(file =>
  /^geist-latin-wght-normal.*\.woff2$/.test(file),
)
if (headingFont) {
  headTags.push(
    `<link rel="preload" href="/assets/${headingFont}" as="font" type="font/woff2" crossorigin />`,
  )
}
if (process.env.VITE_API_URL) {
  headTags.push(`<link rel="preconnect" href="${process.env.VITE_API_URL}" crossorigin />`)
}

const html = template
  .replace('</head>', () => `  ${headTags.join('\n    ')}\n  </head>`)
  .replace(ROOT_ELEMENT, () => `<div id="root">${render()}</div>`)

writeFileSync(resolve(DIST, 'index.html'), html)
rmSync(SSR_DIST, { recursive: true, force: true })

console.log(`[prerender] dist/index.html: ${(Buffer.byteLength(html) / 1024).toFixed(1)} kB`)
