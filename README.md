# Bambu Monorepo Starter

Bambu is a high-performance, developer-first monorepo starter template. It is specifically pre-configured and optimized for development using **AI coding agents** and human developers looking for a fast, cohesive full-stack environment.

---

## 🛠️ Technology Stack

- **Build Toolchain**: [Vite+](https://viteplus.dev/) (`vp`) — A unified, high-speed toolchain wrapping Vite, Rolldown, and Vitest.
- **Frontend**: [Vue 3](https://vuejs.org/) + TypeScript + Vue Router.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) — CSS-first styling framework integrated natively.
- **Design System**: Reusable web components library in a dedicated package workspace.
- **Backend**: [Hono](https://hono.dev/) — Fast Node.js web server.
- **Auth**: [Better Auth](https://www.better-auth.com/) — Complete authentication system configured with database adapters.
- **Database & ORM**: [SQLite (LibSQL)](https://github.com/tursodatabase/libsql) + [Drizzle ORM](https://orm.drizzle.team/) for migrations and queries.
- **Icons**: [Lucide Icons](https://lucide.dev/).
- **Package Management**: [pnpm](https://pnpm.io/) Workspaces.

---

## 📁 Project Structure

```
bambu/
├── apps/
│   ├── backend/          # Hono API Server, Better Auth setup, and Drizzle schema
│   └── frontend/         # Vue 3 App, routing, state, and page layout (Tailwind v4)
├── packages/
│   └── design-system/    # Reusable Vue components (e.g. BaseButton.vue) and theme vars
├── data/                 # SQLite local database directory (git-ignored)
├── inbox/                # Staging directory for external datasets, images, and mock assets
├── pnpm-workspace.yaml   # pnpm Workspace and dependency catalog mode config
├── package.json          # Root scripts and global configuration
└── tsconfig.json         # Global TypeScript compiler options
```

---

## 🚀 Getting Started

### 1. Installation

Install all workspace dependencies using `vp` (or `pnpm`):

```bash
vp install
```

This registers dependencies using **catalog mode** defined in the root `pnpm-workspace.yaml`, ensuring all packages use identical dependency versions.

### 2. Database Setup & Migrations

The Hono backend utilizes an SQLite database stored locally at `data/db/bambu.db`. Interactions with Drizzle ORM are managed via package scripts in the backend workspace:

1. **Generate migrations** (scans your schema and creates SQL migration files):
   ```bash
   pnpm --filter @bambu/backend db:generate
   ```
2. **Apply migrations** (runs all pending SQL migrations against the database):
   ```bash
   pnpm --filter @bambu/backend db:migrate
   ```
3. **Push schema changes** (syncs the schema directly to the database without generating files, ideal for rapid prototyping):
   ```bash
   pnpm --filter @bambu/backend db:push
   ```
4. **Open Drizzle Studio** (web-based visual explorer for your database):
   ```bash
   pnpm --filter @bambu/backend db:studio
   ```

### 3. Running Development Environment

To start all components in parallel (backend Hono API on port `3000`, frontend Vue client on port `5173`, and design-system in watch mode):

```bash
vp run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173) (running on Vite dev server)
- **Backend Hono API**: [http://localhost:3000](http://localhost:3000) (running on Hono Vite dev server)
- **Design System**: Rebuilds automatically on change.

_Note: Both development servers are configured with `vite-plugin-killer-instincts` which automatically frees up their respective ports (`5173` and `3000`) if they are already in use when booting the dev environment._

---

## 🎨 Styling Guidelines (Tailwind CSS v4)

- **CSS-First Theme Config**: Custom styling tokens are defined in `apps/frontend/src/index.css` inside the `@theme` block.
- **Avoid Duplication**: The `@bambu/design-system` package does not package its own Tailwind compilation. It exports Vue components and a lightweight `theme.css` with raw fallback variables.
- **Component Scanning**: The frontend compiler scans design system component files by using the `@source` directive in `index.css`:
  ```css
  @source "../../../packages/design-system/src/**/*.vue";
  ```
- **CSS Cascade Layering**: To prevent custom global styles (like resets) from overriding Tailwind utilities, always wrap them in the `@layer base` block:
  ```css
  @layer base {
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  }
  ```

---

## 📂 Root Staging (`inbox/` Folder)

The root `/inbox` folder is reserved for developers and AI agents to put external data feeds, reference documents, mockup designs, static images, or database mock scripts. These assets are ignored by the production build but are fully accessible during development and agent operations.

---

## 📝 License

Released under the [MIT License](LICENSE). Feel free to use and modify for personal and commercial projects.
