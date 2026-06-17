import { defineConfig } from "drizzle-kit";
import { resolve } from "path";

try {
  process.loadEnvFile(resolve(process.cwd(), "../../.env"));
} catch {}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL || "file:../../data/db/bambu.db",
  },
});
