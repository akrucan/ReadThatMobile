<script setup lang="ts">
    import { useRouter } from "vue-router";
    import { useUserStore } from "../../stores/user";

    const router = useRouter();
    const userStore = useUserStore();

    const userProfile = userStore.userProfile!!;
</script>

<template>
    <nav>
        <button>
            <span class="material-icons">forum</span>
            <span>Feed</span>
        </button>
        <button>
            <span class="material-icons">search</span>
            <span>Search</span>
        </button>
        <button>
            <span class="material-icons">account_circle</span>
            <span>Profile</span>
        </button>
    </nav>
</template>

<style scoped lang="scss">
    nav {
        width: 100%;
        padding: 0.5rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        z-index: 1;
        box-shadow: 0 0 5px 1px rgba(black, 0.1);
    }

    button {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.3rem;
        border: none;
        background-color: transparent;
        font-size: 0.7rem;

        &:hover {
            cursor: pointer;
        }

        .material-icons {
            font-size: 22px;
        }
    }
</style>
