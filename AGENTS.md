<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

---

# AI Agent Workspace Manual

Welcome, Agent. You MUST strictly follow the rules, architecture guidelines, and workflows documented below. Do NOT deviate from the technology stack or project patterns.

## 🧭 Monorepo Structure

- **`apps/backend`**: A Hono-based Node.js API server. Connects to SQLite using Drizzle ORM and runs Better Auth.
- **`apps/frontend`**: A Vue 3 application built with Tailwind CSS v4.
- **`packages/design-system`**: A lightweight component library (e.g. `BaseButton.vue`) exported to the frontend.
- **`inbox`**: A staging directory for temporary data, databases, design assets, and references.

---

## 🚫 Tech Stack Guardrails (Strict Rules)

You must NEVER introduce alternative frameworks, libraries, or tools that conflict with the established stack:

- **Frontend Framework**: Vue 3 + TypeScript. Do NOT add React, Svelte, or other UI frameworks.
- **Styling**: Tailwind CSS v4. Do NOT downgrade to Tailwind v3, and do NOT install external CSS-in-JS libraries or UI packages (e.g. shadcn, vuetify) unless explicitly instructed.
- **Backend Framework**: Hono + Node.js. Do NOT add Express, Fastify, NestJS, etc.
- **Database / ORM**: Drizzle ORM + SQLite (via `@libsql/client`). Do NOT use Prisma, TypeORM, or switch database engines (e.g. PostgreSQL, MongoDB).
- **Authentication**: Better Auth. Keep the Vue auth-client and server configuration operational.
- **Tooling & Dev Server**: Vite+ (`vp` CLI) and pnpm workspaces. Do NOT add other package managers (npm, yarn) or override Vite+ tasks with custom runner configs without permission.

---

## 🔑 Environment Variables & Configurations

- **Single Source of Truth**: All environment variables are stored in the root `.env` and `.env.example` files. Do NOT create local `.env` files in `apps/backend` or `apps/frontend`.
- **Vite Loading**: Both `apps/frontend` and `apps/backend` are configured with `envDir: "../../"` in their respective `vite.config.ts`, loading root environment variables automatically.
- **Node.js Loading**: Standalone backend scripts and entrypoints load the root env variables natively using Node's `process.loadEnvFile(path)` (using absolute resolution via `import.meta.url`). Always wrap this in a `try/catch` block to handle cases where the `.env` file is missing (e.g. in CI or production envs).
- **Authorized Origins**: Origins for both CORS and Better Auth trusted origins are configured dynamically using `process.env.TRUSTED_ORIGINS` (comma-separated list of domains).

---

## 🎨 Tailwind CSS v4 & Styling Rules

Tailwind CSS v4 is configured as a CSS-first pipeline. AI agents must follow these strict rules to avoid breaking the layout:

### 1. Unified CSS Compilation

- **No Framework Pollution**: `@bambu/design-system` does **not** compile Tailwind CSS. It must only declare raw fallback CSS variables in `src/styles/theme.css`. Do **not** include `@import "tailwindcss";` in the design-system package configuration or stylesheet.
- **Consolidated Entrypoint**: The frontend compiles all styles inside [index.css](file:///Users/josedaniel/Sites/josepaternina.com/bambu/apps/frontend/src/index.css). The design system's Vue components are scanned and compiled at build time by adding:
  ```css
  @source "../../../packages/design-system/src/**/*.vue";
  ```

### 2. Cascade Layer Resets (Critical)

- **Rule**: All custom global elements or universal resets (e.g., `*`, `html`, `body`) **must** be wrapped inside `@layer base { ... }` in `index.css`.
- **Reason**: Unlayered CSS rules take absolute priority over layered rules in CSS Cascade Layers, meaning an unlayered `* { margin: 0 }` will override Tailwind's layered `.mx-auto` utility class. Wrap them to keep the hierarchy intact:
  ```css
  @layer base {
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  }
  ```

### 3. Vite Plugin Order

- In any `vite.config.ts` file using `@tailwindcss/vite`, the `tailwindcss()` plugin **must** be declared **before** the `vue()` plugin:
  ```typescript
  plugins: [tailwindcss(), vue()];
  ```

---

## 🗄️ Database & Schema Workflows

- **Database Engine**: Local SQLite database stored at `data/db/bambu.db`.
- **Drizzle ORM**: Schema is defined in `apps/backend/src/db/schema.ts`.
- **Modifications**: If you modify `schema.ts`, you must run the following commands to generate and apply migrations:

  ```bash
  # Generate migration SQL (scans schema and outputs SQL files under src/db/migrations)
  pnpm --filter @bambu/backend db:generate

  # Apply migration SQL to local database (runs drizzle-kit migrate)
  pnpm --filter @bambu/backend db:migrate

  # Push schema directly for rapid local testing without migrations
  pnpm --filter @bambu/backend db:push

  # Launch Drizzle Studio (web-based visual explorer)
  pnpm --filter @bambu/backend db:studio
  ```

---

## ⚡ Development Servers & Port Management

- **Vite Dev Servers**: Both `apps/frontend` and `apps/backend` run on Vite during development.
  - Backend API runs Hono under `@hono/vite-dev-server` on port `3000`.
  - Frontend runs Vue 3 on port `5173`.
- **Process Port Locking**: Both development servers use `vite-plugin-killer-instincts`. If port `3000` or `5173` is occupied when starting development, the plugin kills the blocking process and starts up cleanly.
- **Backend Entrypoint Execution**: If you need to run the Node server directly outside of Vite dev server (e.g. for testing production entrypoints), run `node dist/index.js` or `tsx src/index.ts`. The server script conditionally bypasses starting Node's HTTP listener when running inside Vite by checking `!process.env.VITE`.
- **Organized Workspace Logs**: The development environment is run concurrently from the root workspace using `concurrently` (running `vp run dev` or `pnpm dev`). This prefixes workspace logs cleanly (`[design-system]`, `[backend]`, `[frontend]`) and automatically terminates all processes if any of them is killed.

---

## 📂 The `inbox/` Directory

- The `/inbox` folder is your scratchpad. If the user gives you raw CSV/JSON files, database backups, images, layout guides, or mock contents, place them here.
- Use it as a source of truth for agent-led data ingestion scripts (such as custom database seeding commands).
