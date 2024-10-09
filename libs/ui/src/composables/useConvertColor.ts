import { type MaybeRefOrGetter, ref, toValue } from 'vue'

type ParsedColor = { r: number, g: number, b: number, a: number }

export function useConvertColor(color: MaybeRefOrGetter<string>) {
    const colorValue = toValue(color)
    const parsedColor = ref<ParsedColor | null>()

    function parseColor(color: string) {
        const hexColor = extractColorFromHex(color)
        const rgbaColor = extractColorFromRgba(color)
        const hslColor = extractColorFromHsla(color)

        return hexColor || rgbaColor || hslColor
    }

    parsedColor.value = parseColor(colorValue)

    /* =================
     * Color operations
     */

    /**
     * Extracts color from hex string
     * @param color - Format: #00ffe1 or 00ffe1 (optionally with alpha channel: #00ffe1ff or 00ffe1ff)
     * @returns { r: number, g: number, b: number, a: number }
     */
    function extractColorFromHex(color: string) {
        const HEXCOLOR_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i
        if (HEXCOLOR_REGEX.test(color)) {
            const result = HEXCOLOR_REGEX.exec(color)

            return result
                ? {
                    r: parseInt(result[1] ?? '', 16),
                    g: parseInt(result[2] ?? '', 16),
                    b: parseInt(result[3] ?? '', 16),
                    a: parseInt(result[4] ?? '', 16) / 255 || 1,
                }
                : null
        }
        return null
    }

    /**
     * Extracts color from rgb(a) string
     * @param color - Format: rgba(0, 255, 225, 1) or rgb(0, 255, 225)
     * @returns { r: number, g: number, b: number, a: number }
     */
    function extractColorFromRgba(color: string) {
        const RGBA_REGEX = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
        if (RGBA_REGEX.test(color)) {
            const result = RGBA_REGEX.exec(color)

            return result
                ? {
                    r: parseInt(result[1] ?? '', 10),
                    g: parseInt(result[2] ?? '', 10),
                    b: parseInt(result[3] ?? '', 10),
                    a: parseFloat(result[4] ?? ''),
                }
                : null
        }
        return null
    }

    /**
     * Extracts color from hsla string
     * @param color - Format: hsla(173, 100%, 50%, 1)
     * @returns { r: number, g: number, b: number, a: number }
     */
    function extractColorFromHsla(color: string) {
        const HSL_REGEX = /^hsla?\((\d+),\s*(\d+)%,\s*(\d+)%,\s*(\d+(?:\.\d+)?)\)$/
        if (HSL_REGEX.test(color)) {
            const result = HSL_REGEX.exec(color)

            return result
                ? _hslaToRgba(
                    parseInt(result[1] ?? '', 10),
                    parseInt(result[2] ?? '', 10),
                    parseInt(result[3] ?? '', 10),
                    parseFloat(result[4] ?? ''),
                )
                : null
        }
        return null
    }

    /**
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   Number  h       hue
     * @param   Number  s       saturation
     * @param   Number  l       lightness
     * @return  Array           RGB representation
     * @author mjackson
     * @link https://gist.github.com/mjackson/5311256
     */
    function _hslToRgb(h: number, s: number, l: number) {
        let r, g, b

        function hue2rgb(p: number, q: number, t: number) {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1 / 6) return p + (q - p) * 6 * t
            if (t < 1 / 2) return q
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
            return p
        }

        if (s == 0) {
            r = g = b = l // achromatic
        }
        else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s
            const p = 2 * l - q

            r = hue2rgb(p, q, h + 1 / 3)
            g = hue2rgb(p, q, h)
            b = hue2rgb(p, q, h - 1 / 3)
        }

        return { r: r * 255, g: g * 255, b: b * 255 }
    }

    /**
     * Converts an HSLA color value to RGBA.
     * Assumes h, s, and l are contained in the set [0, 360], [0, 100], [0, 100]
     * and a in the set [0, 1] and returns r, g, and b in the set [0, 255].
     *
     * @param   Number  h       hue
     * @param   Number  s       saturation
     * @param   Number  l       lightness
     * @param   Number  a       alpha
     * @return  Object          RGBA representation
     */
    function _hslaToRgba(h: number, s: number, l: number, a: number) {
        const { r, g, b } = _hslToRgb(h / 360, s / 100, l / 100)

        return { r, g, b, a }
    }

    return { parsedColor }
}
