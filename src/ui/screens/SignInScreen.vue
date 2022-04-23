<script setup lang="ts">
    import { reactive } from "vue";
    import TextButton from "../components/TextButton.vue";

    const credentials = reactive({
        email: "",
        password: "",
    });

    function onClick() {
        console.log("abc");
    }
</script>

<template>
    <h1>Enter your credentials to sign in</h1>

    <section id="signin-form">
        <div>
            <form action="#">
                    <label for="email">Email</label>
                    <input id="email" type="text" v-model.trim="credentials.email" />

                    <label for="password">Password</label>
                    <input id="password" type="password" v-model="credentials.password" />

                <TextButton id="signin-button" :onClick="onClick">Sign In</TextButton>
            </form>

            <p id="signup-text">Don't have an account?
                <router-link id="signup-link" to="/signup">Sign Up</router-link>
            </p>
        </div>
    </section>

    <section id="alternative-signup-methods">
        <TextButton>Sign in with Google</TextButton>
        <TextButton>Sign in with GitHub</TextButton>
        <TextButton>Sign in with Facebook</TextButton>
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
        flex-grow: 500;
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

    input {
        border-radius: 12px;
        border: none;
        padding: 0.8rem 1rem;
        background-color: $surfaceVariant;
    }

    input:focus {
        outline: $primary 1px solid;
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

        button {
            background-color: $secondaryContainer;
            color: $onSecondaryContainer;
        }
    }
</style>
