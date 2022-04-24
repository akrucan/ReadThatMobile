import {
    getFirestore,
    collection,
    getDocs,
    query,
    limit,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { useFirebaseStore } from "./firebase";
import { Post } from "../models/Post";

export const usePostsStore = defineStore("firestore", () => {
    const firebaseStore = useFirebaseStore();
    const db = getFirestore(firebaseStore.app);

    const postsCollection = collection(db, "Posts");

    async function getPosts() {
        const postsQuery = query(postsCollection, limit(10));
        const postsSnapshot = await getDocs(postsQuery);
        return postsSnapshot.docs.map(snapshot => new Post(snapshot.data()));
    }

    return {
        getPosts,
    };
});
