<template>
  <ul class="control-thumbnail">
    <SlideThumbnailItem
      v-for="(imageUrl, index) in imagesUrl"
      :key="imageUrl"
      :image-url="imageUrl"
      :class="{ active: activeIndex === index }"
      @change-to="emit('changeTo', index)"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SlideThumbnailItem from './SlideThumbnailItem.vue'

export default defineComponent({
  name: 'SlideControlWithThumbnail',
  components: {
    SlideThumbnailItem
  },
  props: {
    imagesUrl: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  setup: (_, { emit }) => {
    return { emit }
  }
})
</script>

<style scoped>
.control-thumbnail {
  bottom: -62px;
}
</style>
