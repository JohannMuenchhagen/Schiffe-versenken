<template>
  <v-app>
    <v-app-bar :elevation="2" density="compact" color="tertiary">
      <template v-slot:prepend>
        <v-icon icon="mdi-ferry"></v-icon>
      </template>
      <v-app-bar-title>Schiffe versenken</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon icon="mdi-magnify"></v-icon>
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

<style scoped></style>
