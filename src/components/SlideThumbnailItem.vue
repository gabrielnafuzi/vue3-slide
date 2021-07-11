<template>
  <div class="slide-thumbnail-item" @click="emit('changeTo')">
    <img :src="imageUrl" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SlideThumbnailItem',
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    }
  },
  setup: (_, { emit }) => {
    return { emit }
  }
})
</script>

<style scoped>
.slide-thumbnail-item {
  opacity: 0.8;
  transform: scale(0.8);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  margin: 4px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  display: flex;

  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  transition: 0.3s;
}

.slide-thumbnail-item.active {
  opacity: 1;
  transform: scale(1);
}
</style>
