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
import { computed, toRaw, watch } from "vue";
import { usePopUpLayer } from "@/services/popupLayer";


const shipStore = useShipStore();
const snackbarStore = useSnackbarStore();
const popupLayer = usePopUpLayer();

let selectedShipLength: undefined | number = undefined;
let selectedShipDirectionHorizontal: undefined | boolean = undefined;
let endPosition: undefined | { x: number; y: number } = undefined;

let lengthDeletedShipX = 0;
let lengthDeletedShipY = 0;

let lengthSelectedShipX = 0;
let lengthSelectedShipY = 0;

let remaining5LengthShip = 1;
let remaining4LengthShip = 2;
let remaining3LengthShip = 3;
let remaining2LengthShip = 4;

watch(shipStore.getSelectedShipLength, () => {
  selectedShipLength = shipStore.getSelectedShipLength.value;
});

function placeShip(event: any, x: number, y: number) {   //vom Platzieren prüfen die Regeln des Spiels
  
  if (isShip (x, y)){  //wenn ein Schiff selektiert -> löschen: ja oder nein
    
    if (popupLayer.callAndConfirmPopUp("Soll ein Schiff entfernt werden ?")){
      findAndDeleteShip(x,y);
      return;
    }
  } else{
      if (selectedShipLength === undefined) {
      snackbarStore.callSnackbar("Es wurde noch kein Schiff ausgewählt!");
      return;
    }
    if (isShipAlreadyPlaced()) {
      snackbarStore.callSnackbar("Dieses Schiff wurde bereits platziert!");
      return;
    }

    selectedShipDirectionHorizontal = shipStore.getDirechtionsForShips[selectedShipLength - 2];
    let xEnd = x;
    let yEnd = y;

    if (isCrossedBorder(x, y, selectedShipDirectionHorizontal)) {
      snackbarStore.callSnackbar("Das Schiff überschreitet eine Grenze!");
      return;
    }

    if(selectedShipDirectionHorizontal) {
      xEnd = x + selectedShipLength! - 1;
      if (isTakenByAnotherShip(x, y, xEnd, yEnd)) {
      snackbarStore.callSnackbar("Dort befindet sich bereits ein Schiff!");
      return;
      }
      if (isTangentToAnotherShip(x, y, xEnd, yEnd)) {
        snackbarStore.callSnackbar("Die Schiffe dürfen nicht über Eck gebaut sein oder Ausbuchtungen besitzen!");
        return;
      }
    } else {
      yEnd = y + selectedShipLength! - 1;
      if (isTakenByAnotherShip(x, y, xEnd, yEnd)) {
      snackbarStore.callSnackbar("Dort befindet sich bereits ein Schiff!");
      return;
      }
      if (isTangentToAnotherShip(x, y, xEnd, yEnd)) {
        snackbarStore.callSnackbar("Die Schiffe dürfen nicht über Eck gebaut sein oder Ausbuchtungen besitzen!");
        return;
      }
    }
    
    if(selectedShipDirectionHorizontal) {
      endPosition = { x: x + selectedShipLength! - 1, y: y};
      addClassesToTilesHorizontal(x, y);
    } else {
            endPosition = { x: x, y: y + selectedShipLength! - 1 };
            addClassesToTilesVertikal(x, y);
          } 
          
    shipStore.addPlacedShip({
      startPos: { x: x, y: y },
      endPos: endPosition,
      length: selectedShipLength!,
    });
    
    console.log(toRaw(shipStore.getPlacedShips));
  }
  
}

function isShip (x: number, y: number):boolean {  // prüft, ob es ein Schiff ist
  if (document
          .getElementById("myBoard")
          ?.getElementsByClassName("v-row")
          [y-1]?.getElementsByClassName("v-col")
          [x-1]?.firstElementChild?.firstElementChild?.classList.contains(
            "mdi-ferry"
          ) === true){
            return true;
          }
  return false;
}

