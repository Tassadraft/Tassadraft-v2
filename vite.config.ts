import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import dotenv from 'dotenv';
import fs from 'fs';

const isDev = process.env.NODE_ENV !== 'production';
const baseEnv = dotenv.parse(fs.readFileSync('.env', 'utf8'));
let envVariables = { ...baseEnv };

if (isDev) {
    const localEnvPath = '.env.local';
    if (fs.existsSync(localEnvPath)) {
        const localEnv = dotenv.parse(fs.readFileSync(localEnvPath, 'utf8'));
        envVariables = { ...envVariables, ...localEnv };
    }
}

const viteEnv: Record<string, string> = {};
for (const [key, value] of Object.entries(envVariables)) {
    if (key.startsWith('VITE_')) {
        viteEnv[`process.env.${key}`] = JSON.stringify(value);
    }
}

export default defineConfig({
    plugins: [svelte()],
    define: {
        ...viteEnv,
    },
    optimizeDeps: {
        include: ['@ionic/pwa-elements/loader', 'vanta/dist/vanta.fog.min'],
    },
    build: {
        rollupOptions: {
            output: {
                assetFileNames: '[name].[hash].[ext]',
            },
        },
    },
});
