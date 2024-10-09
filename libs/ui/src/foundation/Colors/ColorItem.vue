<template>
    <div
        :class="[`bg-${name}`, classes.color]"
    >
        <div :class="classes.text">
            {{ name }}
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'

    interface Props {
        name: string
    }

    withDefaults(defineProps<Props>(), {
        name: 'empty',
    })

    const classes = computed(() => {
        return {
            color: {
                'color': true,
                'p-2 h-28 w-24 rounded-md shadow-lg': true,
                'inline-flex flex-col items-center justify-between': true,
                'text-center uppercase text-sm': true,
            },
            text: {
                'color__text': true,
                'p-1 rounded-md': true,
                'w-full': true,
                'text-surface-950 bg-white bg-opacity-50': true,
            }
        }
    })
</script>
