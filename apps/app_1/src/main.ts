import { createApp } from 'vue'

import { i18nPlugin } from '@/plugins/i18n'
import { useI18nStore } from '@/stores/i18n.store'
import { pinia } from '@/stores/pinia'

import App from './App.vue'
import router from './router'

import './assets/styles/index.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

const i18nStore = useI18nStore()
i18nStore.initializeI18n().then(() => {
    app.use(i18nPlugin)
    app.mount('#app')
})
