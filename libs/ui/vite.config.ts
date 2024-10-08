import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [ vue() ],
    resolve: {
        alias: {
            'tailwind-config': path.resolve(__dirname, 'tailwind.config.cjs'),
        },
    },
    optimizeDeps: {
        include: [
            'tailwind-config',
        ],
    },
    build: {
        // solving vite based storybook issue
        // https://github.com/tailwindlabs/tailwindcss/discussions/3646#discussioncomment-825556
        // sample: https://lobotuerto.com/notes/import-tailwind-config-in-vite
        commonjsOptions: {
            transformMixedEsModules: true,
            include: [ 'tailwind-config.cjs', 'node_modules/**' ],
        }
    }
})
