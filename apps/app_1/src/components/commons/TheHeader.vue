<template>
    <header class="bg-white h-20">
        <div class="max-w-screen-xl m-auto p-4 text-lg flex items-center justify-between gap-4">
            <nav class="flex items-center justify-start gap-4">
                <RouterLink to="/">
                    {{ $t('menu.home') }}
                </RouterLink>
                <RouterLink to="/about">
                    {{ $t('menu.404') }}
                </RouterLink>
            </nav>
            <LanguageSwitcher />
        </div>
    </header>
</template>

<script setup lang="ts">
    import LanguageSwitcher from './LanguageSwitcher.vue'
</script>
