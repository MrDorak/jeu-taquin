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

const onImageFileChange = (e: any) => {
  const file = e.target.files[0];
  imgUrl.value = URL.createObjectURL(file)
}
</script>

<template>
  <div style="max-width: 1500px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 3rem;">
    <Board :imgUrl="imgUrl" />
    <div style="display: flex; flex-direction: column; width: 100%; gap: 1rem; border: 1px solid #aaaaaa; border-radius: .5rem; padding: 1rem; background: #3d3d3d;">
      Paste the link to an image :
      <input :value="imgUrl" @change="handleImageChange" />
      Or upload your own image :
      <input type="file" @change="onImageFileChange" />
    </div>
  </div>
</template>
