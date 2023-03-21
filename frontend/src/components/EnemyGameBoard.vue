<template>
  <v-container fluid fill-height id="enemyBoard">
    <v-row dense v-for="y in 10" :key="y">
      <v-col v-for="x in 10" :key="x">
        <v-sheet
          :class="
            gameStore.getActionsState.value !== 'attack' ? 'disableClick' : ''
          "
          color="grey-lighten-2"
          class="tileWrapper"
          @click="clickTile(x, y, $event)"
        >
          <v-icon icon=""></v-icon>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useGameStore } from "@/services/gameStore";
import { useShipStore } from "@/services/shipStore";
import webSocketService from "@/services/websocket.service";

const shipStore = useShipStore();
const gameStore = useGameStore();

function clickTile(x: number, y: number, event: any) {
  gameStore.setLastClickedTile(event);
  const message = {
    Type: "Move",
    GameID: Number(gameStore.getGameId.value),
    PlayerID: gameStore.getPlayerId.value,
    Coordinates: [x - 1, y - 1],
  };
  webSocketService.sendMessage(message);
}

/* function clickTileLegacy(x: number, y: number, event: any) {
  if (shipStore.isShipHit({ x: x, y: y }) !== false) {
    event.target.firstChild.classList.add("mdi-ferry");
  } else {
    event.target.firstChild.classList.add("mdi-waves");
  }
  event.target.firstChild.classList.add("mdi");
  event.target.classList.remove("tileWrapper");
} */
</script>

<style scoped>
.v-sheet {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  aspect-ratio: 1/1;
}

.v-icon {
  pointer-events: none;
}
.tileWrapper {
  cursor: pointer;
}
.tileWrapper:hover {
  background-color: #c0c0c0 !important;
}

.disableClick {
  pointer-events: none !important;
}
</style>
