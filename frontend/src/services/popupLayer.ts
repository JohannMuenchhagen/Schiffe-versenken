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
  function callPopUp(inputText: string):boolean{
    text.value = inputText;
    active.value = true;
    return confirm(inputText);
  }

  function startAction(){
    action.value = true
    console.log("startAction", action.value)
  }

  function stopAction(){
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
    callPopUp,
    startAction,
    stopAction,
    deactivePopUp,
  };
});
