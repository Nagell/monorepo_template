import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const DefaultPage = () => import('@/pages/DefaultPage.vue')
const NotFoundPage = () => import('@/pages/NotFoundPage.vue')

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: DefaultPage,
    },
    {
        path: '/404',
        name: 'PageNotFound',
        component: NotFoundPage,
    },
    // 404 catch
    {
        path: '/:catchAll(.*)*',
        redirect: { name: 'PageNotFound' },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        // always scroll to top
        return { top: 0 }
    },
})

export default router
