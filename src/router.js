import { createRouter, createWebHistory } from "vue-router";
import Loggin from "./components/Loggin.vue";
import Estudiantes from "./components/Estudiantes.vue";

const routes = [
  { path: "/login", component: Loggin },
  { path: "/estudiantes", component: Estudiantes },
  { path: "/", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
