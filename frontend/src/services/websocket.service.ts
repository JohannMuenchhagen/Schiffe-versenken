import { useGameStore } from "./gameStore";

const prod = import.meta.env.MODE === "production";

/* Hier wird die baseURL gesetzt, Port und URL ist anzupassen !!! */
const baseUrl: string = prod
  ? "ws://ich-bin-das-backend.de/game"
  : "ws://192.168.178.51:8000/game";

let ws: WebSocket;

let gameStore: any;

export function connect(): void {
  gameStore = useGameStore();
  ws = new WebSocket(baseUrl);

  ws.onopen = onOpen;
  ws.onmessage = onMessage;
  ws.onerror = onError;
  ws.onclose = onClose;
}

function onOpen(): void {
  console.log("[websocket] connected.");
}

function onError(event: any): void {
  alert("Fehler! " + JSON.stringify(event.data));
}

function onClose(event: any): void {
  if (!event.wasClean) {
    console.log(event);
    alert("Verbindung mit dem Server wurde unerwartet getrennt!");
  }
  gameStore.stopGame();
}

function sendMessage(message: Object): void {
  console.log(message);
  ws.send(JSON.stringify(message, null, 2));
}

function onMessage(event: any): void {
  const msg = JSON.parse(event.data);
  console.log(msg);
  if (Object.prototype.hasOwnProperty.call(msg, "Error")) {
    console.log("Error", msg);
  }
  if (Object.values(msg).includes("Game successfully initialized")) {
    gameStore.setFirstPlayer();
    gameStore.initGame(msg.GameID, msg.PlayerID);
  }
  if (Object.values(msg).includes("Join successful")) {
    gameStore.initGame(undefined, msg.PlayerID);
    gameStore.connectionCompleted();
  }
  if (Object.values(msg).includes("Player 2 joined")) {
    gameStore.connectionCompleted();
  }
  if (Object.values(msg).includes("Player left")) {
    gameStore.stopGame();
  }
  if (
    Object.values(msg).some(
      (item: any) =>
        item.Battleship1 === "Battleship successfully placed" &&
        item.Corvettes1 === "Corvettes successfully placed" &&
        item.Corvettes2 === "Corvettes successfully placed" &&
        item.Destroyer1 === "Destroyer successfully placed" &&
        item.Destroyer2 === "Destroyer successfully placed" &&
        item.Destroyer3 === "Destroyer successfully placed" &&
        item.Submarine1 === "Submarine successfully placed" &&
        item.Submarine2 === "Submarine successfully placed" &&
        item.Submarine3 === "Submarine successfully placed" &&
        item.Submarine4 === "Submarine successfully placed"
    )
  ) {
    gameStore.placedShips();
  }
  if (Object.values(msg).includes("Game ready")) {
    gameStore.startToSinkShips();
  }
}

export default {
  connect,
  sendMessage,
};
