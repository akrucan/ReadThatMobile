import {createApp, defineAsyncComponent} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: defineAsyncComponent(() => import("./components/HelloWorld.vue"))
        }
    ]
})

createApp(App).use(router).mount('#app')
