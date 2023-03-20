import { defineStore } from "pinia";
import { computed, ref } from "vue";
import webSocketService from "@/services/websocket.service";

export const useGameStore = defineStore("game", () => {
  // state
  const gameId = ref<string>("");
  const gameState = ref<string>("no game");
  const playerID = ref<string>();
  const actionsState = ref<string>();

  // getters
  const getGameId = computed(() => gameId);
  const getGameState = computed(() => gameState);
  const getPlayerId = computed(() => playerID);
  const getActionsState = computed(() => actionsState);

  // actions
  function startGame() {
    webSocketService.sendMessage({ Type: "initialize Game" });
  }

  function initGame(inputId: string | undefined, inputPlayer: string) {
    if (inputId !== undefined) {
      gameId.value = inputId;
    }
    playerID.value = inputPlayer;
    gameState.value = "init";
    console.log(gameId.value, gameState.value, playerID.value);
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

  function connectionCompleted() {
    if (
      gameId.value === undefined ||
      gameId.value === "" ||
      playerID.value === undefined ||
      playerID.value == ""
    ) {
      alert("Fehler beim initialisieren des Spiels, es fehlen Daten!");
    }
    gameState.value = "started";
    actionsState.value = "placeShips";
  }

  function stopGame() {
    gameState.value = "no game";
  }

  return {
    gameId,
    playerID,
    getGameId,
    startGame,
    initGame,
    joinGame,
    stopGame,
    getPlayerId,
    getGameState,
    connectionCompleted,
    getActionsState,
  };
});
