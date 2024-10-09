<template>
    <DefaultLayout>
        <div class="col-span-12 h-[70vh] flex flex-col items-center justify-center">
            <h1 class="text-6xl text-center">
                {{ $t('home.title') }}
            </h1>
            <hr class="w-10 mt-4 mb-2">
            <h2 class="text-2xl text-center">
                {{ $t('home.subtitle') }}
            </h2>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
    import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>
