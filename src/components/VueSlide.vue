<template>
  <div
    class="slide-wrapper"
    @mousedown="onStart"
    @mousemove="onMove"
    @mouseup="onEnd"
  >
    <ul
      class="slide"
      :style="{ transform: `translate3d(${distance.movePosition}px, 0, 0)` }"
    >
      <li v-for="imagePath in imagesPath" :key="imagePath">
        <img :src="imagePath" />
      </li>
    </ul>
  </div>

  {{ distance.movePosition }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'VueSlide',
  setup: () => {
    const isClicking = ref(false)
    const distance = ref({
      finalPosition: 0,
      startX: 0,
      movement: 0,
      movePosition: 0
    })

    const imagesPath: Array<string> = [
      'src/assets/img/foto1.jpg',
      'src/assets/img/foto2.jpg',
      'src/assets/img/foto3.jpg',
      'src/assets/img/foto4.jpg',
      'src/assets/img/foto5.jpg',
      'src/assets/img/foto6.jpg'
    ]

    function moveSlide(distanceX: number) {
      distance.value.movePosition = distanceX
    }

    function updatePosition(clientX: number) {
      distance.value.movement = (distance.value.startX - clientX) * 1.6

      return distance.value.finalPosition - distance.value.movement
    }

    function onStart(event: MouseEvent) {
      event.preventDefault()
      distance.value.startX = event.clientX

      isClicking.value = true
    }

    function onMove(event: MouseEvent) {
      if (isClicking.value) {
        const finalPosition = updatePosition(event.clientX)
        moveSlide(finalPosition)
      }
    }

    function onEnd(event: MouseEvent) {
      isClicking.value = false
      distance.value.finalPosition = distance.value.movePosition
    }

    return {
      imagesPath,
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
