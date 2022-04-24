import { defineStore } from "pinia";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/config";

export const useFirebaseStore = defineStore("firebase", {
    state: () => ({
        app: initializeApp(firebaseConfig),
    }),
});
