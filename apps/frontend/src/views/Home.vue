<script setup lang="ts">
import { ref, onMounted } from "vue";

const theme = ref("dark");

const toggleTheme = () => {
  const nextTheme = theme.value === "dark" ? "light" : "dark";
  theme.value = nextTheme;
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);
};

onMounted(() => {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  theme.value = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme.value);
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar -->
    <nav
      class="sticky top-0 z-50 flex items-center justify-between py-[1.2rem] px-[3rem] bg-nav-bg backdrop-blur-md border-b border-border transition-all duration-[280ms] max-sm:py-4 max-sm:px-5"
    >
      <a
        href="/"
        class="font-mono text-[1.05rem] font-medium text-accent tracking-[-0.01em] no-underline transition-opacity duration-200 hover:opacity-65"
        >// BAMBU</a
      >
      <div class="flex items-center">
        <button
          class="bg-transparent border border-border rounded-[6px] w-8 h-8 cursor-pointer p-0 flex items-center justify-center text-text-muted transition-colors duration-200 hover:text-text hover:border-text-muted"
          aria-label="Toggle light/dark mode"
          @click="toggleTheme"
        >
          <!-- Moon — shown in dark mode -->
          <svg
            v-if="theme === 'dark'"
            class="text-current"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
          <!-- Sun — shown in light mode -->
          <svg
            v-else
            class="text-current"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
            />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <main
      class="flex-1 max-w-[760px] w-full mx-auto pt-[5.5rem] pb-[5rem] px-[3rem] flex flex-col gap-[4.5rem] max-sm:pt-[3.5rem] max-sm:pb-[4rem] max-sm:px-[1.25rem] max-sm:gap-[3.5rem]"
    >
      <!-- Hero Section -->
      <section class="flex flex-col gap-7">
        <h1
          class="font-bricolage text-[clamp(2.5rem,6.5vw,4rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-text"
        >
          Welcome to <span class="text-accent">Bambu</span>
        </h1>
        <p class="text-[1.05rem] leading-[1.8] text-text-muted font-light max-w-[500px]">
          A minimal, high-performance monorepo starter template optimized for development using AI
          agents.
        </p>
        <div class="text-accent opacity-80 mt-1" aria-hidden="true">
          <svg
            width="128"
            height="22"
            viewBox="0 0 128 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 11C7 3 11 3 16 11C21 19 25 19 32 11C37 3 41 3 48 11C53 19 57 19 64 11C69 3 73 3 80 11C85 19 89 19 96 11C101 3 105 3 112 11C117 19 121 19 126 11"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </section>

      <!-- Stack Section -->
      <section class="flex flex-col gap-[1.35rem]">
        <h2
          class="font-mono text-[0.72rem] font-medium tracking-[0.14em] uppercase text-text-muted"
        >
          Technologies / Stack
        </h2>
        <div class="flex flex-wrap gap-[0.55rem]">
          <span
            class="font-mono text-[0.76rem] py-[0.32rem] px-[0.85rem] border border-accent text-accent bg-accent-dim rounded-full transition-colors duration-200"
            >Vite+</span
          >
          <span
            class="font-mono text-[0.76rem] py-[0.32rem] px-[0.85rem] border border-border rounded-full text-text-muted transition-colors duration-200 hover:border-text-muted hover:text-text"
            >Vue 3</span
          >
          <span
            class="font-mono text-[0.76rem] py-[0.32rem] px-[0.85rem] border border-border rounded-full text-text-muted transition-colors duration-200 hover:border-text-muted hover:text-text"
            >TypeScript</span
          >
          <span
            class="font-mono text-[0.76rem] py-[0.32rem] px-[0.85rem] border border-border rounded-full text-text-muted transition-colors duration-200 hover:border-text-muted hover:text-text"
            >Tailwind CSS v4</span
          >
          <span
            class="font-mono text-[0.76rem] py-[0.32rem] px-[0.85rem] border border-border rounded-full text-text-muted transition-colors duration-200 hover:border-text-muted hover:text-text"
            >Hono (Backend)</span
          >
          <span
            class="font-mono text-[0.76rem] py-[0.32rem] px-[0.85rem] border border-border rounded-full text-text-muted transition-colors duration-200 hover:border-text-muted hover:text-text"
            >Better Auth</span
          >
          <span
            class="font-mono text-[0.76rem] py-[0.32rem] px-[0.85rem] border border-border rounded-full text-text-muted transition-colors duration-200 hover:border-text-muted hover:text-text"
            >Drizzle ORM</span
          >
          <span
            class="font-mono text-[0.76rem] py-[0.32rem] px-[0.85rem] border border-border rounded-full text-text-muted transition-colors duration-200 hover:border-text-muted hover:text-text"
            >SQLite (LibSQL)</span
          >
          <span
            class="font-mono text-[0.76rem] py-[0.32rem] px-[0.85rem] border border-border rounded-full text-text-muted transition-colors duration-200 hover:border-text-muted hover:text-text"
            >Lucide Icons</span
          >
        </div>
      </section>

      <!-- How to Use Section -->
      <section class="flex flex-col gap-[1.35rem]">
        <h2
          class="font-mono text-[0.72rem] font-medium tracking-[0.14em] uppercase text-text-muted"
        >
          How to use
        </h2>
        <div class="flex flex-col gap-6 text-base leading-[1.65] text-text-muted font-light">
          <div>
            <h3 class="text-text font-semibold text-base mb-2">
              1. Installation & Dependency Management
            </h3>
            <p>
              Run
              <code
                class="font-mono text-sm bg-surface px-1.5 py-0.5 rounded border border-border text-accent"
                >vp install</code
              >
              (or
              <code
                class="font-mono text-sm bg-surface px-1.5 py-0.5 rounded border border-border text-accent"
                >pnpm install</code
              >) at the root of the workspace. All workspace dependencies are managed globally
              inside
              <code
                class="font-mono text-sm bg-surface px-1.5 py-0.5 rounded border border-border text-text"
                >pnpm-workspace.yaml</code
              >
              using pnpm's catalog mode to ensure strict version consistency.
            </p>
          </div>
          <div>
            <h3 class="text-text font-semibold text-base mb-2">
              2. Building Reusable UI Components
            </h3>
            <p>
              Develop all shared components in the
              <code
                class="font-mono text-sm bg-surface px-1.5 py-0.5 rounded border border-border text-accent"
                >packages/design-system</code
              >
              package. Style them using Tailwind CSS v4 classes. By utilizing the Tailwind
              <code
                class="font-mono text-sm bg-surface px-1.5 py-0.5 rounded border border-border text-text"
                >@source</code
              >
              directive, frontend applications can scan and compile these library components into a
              single stylesheet.
            </p>
          </div>
          <div>
            <h3 class="text-text font-semibold text-base mb-2">3. Utilizing the Root Inbox</h3>
            <p>
              The root
              <code
                class="font-mono text-sm bg-surface px-1.5 py-0.5 rounded border border-border text-accent"
                >inbox/</code
              >
              directory serves as an isolated staging folder for non-project assets. You can drop
              datasets, reference documents, images, mock layouts, or database backups here. These
              assets can then be read, processed, or referenced by developers and AI agents to
              populate the app, seed data, or perform background tasks.
            </p>
          </div>
        </div>
      </section>

      <!-- License Section -->
      <section class="flex flex-col gap-[1.35rem]">
        <h2
          class="font-mono text-[0.72rem] font-medium tracking-[0.14em] uppercase text-text-muted"
        >
          License
        </h2>
        <p class="text-base leading-[1.65] text-text-muted font-light">
          Released under the permissive <span class="text-text font-medium">MIT</span> License. Feel
          free to clone, modify, and use it in your personal or commercial projects.
        </p>
      </section>

      <!-- Credits Section -->
      <section class="flex flex-col gap-[1.35rem]">
        <h2
          class="font-mono text-[0.72rem] font-medium tracking-[0.14em] uppercase text-text-muted"
        >
          Credits
        </h2>
        <p class="text-base leading-[1.65] text-text-muted font-light">
          Made with love by
          <a
            href="https://josepaternina.com"
            target="_blank"
            rel="noopener"
            class="text-text font-semibold border-b-2 border-accent pb-[0.06em] no-underline transition-colors duration-200 hover:text-accent"
            >José Daniel Paternina</a
          >.
        </p>
      </section>
    </main>

    <!-- Footer -->
    <footer
      class="flex items-center justify-between py-[1.4rem] px-[3rem] border-t border-border transition-all duration-[280ms] max-sm:p-5 max-sm:flex-col max-sm:items-start max-sm:gap-2"
    >
      <span class="font-mono text-[0.7rem] text-text-muted tracking-[0.02em]">MIT License</span>
      <a
        href="https://josepaternina.com"
        target="_blank"
        rel="noopener"
        class="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-text-muted no-underline transition-colors duration-200 hover:text-text"
        >josepaternina.com</a
      >
    </footer>
  </div>
</template>
