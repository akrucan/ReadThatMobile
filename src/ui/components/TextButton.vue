<script setup lang="ts">
    defineProps<{
        onClick: (() => void) | Promise<void>
    }>();
</script>

<template>
    <button type="submit" @click="onClick">
        <slot></slot>
    </button>
</template>

<style scoped lang="scss">
    button {
        font-size: 0.875rem;
        background-color: $primaryContainer;
        color: $onPrimaryContainer;
        border: none;
        width: fit-content;
        border-radius: 24px;
        font-weight: 500;
        padding: 0.5rem 1rem;

        &:hover {
            cursor: pointer;
        }
    }
</style>
