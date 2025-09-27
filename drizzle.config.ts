import "./envConfig"

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: "./drizzle", // folder for migrations, it's optional and drizzle by default,
  dialect: 'sqlite',
  dbCredentials: {
    url: "./src/db/ralph.db"
  },
});
