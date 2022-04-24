import { defineStore } from "pinia";
import { Ref, ref, watch } from "vue";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithPopup,
    UserInfo,
    GithubAuthProvider,
    GoogleAuthProvider,
} from "firebase/auth";
import { useFirebaseStore } from "./firebase";

export type AuthProvider = "google" | "github";

export const useUserStore = defineStore("user", () => {
    const firebaseStore = useFirebaseStore();
    const auth = getAuth(firebaseStore.app);

    const isUserSignedIn: Ref<boolean | null> = ref(null);
    const userProfile: Ref<UserInfo | null> = ref(null);
    auth.onAuthStateChanged(user => {
        isUserSignedIn.value = !!user;
        userProfile.value = user;
    });

    watch(
        () => auth.currentUser,
        user => {
            console.log(user);
        }
    );

    async function signUpWithEmail(
        email: string,
        nickname: string,
        password: string
    ): Promise<boolean> {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            ).then(cred => cred.user);

            await updateProfile(user, { displayName: nickname });
        } catch (e) {
            console.log(e);
            return false;
        }

        return true;
    }

    async function signInWithProvider(
        provider: AuthProvider
    ): Promise<boolean> {
        let _provider: GithubAuthProvider | GoogleAuthProvider;
        switch (provider) {
            case "github":
                _provider = new GithubAuthProvider();
                break;
            case "google":
                _provider = new GoogleAuthProvider();
                break;
        }

        try {
            await signInWithPopup(auth, _provider);
        } catch (e) {
            console.log(e);
            return false;
        }

        return true;
    }

    return {
        isUserSignedIn,
        signUpWithEmail,
        signInWithProvider,
        userProfile,
    };
});
