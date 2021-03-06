<template>
  <div
    ref="slideWrapper"
    class="slide-wrapper"
    @mousedown="onStart"
    @mousemove="onMove"
    @mouseup="onEnd"
    @touchstart="onStart"
    @touchmove="onMove"
    @touchend="onEnd"
  >
    <ul
      ref="slide"
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
import { defineComponent, onMounted, reactive, ref } from 'vue'

interface SlideArrayValue {
  element: HTMLLIElement
  position: number
}

export default defineComponent({
  name: 'VueSlide',
  props: {
    imagesUrl: {
      type: Array,
      required: true
    }
  },
  setup: () => {
    const slide = ref<HTMLUListElement>()
    const slideWrapper = ref<HTMLDivElement>()
    const isClicking = ref(false)
    const slideArray = ref<SlideArrayValue[]>([])
    const distance = reactive({
      finalPosition: 0,
      startX: 0,
      movement: 0,
      movePosition: 0
    })

    onMounted(() => {
      slidesConfig()
    })

    const moveSlide = (distanceX: number) => {
      distance.movePosition = distanceX
    }

    const updatePosition = (clientX: number) => {
      distance.movement = (distance.startX - clientX) * 1.6

      return distance.finalPosition - distance.movement
    }

    const onStart = (event: MouseEvent | TouchEvent) => {
      isClicking.value = true
      slidesConfig()

      if (event instanceof MouseEvent) {
        event.preventDefault()
        distance.startX = event.clientX

        return
      }

      distance.startX = event.changedTouches[0].clientX
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
      distance.finalPosition = distance.movePosition
    }

    const slidesConfig = () => {
      const slideChildren: HTMLLIElement[] = Object.values({
        ...slide.value?.children
      } as HTMLLIElement[])

      slideChildren.forEach((slide: HTMLLIElement) => {
        slideArray.value?.push({
          element: slide,
          position: slide.offsetLeft
        })
      })
    }

    return {
      slide,
      slideWrapper,
      distance,
      onStart,
      onMove,
      onEnd,
      slidesConfig
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
