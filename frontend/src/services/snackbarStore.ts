import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSnackbarStore = defineStore("snackbar", () => {
  // state
  const text = ref<string>("");
  const active = ref<boolean>(false);

  // getters
  const getText = computed(() => text);
  const getActive = computed(() => active);

  // actions
  function callSnackbar(inputText: string) {
    text.value = inputText;
    active.value = true;
  }

  function deactiveSnackbar() {
    active.value = false;
  }

  return {
    text,
    active,
    getText,
    getActive,
    callSnackbar,
    deactiveSnackbar,
  };
});
