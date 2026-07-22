#!/usr/bin/env bun
import { $ } from "bun"
import pkg from "../package.json"
import { Script } from "@hackbot/script"
import { fileURLToPath } from "url"

const dir = fileURLToPath(new URL("..", import.meta.url))
process.chdir(dir)

async function published(name: string, version: string) {
  return (await $`npm view ${name}@${version} version`.nothrow()).exitCode === 0
}

async function publish(dir: string, name: string, version: string) {
  if (process.platform !== "win32") await $`chmod -R 755 .`.cwd(dir)
  if (await published(name, version)) return console.log(`already published ${name}@${version}`)
  await $`bun pm pack`.cwd(dir)
  await $`npm publish *.tgz --access public --tag ${Script.channel}`.cwd(dir)
}

const binaries: Record<string, string> = {}
const dirByPkgName: Record<string, string> = {}
for (const filepath of new Bun.Glob("*/package.json").scanSync({ cwd: "./dist" })) {
  const dirName = filepath.split("/")[0]
  if (dirName === "cli-wrapper") continue
  const item = await Bun.file(`./dist/${filepath}`).json()
  if (!item.name) continue
  binaries[item.name] = item.version
  dirByPkgName[item.name] = dirName
}
console.log("binaries", binaries)
const version = Object.values(binaries)[0]

const wrapperDir = "./dist/cli-wrapper"
await $`mkdir -p ${wrapperDir}/bin`
await $`cp ./bin/lildax.cjs ${wrapperDir}/bin/lildax`
await Bun.file(`${wrapperDir}/package.json`).write(
  JSON.stringify(
    {
      name: pkg.name,
      bin: { lildax: "./bin/lildax" },
      version,
      license: pkg.license,
      repository: { type: "git", url: "git+https://github.com/akushonkamen/hackbot.git" },
      os: ["darwin", "linux", "win32"],
      cpu: ["arm64", "x64"],
      optionalDependencies: binaries,
    },
    null,
    2,
  ),
)

await Promise.all(
  Object.entries(binaries).map(([name, version]) => publish(`./dist/${dirByPkgName[name]}`, name, version)),
)
await publish(wrapperDir, pkg.name, version)
