<template>
  <v-card class="card" loading title="Platziere deine Schiffe!">
    <v-card-text class="cardContent">
      <v-list>
        <div>Übrige Schiffe:</div>

        <v-list-item active-color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-ferry" @click="selectShip($event, 5)"></v-icon>
          </template>

          <v-list-item-title>
            {{ remaining5LengthShip }}x 5er-Schiff - das
            Schlachtschiff</v-list-item-title
          >
          <v-switch 
            v-model="direction5LengthShip"
            hide-details
            true-value="horizontal"
            false-value="senkrecht"
            :label="`Richtung: ${direction5LengthShip}`"
            @change="onChangeDirShip"
            inset>
        </v-switch>
        </v-list-item>
          
        <v-list-item active-color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-ferry" @click="selectShip($event, 4)"></v-icon>
          </template>

          <v-list-item-title
            >{{ remaining4LengthShip }}x 4er-Schiffe - die
            Kreuzer</v-list-item-title
          >
          <v-switch 
            v-model="direction4LengthShip"
            hide-details
            true-value="horizontal"
            false-value="senkrecht"
            :label="`Richtung: ${direction4LengthShip}`"
            inset>
        </v-switch>
        </v-list-item>
        <v-list-item active-color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-ferry" @click="selectShip($event, 3)"></v-icon>
          </template>

          <v-list-item-title
            >{{ remaining3LengthShip }}x 3er-Schiffe - die
            Zerstörer</v-list-item-title
          >
          <v-switch 
            v-model="direction3LengthShip"
            hide-details
            true-value="horizontal"
            false-value="senkrecht"
            :label="`Richtung: ${direction3LengthShip}`"
            inset>
        </v-switch>
        </v-list-item>
        
        <v-list-item active-color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-ferry" @click="selectShip($event, 2)"></v-icon>
          </template>

          <v-list-item-title
            >{{ remaining2LengthShip }}x 2er-Schiffe - die
            U-Boote</v-list-item-title
          >
          <v-switch 
            v-model="direction2LengthShip"
            hide-details
            true-value="horizontal"
            false-value="senkrecht"
            :label="`Richtung: ${direction2LengthShip}`"
            inset>
        </v-switch>
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
import { toRaw, watch } from "vue";
import { ref } from "vue";

const remaining5LengthShip = ref<number>(0);
const remaining4LengthShip = ref<number>(0);
const remaining3LengthShip = ref<number>(0);
const remaining2LengthShip = ref<number>(0);

const shipStore = useShipStore();

let direction5LengthShip = ref<boolean>(true);
let direction4LengthShip = ref<boolean>(true);
let direction3LengthShip = ref<boolean>(true);
let direction2LengthShip = ref<boolean>(true);

const onChangeDirShip = (x:number, y:number) => {
  shipStore.changeDirection();
};

calcRemainingShipsToPlace();

function selectShip(event: any, shipLength: number): void {
  Array.from(document.querySelectorAll(".v-icon")).forEach((el) =>
    el.classList.remove("selectedShip")
  );
  event.target.classList.add("selectedShip");
  shipStore.updateSelectedShip(shipLength);
}

watch(shipStore.getPlacedShips, () => {
  calcRemainingShipsToPlace();
});

function calcRemainingShipsToPlace() {
  remaining5LengthShip.value = 1;
  remaining4LengthShip.value = 2;
  remaining3LengthShip.value = 3;
  remaining2LengthShip.value = 4;

  for (let i = 0; i < toRaw(shipStore.getPlacedShips).length; i++) {
    if (shipStore.getPlacedShips[i].length === 5) {
      remaining5LengthShip.value--;
    } else if (shipStore.getPlacedShips[i].length === 4) {
      remaining4LengthShip.value--;
    } else if (shipStore.getPlacedShips[i].length === 3) {
      remaining3LengthShip.value--;
    } else if (shipStore.getPlacedShips[i].length === 2) {
      remaining2LengthShip.value--;
    }
  }
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
