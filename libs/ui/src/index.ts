// components
import ButtonItem from './atoms/ButtonItem.vue'

import type { App } from 'vue'

export const install = (app: App) => {
    // components
    app.component('ButtonItem', ButtonItem)
}

export {
    // components
    ButtonItem,
}
