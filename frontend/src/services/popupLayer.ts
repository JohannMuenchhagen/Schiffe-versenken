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
  function callPopUp(inputText: string){
    text.value = inputText;
    active.value = true;
  }

  function startAction(){
    action.value = true;
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
    deactivePopUp,
  };
});
