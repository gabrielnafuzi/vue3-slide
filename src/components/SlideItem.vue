<template>
  <li class="slide-item">
    <img :src="imageUrl" />
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SlideItem',
  props: {
    imageUrl: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.slide-item {
  flex-shrink: 0;
  width: 80vw;
  max-width: 800px;
  margin: 0 20px;
}
</style>
