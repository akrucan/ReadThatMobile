<script setup lang="ts">
    import { getAuth, User } from "firebase/auth";

    const auth = getAuth();
    const user = auth.currentUser;

    function signOutHandler() {
        auth.signOut().then(() => {});
    }
</script>

<template>
    <section class="profile-header">
        <img :src="`${user?.photoURL}`" /><br />
        <span>{{ user?.displayName }}</span
        ><br />
        <span>{{ user?.email }}</span
        ><br />
        <button @click="signOutHandler">sign out</button>
    </section>
</template>

<style scoped lang="scss">
    .profile-header {
        background-color: $surfaceVariant;
        border: none;
        border-radius: 18px;
        padding: 1rem;
        text-align: center;

        > img {
            min-width: 64px;
            max-width: 64px;
            min-height: 64px;
            max-height: 64px;
            border-radius: 50%;
            display: inline-block;
        }

        > button {
            background-color: $surfaceVariant;
            box-shadow: 0 0 5px 5px rgba(black, 0.1);
            border-radius: inherit;
            align-items: center;
            gap: 1rem;
            padding: 0.4rem 1rem;
            margin-top: 0.5rem;
    }
    }

</style>
