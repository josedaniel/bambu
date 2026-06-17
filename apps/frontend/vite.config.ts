import { defineConfig } from "vite-plus";
import vue from "@vitejs/plugin-vue";
import killerInstincts from "vite-plugin-killer-instincts";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    killerInstincts({
      autoKill: true,
    }),
  ],
  server: {
    port: 5173,
  },
});
