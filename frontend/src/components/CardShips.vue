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

watch(shipStore.getSunkenShips, () => {
  getShipLength();
});

function getShipLength() {
  ship5length.value = shipStore.getAmountOfShipsOnBoard(5);
  ship4length.value = shipStore.getAmountOfShipsOnBoard(4);
  ship3length.value = shipStore.getAmountOfShipsOnBoard(3);
  ship2length.value = shipStore.getAmountOfShipsOnBoard(2);
}
</script>

<style scoped></style>
