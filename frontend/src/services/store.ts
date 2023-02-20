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
    ships.push({ startPos: { x: 1, y: 1 }, endPos: { x: 1, y: 5 } });
    ships.push({ startPos: { x: 3, y: 1 }, endPos: { x: 6, y: 1 } });
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

  return { ships, getShips, loadDummyData, isShipHit };
});
