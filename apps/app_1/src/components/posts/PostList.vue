<template>
    <template v-if="posts.length">
        <section>
            <PostItem
                v-for="post in posts"
                :key="post.id"
                :post="post"
            />
        </section>
    </template>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia'
    import { onBeforeMount } from 'vue'

    import { usePostStore } from '@/stores/post.store'

    import PostItem from './PostItem.vue'

    const postStore = usePostStore()
    const { posts } = storeToRefs(postStore)

    onBeforeMount(() => {
        if (!posts.value.length) postStore.fetchPosts()
    })
</script>
