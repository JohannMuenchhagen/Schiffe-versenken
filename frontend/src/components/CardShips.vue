<template>
  <v-card class="card" loading title="Es ist dein Zug!">
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

          <v-list-item-title>2x 4er-Schiffe - die Kreuzer</v-list-item-title>
        </v-list-item>
        <v-list-item active-color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-ferry"></v-icon>
          </template>

          <v-list-item-title>3x 3er-Schiffe - die Zerstörer</v-list-item-title>
        </v-list-item>
        <v-list-item active-color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-ferry"></v-icon>
          </template>

          <v-list-item-title>4x 2er-Schiffe - die U-Boote</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts"></script>

<style scoped></style>
