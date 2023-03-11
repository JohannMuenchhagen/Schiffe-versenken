<template>
  <v-app>
    <v-app-bar :elevation="2" density="compact" color="tertiary">
      <template v-slot:prepend>
        <v-icon icon="mdi-ferry"></v-icon>
      </template>
      <v-app-bar-title>Schiffe versenken</v-app-bar-title>
      <v-spacer></v-spacer>
      <ConnectDialog></ConnectDialog>
      <v-btn
        icon
        href="https://github.com/JohannMuenchhagen/Schiffe-versenken"
        target="_blank"
      >
        <v-icon icon="mdi-github"></v-icon>
      </v-btn>
      <SettingsDialog></SettingsDialog>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
    <v-snackbar v-model="snackbarStore.getActive.value" timeout="2000">
      {{ snackbarStore.getText.value }}
      <template v-slot:actions>
        <v-btn
          color="blue"
          variant="text"
          @click="snackbarStore.deactiveSnackbar"
        >
          Schließen
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarStore.getActive.value">
      {{ snackbarStore.getText.value }}
    </v-snackbar>

    <v-snackbar v-model="popupLayer.getActive.value">
      {{ popupLayer.getText.value }}

    <template v-slot:actions>
        <v-btn
          color="red"
          variant="text"
          @click="popupLayer.callPopUp"
        >
        </v-btn>

      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
import SettingsDialog from "@/components/SettingsDialog.vue";
import ConnectDialog from "./components/ConnectDialog.vue";
import { useSnackbarStore } from "./services/snackbarStore";
import {usePopUpLayer} from "./services/popupLayer";

let snackbarStore = useSnackbarStore();
let popupLayer = usePopUpLayer();
</script>

<style scoped>
.v-btn__content {
  display: flex;
  flex-direction: column;
}

.connectText {
  margin-left: 10px;
}

v-snackbar {
  font-size: large;
}
</style>
