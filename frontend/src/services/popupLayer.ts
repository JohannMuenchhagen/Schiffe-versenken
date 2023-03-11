import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const usePopUpLayer = defineStore("popupLayer", () => {
  // state
  const text = ref<string>("");
  const active = ref<boolean>(false);

  // getters
  const getText = computed(() => text);
  const getActive = computed(() => active);

  //actions
  function callPopUp(inputText: string):boolean {
    text.value = inputText;
    active.value = true;

    return false;
  }

  function deactivePopUp() {
    active.value = false;
  }

  return {
    text,
    active,
    getText,
    getActive,callPopUp,
    deactivePopUp,
  };
});
