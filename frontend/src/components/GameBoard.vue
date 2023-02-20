<template>
  <v-container fluid fill-height>
    <v-row dense v-for="y in 10" :key="y">
      <v-col v-for="x in 10" :key="x">
        <v-sheet color="grey-lighten-2" class="tileWrapper"></v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts"></script>

<style scoped>
.tileWrapper {
  width: auto;
  aspect-ratio: 1/1;
}
</style>
