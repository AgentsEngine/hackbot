import { run as runTui, type TuiInput } from "hackbot-tui"
import { Global } from "hackbot-core/global"
import { AppNodeBuilder } from "hackbot-core/effect/app-node-builder"
import { Effect } from "effect"

export function run(input: TuiInput) {
  return runTui(input).pipe(Effect.provide(AppNodeBuilder.build(Global.node)))
}
