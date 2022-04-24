<script setup lang="ts">
    import { usePostsStore } from "../../stores/posts";
    import { reactive } from "vue";

    const postsStore = usePostsStore();
    const state: { posts: Array<any> } = reactive({
        posts: [],
    });
    postsStore.getPosts().then(posts => (state.posts = posts));
</script>

<template>
    <router-link :to="{ name: 'CreatePost' }"
        >Type what you are thinking about…</router-link
    >
    <main id="posts">
        <section class="post" v-for="post in state.posts">
            <div class="post-metadata">
                <p>{{ post.user }}</p>
                <p>{{ post.date.toLocaleString() }}</p>
            </div>
            <div class="post-body">
                <p>{{ post.body }}</p>
            </div>
        </section>
    </main>
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

    #posts {
        overflow-y: auto;
    }

    .post {
        display: flex;
        flex-direction: column;
    }
    .post-metadata {
        display: flex;
        justify-content: space-between;
    }
    .post-body > p {
        -webkit-line-clamp: 5;
        line-clamp: 5;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        display: -webkit-box;
    }
</style>
