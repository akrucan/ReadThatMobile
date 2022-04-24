import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import App from "./ui/App.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("./ui/screens/HomeScreen.vue"),
        },
        {
            path: "/signin",
            name: "SignIn",
            component: () => import("./ui/screens/SignInScreen.vue"),
        },
        {
            path: "/signup",
            name: "SignUp",
            component: () => import("./ui/screens/SignUpScreen.vue")
        },
                {
            path: "/createpost",
            name: "CreatePost",
            component: () => import("./ui/screens/CreatePostScreen.vue")
        }
    ],
});

createApp(App)
    .use(router)
    .use(createPinia())
    .mount("#app");
