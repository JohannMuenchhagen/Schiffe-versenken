<template>
  <v-card class="card" loading title="Mit keinem Spieler verbunden!">
    <v-card-text class="cardContent">
      <v-list>
        <div>Hinweis:</div>

        <v-list-item active-color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-ferry"></v-icon>
          </template>

          <v-list-item-title
            >Nutze die oben die Schaltfläche <br />
            "Mit Spieler vebinden", um die <br />
            Schlacht zu starten!</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts"></script>

<style scoped></style>
