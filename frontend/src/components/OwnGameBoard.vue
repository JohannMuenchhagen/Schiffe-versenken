<template>
  <v-container fluid fill-height>
    <v-row dense v-for="y in 10" :key="y">
      <v-col v-for="x in 10" :key="x">
        <v-sheet
          color="grey-lighten-2"
          class="tileWrapper"
          @click="placeShip($event)"
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

function placeShip(event: any) {
  if (selectedShipLength === undefined) {
    snackbarStore.callSnackbar("Es wurde noch kein Schiff ausgewählt!");
    return;
  }
  event.target.firstChild.classList.add("mdi-ferry");
  event.target.firstChild.classList.add("mdi");
  event.target.classList.remove("tileWrapper");
}

watch(shipStore.getSelectedShipLength, () => {
  selectedShipLength = shipStore.getSelectedShipLength.value;
});
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
