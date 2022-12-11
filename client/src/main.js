import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App.vue";
import Widgets from './components/WidgetsComponent.vue'
import Edit from "./components/EditComponent.vue";
import New from './components/NewWidgetComponent.vue';
import Editor from "./layouts/EditorLayout.vue";

const routes = [
  { path: "/", component: Widgets, name: "home" },
  { path: "/edit/:id", component: Edit, name: "edit" },
  { path: "/new", component: New, name: "new" },
  {
    path: "/editor",
    component: Editor,
    name: "editor",
    children: [
      {
        name: "Home",
        path: "/editor",
        component: () => import("./components/Editor/EditorHomeComponent.vue"),
      },
      {
        name: "Settings",
        path: "/editor/settings",
        component: () => import("./components/Editor/SettingsComponent.vue"),
      },
      {
        name: "Home",
        path: "/editor/analytics",
        component: () => import("./components/Editor/AnalyticsComponent.vue"),
      },
      {
        name: "Workflows",
        path: "/editor/workflows",
        component: () => import("./components/Editor/WorkflowsComponent.vue"),
      },
    ],
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});


const app = createApp(App)
app.use(VueAxios, axios);
app.use(router);
app.mount('#app')
