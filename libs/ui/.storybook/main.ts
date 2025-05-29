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
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/vue3-vite',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    async viteFinal(config) {
        config.optimizeDeps = config.optimizeDeps || {}
        config.optimizeDeps.include = [
            ...(config.optimizeDeps.include || []),
            '@storybook/builder-vite'
        ]
        return config
    },
    core: {
        disableTelemetry: true,
    },
}
export default config
