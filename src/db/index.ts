import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from "@/db/schema";
import { getCloudflareContext } from "@opennextjs/cloudflare"

export interface Env {
  DB: DrizzleD1Database;
}
export function isCloudflareWorker() {
  return globalThis.navigator?.userAgent === "Cloudflare-Workers";
}

async function getDb() {
  if (process.env.NODE_ENV === "development") {
    // TODO: unfortunately libsql is bundled into production builds
    // need to remove libsql from prod build if better solution arrives
    const { drizzle: libsql } = await import("drizzle-orm/libsql/web");
    return libsql({
      connection: {
        url: process.env.DB_URL || "",
        authToken: process.env.DB_AUTH_TOKEN || "",
      },
      schema,
    });
  }
  const ctx = await getCloudflareContext?.({ async: true });

  if (ctx?.env?.DB) {
    // running in CF Worker with a D1 binding
    return drizzle(ctx.env.DB, { schema });
  }
}

export const db = await getDb() as DrizzleD1Database<typeof schema>;
