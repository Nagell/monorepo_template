<template>
    <div class="flex gap-2 items-center">
        <button
            size="small"
            @click="changeLocale('en')"
        >
            English
        </button>
        <button
            size="small"
            @click="changeLocale('de')"
        >
            Deutsch
        </button>
    </div>
</template>

<script setup lang="ts">
    import { useI18nStore } from '@/stores/i18n.store'

    import type { LanguageValue } from '@/types/localStorage'

    const i18nStore = useI18nStore()

    const changeLocale = (language: LanguageValue) => {
        i18nStore.setLanguage(language)
    }
</script>
