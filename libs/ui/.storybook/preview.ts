import { type Preview, setup } from '@storybook/vue3'

// styles
import '../src/assets/styles/index.css'

setup((app) => {
    // Add directives, plugins, and global components
})

const preview: Preview = {
    parameters: {
        layout: 'fullscreen',
        backgrounds: {
            default: 'white',
            values: [
                {
                    name: 'white',
                    value: '#ffffff',
                },
                {
                    name: 'surface-950',
                    value: 'rgb(var(--surface-950, #020617))',
                },
            ],
        },
        controls: {
            expanded: true,
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        options: {
            storySort: {
                method: 'alphabetical',
                order: [ 'Introduction', 'Foundation', 'Atoms', 'Molecules', 'Organisms', 'Pages', 'Sandbox' ],
            },
        },
    },
}

export default preview
