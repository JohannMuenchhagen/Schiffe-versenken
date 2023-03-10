import { useGameStore } from "./gameStore";

const prod = import.meta.env.MODE === "production";

/* Hier wird die baseURL gesetzt, Port und URL ist anzupassen !!! */
const baseUrl: string = prod
  ? "ws://ich-bin-das-backend.de/game"
  : "ws://127.0.0.1:8000/game";

let ws: WebSocket;

let gameStore: any;

export function connect(): void {
  ws = new WebSocket(baseUrl);

  ws.onopen = onOpen;
  ws.onmessage = onMessage;
  ws.onerror = onError;
  ws.onclose = onClose;
}

function onOpen(): void {
  gameStore = useGameStore();
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
  ws.send(JSON.stringify(message, null, 2));
}

function onMessage(event: any): void {
  const msg = JSON.parse(event.data);
  console.log(msg);
  if (Object.prototype.hasOwnProperty.call(msg, "Error")) {
    alert(msg.Error);
  }
  if (Object.values(msg).includes("Game successfully initialized")) {
    gameStore.initGame(msg.GameID, msg.PlayerID);
  } else {
    console.log("456");
  }
}

export default {
  connect,
  sendMessage,
};
