<template>
  <main>
    <v-container fluid fill-height>
      <v-row>
        <v-col>
          <GameBoard class="board"></GameBoard>
        </v-col>
        <v-col>
          <GameBoard class="board"></GameBoard>
        </v-col>
        <v-card class="cardWrapper" loading title="Es ist dein Zug!">
          <v-card-text class="cardContent">
            <v-list>
              <div>Übrige Schiffe des Gegners:</div>

              <v-list-item active-color="primary">
                <template v-slot:prepend>
                  <v-icon icon="mdi-ferry"></v-icon>
                </template>

                <v-list-item-title
                  >1x 5er-Schiff - das Schlachtschiff</v-list-item-title
                >
              </v-list-item>
              <v-list-item active-color="primary">
                <template v-slot:prepend>
                  <v-icon icon="mdi-ferry"></v-icon>
                </template>

                <v-list-item-title
                  >2x 4er-Schiffe - die Kreuzer</v-list-item-title
                >
              </v-list-item>
              <v-list-item active-color="primary">
                <template v-slot:prepend>
                  <v-icon icon="mdi-ferry"></v-icon>
                </template>

                <v-list-item-title
                  >3x 3er-Schiffe - die Zerstörer</v-list-item-title
                >
              </v-list-item>
              <v-list-item active-color="primary">
                <template v-slot:prepend>
                  <v-icon icon="mdi-ferry"></v-icon>
                </template>

                <v-list-item-title
                  >4x 2er-Schiffe - die U-Boote</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </main>
</template>

<script setup lang="ts">
import GameBoard from "@/components/GameBoard.vue";
</script>

<style scoped>
.board {
  aspect-ratio: 1 / 1;
  max-width: 500px;
  min-width: 300px;
}

.cardWrapper {
  width: fit-content;
  margin: 12px;
  height: fit-content;
}
</style>
