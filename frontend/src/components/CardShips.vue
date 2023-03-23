<template>
  <v-card class="card" loading>
    <template v-slot:title>
      <div
        v-if="
          gameStore.getActionsState.value === 'attack' &&
          won === false &&
          lost === false
        "
      >
        Es ist dein Zug!
      </div>
      <div
        v-if="
          gameStore.getActionsState.value === 'wait' &&
          won === false &&
          lost === false
        "
      >
        Warten auf Gegner...
      </div>
      <div v-if="won === true">
        Du hast gewonnen <v-icon icon="mdi-party-popper"></v-icon>
      </div>
      <div v-if="lost === true">
        Du hast verloren <v-icon icon="mdi-emoticon-sad-outline"></v-icon>
      </div>
    </template>
    <v-card-text class="cardContent">
      <v-list>
        <div>Übrige Schiffe des Gegners:</div>

        <v-list-item active-color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-ferry"></v-icon>
          </template>

          <v-list-item-title
            >{{ ship5length }}x 5er-Schiff - das
            Schlachtschiff</v-list-item-title
          >
        </v-list-item>
        <v-list-item active-color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-ferry"></v-icon>
          </template>

          <v-list-item-title
            >{{ ship4length }}x 4er-Schiffe - die Kreuzer</v-list-item-title
          >
        </v-list-item>
        <v-list-item active-color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-ferry"></v-icon>
          </template>

          <v-list-item-title
            >{{ ship3length }}x 3er-Schiffe - die Zerstörer</v-list-item-title
          >
        </v-list-item>
        <v-list-item active-color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-ferry"></v-icon>
          </template>

          <v-list-item-title
            >{{ ship2length }}x 2er-Schiffe - die U-Boote</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useGameStore } from "@/services/gameStore";
import { useShipStore } from "@/services/shipStore";
import { useSnackbarStore } from "@/services/snackbarStore";
import { onMounted, ref, watch } from "vue";

const shipStore = useShipStore();
const snackbarStore = useSnackbarStore();
const gameStore = useGameStore();

let won = ref(false);
let lost = ref(false);
let ship5length = ref();
let ship4length = ref();
let ship3length = ref();
let ship2length = ref();
getShipLength();

watch(shipStore.getSunkenShips, () => {
  getShipLength();
});

watch(gameStore.getWon, () => {
  console.log(gameStore.getWon.value);
  if (gameStore.getWon.value === true) {
    won.value = true;
  }
  if (gameStore.getWon.value === false) {
    lost.value = true;
  }
});

onMounted(() => {
  shipStore.initSunkenShips();
});

function getShipLength() {
  ship5length.value = shipStore.getAmountOfShipsOnBoard(5);
  ship4length.value = shipStore.getAmountOfShipsOnBoard(4);
  ship3length.value = shipStore.getAmountOfShipsOnBoard(3);
  ship2length.value = shipStore.getAmountOfShipsOnBoard(2);
}

watch(ship5length, () => {
  snackbarStore.callSnackbar("Du hast ein Schlachtschiff versenkt!");
});

watch(ship4length, () => {
  snackbarStore.callSnackbar("Du hast ein Kreuzer versenkt!");
});

watch(ship3length, () => {
  snackbarStore.callSnackbar("Du hast ein Zerstörer versenkt!");
});

watch(ship2length, () => {
  snackbarStore.callSnackbar("Du hast ein U-Boot versenkt!");
});
</script>

<style scoped></style>
