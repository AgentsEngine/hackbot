# Contributing to hackbot

We want to make it easy for you to contribute to hackbot. Here are the most common types of changes that get merged:

- Bug fixes
- Additional LSPs / formatters
- Improvements to LLM performance
- Support for new providers
- Fixes for environment-specific quirks
- Missing standard behavior
- Documentation improvements

However, any UI or core product feature must go through a design review with the core team before implementation.

## Developing hackbot

- Requirements: Bun 1.3+
- Install dependencies and start the dev server from the repo root:

  ```bash
  bun install
  bun dev
  ```

### Running against a different directory

By default, `bun dev` runs hackbot in the `packages/hackbot` directory. To run it against a different directory or repository:

```bash
bun dev <directory>
```

To run hackbot in the root of the repo itself:

```bash
bun dev .
```

### Building a standalone binary

To compile a standalone executable:

```bash
./packages/hackbot/script/build.ts --single
```

Then run it with:

```bash
./packages/hackbot/dist/hackbot-<platform>/bin/opencode
```

Replace `<platform>` with your platform (e.g., `darwin-arm64`, `linux-x64`).

### Repo layout

- `packages/hackbot`: hackbot core business logic & server.
- `packages/hackbot/src/cli/cmd/tui/`: The TUI code, written in SolidJS with opentui.
- `packages/app`: The shared web UI components, written in SolidJS.
- `packages/desktop`: The native desktop app, built with Electron (wraps `packages/app`).
- `packages/plugin`: Source for `hackbot-plugin`.

### `bun dev` vs `hackbot`

During development, `bun dev` is the local equivalent of the built `hackbot` command. Both run the same CLI interface:

```bash
# Development (from project root)
bun dev --help           # Show all available commands
bun dev serve            # Start headless API server
bun dev web              # Start server + open web interface
bun dev <directory>      # Start TUI in specific directory

# Production
hackbot --help           # Show all available commands
hackbot serve            # Start headless API server
hackbot web              # Start server + open web interface
hackbot <directory>      # Start TUI in specific directory
```

### Running the API Server

```bash
bun dev serve
```

Default port is 4096. Specify a different port:

```bash
bun dev serve --port 8080
```

### Running the Web App

1. Start the hackbot server (see above).
2. Then:

```bash
bun run --cwd packages/app dev
```

This starts a local dev server at http://localhost:5173 (or similar port shown in output).

### Running the Desktop App

```bash
bun run --cwd packages/desktop dev
```

To create a production build and package the app:

```bash
bun run --cwd packages/desktop build
bun run --cwd packages/desktop package
```

> [!NOTE]
> If you make changes to the API or SDK (e.g. `packages/hackbot/src/server/server.ts`), run `./script/generate.ts` to regenerate the SDK and related files.

Please try to follow the [style guide](./AGENTS.md).

### Setting up a Debugger

The most reliable way to debug hackbot is to run it manually in a terminal via `bun run --inspect=<url> dev ...` and attach your debugger via that URL.

Caveats:

- If you want to run the hackbot TUI and have breakpoints triggered in the server code, you might need to run `bun dev spawn` instead of the usual `bun dev`. This is because `bun dev` runs the server in a worker thread and breakpoints might not work there.
- If `spawn` does not work for you, you can debug the server separately:
  - Debug server: `bun run --inspect=ws://localhost:6499/ --cwd packages/hackbot ./src/index.ts serve --port 4096`, then attach TUI with `hackbot attach http://localhost:4096`
  - Debug TUI: `bun run --inspect=ws://localhost:6499/ --cwd packages/hackbot --conditions=browser ./src/index.ts`

Other tips:

- You might want to use `--inspect-wait` or `--inspect-brk` instead of `--inspect`, depending on your workflow.
- Specifying `--inspect=ws://localhost:6499/` on every invocation can be tiresome, you may want to `export BUN_OPTIONS=--inspect=ws://localhost:6499/` instead.

#### VSCode Setup

If you use VSCode, you can use our example configurations [.vscode/settings.example.json](.vscode/settings.example.json) and [.vscode/launch.example.json](.vscode/launch.example.json).

## Pull Request Expectations

### Issue First Policy

**All PRs must reference an existing issue.** Before opening a PR, open an issue describing the bug or feature. This helps maintainers triage and prevents duplicate work. PRs without a linked issue may be closed without review.

- Use `Fixes #123` or `Closes #123` in your PR description to link the issue.
- For small fixes, a brief issue is fine - just enough context for maintainers to understand the problem.

### General Requirements

- Keep pull requests small and focused.
- Explain the issue and why your change fixes it.
- Before adding new functionality, ensure it doesn't already exist elsewhere in the codebase.

### UI Changes

If your PR includes UI changes, please include screenshots or videos showing the before and after.

### Logic Changes

For non-UI changes (bug fixes, new features, refactors), explain **how you verified it works**:

- What did you test?
- How can a reviewer reproduce/confirm the fix?

### No AI-Generated Walls of Text

Long, AI-generated PR descriptions and issues are not acceptable and may be ignored.

- Write short, focused descriptions.
- Explain what changed and why in your own words.
- If you can't explain it briefly, your PR might be too large.

### PR Titles

PR titles should follow conventional commit standards:

- `feat:` new feature or functionality
- `fix:` bug fix
- `docs:` documentation or README changes
- `chore:` maintenance tasks, dependency updates, etc.
- `refactor:` code refactoring without changing behavior
- `test:` adding or updating tests

You can optionally include a scope to indicate which package is affected:

- `feat(app):` feature in the app package
- `fix(desktop):` bug fix in the desktop package
- `chore(opencode):` maintenance in the opencode package

### Style Preferences

Not strictly enforced — general guidelines:

- **Functions:** Keep logic within a single function unless breaking it out adds clear reuse or composition benefits.
- **Destructuring:** Avoid unnecessary destructuring.
- **Control flow:** Avoid `else` statements.
- **Error handling:** Prefer `.catch(...)` instead of `try`/`catch` when possible.
- **Types:** Reach for precise types and avoid `any`.
- **Variables:** Stick to immutable patterns and avoid `let`.
- **Naming:** Choose concise single-word identifiers when they remain descriptive.
- **Runtime APIs:** Use Bun helpers such as `Bun.file()` when they fit the use case.

## Feature Requests

For net-new functionality, start with a design conversation. Open an issue describing the problem, your proposed approach (optional), and why it belongs in hackbot. The core team will help decide whether it should move forward; please wait for that approval instead of opening a feature PR directly.

## Issue Requirements

All issues **must** use one of our issue templates:

- **Bug report** — for reporting bugs (requires a description)
- **Feature request** — for suggesting enhancements (requires verification checkbox and description)
- **Question** — for asking questions (requires the question)

Blank issues are not allowed.
