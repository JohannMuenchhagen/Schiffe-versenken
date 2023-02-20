<template>
  <v-btn icon @click="dialog = true">
    <v-icon icon="mdi-dots-vertical"></v-icon>
  </v-btn>
  <v-dialog v-model="dialog" width="auto" transition="dialog-bottom-transition">
    <v-card title="Einstellungen" class="dialogWrapper">
      <v-card-text>
        <v-switch
          v-model="themeTmp"
          true-value="dark"
          false-value="light"
          color="secondary"
          label="Darkmode einschalten"
          @click="toggelTheme()"
        ></v-switch>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="tertiary" @click="dialog = false">Schließen</v-btn>
        <v-btn
          color="secondary"
          @click="
            save();
            dialog = false;
          "
          >Speichern</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTheme } from "vuetify";

let dialog = ref<boolean>(false);

const theme = useTheme();
let themeTmp = ref(theme.global.name.value);

function toggelTheme() {
  if (themeTmp.value === "dark") {
    themeTmp.value = "light";
  } else {
    themeTmp.value = "dark";
  }
}

function save() {
  theme.global.name.value = themeTmp.value;
}
</script>

<style scoped></style>
