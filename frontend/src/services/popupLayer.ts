import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const usePopUpLayer = defineStore("popupLayer", () => {
  // state
  const text = ref<string>("");
  const active = ref<boolean>(false);
  const action = ref<boolean>(false);
  let deleteShip = false;

  // getters
  const getText = computed(() => text);
  const getActive = computed(() => active);
  const getAction = computed(() => action);
  const getDeleteShip = computed(() => deleteShip);

  //actions
  function callPopUp(inputText: string){
    text.value = inputText;
    active.value = true;
    if (confirm(inputText) == true){
        deleteShip = true;
    }else deactivePopUp();
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
    getDeleteShip,
    deactivePopUp,
  };
});
