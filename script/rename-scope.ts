#!/usr/bin/env bun

import { readdir, stat, readFile, writeFile } from "fs/promises"
import path from "path"

const ROOT = path.resolve(import.meta.dir, "..")
const TARGETS = ["packages", "script", ".github"]

const EXTS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".mjs",
  ".cjs",
  ".yml",
  ".yaml",
  ".md",
  ".mdx",
  ".toml",
  ".mts",
  ".cts",
  ".css",
  ".scss",
  ".html",
  ".svelte",
  ".vue",
  ".astro",
])
const SKIP_DIRS = new Set([
  "node_modules",
  "dist",
  ".turbo",
  ".git",
  "build",
  ".next",
  "coverage",
  ".cache",
  ".ts-dist",
])

let filesChanged = 0
let refsChanged = 0

async function walk(dir: string): Promise<string[]> {
  const out: string[] = []
  let entries: string[]
  try {
    entries = await readdir(dir)
  } catch {
    return out
  }
  for (const ent of entries) {
    const full = path.join(dir, ent)
    let s
    try {
      s = await stat(full)
    } catch {
      continue
    }
    if (s.isDirectory()) {
      if (SKIP_DIRS.has(ent)) continue
      out.push(...(await walk(full)))
    } else if (s.isFile() && EXTS.has(path.extname(ent))) {
      out.push(full)
    }
  }
  return out
}

const files = new Set<string>()
for (const t of TARGETS) {
  for (const f of await walk(path.join(ROOT, t))) files.add(f)
}

for (const file of files) {
  const text = await readFile(file, "utf8")
  if (!text.includes("hackbot-")) continue
  const next = text.split("hackbot-").join("hackbot-")
  const matches = text.match(/@opencode-ai\//g)?.length ?? 0
  refsChanged += matches
  filesChanged++
  await writeFile(file, next)
}

console.log(`Files changed: ${filesChanged}`)
console.log(`References replaced: ${refsChanged}`)
