import { NewPost, Post } from "../model/Post";
import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    runTransaction,
    updateDoc,
    Timestamp,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { useFirebaseStore } from "./firebase";
import { useUserStore } from "./user";
import { PostEntity } from "../firebase/entities";
import { User } from "../model/User";

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
                likes: [],
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
        const postsQuerySnapshot = await getDocs(postsQuery);

        return Promise.all(
            postsQuerySnapshot.docs.map(postsSnapshot =>
                runTransaction(db, async tx => {
                    const postSnapshot = await tx.get(postsSnapshot.ref);
                    const post = postSnapshot.data() as PostEntity;
                    const user = await tx
                        .get(doc(db, "users", post.uid))
                        .then(userSnapshot => userSnapshot.data() as User);
                    return {
                        id: postSnapshot.id,
                        author: user,
                        title: post.title,
                        body: post.body,
                        date: new Date(post.timestamp.seconds * 1000),
                        likeAmount: post.likes.length,
                        didUserLike: post.likes.includes(
                            userStore.userProfile!!.uid
                        ),
                    } as Post;
                })
            )
        );
    }

    async function likePost(postID: string): Promise<boolean> {
        const postRef = doc(db, "posts", postID);
        const likes = arrayUnion(userStore.userProfile!!.uid);
        try {
            await updateDoc(postRef, "likes", likes);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async function dislikePost(postID: string): Promise<boolean> {
        const postRef = doc(db, "posts", postID);
        const likes = arrayRemove(userStore.userProfile!!.uid);
        try {
            await updateDoc(postRef, "likes", likes);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    return {
        createPost,
        getPosts,
        likePost,
        dislikePost,
    };
});
