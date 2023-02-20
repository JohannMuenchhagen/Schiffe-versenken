<template>
  <v-btn icon @click="dialog = true">
    <v-icon icon="mdi-dots-vertical"></v-icon>
  </v-btn>
  <v-dialog v-model="dialog" width="auto" transition="dialog-bottom-transition">
    <v-card title="Einstellungen" class="dialogWrapper">
      <v-card-text>
        <v-switch color="secondary" label="Darkmode einschalten"></v-switch>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="tertiary" @click="dialog = false">Schließen</v-btn>
        <v-btn color="secondary" @click="dialog = false">Speichern</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

let dialog = ref<boolean>(false);
</script>

<style scoped></style>
