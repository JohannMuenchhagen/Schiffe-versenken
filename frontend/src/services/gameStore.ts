import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useGameStore = defineStore("game", () => {
  // state
  const id = ref<string>("");
  const active = ref<boolean>();

  // getters
  const getId = computed(() => id);
  const getActive = computed(() => active);

  // actions
  function startGame(inputId: string) {
    id.value = inputId;
    active.value = true;
  }

  function stopGame() {
    active.value = false;
  }

  return {
    id,
    active,
    getId,
    getActive,
    startGame,
    stopGame,
  };
});
