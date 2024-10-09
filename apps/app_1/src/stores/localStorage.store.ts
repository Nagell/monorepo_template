import { type RemovableRef, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import { useLogger } from '@monorepo/commons'

import {
    LANGUAGE,
    type LanguageValue
} from '../types/localStorage'

const logger = useLogger()

// localStorage keys
const LANGUAGE_KEY = 'language'

const defaultState = {
    [LANGUAGE_KEY]: null as LanguageValue | null
}

export const useLocalStorageStore = defineStore('localStorage', () => {
    const storage = <RemovableRef<typeof defaultState>>useStorage(
        'app_1',
        defaultState,
        localStorage,
        { mergeDefaults: true }
    )

    /**
     * LANGUAGE
     */
    function getLanguage() {
        const language = storage.value[LANGUAGE_KEY] as LanguageValue
        if (!language)
            logger.info(LANGUAGE_KEY, 'not set')

        return language
    }

    function getIsLanguageSupported(value: LanguageValue) {
        return Object.values(LANGUAGE).indexOf(value) !== -1
    }

    function setLanguage(language: LanguageValue) {
        storage.value[LANGUAGE_KEY] = language
        logger.info(LANGUAGE_KEY, 'set to:', language)
    }

    return {
        storage,
        getLanguage,
        getIsLanguageSupported,
        setLanguage,
    }
})
