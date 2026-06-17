import { defineConfig } from "vite-plus";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.json",
    }),
  ],
  server: {
    watch: {
      ignored: ["**/dist/**"],
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "BambuDesignSystem",
      fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue", "lucide-vue-next"],
      output: {
        globals: {
          vue: "Vue",
          "lucide-vue-next": "LucideVueNext",
        },
      },
    },
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
});
