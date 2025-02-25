import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  dialect: "mysql",
  schema: './src/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url:  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  },
});
