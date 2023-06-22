<script setup lang="ts">
const props = defineProps<{
  index: number,
  tile: number,
  width: number,
  height: number,
  isLast: boolean,
  numberHint: boolean,
  imgUrl: string | null,
  handleTileClick: Function
}>()

const GRID_SIZE = 4;
const BOARD_SIZE = GRID_SIZE * 80;

const visualPos = {
  x: props.index % GRID_SIZE * props.width, // col
  y: Math.floor(props.index / GRID_SIZE) * props.height, // row
};
</script>

<template>
  <li
      :style="{
        width: `calc(100% / ${GRID_SIZE})`,
        height: `calc(100% / ${GRID_SIZE})`,
        'background-size': `${BOARD_SIZE}px`,
        'opacity': +isLast,
        'transform': `translate3d(${visualPos.x}px, ${visualPos.y}px, 0)`,
        'background-image' : `url(${props.imgUrl})`,
        'background-position' : `${(100 / (GRID_SIZE - 1)) * (props.tile % GRID_SIZE)}% ${(100 / (GRID_SIZE - 1)) * (Math.floor(props.tile / GRID_SIZE))}%`
      }"
      class="tile"
      @click="handleTileClick(index)"
  >
    <span v-if="!imgUrl || numberHint">{{ tile + 1 }}</span>
  </li>
</template>

