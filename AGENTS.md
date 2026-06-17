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

Welcome, Agent. This guide explains the rules, architecture, and workflows of this monorepo to ensure seamless coding operations.

## 🧭 Monorepo Structure

- **`apps/backend`**: A Hono-based Node.js API server. Connects to SQLite using Drizzle ORM and runs Better Auth.
- **`apps/frontend`**: A Vue 3 application built with Tailwind CSS v4.
- **`packages/design-system`**: A lightweight component library (e.g. `BaseButton.vue`) exported to the frontend.
- **`inbox`**: A staging directory for temporary data, databases, design assets, and references.

---

## 🎨 Tailwind CSS v4 & Styling Rules

Tailwind CSS v4 is configured as a CSS-first pipeline. AI agents must follow these strict rules to avoid breaking the layout:

### 1. Unified CSS Compilation

- **No Framework Pollution**: `@bambu/design-system` does **not** compile Tailwind CSS. It must only declare raw fallback CSS variables in `src/styles/theme.css`. Do **not** include `@import "tailwindcss";` in the design-system package configuration or stylesheet.
- **Consolidated Entrypoint**: The frontend compiles all styles inside [index.css](file:///Users/josedaniel/Sites/fandic/bambu/apps/frontend/src/index.css). The design system's Vue components are scanned and compiled at build time by adding:
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
- **Drizzle ORM**: Scheme is defined in `apps/backend/src/db/schema.ts`.
- **Modifications**: If you modify `schema.ts`, you must run the following commands to generate and apply migrations:

  ```bash
  # Generate migration SQL
  pnpm --filter backend drizzle-kit generate

  # Apply migration SQL to data/db/bambu.db
  pnpm --filter backend drizzle-kit migrate
  ```

---

## 📂 The `inbox/` Directory

- The `/inbox` folder is your scratchpad. If the user gives you raw CSV/JSON files, database backups, images, layout guides, or mock contents, place them here.
- Use it as a source of truth for agent-led data ingestion scripts (such as custom database seeding commands).
