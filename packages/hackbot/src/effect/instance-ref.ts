import { Context } from "effect"
import type { InstanceContext } from "@/project/instance-context"
import type { WorkspaceV2 } from "hackbot-core/workspace"

export const InstanceRef = Context.Reference<InstanceContext | undefined>("~hackbot/InstanceRef", {
  defaultValue: () => undefined,
})

export const WorkspaceRef = Context.Reference<WorkspaceV2.ID | undefined>("~hackbot/WorkspaceRef", {
  defaultValue: () => undefined,
})
