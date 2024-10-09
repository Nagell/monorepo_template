import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

// eslint-disable-next-line
import { getApplicationConfiguration, getProxyConfiguration } from './../../config/vite'

export default getApplicationConfiguration({
    cacheDir: '../../node_modules/.vite/apps/app_1',

    server: {
        port: 5005,
        proxy: {
            // sample proxy configuration
            '/api': getProxyConfiguration('https://localhost:7148/'),
        },
    },

    preview: {
        port: 5005,
    },

    build: {
        outDir: '../../dist/apps/app_1',
    },

    plugins: [
        chunkSplitPlugin({
            strategy: 'default',
            customChunk(args) {
                const { file } = args

                // If some custom split is needed filter it out here and return the chunk name
                // It is recommended to use 'includes' as vue files are transformed in the process,
                // ex. 'TheButton.vue' -> 'TheButton.vue_vue_type_script_setup_true_lang-73YVYCtP'
                if (file.includes('node_modules/')) return 'vendor'
                else return 'index'
            },
        }),
    ],
})
