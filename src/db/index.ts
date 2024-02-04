import { schema } from "./schema";
import { neon } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";

declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: NeonHttpDatabase<typeof schema> | undefined;
}

let db: NeonHttpDatabase<typeof schema>;

if (process.env.NODE_ENV === "production") {
  db = drizzle(neon(process.env.DATABASE_URL!), { schema });
} else {
  if (!global.db) {
    global.db = drizzle(neon(process.env.DATABASE_URL!), { schema });
  }
  db = global.db;
}

export { db };
