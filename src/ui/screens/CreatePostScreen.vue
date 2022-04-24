<script setup lang="ts">
    import { reactive } from "vue";
    import TextButton from "../components/TextButton.vue";
    import OutlinedTextButton from "../components/OutlinedTextButton.vue";
    import { useRouter } from "vue-router";

    const router = useRouter();

    const post = reactive({
        body: "",
    });

    function onCancel() {
        router.replace({ name: "Home" });
    }
</script>

<template>
    <h1>Create a new post</h1>
    <section id="signup-form">
        <div>
            <form action="#" @submit.prevent="">
                <section class="post-body">
                    <textarea
                        placeholder="Type what you are thinking aboout…"
                        id="post-body"
                        type="text"
                        v-model="post.body"
                    ></textarea>
                    <div class="post-body-actions">
                        <span class="material-icons">photo_camera</span>
                        <span class="material-icons">map</span>
                    </div>
                </section>
                <section class="button-row">
                    <router-link
                        id="save-draft-button"
                        :to="{ name: 'Home', replace: true }"
                    >
                        Save as draft
                    </router-link>
                    <div style="flex-grow: 1"></div>
                    <OutlinedTextButton @click="onCancel"
                        >Cancel</OutlinedTextButton
                    >
                    <TextButton id="signup-button">Sign Up</TextButton>
                </section>
            </form>
        </div>
    </section>
</template>

<style scoped lang="scss">
    textarea {
        background-color: transparent;
        border: none;
        width: 100%;
        height: 20rem;
        resize: none;
        padding: 0.7rem;
        
        &:focus {
            outline: none;
        }
    }

    form {
        border: none;
    }

    .button-row {
        display: flex;
        width: 100%;
        padding: 1rem;
        gap: 0.5rem;
        align-items: center;
    }

    .post-body {
        background-color: $surfaceVariant;
        border-radius: 18px;
        display: flex;
        flex-direction: column;
    }

    .post-body-actions {
        background-color: lighten($surfaceVariant, 20%);
        border-radius: inherit;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        padding: 0.6rem 1rem;
        gap: 1rem;
    }

    .material-icons {
        font-size: 30px;
    }

    #save-draft-button {
        color: #9ec6eb;
    }
</style>
