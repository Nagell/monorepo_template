// stores/i18n.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createI18n } from 'vue-i18n'

import { useLocalStorageStore } from '@/stores/localStorage.store'

import type { LanguageValue } from '@/types/localStorage'

export const useI18nStore = defineStore('i18n', () => {
    const i18n = ref(null) as any
    const isReady = ref(false)

    const localStorageStore = useLocalStorageStore()
    /**
     * Initializes the i18n instance.
     */
    async function initializeI18n() {
        const expectedLanguage = _fetchLanguage()
        _storeLanguage(expectedLanguage)

        i18n.value = createI18n({
            legacy: false,
            locale: expectedLanguage,
            fallbackLocale: 'en',
            globalInjection: true,
        })

        // Shows translation key if the web address contains ?showTranslationKeys at any point
        if (window.location.search.includes('showTranslationKeys')) return

        await _loadLocaleMessages(expectedLanguage)
        _setDocumentLangAttribute(expectedLanguage)
        isReady.value = true
    }
    /**
     * Loads the locale messages for a given language and switching to it.
     */
    async function setLanguage(lang: LanguageValue) {
        if (!i18n.value) return

        await _loadLocaleMessages(lang)

        i18n.value.global.locale = lang
        localStorageStore.setLanguage(lang as LanguageValue)
        _setDocumentLangAttribute(lang)
    }

    /**
     * Returns the expected language based on the one stored in the local storage or the browser language.
     */
    function _fetchLanguage() {
        let language: LanguageValue = localStorageStore.getLanguage()

        if (!language) {
            language = navigator.language.split('-')[0] as LanguageValue
        }
        if (!localStorageStore.getIsLanguageSupported(language)) {
            language = 'en'
        }

        return language
    }
    /**
     * Stores the expected language in the local storage.
     */
    function _storeLanguage(lang: string) {
        localStorageStore.setLanguage(lang as LanguageValue)
    }
    /**
     * Loads asynchronously the locale messages for a given language.
     */
    async function _loadLocaleMessages(lang: string) {
        const messages = await import(`./../locales/${lang}.json`)
        i18n.value?.global.setLocaleMessage(lang, messages.default)
    }
    /**
     * Sets the lang attribute of the document.
     */
    function _setDocumentLangAttribute(lang: string) {
        document.querySelector('html')?.setAttribute('lang', lang)
    }

    return {
        i18n,
        isReady,
        initializeI18n,
        setLanguage,
    }
})
