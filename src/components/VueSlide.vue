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
      :style="[
        { transform: `translate3d(${distance.movePosition}px, 0, 0)` },
        transitionActive && { transition: 'transform .3s' }
      ]"
    >
      <SlideItem
        v-for="imageUrl in imagesUrl"
        :key="imageUrl"
        :image-url="imageUrl"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { SlideArrayItem, Distance, SlideIndex } from '../@types/slide'
import SlideItem from './SlideItem.vue'

export default defineComponent({
  name: 'VueSlide',
  components: {
    SlideItem
  },
  props: {
    imagesUrl: {
      type: Array,
      required: true
    }
  },
  setup: () => {
    const slide = ref<HTMLUListElement>()
    const slideWrapper = ref<HTMLDivElement>()
    const slideArray = ref<SlideArrayItem[]>([])
    const slideIndex = ref<SlideIndex>({
      prev: 0,
      active: 0,
      next: 0
    })
    const isClicking = ref<boolean>(false)
    const transitionActive = ref<boolean>(false)
    const distance = reactive<Distance>({
      finalPosition: 0,
      startX: 0,
      movement: 0,
      movePosition: 0
    })

    onMounted(() => {
      slideConfig()
      changeSlide(0)
      transitionActive.value = true
    })

    const onStart = (event: MouseEvent | TouchEvent): void => {
      isClicking.value = true

      if (event instanceof MouseEvent) {
        event.preventDefault()
        distance.startX = event.clientX

        return
      }

      distance.startX = event.changedTouches[0].clientX
      transitionActive.value = false
    }

    const onMove = (event: MouseEvent | TouchEvent): void => {
      const pointerPosition =
        event instanceof MouseEvent
          ? event.clientX
          : event.changedTouches[0].clientX

      if (isClicking.value) {
        const finalPosition = updatePosition(pointerPosition)
        moveSlide(finalPosition)
      }
    }

    const onEnd = (): void => {
      isClicking.value = false
      distance.finalPosition = distance.movePosition
      transitionActive.value = true
      changeSlideOnEnd()
    }

    const changeSlideOnEnd = (): void => {
      const size = 120
      const hasNext = slideIndex.value.next !== null
      const hasPrev = slideIndex.value.prev !== null

      if (distance.movement > size && hasNext) {
        activeNextSlide()
        return
      }

      if (distance.movement < -size && hasPrev) {
        activePrevSlide()
        return
      }

      changeSlide(slideIndex.value.active)
    }

    const updatePosition = (clientX: number): number => {
      distance.movement = (distance.startX - clientX) * 1.6

      return distance.finalPosition - distance.movement
    }

    const slidePosition = (element: HTMLLIElement): number => {
      const offsetWidth = slideWrapper.value?.offsetWidth ?? 0
      const margin: number = (offsetWidth - element.offsetWidth) / 2

      return -(element.offsetLeft - margin)
    }

    const moveSlide = (distanceX: number): void => {
      distance.movePosition = distanceX
    }

    const changeSlide = (index: number): void => {
      const activeSlide = slideArray.value[index]

      moveSlide(activeSlide.position)
      slideIndexNav(index)
      distance.finalPosition = activeSlide.position
    }

    const slideIndexNav = (index: number): void => {
      const last = slideArray.value.length - 1

      slideIndex.value.prev = index ? index - 1 : null
      slideIndex.value.active = index
      slideIndex.value.next = index === last ? null : index + 1
    }

    const slideConfig = (): void => {
      const slideChildren: HTMLLIElement[] = Object.values({
        ...slide.value?.children
      } as HTMLLIElement[])

      slideChildren.forEach((element: HTMLLIElement) => {
        const position: number = slidePosition(element)

        slideArray.value?.push({
          element,
          position
        })
      })
    }

    const activePrevSlide = (): void => {
      if (slideIndex.value.prev !== null) {
        changeSlide(slideIndex.value.prev ?? 0)
      }
    }

    const activeNextSlide = (): void => {
      if (slideIndex.value.next !== null) {
        changeSlide(slideIndex.value.next ?? 0)
      }
    }

    return {
      slide,
      slideWrapper,
      distance,
      onStart,
      onMove,
      onEnd,
      transitionActive
    }
  }
})
</script>

<style lang="scss" scoped>
.slide {
  display: flex;
}
</style>
