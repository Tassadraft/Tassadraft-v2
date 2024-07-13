import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import envCompatible from 'vite-plugin-env-compatible';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables from .env file
dotenv.config();

// Load .env.local if it exists
const envLocalPath = '.env.local';
if (fs.existsSync(envLocalPath)) {
  const envLocalConfig = dotenv.parse(fs.readFileSync(envLocalPath));
  // Override only variables present in both .env and .env.local
  for (const k in envLocalConfig) {
    if (process.env[k] !== undefined) {
      process.env[k] = envLocalConfig[k];
    }
  }
}

export default defineConfig({
  plugins: [
    svelte(),
    envCompatible()
  ],
  define: {
    'process.env': process.env
  }
});
