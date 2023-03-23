import { defineStore } from "pinia";
import { computed, ref } from "vue";
import webSocketService from "@/services/websocket.service";
import { useSnackbarStore } from "./snackbarStore";
import { useShipStore } from "./shipStore";

export const useGameStore = defineStore("game", () => {
  const shipStore = useShipStore();
  const snackbarStore = useSnackbarStore();

  // state
  const gameId = ref<string>("");
  const gameState = ref<string>("no game");
  const playerID = ref<string>();
  const actionsState = ref<string>();
  const firstMove = ref<boolean>(false);
  const lastClickedTile = ref<any>();
  const clickedTile = ref<boolean>();
  const won = ref<boolean>();

  // getters
  const getGameId = computed(() => gameId);
  const getGameState = computed(() => gameState);
  const getPlayerId = computed(() => playerID);
  const getActionsState = computed(() => actionsState);
  const getLastClickedTile = computed(() => lastClickedTile);
  const getClickedTile = computed(() => clickedTile);
  const getWon = computed(() => won);

  // actions
  function startGame() {
    webSocketService.sendMessage({ Type: "initialize Game" });
  }

  function setFirstPlayer() {
    firstMove.value = true;
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
    actionsState.value = "place ships";
  }

  function placedShips() {
    actionsState.value = "done placing ships";
  }

  function stopGame() {
    gameState.value = "no game";
  }

  function startToSinkShips() {
    console.log("Ändere Actions State zu attack oder wait");
    if (firstMove.value === true) {
      actionsState.value = "attack";
    } else {
      actionsState.value = "wait";
    }
  }

  function setLastClickedTile(event: any) {
    lastClickedTile.value = event;
  }

  function switchActionRole() {
    if (actionsState.value === "attack") {
      actionsState.value = "wait";
    } else {
      actionsState.value = "attack";
    }
  }

  function hitShip(event: string, coords: number[], shipType: string) {
    if (actionsState.value === "attack") {
      if (event === "Hit") {
        lastClickedTile.value.target.firstChild.classList.add("mdi-target");
      }
      if (event === "Miss") {
        lastClickedTile.value.target.firstChild.classList.add("mdi-waves");
        switchActionRole();
      }
      if (event === "Destroyed") {
        lastClickedTile.value.target.firstChild.classList.add("mdi-target");
        shipStore.ownShipIsSunk(shipType);
        snackbarStore.callSnackbar("Schiff wurde versenkt!");
      }
      lastClickedTile.value.target.firstChild.classList.add("mdi");
      clickedTile.value = true;
    } else {
      if (event === "Hit") {
        markHitsOnBoard(coords[0], coords[1], true);
      }
      if (event === "Destroyed") {
        markHitsOnBoard(coords[0], coords[1], true);
      }
      if (event === "Miss") {
        markHitsOnBoard(coords[0], coords[1], false);
        switchActionRole();
      }
    }
  }

  function setClickedTile(val: boolean) {
    clickedTile.value = val;
  }

  function markHitsOnBoard(x: number, y: number, hit: boolean) {
    if (hit) {
      document
        .getElementById("myBoard")
        ?.getElementsByClassName("v-row")
        [y]?.getElementsByClassName("v-col")
        [x]?.firstElementChild?.firstElementChild?.classList.add(
          "mdi-target",
          "mdi"
        );
    } else {
      document
        .getElementById("myBoard")
        ?.getElementsByClassName("v-row")
        [y]?.getElementsByClassName("v-col")
        [x]?.firstElementChild?.firstElementChild?.classList.add(
          "mdi-waves",
          "mdi"
        );
    }
  }

  function setWon(msg: string) {
    if (firstMove.value === true && msg === "Player 1 wins") {
      won.value = true;
    }
    if (firstMove.value === false && msg === "Player 2 wins") {
      won.value = true;
    }
    if (firstMove.value === true && msg === "Player 2 wins") {
      won.value = false;
    }
    if (firstMove.value === false && msg === "Player 2 wins") {
      won.value = false;
    }
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
    placedShips,
    setFirstPlayer,
    startToSinkShips,
    getLastClickedTile,
    setLastClickedTile,
    hitShip,
    getClickedTile,
    setClickedTile,
    getWon,
    setWon,
  };
});
