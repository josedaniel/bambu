import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema.ts";

const client = createClient({
  url: process.env.DATABASE_URL || "file:../../data/db/bambu.db",
});

export const db = drizzle(client, { schema });
