<template>
  <v-card class="card" loading title="Platziere deine Schiffe!">
    <v-card-text class="cardContent">
      <v-list>
        <div>Übrige Schiffe:</div>

        <v-list-item active-color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-ferry" @click="selectShip($event, 5)"></v-icon>
          </template>

          <v-list-item-title
            >1x 5er-Schiff - das Schlachtschiff</v-list-item-title
          >
        </v-list-item>
        <v-list-item active-color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-ferry" @click="selectShip($event, 4)"></v-icon>
          </template>

          <v-list-item-title>2x 4er-Schiffe - die Kreuzer</v-list-item-title>
        </v-list-item>
        <v-list-item active-color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-ferry" @click="selectShip($event, 3)"></v-icon>
          </template>

          <v-list-item-title>3x 3er-Schiffe - die Zerstörer</v-list-item-title>
        </v-list-item>
        <v-list-item active-color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-ferry" @click="selectShip($event, 2)"></v-icon>
          </template>

          <v-list-item-title>4x 2er-Schiffe - die U-Boote</v-list-item-title>
        </v-list-item>
      </v-list>
      <div class="hintTitle">Hinweis:</div>
      <div>
        Wähle das zu platzierende Schiff mit einem Klick aus, dann wähle eine
        Position auf deinem Spielbrett. Das Schiff kann mit einem Klick gedreht
        werden.
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useShipStore } from "@/services/shipStore";

const shipStore = useShipStore();

function selectShip(event: any, shipLength: number): void {
  Array.from(document.querySelectorAll(".v-icon")).forEach((el) =>
    el.classList.remove("selectedShip")
  );
  event.target.classList.add("selectedShip");
  shipStore.updateSelectedShip(shipLength);
}
</script>

<style scoped>
.hintTitle {
  font-size: large;
  margin-bottom: 5px;
}

i.v-icon:hover {
  outline: 3px solid currentColor;
  outline-offset: 5px;
  border-radius: 50%;
  border-spacing: 10px;
  filter: brightness(85%);
  cursor: pointer;
}

.selectedShip {
  outline: 3px solid currentColor;
  outline-offset: 5px;
  border-radius: 50%;
  border-spacing: 10px;
  filter: brightness(85%);
  cursor: pointer;
}
</style>
