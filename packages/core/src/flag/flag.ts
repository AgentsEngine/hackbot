import { Config } from "effect"

export function truthy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "true" || value === "1"
}

const copy = process.env["HACKBOT_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"]
const fff = process.env["HACKBOT_DISABLE_FFF"]

function enabledByExperimental(key: string) {
  return process.env[key] === undefined ? truthy("HACKBOT_EXPERIMENTAL") : truthy(key)
}

export const Flag = {
  OTEL_EXPORTER_OTLP_ENDPOINT: process.env["OTEL_EXPORTER_OTLP_ENDPOINT"],
  OTEL_EXPORTER_OTLP_HEADERS: process.env["OTEL_EXPORTER_OTLP_HEADERS"],

  HACKBOT_AUTO_HEAP_SNAPSHOT: truthy("HACKBOT_AUTO_HEAP_SNAPSHOT"),
  HACKBOT_GIT_BASH_PATH: process.env["HACKBOT_GIT_BASH_PATH"],
  HACKBOT_CONFIG: process.env["HACKBOT_CONFIG"],
  HACKBOT_CONFIG_CONTENT: process.env["HACKBOT_CONFIG_CONTENT"],
  HACKBOT_DISABLE_AUTOUPDATE: truthy("HACKBOT_DISABLE_AUTOUPDATE"),
  HACKBOT_ALWAYS_NOTIFY_UPDATE: truthy("HACKBOT_ALWAYS_NOTIFY_UPDATE"),
  HACKBOT_DISABLE_PRUNE: truthy("HACKBOT_DISABLE_PRUNE"),
  HACKBOT_DISABLE_TERMINAL_TITLE: truthy("HACKBOT_DISABLE_TERMINAL_TITLE"),
  HACKBOT_SHOW_TTFD: truthy("HACKBOT_SHOW_TTFD"),
  HACKBOT_DISABLE_AUTOCOMPACT: truthy("HACKBOT_DISABLE_AUTOCOMPACT"),
  HACKBOT_DISABLE_MODELS_FETCH: truthy("HACKBOT_DISABLE_MODELS_FETCH"),
  HACKBOT_DISABLE_MOUSE: truthy("HACKBOT_DISABLE_MOUSE"),
  HACKBOT_FAKE_VCS: process.env["HACKBOT_FAKE_VCS"],
  HACKBOT_SERVER_PASSWORD: process.env["HACKBOT_SERVER_PASSWORD"],
  HACKBOT_SERVER_USERNAME: process.env["HACKBOT_SERVER_USERNAME"],
  HACKBOT_DISABLE_FFF: fff === undefined ? process.platform === "win32" : truthy("HACKBOT_DISABLE_FFF"),

  // Experimental
  HACKBOT_EXPERIMENTAL_FILEWATCHER: Config.boolean("HACKBOT_EXPERIMENTAL_FILEWATCHER").pipe(Config.withDefault(false)),
  HACKBOT_EXPERIMENTAL_DISABLE_FILEWATCHER: Config.boolean("HACKBOT_EXPERIMENTAL_DISABLE_FILEWATCHER").pipe(
    Config.withDefault(false),
  ),
  HACKBOT_EXPERIMENTAL_DISABLE_COPY_ON_SELECT:
    copy === undefined ? process.platform === "win32" : truthy("HACKBOT_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"),
  HACKBOT_MODELS_URL: process.env["HACKBOT_MODELS_URL"],
  HACKBOT_MODELS_PATH: process.env["HACKBOT_MODELS_PATH"],
  HACKBOT_DB: process.env["HACKBOT_DB"],

  HACKBOT_WORKSPACE_ID: process.env["HACKBOT_WORKSPACE_ID"],
  HACKBOT_EXPERIMENTAL_WORKSPACES: enabledByExperimental("HACKBOT_EXPERIMENTAL_WORKSPACES"),

  // Evaluated at access time (not module load) because tests, the CLI, and
  // external tooling set these env vars at runtime.
  get HACKBOT_DISABLE_PROJECT_CONFIG() {
    return truthy("HACKBOT_DISABLE_PROJECT_CONFIG")
  },
  get HACKBOT_EXPERIMENTAL_REFERENCES() {
    return enabledByExperimental("HACKBOT_EXPERIMENTAL_REFERENCES")
  },
  get HACKBOT_TUI_CONFIG() {
    return process.env["HACKBOT_TUI_CONFIG"]
  },
  get HACKBOT_CONFIG_DIR() {
    return process.env["HACKBOT_CONFIG_DIR"]
  },
  get HACKBOT_PURE() {
    return truthy("HACKBOT_PURE")
  },
  get HACKBOT_PERMISSION() {
    return process.env["HACKBOT_PERMISSION"]
  },
  get HACKBOT_PLUGIN_META_FILE() {
    return process.env["HACKBOT_PLUGIN_META_FILE"]
  },
  get HACKBOT_CLIENT() {
    return process.env["HACKBOT_CLIENT"] ?? "cli"
  },
}
