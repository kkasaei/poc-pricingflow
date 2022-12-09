import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App.vue";
import Widgets from './components/WidgetsComponent.vue'
import Editor from "./components/EditorComponent.vue";
import New from './components/NewWidgetComponent.vue';

const routes = [
  { path: "/", component: Widgets, name: 'home' },
  { path: "/edit/:id", component: Editor, name: 'edit' },
  { path: "/new", component: New, name: 'new' },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});


const app = createApp(App)
app.use(VueAxios, axios);
app.use(router);
app.mount('#app')
