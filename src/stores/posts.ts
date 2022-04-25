import { NewPost, Post } from "../model/Post";
import {
    addDoc,
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    Timestamp,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { useFirebaseStore } from "./firebase";
import { useUserStore } from "./user";
import { PostEntity } from "../firebase/entities";

export const usePostsStore = defineStore("firestore", () => {
    const firebaseStore = useFirebaseStore();
    const userStore = useUserStore();
    const db = firebaseStore.db;

    const postsCollection = collection(db, "posts");

    async function createPost(post: NewPost): Promise<boolean> {
        const user = userStore.userProfile;
        if (user === null) return false;

        try {
            await addDoc(postsCollection, {
                uid: user.uid,
                title: post.title,
                body: post.body,
                timestamp: Timestamp.now(),
            } as PostEntity);

            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async function getPosts(): Promise<Post[]> {
        const postsQuery = query(
            postsCollection,
            limit(10),
            orderBy("timestamp", "desc")
        );
        const postsSnapshot = await getDocs(postsQuery);

        return Promise.all(
            postsSnapshot.docs.map(async postSnapshot => {
                const data = postSnapshot.data() as PostEntity;
                const user = (await userStore.getUser(data.uid))!!;

                return {
                    author: user,
                    title: data.title,
                    body: data.body,
                    date: new Date(data.timestamp.seconds * 1000),
                } as Post;
            })
        );
    }

    return {
        createPost,
        getPosts,
    };
});
