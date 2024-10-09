<template>
    <DefaultLayout>
        <div class="h-[70vh] flex flex-col items-center justify-center">
            <h1 class="text-6xl text-center">
                {{ $t('404.title') }}
            </h1>
            <hr class="w-10 mt-4 mb-2">
            <h2 class="text-2xl text-center">
                {{ $t('404.subtitle') }}
            </h2>
            <p>{{ $t('404.description') }}</p>
        </div>
    </DefaultLayout>
</template>
<script setup lang="ts">
    import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>
