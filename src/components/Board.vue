<script setup lang="ts">
import {computed, ref} from 'vue'
import Tile from "./Tile.vue";
import {canSwap, shuffle, swap} from "./../helpers.js"

defineProps<{
  imgUrl: string | null
}>()

const GRID_SIZE = 4;
const BOARD_SIZE = GRID_SIZE * 80;
const TILE_COUNT = GRID_SIZE ** 2;

const tiles = ref([...Array(TILE_COUNT).keys()])

const style = {
  width: `${BOARD_SIZE}px`,
  height: `${BOARD_SIZE}px`,
}

const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);

const isStarted = ref(false);
const numberHint = ref(false);

const hasWon = computed(() => {
  for (let i = 0, l = tiles.value.length; i < l; i++) {
    if (tiles.value[i] !== i) {
      return false;
    }
  }
  return true;
});

const shuffleTiles = () => {
  tiles.value = shuffle(tiles.value);
}

const swapTiles = (tileIndex: number) => {
  if (canSwap(tileIndex, tiles.value.indexOf(tiles.value.length - 1))) {
    tiles.value = swap(tiles.value, tileIndex, tiles.value.indexOf(tiles.value.length - 1))
  }
}

const handleTileClick = (index: number) => {
  swapTiles(index)
}

const handleShuffleClick = () => {
  shuffleTiles()
}

const handleStartClick = () => {
  shuffleTiles()
  isStarted.value = true
}


</script>

<template>
  <ul :style="style" class="board">
    <Tile
        v-for="(tile, idx) in tiles"
        :key="idx"
        :index="idx"
        :tile="tile"
        :width="pieceWidth"
        :height="pieceHeight"
        :isLast="tile !== TILE_COUNT - 1"
        :imgUrl="imgUrl"
        :handleTileClick="handleTileClick"
        :numberHint="numberHint"
    ></Tile>
  </ul>
  <div v-if="hasWon && isStarted">
    Vous avez gagné !
  </div>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <label for="number_hint"><input type="checkbox" id="number_hint" @change="numberHint = !numberHint">Show number</label>
    <button @click="isStarted ? handleShuffleClick() : handleStartClick()">
      {{ isStarted ? 'Restart game' : 'Start game' }}
    </button>
  </div>
</template>

