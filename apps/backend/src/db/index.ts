import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema.ts";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

if (!process.env.DATABASE_URL) {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    process.loadEnvFile(resolve(__dirname, "../../../.env"));
  } catch {}
}

const client = createClient({
  url: process.env.DATABASE_URL || "file:../../data/db/bambu.db",
});

export const db = drizzle(client, { schema });
