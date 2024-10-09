// the axios instance and types
import { useHttpClient /* ContentType */ } from '@monorepo/commons'

import type { Post } from '@/types/post'

type GetCandidatesResponse = Post[]

const mockUrl = import.meta.env.VITE_APP_MOCK_API_URL

function getPosts(page = 1, limit = 10) {
    return useHttpClient<GetCandidatesResponse>({
        config: {
            params: {
                _page: page,
                _limit: limit,
            },
        },
        path: mockUrl + '/posts'
    })
}

export default {
    getPosts,
}
