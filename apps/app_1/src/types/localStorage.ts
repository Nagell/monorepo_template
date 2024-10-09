// localStorage values
export const LANGUAGE = {
    DE: 'de',
    EN: 'en'
} as const

// Types

export type Language = keyof typeof LANGUAGE
export type LanguageValue = ObjectValues<typeof LANGUAGE>