function addClassesToTilesHorizontal(x: number, y: number) {  //einen Schiff platzieren horizontal
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

function addClassesToTilesVertikal(x: number, y: number) {  //einen Schiff platzieren vertikal
  for (let i = y - 1; i < selectedShipLength! + y - 1; i++) {
    document
        .getElementById("myBoard")
        ?.getElementsByClassName("v-row")
        [i]?.getElementsByClassName("v-col")
        [x-1]?.firstElementChild
        ?.firstElementChild
        ?.classList.add(
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

function isCrossedBorder(x: number, y: number, directionHorizontal: boolean): boolean{  //prüft, ob die Grenzen überschreitet sind

  if (((10 - (x - 1) - selectedShipLength!) < 0 && directionHorizontal) 
    || ((10 - (y - 1) - selectedShipLength!) < 0 && !directionHorizontal))
    {
      return true;
    }
  return false;
}

function isTangentToAnotherShip(xStart: number, yStart: number, xEnd: number, yEnd: number): boolean { 
for (let i = xStart - 1; i <= xEnd + 1; i++) {
  for (let j = yStart - 1; j <= yEnd + 1; j++){    
          if (i < 0 || j < 0) { continue; } 
          if(shipStore.getPlacedShips.find((value) => (i >= value.startPos.x && (value.endPos.x >= i)) 
                                                 && ((j >= value.startPos.y) && (value.endPos.y >= j))) != undefined){
                                                            return true;
                                                          }
    }
  }
return false;
}

function isTakenByAnotherShip(xStart: number, yStart: number, xEnd: number, yEnd: number): boolean {  //prüft, ob ein weiterer Schiff da ist
  
  for (let i = xStart; i <= xEnd; i++) {
    for (let j = yStart; j <= yEnd; j++){
      if (i < 0 || j < 0) { continue; } 
          if(shipStore.getPlacedShips.find((value) => (i >= value.startPos.x && (value.endPos.x >= i)) 
                                                 && ((j >= value.startPos.y) && (value.endPos.y >= j))) != undefined){
                                                            return true;
                                                          }
      }
    }
  return false;
}

watch(shipStore.getPlacedShips, () => {
  calcRemainingShipsToPlace();
});

function calcRemainingShipsToPlace() {   //aktualisieren die Anzahl von verfügbaren Schiffen nach einem Platzieren
  remaining5LengthShip = 1;
  remaining4LengthShip = 2;
  remaining3LengthShip = 3;
  remaining2LengthShip = 4;

  for (let i = 0; i < toRaw(shipStore.getPlacedShips).length; i++) {
    if (shipStore.getPlacedShips[i].length === 5) {
      remaining5LengthShip--;
    } else if (shipStore.getPlacedShips[i].length === 4) {
      remaining4LengthShip--;
    } else if (shipStore.getPlacedShips[i].length === 3) {
      remaining3LengthShip--;
    } else if (shipStore.getPlacedShips[i].length === 2) {
      remaining2LengthShip--;
    }
  }
}

function calcRemainingShipsAfterDelete(len: number) {  //aktualisieren die Anzahl von verfügbaren Schiffen nach einer Entfernung eines Schiffes
  switch(len){
    case 5: remaining5LengthShip++;
    case 4: remaining4LengthShip++;
    case 3: remaining3LengthShip++;
    case 2: remaining2LengthShip++;
  }
}

function findAndDeleteShip (x: number, y: number){  //suchen einen Schiff im array und entfernt ihn (Design und shipStore)
  let shipFounded = shipStore.getPlacedShips.find((value) => (x >= value.startPos.x && (value.endPos.x >= x)) 
                                                          && ((y >= value.startPos.y) && (value.endPos.y >= y)));
  
  let xStart = 0;
  let yStart = 0;
  let xEnd = 0;
  let yEnd = 0;

  if (shipFounded != undefined) {   // ein Schiff gefunden
    let indexOfShips = shipStore.getPlacedShips.indexOf(shipFounded);   //einen Index des Schiffes finden
    
    xStart = shipFounded?.startPos.x;
    yStart = shipFounded?.startPos.y;
    xEnd = shipFounded.endPos.x;
    yEnd = shipFounded.endPos.y;
    lengthDeletedShipX = xEnd - xStart + 1;
    lengthDeletedShipY = yEnd - yStart + 1; 

      if(yEnd - yStart === 0) { //horizontal
        calcRemainingShipsAfterDelete(lengthDeletedShipX);
      }
      else if(xEnd - xStart === 0 ) { 
        calcRemainingShipsAfterDelete(lengthDeletedShipY);
      }

    makeShipWhiteIfDelete(xStart, yStart);  //design
    shipStore.deletePlacedShip(indexOfShips);  //shipStore del ship
  } 
}

function makeShipWhiteIfDelete(x: number, y: number){ //Schleife für die Suche eines Schiffes
  for(let i = x - 1; i < x + lengthDeletedShipX - 1; i++){ 
    for(let j = y - 1; j < y + lengthDeletedShipY - 1; j++){
      document
            .getElementById("myBoard")
            ?.getElementsByClassName("v-row")
            [j]?.getElementsByClassName("v-col")
            [i]?.firstElementChild
            ?.firstElementChild
            ?.classList.remove(
            "mdi-ferry",
            "mdi"
            );
          document
            .getElementById("myBoard")
            ?.getElementsByClassName("v-row")
            [j]?.getElementsByClassName("v-col")
            [i]?.firstElementChild?.classList.add("tileWrapper");
    }        
  } 
  
}


function isShipAlreadyPlaced(): boolean {
  if (selectedShipLength === 5) {
    if (remaining5LengthShip === 0) return true;
  }
  if (selectedShipLength === 4) {
    if (remaining4LengthShip === 0) return true;
  }
  if (selectedShipLength === 3) {
    if (remaining3LengthShip === 0) return true;
  }
  if (selectedShipLength === 2) {
    if (remaining2LengthShip === 0) return true;
  }
  return false;
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
