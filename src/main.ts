import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import setupAntd from "@/plugins/antd";

import "./assets/main.css";

const app = createApp(App);
setupAntd(app);

app.use(createPinia());
app.use(router);

app.mount("#app");
