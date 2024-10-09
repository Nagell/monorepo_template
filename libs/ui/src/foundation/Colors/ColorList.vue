<template>
    <div class="colors">
        <div
            v-for="(group, groupName) of sortedColors"
            :key="groupName"
            class="colors__group"
        >
            <div
                v-for="(color, colorKey) of group"
                :key="colorKey"
            >
                <Color
                    :key="colorKey"
                    :name="color.name"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { type SetupContext, computed, onMounted, onUpdated, toRaw, useAttrs } from 'vue'

    import Color from './ColorItem.vue'
    import { useTailwindColors } from './useTailwindColors'
    import { useConvertColor } from '../../composables/useConvertColor'

    const attrs = useAttrs()

    const { COLOR_GROUPS_TO_SHOW, FILTERED_COLORS } = useTailwindColors()

    /* =================
     * Prepare colors for rendering
     */
    type ColorObject = {
        value: unknown
        name: string
    }
    const sortedColors = computed(() => {
        const colors = attrs
        const colorGroupsToShow = COLOR_GROUPS_TO_SHOW

        const tmpColors: Record<string, ColorObject[]> = {}

        for (const [ colorGroup, colorGroupKey ] of Object.entries(toRaw(colorGroupsToShow))) {
            for (const [ color, colorKey ] of Object.entries(toRaw(colors))) {
                if (color.startsWith(colorGroupKey)) {
                    if (!tmpColors[colorGroupKey]) {
                        tmpColors[colorGroupKey] = []
                    }

                    tmpColors[colorGroupKey].push({
                        value: colorKey,
                        name: color,
                    })
                }
            }
        }

        return tmpColors
    })

    onUpdated(() => {
        init()
    })
    onMounted(() => {
        init()
    })

    function init() {
        const changedColors = _getChangedColors(attrs, FILTERED_COLORS)
        const parsedColors = _parseColors(changedColors)
        const cssVariables = _getCSSVariables(parsedColors)
        _removeBodyInlineStyles()
        _setBodyColors(cssVariables)
    }
    /* =================
     * Helpers
     */
    type ColorData = Record<string, any>
    type ColorDataInput = ColorData | SetupContext['attrs']

    /**
     * Compare what changed in comparison to the old colors
     */
    function _getChangedColors(newColors: ColorDataInput, oldColors: ColorDataInput) {
        const changedColors: ColorData = {}

        for (const [ key, value ] of Object.entries(newColors)) {
            if (oldColors[key] !== newColors[key]) {
                changedColors[key] = value
            }
        }

        return changedColors
    }

    type ColorVariable = {
        key: string
        value: string
    }
    /**
     * Parse colors to RGB
     */
    function _parseColors(colors: Record<string, string>) {
        const parsedColors: Record<string, string> = {}

        for (const [ key, value ] of Object.entries(colors)) {
            const { parsedColor } = useConvertColor(value)

            if (!parsedColor.value) continue
            parsedColors[key] = `${parsedColor.value.r} ${parsedColor.value.g} ${parsedColor.value.b}`
        }

        return parsedColors
    }
    /**
     * Convert colors to CSS variables
     *
     * Important: CSS variables have to be exactly as the structure in the Tailwind config<br>
     * Example: `--primary` for `primary.DEFAULT` color. Otherwise, it won't work
     */
    function _getCSSVariables(colors: Record<string, string>) {
        return Object.entries(colors).map(([ key, value ]) => {
            return {
                key: `--${key}`,
                value,
            } as ColorVariable
        })
    }
    /**
     * Remove inline styles from the body
     */
    function _removeBodyInlineStyles() {
        document.body.removeAttribute('style')
    }
    /**
     * Set colors to the body
     */
    function _setBodyColors(colors: ColorVariable[]) {
        for (const { key, value } of colors) {
            document.body.style.setProperty(key, value)
        }
    }
</script>

<style scoped>

.colors {
    display: grid;
    grid-template-columns: repeat(20, 1fr);
    grid-template-rows: auto;
    width: min-content;
    height: min-content;
    gap: 0.5rem;
    margin: 1rem;
}

.colors__group {
    display: grid;
    grid-template-columns: subgrid;
    gap: 0.5rem;
    grid-column: 1 / -1;

    &:empty {
        display: none;
    }
}
</style>
