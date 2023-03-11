import { defineStore } from "pinia";
import { computed, ref } from "vue";
import webSocketService from "@/services/websocket.service";

export const useGameStore = defineStore("game", () => {
  // state
  const gameId = ref<string>("");
  const active = ref<boolean>();
  const playerID = ref<string>();
  const gameStarted = ref<boolean>(false);

  // getters
  const getGameId = computed(() => gameId);
  const getActive = computed(() => active);
  const getPlayerId = computed(() => playerID);
  const getGameStarted = computed(() => gameStarted);

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

  function connectionCompleted() {
    if (
      gameId.value === undefined ||
      gameId.value === "" ||
      active.value === undefined ||
      active.value === false ||
      playerID.value === undefined ||
      playerID.value == ""
    ) {
      alert("Fehler beim initialisieren des Spiels, es fehlen Daten!");
    }
    gameStarted.value = true;
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
    getGameStarted,
    startGame,
    initGame,
    joinGame,
    stopGame,
    getPlayerId,
    connectionCompleted,
  };
});
