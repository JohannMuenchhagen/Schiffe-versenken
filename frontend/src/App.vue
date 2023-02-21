<template>
  <v-app>
    <v-app-bar :elevation="2" density="compact" color="tertiary">
      <template v-slot:prepend>
        <v-icon icon="mdi-ferry"></v-icon>
      </template>
      <v-app-bar-title>Schiffe versenken</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn>
        <v-icon icon="mdi-lan-pending"></v-icon>
        <div class="connectText">Mit Spieler verbinden</div>
      </v-btn>
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
  </v-app>
</template>

<script setup lang="ts">
import SettingsDialog from "@/components/SettingsDialog.vue";
</script>

<style scoped>
.v-btn__content {
  display: flex;
  flex-direction: column;
}

.connectText {
  margin-left: 10px;
}
</style>
