<template>
    <button
        :class="classes"
        :title="props.title"
        :disabled="disabled"
        @click="onClick"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
    import { computed } from 'vue'

    export interface Props {
        onClick?: () => void
        title?: string
        variant?: 'primary' | 'secondary'
        size?: 'sm' | 'md' | 'lg'
        disabled?: boolean
    }

    const props = withDefaults(defineProps<Props>(), {
        onClick: () => {},
        title: '',
        variant: 'primary',
        size: 'md',
        disabled: false
    })

    const classes = computed(() => {
        return {
            'button-item': true,
            'rounded-md': true,
            'bg-primary-400 text-surface-950 hover:enabled:bg-primary-300': props.variant === 'primary',
            'bg-surface-700 text-white hover:enabled:bg-surface-600': props.variant === 'secondary',
            'bg-opacity-50': props.disabled,
            'px-2 py-1 text-sm': props.size === 'sm',
            'px-5 py-[0.625rem] text-lg': props.size === 'lg',
            'px-3 py-2 text-base': props.size === 'md',
        }
    })
</script>
