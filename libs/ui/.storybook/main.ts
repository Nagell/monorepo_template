import { dirname, join } from 'path'

import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
    stories: [
        '../src/docs/*.mdx',

        '../src/foundation/**/*.mdx',
        '../src/foundation/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/atoms/**/*.mdx',
        '../src/atoms/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/molecules/**/*.mdx',
        '../src/molecules/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/organisms/**/*.mdx',
        '../src/organisms/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/pages/**/*.mdx',
        '../src/pages/**/*.stories.@(js|jsx|ts|tsx)',
        '../src/sandbox/**/*.mdx',
        '../src/sandbox/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@storybook/addon-interactions'),
    ],
    framework: {
        name: getAbsolutePath('@storybook/vue3-vite'),
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    async viteFinal(config) {
        return config
    },
    core: {
        disableTelemetry: true,
    },
}
export default config

function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, 'package.json')))
}
