<template>
  <div
    class="slide-wrapper"
    @mousedown="onStart"
    @mousemove="onMove"
    @mouseup="onEnd"
    @touchstart="onStart"
    @touchmove="onMove"
    @touchend="onEnd"
  >
    <ul
      class="slide"
      :style="{ transform: `translate3d(${distance.movePosition}px, 0, 0)` }"
    >
      <li v-for="imageUrl in imagesUrl" :key="imageUrl">
        <img :src="imageUrl" />
      </li>
    </ul>
  </div>

  {{ distance.movePosition }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'VueSlide',
  props: {
    imagesUrl: {
      type: Array,
      required: true
    }
  },
  setup: () => {
    const isClicking = ref(false)
    const distance = ref({
      finalPosition: 0,
      startX: 0,
      movement: 0,
      movePosition: 0
    })

    const moveSlide = (distanceX: number) => {
      distance.value.movePosition = distanceX
    }

    const updatePosition = (clientX: number) => {
      distance.value.movement = (distance.value.startX - clientX) * 1.6

      return distance.value.finalPosition - distance.value.movement
    }

    const onStart = (event: MouseEvent | TouchEvent) => {
      isClicking.value = true

      if (event instanceof MouseEvent) {
        event.preventDefault()
        distance.value.startX = event.clientX
      } else {
        distance.value.startX = event.changedTouches[0].clientX
      }
    }

    const onMove = (event: MouseEvent | TouchEvent) => {
      const pointerPosition =
        event instanceof MouseEvent
          ? event.clientX
          : event.changedTouches[0].clientX

      if (isClicking.value) {
        const finalPosition = updatePosition(pointerPosition)
        moveSlide(finalPosition)
      }
    }

    const onEnd = () => {
      isClicking.value = false
      distance.value.finalPosition = distance.value.movePosition
    }

    return {
      distance,
      onStart,
      onMove,
      onEnd
    }
  }
})
</script>

<style lang="scss" scoped>
.slide {
  display: flex;

  li {
    flex-shrink: 0;
    width: 80vw;
    max-width: 800px;
    margin: 0 20px;
  }
}
</style>
