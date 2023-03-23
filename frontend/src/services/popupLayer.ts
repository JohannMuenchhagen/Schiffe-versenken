import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const usePopUpLayer = defineStore("popupLayer", () => {
  // state
  const text = ref<string>("");
  const active = ref<boolean>(false);
  const action = ref<boolean>(false);

  // getters
  const getText = computed(() => text);
  const getActive = computed(() => active);
  const getAction = computed(() => action);

  //actions
  function callAndConfirmPopUp(inputText: string): boolean {
    text.value = inputText;
    active.value = true;
    return confirm(inputText);
  }

  function startAction() {
    action.value = true;
  }

  function stopAction() {
    action.value = false;
  }

  function deactivePopUp() {
    active.value = false;
  }

  return {
    text,
    active,
    getText,
    getActive,
    getAction,
    callAndConfirmPopUp,
    startAction,
    stopAction,
    deactivePopUp,
  };
});
