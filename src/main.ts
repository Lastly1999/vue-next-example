import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import setupElementPlus from "@/plugins/element-plus";

import "./assets/main.css";

const app = createApp(App);
setupElementPlus();

app.use(createPinia());
app.use(router);

app.mount("#app");
