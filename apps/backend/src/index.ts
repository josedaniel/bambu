import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { auth } from "./auth.ts";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

if (!process.env.PORT) {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    process.loadEnvFile(resolve(__dirname, "../../.env"));
  } catch {}
}

const app = new Hono();

const trustedOrigins = process.env.TRUSTED_ORIGINS
  ? process.env.TRUSTED_ORIGINS.split(",")
  : ["http://localhost:5173", "http://localhost:5174"];

// Configuración de CORS
app.use(
  "*",
  cors({
    origin: (origin) => {
      if (!origin) return trustedOrigins[0];
      if (trustedOrigins.includes(origin)) return origin;
      return trustedOrigins[0];
    },
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  }),
);

// Endpoints de Better Auth
app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/", (c) => {
  return c.text("Bambu Backend API is running!");
});

const port = Number(process.env.PORT) || 3000;

if (!process.env.VITE) {
  console.log(`Server is running on port ${port}`);
  serve({
    fetch: app.fetch,
    port,
  });
}

export default app;
