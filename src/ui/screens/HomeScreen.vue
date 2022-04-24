<script setup lang="ts">
</script>

<template>
    <router-link :to="{name: 'CreatePost'}">Type what you are thinking aboout…</router-link>
</template>

<style scoped lang="scss">
    a {
        background-color: $surfaceVariant;
        color: rgba($onSurfaceVariant, 0.7);
        border: none;
        border-radius: 24px;
        padding: 1rem;
        text-decoration: none;
        font-size: 0.8rem;

        &:hover {
            cursor: pointer;
        }
    }
</style>
