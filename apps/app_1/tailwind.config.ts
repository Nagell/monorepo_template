import containerQueries from '@tailwindcss/container-queries'

import uiLibPreset from '@monorepo/ui/tailwind.config'

import type { Config } from 'tailwindcss'

export default {
    darkMode: 'class', // This enables dark mode based on the presence of the "dark" class in the HTML tag
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        './../../libs/ui/**/*.{vue,js,ts,jsx,tsx}',
    ],
    presets: [
        uiLibPreset as Config,
    ],
    plugins: [
        containerQueries,
    ],
    theme: {
        extend: {
            containers: {
                300: '300px',
                500: '500px',
                700: '700px',
                900: '900px',
                1100: '1100px'
            },
        },
    }
} satisfies Config
