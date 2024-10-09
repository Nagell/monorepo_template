import { useI18nStore } from '@/stores/i18n.store'

import type { App } from 'vue'

export const i18nPlugin = {
    install(app: App) {
        const i18nStore = useI18nStore()
        if (i18nStore.i18n) {
            app.use(i18nStore.i18n)
        }
    },
}
