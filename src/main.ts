import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import App from "./ui/App.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: () => import("./ui/components/HelloWorld.vue"),
        },
        {
            path: "/login",
            component: () => import("./ui/screens/SignInScreen.vue"),
        },
    ],
});

createApp(App)
    .use(router)
    .use(createPinia())
    .mount("#app");
