import { AgentV2 } from "hackbot-core/agent"
import { AISDK } from "hackbot-core/aisdk"
import { Catalog } from "hackbot-core/catalog"
import { CommandV2 } from "hackbot-core/command"
import { Credential } from "hackbot-core/credential"
import { AppNodeBuilder } from "hackbot-core/effect/app-node-builder"
import { LayerNodePlatform } from "hackbot-core/effect/app-node-platform"
import { LayerNode } from "hackbot-core/effect/layer-node"
import { EventV2 } from "hackbot-core/event"
import { FileSystem } from "hackbot-core/filesystem"
import { FSUtil } from "hackbot-core/fs-util"
import { Integration } from "hackbot-core/integration"
import { Location } from "hackbot-core/location"
import { Npm } from "hackbot-core/npm"
import { PluginV2 } from "hackbot-core/plugin"
import { Reference } from "hackbot-core/reference"
import { SkillV2 } from "hackbot-core/skill"
import { Effect, Layer } from "effect"
import { tempLocationLayer } from "../fixture/location"

const npmLayer = Layer.succeed(
  Npm.Service,
  Npm.Service.of({
    add: () => Effect.succeed({ directory: "", entrypoint: undefined }),
    install: () => Effect.void,
    which: () => Effect.succeed(undefined),
  }),
)

export const PluginTestLayer = AppNodeBuilder.build(
  LayerNode.group([
    FileSystem.node,
    FSUtil.node,
    Location.node,
    Npm.node,
    Credential.node,
    EventV2.node,
    LayerNodePlatform.httpClient,
    PluginV2.node,
    AgentV2.node,
    AISDK.node,
    Catalog.node,
    CommandV2.node,
    Integration.node,
    Reference.node,
    SkillV2.node,
  ]),
  [
    [Location.node, tempLocationLayer],
    [Npm.node, npmLayer],
  ],
)
