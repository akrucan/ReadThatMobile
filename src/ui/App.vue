<script setup lang="ts">
    // This starter template is using Vue 3 <script setup> SFCs
    // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
    import HelloWorld from "./components/HelloWorld.vue";
    import { useRegisterSW } from "virtual:pwa-register/vue";

    useRegisterSW();
</script>

<template>
    <div id="screen">
        <router-view />
    </div>
</template>

<style lang="scss">
    #app {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        height: 100vh;
        background-color: $surface;
    }

    * {
        color: $onSurface;
    }

    #screen {
        padding: 5% 8%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>
