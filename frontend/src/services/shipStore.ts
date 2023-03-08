import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

interface IShip {
  startPos: { x: number; y: number };
  endPos: { x: number; y: number };
  length: number;
}

export const useShipStore = defineStore("ship", () => {
  // state
  const ships = reactive([] as IShip[]);
  const sunkenShips = reactive([] as IShip[]);
  const selectedShipLength = ref<number>();
  const placedShips = reactive([] as IShip[]);
  let selectedShipDirectionHorizontal = true;

  // getters
  const getShips = computed(() => ships);
  const getSunkenShips = computed(() => sunkenShips);
  const getSelectedShipLength = computed(() => selectedShipLength);
  const getPlacedShips = computed(() => placedShips);
  let getSelectedShipDirectionHorizontal = computed(() => selectedShipDirectionHorizontal);

  // actions
  function loadDummyData() {
    ships.push({ startPos: { x: 1, y: 1 }, endPos: { x: 1, y: 5 }, length: 5}); // 5 length
    ships.push({ startPos: { x: 3, y: 1 }, endPos: { x: 6, y: 1 }, length: 4}); // 4 length
    ships.push({ startPos: { x: 3, y: 4 }, endPos: { x: 6, y: 4 }, length: 4}); // 4 length
    ships.push({ startPos: { x: 4, y: 7 }, endPos: { x: 6, y: 7 }, length: 3}); // 3 length
    ships.push({ startPos: { x: 9, y: 6 }, endPos: { x: 9, y: 8 }, length: 3}); // 3 length
    ships.push({
      startPos: { x: 8, y: 10 },
      endPos: { x: 10, y: 10 },
      length: 3,
    }); // 3 length
    ships.push({
      startPos: { x: 2, y: 9 },
      endPos: { x: 2, y: 10 },
      length: 2,
    }); // 2 length
    ships.push({
      startPos: { x: 5, y: 10 },
      endPos: { x: 6, y: 10 },
      length: 2,
    }); // 2 length
    ships.push({ startPos: { x: 9, y: 2 }, endPos: { x: 9, y: 3 }, length: 2 }); // 2 length
    ships.push({ startPos: { x: 7, y: 5 }, endPos: { x: 7, y: 6 }, length: 2 }); // 2 length
  }

  function isShipHit(pos: { x: number; y: number }): boolean {
    for (let i = 0; i < ships.length; i++) {
      if (
        pos.x >= ships[i].startPos.x &&
        pos.x <= ships[i].endPos.x &&
        pos.y >= ships[i].startPos.y &&
        pos.y <= ships[i].endPos.y
      ) {
        ships[i].length--;
        isShipSunk(ships[i]);
        return true;
      }
    }
    return false;
  }

  function changeDirection(): void {
    selectedShipDirectionHorizontal = !selectedShipDirectionHorizontal;
    //console.log(selectedShipDirectionHorizontal);  //works with let
  }

  function getShipLength(ship: IShip): number {
    if (ship.endPos.x - ship.startPos.x === 0) {
      return ship.endPos.y - ship.startPos.y + 1;
    } else {
      return ship.endPos.x - ship.startPos.x + 1;
    }
  }

  function getAmountOfShipsOnBoard(length: number): number {
    let result = 0;
    for (let i = 0; i < ships.length; i++) {
      if (ships[i].length === length) {
        result++;
      }
    }
    for (let j = 0; j < sunkenShips.length; j++) {
      if (sunkenShips[j].length === length) {
        result--;
      }
    }
    return result;
  }

  function isShipSunk(ship: IShip): void {
    if (ship.length === 0) {
      ship.length = getShipLength(ship);
      sunkenShips.push(ship);
    }
  }

  function updateSelectedShip(length: number): void {
    selectedShipLength.value = length;
    
  }

  function addPlacedShip(ship: IShip) {
    placedShips.push(ship);
  }

  return {
    ships,
    sunkenShips,
    selectedShipLength,
    placedShips,
    selectedShipDirectionHorizontal,
    getSelectedShipDirectionHorizontal,
    getShips,
    getSunkenShips,
    getSelectedShipLength,
    getPlacedShips,
    getAmountOfShipsOnBoard,
    loadDummyData,
    isShipHit,
    updateSelectedShip,
    addPlacedShip,
    changeDirection,
  };
});
