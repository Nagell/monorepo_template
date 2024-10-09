import cloneDeep from 'lodash.clonedeep'
import { type Store } from 'pinia'

type ResetPayload = {
    store: Store
}
/**
 * Pinia plugin allowing to use someStore.$reset() to reset the store written in the composition API syntax
*/
export default function resetStore({ store }: ResetPayload) {
    const initialState = cloneDeep(store.$state)
    store.$reset = () => store.$patch(cloneDeep(initialState))
}
