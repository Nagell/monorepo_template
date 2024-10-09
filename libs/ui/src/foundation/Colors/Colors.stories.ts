import Colors from './ColorList.vue'
import { useTailwindColors } from './useTailwindColors'

import type { Meta, StoryObj } from '@storybook/vue3'

const { FILTERED_COLORS } = useTailwindColors()
/**
 * #### This component is not exported. It is used only for documentation purposes.
 * To use it you can put any color below in one of the formats:
 * * rgba(2, 6, 23, 1)
 * * #020617
 * * hsla(229, 84%, 5%, 1)
 *
 * which are also proposed when clicking on the `</>` icon in the controls.
 *
 * This setting will stay throughout the session, so you can change the colors and see the changes in other components.
 * If you want to reset colors, you can come back to this story again and click on the `⮌` button.
 */
const meta: Meta = {
    title: 'Foundation / Colors',
    component: Colors,
    tags: [ 'autodocs' ],
    argTypes: { },
    args: { },
    parameters: {
        controls: { expanded: true },
    },
    render: args => ({
        template: `
            <Colors
                v-bind="args"
            />
        `,
        components: { Colors },
        setup() {
            return { args }
        },
    }),

}

// generate argTypes (controls) for each color
const argTypesToAdd = Object.keys(FILTERED_COLORS)
    .reduce((acc, key) => {
        acc[key] = {
            control: {
                type: 'color',
            },
        }
        return acc
    }, {} as Record<string, any>)

meta.argTypes = {
    ...meta.argTypes,
    ...argTypesToAdd,
}

// generate args (values) for each color
const argsToAdd = Object.keys(FILTERED_COLORS)
    .reduce((acc, key) => {
        acc[key] = FILTERED_COLORS[key]
        return acc
    }, {} as Record<string, any>)

meta.args = {
    ...meta.args,
    ...argsToAdd,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
    },
}
