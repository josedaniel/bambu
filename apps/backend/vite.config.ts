import { defineConfig } from "vite-plus";
import devServer from "@hono/vite-dev-server";
import killerInstincts from "vite-plugin-killer-instincts";

process.env.VITE = "true";

export default defineConfig({
  plugins: [
    devServer({
      entry: "src/index.ts",
    }),
    killerInstincts({
      autoKill: true,
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    ssr: "src/index.ts",
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
});
