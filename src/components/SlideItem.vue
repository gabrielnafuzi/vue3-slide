<template>
  <li class="slide-item" :class="{ active }">
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
    },
    active: {
      type: Boolean,
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

  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  opacity: 0.8;
  transform: scale(0.8);
  transition: 0.4s;

  &.active {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
