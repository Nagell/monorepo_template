import { createPinia } from 'pinia'
import { markRaw } from 'vue'
import { type Router } from 'vue-router'

import { helpers } from '@monorepo/commons'

import router from './../router'

export const pinia = createPinia()

// pinia plugin allowing to access the router from the store
pinia.use(({ store }) => {
    store.router = markRaw(router)
})
// pinia plugin allowing to use someStore.$reset() to reset the store written in the composition API syntax
pinia.use(helpers.resetPiniaStore)

declare module 'pinia' {
    export interface PiniaCustomProperties {
        router: Router
    }
}
