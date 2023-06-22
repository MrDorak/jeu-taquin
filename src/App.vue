<script setup lang="ts">
import Board from "./components/Board.vue";
import {onMounted, ref} from "vue";
import { updateURLParameter } from "./helpers.js"

const imgUrl = ref<string | null>("https://yt3.googleusercontent.com/-05eUqz51cwYE5KjSuNr4p82byUbMTPPiELRibfNFz9DW5cCCinQNtZy3L2dREcuQvTZyCbXoA=s900-c-k-c0x00ffffff-no-rj")

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)

  if (urlParams.has("img")) {
    imgUrl.value = urlParams.get("img")
  }
})

const handleImageChange = (e: any) => {
  imgUrl.value = e.target.value
  window.history.replaceState("", "", updateURLParameter(window.location.href, "img", e.target.value))
}
</script>

<template>
  <Board :imgUrl="imgUrl" />
  <div>
    Paste the link to an image here :
    <input :value="imgUrl" @change="handleImageChange" />
  </div>
</template>
