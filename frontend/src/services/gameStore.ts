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

  function initGame(inputId: string | undefined, inputPlayer: string) {
    if (inputId !== undefined) {
      gameId.value = inputId;
    }
    if (playerID.value === undefined) {
      playerID.value = inputPlayer; // TODO Muss geändert werden! Wir bekommen unerwarteterweise die ID des Gegners vom Backend...
    }
    active.value = true;
    console.log(gameId.value, active.value, playerID.value);
  }

  function joinGame(inputId: number | undefined) {
    if (inputId === undefined) {
      return;
    }
    gameId.value = inputId.toString();
    console.log("trying to connect...");
    webSocketService.sendMessage({
      Type: "Join",
      GameID: Number(inputId),
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
