import {config} from 'dotenv'; // remove this line if you use Node.js v20.6.0 or later
import {  defineConfig } from "drizzle-kit";

config({path:'.env.local'})

export default defineConfig({
  schema: './database/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  }
});