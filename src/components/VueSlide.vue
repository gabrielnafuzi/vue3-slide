<template>
  <div
    class="slide-wrapper"
    @mousedown="onStart"
    @mousemove="onMove"
    @mouseup="onEnd"
  >
    <ul class="slide">
      <li v-for="imagePath in imagesPath" :key="imagePath">
        <img :src="imagePath" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'VueSlide',
  setup: () => {
    const isClicking = ref(false)

    const imagesPath: Array<string> = [
      'src/assets/img/foto1.jpg',
      'src/assets/img/foto2.jpg',
      'src/assets/img/foto3.jpg',
      'src/assets/img/foto4.jpg',
      'src/assets/img/foto5.jpg',
      'src/assets/img/foto6.jpg'
    ]

    function onStart(event: MouseEvent) {
      event.preventDefault()
      isClicking.value = true
      console.log('mousedown')
    }

    function onMove(event: MouseEvent) {
      if (isClicking.value) {
        console.log('moveu')
      }
    }

    function onEnd(event: MouseEvent) {
      isClicking.value = false
      console.log('mouseup')
    }

    return {
      imagesPath,
      onStart,
      onMove,
      onEnd
    }
  }
})
</script>

<style lang="scss" scoped>
.slide-wrapper {
  overflow: hidden;
}

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
