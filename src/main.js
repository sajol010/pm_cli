import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";



import "./assets/main.css";

import axios from "axios";

const app = createApp(App);

app.use(createPinia());
app.use(router);

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || '';
import {useUserStore} from "@/stores/user";
let user = useUserStore()
if (user?.userInfo?.token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.userInfo.token}`;

app.mount("#app");
