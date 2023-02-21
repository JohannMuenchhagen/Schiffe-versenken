<template>
  <v-container fluid fill-height id="myBoard">
    <v-row dense v-for="y in 10" :key="y">
      <v-col v-for="x in 10" :key="x">
        <v-sheet
          color="grey-lighten-2"
          class="tileWrapper"
          @click="placeShip($event, x, y)"
          ref="tile"
        >
          <v-icon icon=""></v-icon>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useShipStore } from "@/services/shipStore";
import { useSnackbarStore } from "@/services/snackbarStore";
import { watch } from "vue";

const shipStore = useShipStore();
const snackbarStore = useSnackbarStore();

let selectedShipLength: undefined | number = undefined;

watch(shipStore.getSelectedShipLength, () => {
  selectedShipLength = shipStore.getSelectedShipLength.value;
});

function placeShip(event: any, x: number, y: number) {
  if (selectedShipLength === undefined) {
    snackbarStore.callSnackbar("Es wurde noch kein Schiff ausgewählt!");
    return;
  }
  addClassesToTiles(x, y);
}

function addClassesToTiles(x: number, y: number) {
  for (let i = x - 1; i < selectedShipLength! + x - 1; i++) {
    document
      .getElementById("myBoard")
      ?.getElementsByClassName("v-row")
      [y - 1]?.getElementsByClassName("v-col")
      [i]?.firstElementChild?.firstElementChild?.classList.add(
        "mdi-ferry",
        "mdi"
      );
    document
      .getElementById("myBoard")
      ?.getElementsByClassName("v-row")
      [y - 1]?.getElementsByClassName("v-col")
      [i]?.firstElementChild?.classList.remove("tileWrapper");
  }
}
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
</style>
