import ButtonItem, { type Props } from './ButtonItem.vue'

import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<Props & { text: string }> = {
    title: 'Atome / ButtonItem',
    component: ButtonItem,
    tags: [ 'autodocs' ],
    args: {
        text: 'Button',
    },
    argTypes: {
        title: {
            control: 'text',
            description: 'Dialog title / header',
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the button',
        },
        size: {
            control: 'select',
            options: [ 'sm', 'md', 'lg' ],
            description: 'Button size',
        },
    },
    render: (args) => {
        return {
            template: `
                <ButtonItem v-bind="args">
                    {{args.text}}
                </ButtonItem>
            `,
            components: {
                ButtonItem,
            },
            setup() {
                return { args }
            },
        }
    }
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        variant: 'primary',
    }
}
export const Secondary: Story = {
    args: {
        variant: 'secondary',
    }
}

export const Disabled: Story = {
    args: {
        disabled: true,
    }
}

export const Small: Story = {
    args: {
        size: 'sm',
    }
}

export const Medium: Story = {
    args: {
        size: 'md',
    }
}

export const Large: Story = {
    args: {
        size: 'lg',
    }
}
