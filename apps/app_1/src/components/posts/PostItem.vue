<template>
    <article class="mb-8">
        <h3 class="text-2xl font-light text-surface-600 first-letter:capitalize">
            {{ post.title }}
        </h3>
        <p class="text-surface-900 first-letter:capitalize">
            {{ post.body }}
        </p>
    </article>
</template>

<script setup lang="ts">
    import type { Post } from '@/types/post'

    defineProps<{
        post: Post
    }>()
</script>
