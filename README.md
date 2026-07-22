# hackbot

AI-powered development tool — terminal-first agent for code work.

## Overview

hackbot is an open-source AI coding agent that runs in your terminal. It supports multiple LLM providers, includes built-in agents for build and plan workflows, and provides a fast keyboard-driven UI.

## Features

- Terminal UI built with opentui
- Multiple LLM provider support (Anthropic, OpenAI, Google, AWS Bedrock, Azure, Ollama, etc.)
- Built-in `build` and `plan` agents (switch with `Tab`)
- Subagent support via `@general`
- Local session storage with search/history
- Plugin and theme system
- MCP (Model Context Protocol) support

## Installation

### From source

Requirements: [bun](https://bun.sh) >= 1.3.14.

```bash
git clone <your-repo-url> hackbot
cd hackbot
bun install
bun run dev
```

### Build

```bash
bun run build
```

The built binary is placed in the package's `dist/` directory.

## Usage

Run inside any project directory:

```bash
hackbot
```

Switch agents with `Tab`:
- **build** — default, full-access agent for development work
- **plan** — read-only agent for analysis and code exploration

Invoke subagents by mentioning them in messages, e.g. `@general`.

## Configuration

hackbot looks for configuration in `$HOME/.hackbot/` (or `$XDG_CONFIG_HOME/hackbot/`). The main config file is `config.json`.

Supported config keys include `model`, `provider`, `agents`, `permission`, `theme`, and `mcp` server definitions.

## Project Layout

This is a monorepo:

- `packages/hackbot` — the core CLI and TUI
- `packages/core` — shared core library
- `packages/desktop` — desktop app (Electron + Tauri)
- `packages/app` — web dashboard
- `packages/console/*` — console services
- `packages/sdk/js` — TypeScript SDK
- `packages/ui` — shared UI primitives
- `packages/storybook` — component playground
- `infra/` — deployment definitions
- `script/` — build/release scripts

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT — see [LICENSE](./LICENSE).
