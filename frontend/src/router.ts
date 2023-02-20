import { createRouter, createWebHistory } from "vue-router";
import GameView from "./views/GameView.vue";
import PageNotFoundView from "./views/PageNotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Game",
      component: GameView,
    },
    { path: "/:pathMatch(.*)*", name: "404", component: PageNotFoundView },
  ],
});

export default router;
