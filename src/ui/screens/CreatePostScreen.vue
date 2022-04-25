<script setup lang="ts">
    import OutlinedTextButton from "../components/OutlinedTextButton.vue";
    import TextButton from "../components/TextButton.vue";
    import TextField from "../components/TextField.vue";
    import { reactive } from "vue";
    import { usePostsStore } from "../../stores/posts";
    import { useRouter } from "vue-router";

    const router = useRouter();
    const postStore = usePostsStore();

    const post = reactive({
        title: "",
        body: "",
    });

    async function createPost() {
        const title = post.title.trim();
        const body = post.body.trim();
        if (title.length == 0 || title.length > 100 || body.length == 0) return;

        const isSuccess = await postStore.createPost({ title, body });

        if (isSuccess) {
            await router.replace({ name: "Home" });
        }
    }

    function onCancel() {
        router.replace({ name: "Home" });
    }
</script>

<template>
    <h1>Create a new post</h1>

    <form action="#" @submit.prevent="createPost()">
        <TextField type="text" placeholder="Title" v-model:value="post.title" />
        <section id="post-body-container">
            <textarea
                placeholder="Type what you are thinking about…"
                v-model.trim="post.body"
            ></textarea>
            <div id="post-body-actions">
                <span class="material-icons">photo_camera</span>
                <span class="material-icons">map</span>
            </div>
        </section>
        <section id="button-row">
            <router-link
                id="save-draft-button"
                :to="{ name: 'Home', replace: true }"
            >
                Save as draft
            </router-link>
            <div style="flex-grow: 1"></div>
            <OutlinedTextButton @click="onCancel">Cancel</OutlinedTextButton>
            <TextButton>Post</TextButton>
        </section>
    </form>
</template>

<style scoped lang="scss">
    h1 {
        padding: 0 1rem;
        font-size: 1.5rem;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 3rem 1rem;
    }

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

    #post-body-container {
        background-color: $surfaceVariant;
        border-radius: 18px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        gap: 0.9rem
    }

    #post-body-actions {
        box-shadow: 0 0 5px 5px rgba(black, 0.1);
        border-radius: inherit;
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.4rem 1rem;
    }

    #button-row {
        display: flex;
        width: 100%;
        padding: 0 1rem;
        gap: 0.5rem;
        align-items: center;
    }

    #save-draft-button {
        color: #9ec6eb;
    }
</style>
