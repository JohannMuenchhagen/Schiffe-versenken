<template>
  <main>
    <v-container fluid fill-height>
      <v-row>
        <v-col>
          <OwnGameBoard class="board"></OwnGameBoard>
        </v-col>
        <v-col>
          <EnemyGameBoard class="board"></EnemyGameBoard>
        </v-col>
        <div class="cardWrapper">
          <CardPlacement></CardPlacement>
          <CardShips></CardShips>
        </div>
      </v-row>
    </v-container>
  </main>
</template>

<script setup lang="ts">
import CardShips from "@/components/CardShips.vue";
import OwnGameBoard from "@/components/OwnGameBoard.vue";
import EnemyGameBoard from "@/components/EnemyGameBoard.vue";
import CardPlacement from "@/components/CardPlacement.vue";
</script>

<style scoped>
.board {
  aspect-ratio: 1 / 1;
  max-width: 500px;
  min-width: 350px;
}

.cardWrapper {
  width: 25em;
  margin: 12px;
  height: fit-content;
}
</style>
