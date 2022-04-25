import App from "./ui/App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: { name: "Home", replace: true },
        },
        {
            path: "/home",
            name: "Home",
            component: () => import("./ui/screens/HomeScreen.vue"),
        },
        {
            path: "/search",
            name: "Search",
            component: () => import("./ui/screens/SearchScreen.vue"),
        },
        {
            path: "/profile",
            name: "Profile",
            component: () => import("./ui/screens/ProfileScreen.vue"),
        },
        {
            path: "/signin",
            name: "SignIn",
            component: () => import("./ui/screens/SignInScreen.vue"),
        },
        {
            path: "/signup",
            name: "SignUp",
            component: () => import("./ui/screens/SignUpScreen.vue"),
        },
        {
            path: "/createpost",
            name: "CreatePost",
            component: () => import("./ui/screens/CreatePostScreen.vue"),
        },
    ],
});

createApp(App).use(router).use(createPinia()).mount("#app");
