import { ref } from 'vue'

/**
 * Flattens a Tailwind object into a single level object
 * (creates a clone of the object for safety reasons in the process)
 * @param object Object             The object to flatten
 * @param prefix String (Optional)  The prefix to add before each key, also used for recursion
 *
 * @example
 * ```ts
 * const object = { size: { DEFAULT: '1', sm: '2', md: '3' } }
 * const { flattenedObject } = useFlattenTailwindObject(object)
 * // flattenedObject.value = { 'size': '1', 'size-sm': '2', 'size-md': '3' }
 * ```
 **/
export function useFlattenTailwindObject(object: Record<string, string>, prefix = '') {
    const clonedObject = structuredClone(object)
    const flattenedObject = ref({})

    flattenedObject.value = _flattenTailwindObject(clonedObject, prefix)

    /**
     * Recursively flattens a Tailwind object into a single level object
     * @param ob            Object             The object to flatten
     * @param startPrefix   String (Optional)  The prefix to add before each key, also used for recursion
     * @param result        Object (Optional)  The result object to append to
     **/
    function _flattenTailwindObject(ob: Record<string, string>, startPrefix = '', result?: any) {
        const localResult = result ?? {}
        const fixedPrefix = startPrefix ? startPrefix + '-' : ''

        // If the object has a default key, we add it to the result directly and remove it from the object
        if (Object.prototype.hasOwnProperty.call(ob, 'DEFAULT')) {
            localResult[startPrefix] = ob['DEFAULT']
            delete ob['DEFAULT']
        }

        for (const i in ob) {
            if (Object.prototype.hasOwnProperty.call(ob, i)) {
                // Only recurse on true objects and arrays, ignore custom classes like dates
                if (typeof ob[i] === 'object' && (Array.isArray(ob[i])
                    || Object.prototype.toString.call(ob[i]) === '[object Object]') && ob[i] !== null) {
                    _flattenTailwindObject(ob[i], fixedPrefix + i, localResult)
                }
                else {
                    localResult[fixedPrefix + i] = ob[i]
                }
            }
        }
        return localResult
    }

    return { flattenedObject }
}
