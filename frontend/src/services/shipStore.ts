import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useGameStore } from "./gameStore";

interface IShip {
  startPos: { x: number; y: number };
  endPos: { x: number; y: number };
  length: number;
}

export const useShipStore = defineStore("ship", () => {
  const gameStore = useGameStore();

  // state
  const ships = reactive([] as IShip[]);
  const sunkenShipsLegacy = reactive([] as IShip[]);
  const selectedShipLength = ref<number>();
  const placedShips = reactive([] as IShip[]);
  const direchtionsForShips = [true, true, true, true]; // 0 - len 2; 1 - len 3; 2 - len 4; 3 - len 5
  const sunkenShips = ref([] as { length: number; amount: number }[]);

  // getters
  const getShips = computed(() => ships);
  const getSunkenShipsLegacy = computed(() => sunkenShipsLegacy);
  const getSelectedShipLength = computed(() => selectedShipLength);
  const getPlacedShips = computed(() => placedShips);
  const getDirechtionsForShips = computed(() => direchtionsForShips);
  const getSunkenShips = computed(() => sunkenShips);

  // actions
  function loadDummyData() {
    ships.push({ startPos: { x: 1, y: 1 }, endPos: { x: 1, y: 5 }, length: 5 }); // 5 length
    ships.push({ startPos: { x: 3, y: 1 }, endPos: { x: 6, y: 1 }, length: 4 }); // 4 length
    ships.push({ startPos: { x: 3, y: 4 }, endPos: { x: 6, y: 4 }, length: 4 }); // 4 length
    ships.push({ startPos: { x: 4, y: 7 }, endPos: { x: 6, y: 7 }, length: 3 }); // 3 length
    ships.push({ startPos: { x: 9, y: 6 }, endPos: { x: 9, y: 8 }, length: 3 }); // 3 length
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

  function changeDirection(length: number): void {
    direchtionsForShips[length - 2] = !direchtionsForShips[length - 2];
  }

  function getShipLength(ship: IShip): number {
    if (ship.endPos.x - ship.startPos.x === 0) {
      return ship.endPos.y - ship.startPos.y + 1;
    } else {
      return ship.endPos.x - ship.startPos.x + 1;
    }
  }

  function initSunkenShips() {
    sunkenShips.value.push({ length: 5, amount: 1 });
    sunkenShips.value.push({ length: 4, amount: 2 });
    sunkenShips.value.push({ length: 3, amount: 3 });
    sunkenShips.value.push({ length: 2, amount: 4 });
  }

  function getAmountOfShipsOnBoard(length: number): number {
    let result = 0;
    for (let i = 0; i < sunkenShips.value.length; i++) {
      if (sunkenShips.value[i].length === length) {
        result = sunkenShips.value[i].amount;
      }
    }
    return result;
  }

  function ownShipIsSunk(shipType: string) {
    if (gameStore.getActionsState.value === "wait") {
      if (shipType === "Battleship") {
        // TODO hier dann abziehen!
      }
    }
  }

  function isShipSunk(ship: IShip): void {
    if (ship.length === 0) {
      ship.length = getShipLength(ship);
      sunkenShipsLegacy.push(ship);
    }
  }

  function updateSelectedShip(length: number): void {
    selectedShipLength.value = length;
  }

  function addPlacedShip(ship: IShip) {
    placedShips.push(ship);
  }

  function deletePlacedShip(index: number) {
    placedShips.splice(index, 1);
  }

  function getShipsByType() {
    return {
      Battleship: [
        [
          [
            placedShips.filter((x) => x.length === 5)[0].startPos.x - 1,
            placedShips.filter((x) => x.length === 5)[0].startPos.y - 1,
          ],
          [
            placedShips.filter((x) => x.length === 5)[0].endPos.x - 1,
            placedShips.filter((x) => x.length === 5)[0].endPos.y - 1,
          ],
        ],
      ],
      Corvettes: [
        [
          [
            placedShips.filter((x) => x.length === 4)[0].startPos.x - 1,
            placedShips.filter((x) => x.length === 4)[0].startPos.y - 1,
          ],
          [
            placedShips.filter((x) => x.length === 4)[0].endPos.x - 1,
            placedShips.filter((x) => x.length === 4)[0].endPos.y - 1,
          ],
        ],
        [
          [
            placedShips.filter((x) => x.length === 4)[1].startPos.x - 1,
            placedShips.filter((x) => x.length === 4)[1].startPos.y - 1,
          ],
          [
            placedShips.filter((x) => x.length === 4)[1].endPos.x - 1,
            placedShips.filter((x) => x.length === 4)[1].endPos.y - 1,
          ],
        ],
      ],
      Destroyer: [
        [
          [
            placedShips.filter((x) => x.length === 3)[0].startPos.x - 1,
            placedShips.filter((x) => x.length === 3)[0].startPos.y - 1,
          ],
          [
            placedShips.filter((x) => x.length === 3)[0].endPos.x - 1,
            placedShips.filter((x) => x.length === 3)[0].endPos.y - 1,
          ],
        ],
        [
          [
            placedShips.filter((x) => x.length === 3)[1].startPos.x - 1,
            placedShips.filter((x) => x.length === 3)[1].startPos.y - 1,
          ],
          [
            placedShips.filter((x) => x.length === 3)[1].endPos.x - 1,
            placedShips.filter((x) => x.length === 3)[1].endPos.y - 1,
          ],
        ],
        [
          [
            placedShips.filter((x) => x.length === 3)[2].startPos.x - 1,
            placedShips.filter((x) => x.length === 3)[2].startPos.y - 1,
          ],
          [
            placedShips.filter((x) => x.length === 3)[2].endPos.x - 1,
            placedShips.filter((x) => x.length === 3)[2].endPos.y - 1,
          ],
        ],
      ],
      Submarine: [
        [
          [
            placedShips.filter((x) => x.length === 2)[0].startPos.x - 1,
            placedShips.filter((x) => x.length === 2)[0].startPos.y - 1,
          ],
          [
            placedShips.filter((x) => x.length === 2)[0].endPos.x - 1,
            placedShips.filter((x) => x.length === 2)[0].endPos.y - 1,
          ],
        ],
        [
          [
            placedShips.filter((x) => x.length === 2)[1].startPos.x - 1,
            placedShips.filter((x) => x.length === 2)[1].startPos.y - 1,
          ],
          [
            placedShips.filter((x) => x.length === 2)[1].endPos.x - 1,
            placedShips.filter((x) => x.length === 2)[1].endPos.y - 1,
          ],
        ],
        [
          [
            placedShips.filter((x) => x.length === 2)[2].startPos.x - 1,
            placedShips.filter((x) => x.length === 2)[2].startPos.y - 1,
          ],
          [
            placedShips.filter((x) => x.length === 2)[2].endPos.x - 1,
            placedShips.filter((x) => x.length === 2)[2].endPos.y - 1,
          ],
        ],
        [
          [
            placedShips.filter((x) => x.length === 2)[3].startPos.x - 1,
            placedShips.filter((x) => x.length === 2)[3].startPos.y - 1,
          ],
          [
            placedShips.filter((x) => x.length === 2)[3].endPos.x - 1,
            placedShips.filter((x) => x.length === 2)[3].endPos.y - 1,
          ],
        ],
      ],
    };
  }

  return {
    ships,
    sunkenShipsLegacy,
    selectedShipLength,
    placedShips,
    getShips,
    getSunkenShipsLegacy,
    getSelectedShipLength,
    getPlacedShips,
    getAmountOfShipsOnBoard,
    loadDummyData,
    isShipHit,
    updateSelectedShip,
    addPlacedShip,
    changeDirection,
    getDirechtionsForShips,
    direchtionsForShips,
    deletePlacedShip,
    getShipsByType,
    getSunkenShips,
    initSunkenShips,
  };
});
