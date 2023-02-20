<template>
  <v-container fluid fill-height>
    <v-row dense v-for="y in 10" :key="y">
      <v-col v-for="x in 10" :key="x">
        <v-sheet
          color="grey-lighten-2"
          class="tileWrapper"
          @click="emitTile(x, y, $event)"
        >
          <v-icon icon=""></v-icon>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "change", id: { x: number; y: number }): void;
}>();

function emitTile(x: number, y: number, event: any) {
  event.target.firstChild.classList.add("mdi");
  event.target.firstChild.classList.add("mdi-waves");
  event.target.classList.remove("tileWrapper");
  emit("change", { x: x, y: y });
}
</script>

<style scoped>
.v-sheet {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  aspect-ratio: 1/1;
}

.v-icon {
  pointer-events: none;
}
.tileWrapper {
  cursor: pointer;
}
.tileWrapper:hover {
  background-color: #c0c0c0 !important;
}
</style>
