<script setup lang="ts">
    import { useRegisterSW } from "virtual:pwa-register/vue";
    import { useUserStore } from "../stores/user";
    import { useRouter } from "vue-router";
    import { watch } from "vue";
    import BottomNavigation from "./components/BottomNavigation.vue";

    useRegisterSW();

    const router = useRouter();
    const userStore = useUserStore();

    watch(
        () => userStore.isUserSignedIn,
        (isSignedIn) => {
            if (!isSignedIn) {
                router.replace({ name: "SignIn" });
            }
        },
    );
</script>

<template>
    <div id="app-container" v-if="userStore.isUserSignedIn !== null">
        <header>
            <img src="/favicon.ico" alt="" />
            <h1>ReadThat</h1>
        </header>
        <div id="screen">
            <router-view />
        </div>
        <BottomNavigation v-if="userStore.isUserSignedIn === true" />
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

    #app-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        > header {
            display: flex;
            gap: 0.5rem;
            padding: 0.5rem 1rem;

            > h1 {
                font-size: 1rem;
                letter-spacing: 2px;
            }

            > img {
                width: 25px;
            }
        }

        > #screen {
            flex-grow: 1;
            padding: 1rem 8%;
            display: flex;
            flex-direction: column;
        }
    }
</style>
