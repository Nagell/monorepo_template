import * as path from 'path'

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
    root: process.cwd(),

    server: {
        host: 'localhost',
        open: true,
    },

    preview: {
        host: 'localhost',
    },

    plugins: [ vue(), nxViteTsPaths() ],

    // Uncomment this if you are using workers.
    // worker: {
    //     plugins: () => [ nxViteTsPaths() ],
    // },

    resolve: {
        alias: {
            '@': path.resolve(process.cwd(), './src'),
        },
    },

    build: {
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
})
