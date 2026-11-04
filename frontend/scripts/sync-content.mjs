// Runs before each build and refreshes the content the page shows on first paint, so it
// never has to wait for the backend. Every step is best effort: if one fails, the files
// committed to the repository are used and the build goes on.
//
// - src/data/snapshot.json: projects (from the API) and profile (from GitHub)
// - public/avatar.webp: profile photo
// - public/previews/<repo>.webp: screenshots of deployed projects. Only missing ones are
//   captured, so delete a file to capture it again.
//
// Set SKIP_CONTENT_SYNC=1 to build without using the network.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const GITHUB_USER = 'JONATHAN-DEV-01'
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SNAPSHOT_PATH = resolve(ROOT, 'src/data/snapshot.json')
const PREVIEWS_DIR = resolve(ROOT, 'public/previews')

// Long enough for a sleeping Render instance to wake up.
const API_TIMEOUT_MS = 90_000
const DEFAULT_TIMEOUT_MS = 30_000

async function fetchOk(url, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) })
  if (!res.ok) throw new Error(`${url} responded ${res.status}`)
  return res
}

async function attempt(label, task) {
  try {
    await task()
    console.log(`[sync-content] ${label}: ok`)
  } catch (error) {
    console.warn(`[sync-content] ${label}: keeping committed version (${error.message})`)
  }
}

async function main() {
  if (process.env.SKIP_CONTENT_SYNC === '1') {
    console.log('[sync-content] skipped')
    return
  }

  const snapshot = JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf-8'))
  const apiUrl = process.env.VITE_API_URL

  await attempt('projects', async () => {
    if (!apiUrl) throw new Error('VITE_API_URL is not set')
    const res = await fetchOk(`${apiUrl}/api/projects`, API_TIMEOUT_MS)
    const { projects } = await res.json()
    if (!Array.isArray(projects) || projects.length === 0) throw new Error('empty project list')
    snapshot.projects = projects.map(project => ({ ...project, readme_content: null }))
  })

  let avatarUrl = null
  await attempt('profile', async () => {
    const res = await fetchOk(`https://api.github.com/users/${GITHUB_USER}`)
    const user = await res.json()
    avatarUrl = user.avatar_url
    snapshot.profile = {
      login: user.login,
      name: user.name,
      bio: user.bio?.trim() ?? null,
      avatar_url: user.avatar_url,
      followers: user.followers,
      following: user.following,
      public_repos: user.public_repos,
      html_url: user.html_url,
    }
  })

  writeFileSync(SNAPSHOT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`)

  const { default: sharp } = await import('sharp').catch(() => ({ default: null }))
  if (!sharp) {
    console.warn('[sync-content] images: sharp is unavailable, keeping committed versions')
    return
  }

  if (avatarUrl) {
    await attempt('avatar', async () => {
      const separator = avatarUrl.includes('?') ? '&' : '?'
      const res = await fetchOk(`${avatarUrl}${separator}s=240`)
      await sharp(Buffer.from(await res.arrayBuffer()))
        .resize(240, 240)
        .webp({ quality: 78 })
        .toFile(resolve(ROOT, 'public/avatar.webp'))
    })
  }

  mkdirSync(PREVIEWS_DIR, { recursive: true })
  for (const project of snapshot.projects) {
    const output = resolve(PREVIEWS_DIR, `${project.name}.webp`)
    if (!project.deploy_url || existsSync(output)) continue

    await attempt(`preview ${project.name}`, async () => {
      const target = encodeURIComponent(project.deploy_url)
      const res = await fetchOk(
        `https://api.microlink.io/?url=${target}&screenshot=true&meta=false&embed=screenshot.url`,
        API_TIMEOUT_MS,
      )
      await sharp(Buffer.from(await res.arrayBuffer()))
        .resize(640, 360, { fit: 'cover', position: 'top' })
        .webp({ quality: 70 })
        .toFile(output)
    })
  }
}

await main()
