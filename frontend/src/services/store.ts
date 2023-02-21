import { defineStore } from "pinia";
import { computed, reactive } from "vue";

interface IShip {
  startPos: { x: number; y: number };
  endPos: { x: number; y: number };
}

export const useShipStore = defineStore("ship", () => {
  // state
  const ships = reactive([] as IShip[]);

  // getters
  const getShips = computed(() => ships);

  // actions
  function loadDummyData() {
    ships.push({ startPos: { x: 1, y: 1 }, endPos: { x: 1, y: 5 } }); // 5 length
    ships.push({ startPos: { x: 3, y: 1 }, endPos: { x: 6, y: 1 } }); // 4 length
    ships.push({ startPos: { x: 3, y: 4 }, endPos: { x: 6, y: 4 } }); // 4 length
    ships.push({ startPos: { x: 4, y: 7 }, endPos: { x: 6, y: 7 } }); // 3 length
    ships.push({ startPos: { x: 9, y: 6 }, endPos: { x: 9, y: 8 } }); // 3 length
    ships.push({ startPos: { x: 8, y: 10 }, endPos: { x: 10, y: 10 } }); // 3 length
    ships.push({ startPos: { x: 2, y: 9 }, endPos: { x: 2, y: 10 } }); // 2 length
    ships.push({ startPos: { x: 5, y: 10 }, endPos: { x: 6, y: 10 } }); // 2 length
    ships.push({ startPos: { x: 9, y: 2 }, endPos: { x: 9, y: 3 } }); // 2 length
    ships.push({ startPos: { x: 7, y: 5 }, endPos: { x: 7, y: 6 } }); // 2 length
  }

  function isShipHit(pos: { x: number; y: number }): boolean {
    for (let i = 0; i < ships.length; i++) {
      if (
        pos.x >= ships[i].startPos.x &&
        pos.x <= ships[i].endPos.x &&
        pos.y >= ships[i].startPos.y &&
        pos.y <= ships[i].endPos.y
      ) {
        return true;
      }
    }
    return false;
  }

  function isShipSunk() {
    
  }

  return { ships, getShips, loadDummyData, isShipHit };
});
