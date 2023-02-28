<template>
  <v-btn @click="dialog = true">
    <v-icon icon="mdi-lan-pending"></v-icon>
    <div class="connectText">Mit Spieler verbinden</div>
  </v-btn>
  <v-dialog v-model="dialog" width="auto" transition="dialog-bottom-transition">
    <v-card title="Mit Spieler verbinden" class="dialogWrapper">
      <v-container fluid>
        <v-row>
          <v-col>
            <v-card title="Spiel erstellen">
              <v-card-text>
                Nach dem Erstellen kann die Nummer geteilt werden.
              </v-card-text>
              <v-card-text>
                <v-form @submit.prevent="submit">
                  <v-text-field
                    :readonly="true"
                    :model-value="createGameID"
                  ></v-text-field>
                  <v-btn
                    :loading="loading"
                    :disabled="loading"
                    @click="createGame()"
                    block
                    class="mt-2"
                    >Erstellen</v-btn
                  >
                </v-form></v-card-text
              >
            </v-card>
          </v-col>
          <v-col>
            <v-card title="Spiel beitreten">
              <v-card-text>Spiel ID des Spielerstellers eingeben. </v-card-text>
              <v-card-text>
                <v-form @submit.prevent="submit">
                  <v-text-field
                    v-model="gameID"
                    :rules="rules"
                    label="Spiel-ID"
                    hint="Bitte Spiel ID eingeben"
                  ></v-text-field>
                  <v-btn
                    :loading="loading"
                    :disabled="loading"
                    type="submit"
                    block
                    class="mt-2"
                    >Beitreten</v-btn
                  >
                </v-form></v-card-text
              >
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <!--   <v-card-text> Test123 </v-card-text>
             <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="tertiary"
          @click="
            dialog = false;
            reset();
          "
          >Schließen</v-btn
        >
        <v-btn
          color="secondary"
          @click="
            save();
            dialog = false;
          "
          >Speichern</v-btn
        >
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useGameStore } from "@/services/gameStore";
import { ref } from "vue";

let gameStore = useGameStore();

let dialog = ref<boolean>(false);
let gameID = ref<string>();
let createGameID = ref<string>();
let loading = ref<boolean>(false);

let rules = [
  (value: string) => {
    if (value) return true;
    return "Eingabe darf nicht leer sein!";
  },
];

async function submit(event: any) {
  const result = await event;
  if (result.valid === true) {
    loading.value = true;
    console.log(gameID);
    setTimeout(() => {
      alert("Es konnte nicht zu dem Spiel verbunden werden!");
      loading.value = false;
      return;
    }, 3000);
  }
}

function createGame() {
  gameStore.startGame("Test123");
  createGameID.value = "Test123";
}
</script>

<style scoped>
.dialogWrapper {
  min-width: 500px;
  max-width: min-content;
}
</style>
