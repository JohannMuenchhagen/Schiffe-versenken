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
  }

  return { ships, getShips, loadDummyData };
});
