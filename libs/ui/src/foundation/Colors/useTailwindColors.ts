import resolveConfig from 'tailwindcss/resolveConfig'
import { toRaw, toValue } from 'vue'

import tailwindConfig from 'tailwind-config'

import { useFlattenTailwindObject } from './../../composables/useFlattenTailwindObject'

import type { Config } from 'tailwindcss/types/config'

/**
* Add new color groups to show here
* Remember to add them to the tailwind.config.js file to the safelist pattern
*/
const COLOR_GROUPS_TO_SHOW = [ 'primary', 'secondary', 'surface', 'white' ]

export function useTailwindColors() {
    const { colors } = resolveConfig(tailwindConfig).theme
    const TAILWIND_COLORS = colors as Config['colors']

    const FILTERED_COLORS_GROUPS = Object.keys(TAILWIND_COLORS)
        .reduce((acc, key) => {
            if (COLOR_GROUPS_TO_SHOW.includes(key)) {
                acc[key] = TAILWIND_COLORS[key as keyof Config['colors']]
            }
            return acc
        }, {} as Record<string, any>)

    const { flattenedObject } = useFlattenTailwindObject(FILTERED_COLORS_GROUPS)

    const FILTERED_COLORS = toRaw(toValue(flattenedObject)) as Record<string, any>

    return { FILTERED_COLORS, FILTERED_COLORS_GROUPS, COLOR_GROUPS_TO_SHOW }
}
