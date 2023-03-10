import { defineStore } from "pinia";
import { computed, ref } from "vue";
import webSocketService from "@/services/websocket.service";

export const useGameStore = defineStore("game", () => {
  // state
  const gameId = ref<string>("");
  const active = ref<boolean>();
  const playerID = ref<string>();

  // getters
  const getGameId = computed(() => gameId);
  const getActive = computed(() => active);
  const getPlayerId = computed(() => playerID);

  // actions
  function startGame() {
    webSocketService.sendMessage({ Type: "initialize Game" });
  }

  function initGame(inputId: string, inputPlayer: string) {
    gameId.value = inputId;
    playerID.value = inputPlayer;
    active.value = true;
  }

  function joinGame(inputId: number | undefined) {
    if (inputId === undefined) {
      return;
    }
    webSocketService.sendMessage({
      Type: "Join",
      GameID: inputId,
    });
  }

  function stopGame() {
    active.value = false;
  }

  return {
    gameId,
    active,
    playerID,
    getGameId,
    getActive,
    startGame,
    initGame,
    joinGame,
    stopGame,
    getPlayerId,
  };
});
