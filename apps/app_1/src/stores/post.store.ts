import { defineStore } from 'pinia'
import { ref } from 'vue'

import { API } from '@/services'
import { type Post } from '@/types/post'

export const usePostStore = defineStore('post', () => {
    const posts = ref<Post[]>([])
    const isPostsLoading = ref<boolean>(false)

    const POST_PULL_LIMIT = 5

    function fetchPosts(page?: number, limit: number = POST_PULL_LIMIT) {
        // If fetching posts is ongoing, don't fetch anymore
        if (isPostsLoading.value) return

        // If page not provided, calculate the page number from the amount of posts we have
        // +1 because API treats page 1 and page 0 as the same (first page)
        const currentPage = page || Math.floor(posts.value.length / limit) + 1
        const { data, isLoading, then } = API.posts.getPosts(currentPage, limit)

        isPostsLoading.value = isLoading.value

        then(() => {
            if (data.value) posts.value.push(...data.value)
            isPostsLoading.value = isLoading.value
        })
    }

    return {
        isPostsLoading,
        posts,
        fetchPosts
    }
})
