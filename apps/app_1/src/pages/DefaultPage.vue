<template>
    <DefaultLayout>
        <div class="min-h-[70vh] flex flex-col items-center">
            <h1 class="text-6xl text-center">
                {{ $t('home.title') }}
            </h1>
            <hr class="w-10 mt-4 mb-2">
            <h2 class="text-2xl text-center">
                {{ $t('home.subtitle') }}
            </h2>
            <div class="mt-6 w-1/2 max-w-[50rem]">
                <PostList />
            </div>
            <button @click="fetchMorePosts">
                {{ $t('home.fetchMorePosts') }}
            </button>
            <span v-if="isPostsLoading">
                {{ $t('home.fetchingPosts') }}
            </span>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia'

    import PostList from '@/components/posts/PostList.vue'
    import DefaultLayout from '@/layouts/DefaultLayout.vue'
    import { usePostStore } from '@/stores/post.store'

    const postStore = usePostStore()
    const { isPostsLoading } = storeToRefs(postStore)

    function fetchMorePosts() {
        postStore.fetchPosts()
    }
</script>
