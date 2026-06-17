import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "./db/index.ts";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

if (!process.env.BETTER_AUTH_SECRET) {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    process.loadEnvFile(resolve(__dirname, "../../.env"));
  } catch {}
}

const trustedOrigins = process.env.TRUSTED_ORIGINS ? process.env.TRUSTED_ORIGINS.split(",") : [];

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins,
});
