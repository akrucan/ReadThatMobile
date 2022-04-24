<script setup lang="ts">
    import { reactive, toRaw } from "vue";
    import { AuthProvider, useUserStore } from "../../stores/user";
    import { useRouter } from "vue-router";
    import TextField from "../components/TextField.vue";
    import TextButton from "../components/TextButton.vue";

    const router = useRouter();
    const userStore = useUserStore();

    const credentials = reactive({
        email: "",
        password: "",
    });

    function onSignIn() {
        console.log(toRaw(credentials));
    }

    async function onSignInWithProvider(provider: AuthProvider) {
        const isSuccess = await userStore.signInWithProvider(provider);
        if (isSuccess) {
            await router.replace({ name: "Home" });
        }
    }
</script>

<template>
    <h1>Enter your credentials to sign in</h1>

    <section id="signin-form">
        <div>
            <form action="#" @submit.prevent="onSignIn">
                <label for="email">Email</label>
                <TextField
                    id="email"
                    type="email"
                    v-model:value="credentials.email"
                />

                <label for="password">Password</label>
                <TextField
                    id="password"
                    type="password"
                    v-model:value="credentials.password"
                />

                <TextButton id="signin-button">Sign In</TextButton>
            </form>

            <p id="signup-text">
                Don't have an account?
                <router-link
                    id="signup-link"
                    :to="{ name: 'SignUp', replace: true }"
                >
                    Sign Up
                </router-link>
            </p>
        </div>
    </section>

    <section id="alternative-signup-methods">
        <TextButton @click="onSignInWithProvider('google')"
            >Sign in with Google</TextButton
        >
        <TextButton @click="onSignInWithProvider('github')"
            >Sign in with GitHub</TextButton
        >
    </section>
</template>

<style scoped lang="scss">
    * {
        font-size: 1.125rem;
    }

    h1 {
        font-size: 1.5rem;
        letter-spacing: 1px;
        font-weight: 400;
    }

    #signin-form {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    form {
        display: flex;
        flex-direction: column;

        > input:not(:last-of-type) {
            margin-bottom: 2rem;
        }

        > button {
            margin: 1.5rem 0 2rem 0;
        }
    }

    label {
        margin-bottom: 0.5rem;
    }

    #signin-button {
        align-self: flex-end;
    }

    #signup-text {
        font-weight: 500;
        text-align: center;
    }

    #signup-link {
        color: $primary;
    }

    #alternative-signup-methods {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin-bottom: 3rem;

        button {
            background-color: $secondaryContainer;
            color: $onSecondaryContainer;
        }
    }
</style>
