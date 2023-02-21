<template>
  <v-card class="card" loading title="Es ist dein Zug!">
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
  <v-snackbar v-model="snackbar" timeout="2000">
    {{ text }}

    <template v-slot:actions>
      <v-btn color="blue" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useShipStore } from "@/services/store";
import { ref, watch } from "vue";

const shipStore = useShipStore();

let ship5length = ref();
let ship4length = ref();
let ship3length = ref();
let ship2length = ref();
getShipLength();

let snackbar = ref(false);
let text = ref("");

watch(shipStore.getSunkenShips, () => {
  getShipLength();
});

function getShipLength() {
  ship5length.value = shipStore.getAmountOfShipsOnBoard(5);
  ship4length.value = shipStore.getAmountOfShipsOnBoard(4);
  ship3length.value = shipStore.getAmountOfShipsOnBoard(3);
  ship2length.value = shipStore.getAmountOfShipsOnBoard(2);
}

watch(ship5length, () => {
  text.value = "Du hast ein Schlachtschiff versenkt!";
  snackbar.value = true;
});

watch(ship4length, () => {
  text.value = "Du hast ein Kreuzer versenkt!";
  snackbar.value = true;
});

watch(ship3length, () => {
  text.value = "Du hast ein Zerstörer versenkt!";
  snackbar.value = true;
});

watch(ship2length, () => {
  text.value = "Du hast ein U-Boot versenkt!";
  snackbar.value = true;
});
</script>

<style scoped></style>
