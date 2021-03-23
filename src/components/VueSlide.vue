<template>
  <div class="slide-container">
    <div
      ref="slideWrapper"
      :style="{
        pointerEvents: showArrowNavigation ? 'none' : 'all',
        userSelect: showArrowNavigation ? 'none' : 'all'
      }"
      class="slide-wrapper"
      @mousedown="onStart"
      @mouseup="onEnd"
      @touchstart="onStart"
      @touchend="onEnd"
      @[moveType]="onMove"
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
          v-for="(imageUrl, index) in imagesUrl"
          :key="imageUrl"
          :image-url="imageUrl"
          :active="index === slideIndex.active"
        />
      </ul>
    </div>

    <SlideArrowNavigation
      v-if="showArrowNavigation"
      @prev="activePrevSlide"
      @next="activeNextSlide"
    />

    <slot v-if="showControl" name="custom-control">
      <SlideControl
        :images-length="imagesUrl.length"
        :active-index="slideIndex.active"
        :dots-color="controlDotsColor"
        :active-dot-color="controlActiveDotColor"
        @change-to="changeSlide"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'

import SlideItem from './SlideItem.vue'
import SlideArrowNavigation from './SlideArrowNavigation.vue'
import SlideControl from './SlideControl.vue'

import { SlideArrayItem, Distance, SlideIndex } from '../@types/slide'
import debounce from '../helpers/debounce'

export default defineComponent({
  name: 'VueSlide',
  components: {
    SlideItem,
    SlideArrowNavigation,
    SlideControl
  },
  props: {
    imagesUrl: {
      type: Array,
      required: true
    },
    showArrowNavigation: {
      type: Boolean,
      required: false,
      default: false
    },
    showControl: {
      type: Boolean,
      required: false,
      default: false
    },
    controlDotsColor: {
      type: String,
      required: false,
      default: '#404040c4'
    },
    controlActiveDotColor: {
      type: String,
      required: false,
      default: '#222'
    },
    autoplay: {
      type: Boolean,
      required: false,
      default: false
    },
    autoplayDelay: {
      type: Number,
      required: false,
      default: 4500
    }
  },
  setup: props => {
    const slide = ref<HTMLUListElement>()
    const slideWrapper = ref<HTMLDivElement>()
    const slideArray = ref<SlideArrayItem[]>([])
    const slideIndex = ref<SlideIndex>({
      prev: 0,
      active: 0,
      next: 0
    })
    const moveType = ref<string | null>(null)
    const transitionActive = ref<boolean>(false)
    const distance = reactive<Distance>({
      finalPosition: 0,
      startX: 0,
      movement: 0,
      movePosition: 0
    })
    const autoplayInterval = ref<number>(0)

    onMounted(() => {
      transitionActive.value = true
      slideConfig()
      changeSlide(0)
      addResizeEvent()

      props.autoplay && slideAutoplay()
    })

    const onStart = (event: MouseEvent | TouchEvent): void => {
      transitionActive.value = false

      if (event instanceof MouseEvent) {
        event.preventDefault()
        distance.startX = event.clientX
        moveType.value = 'mousemove'

        return
      }

      distance.startX = event.changedTouches[0].clientX
      moveType.value = 'touchmove'
    }

    const onMove = (event: MouseEvent | TouchEvent): void => {
      const pointerPosition =
        event instanceof MouseEvent
          ? event.clientX
          : event.changedTouches[0].clientX

      const finalPosition = updatePosition(pointerPosition)
      moveSlide(finalPosition)
    }

    const onEnd = (): void => {
      moveType.value = null
      distance.finalPosition = distance.movePosition
      transitionActive.value = true
      changeSlideOnEnd()
    }

    const onResize = (): void => {
      setTimeout(() => {
        slideConfig()
        changeSlide(slideIndex.value.active)
      }, 100)
    }

    const addResizeEvent = (): void => {
      window.addEventListener('resize', debounce(onResize, 200))
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

      slideArray.value = slideChildren.map((element: HTMLLIElement) => ({
        element,
        position: slidePosition(element)
      }))
    }

    const activePrevSlide = (): void => {
      clearInterval(autoplayInterval.value)

      if (slideIndex.value.prev !== null) {
        changeSlide(slideIndex.value.prev)
      }

      props.autoplay && slideAutoplay()
    }

    const activeNextSlide = (): void => {
      clearInterval(autoplayInterval.value)
      changeSlide(slideIndex.value.next !== null ? slideIndex.value.next : 0)

      props.autoplay && slideAutoplay()
    }

    const slideAutoplay = (): void => {
      const { autoplayDelay: delay } = props

      autoplayInterval.value = setInterval(() => {
        activeNextSlide()
      }, delay)
    }

    return {
      slide,
      slideIndex,
      slideWrapper,
      distance,
      onStart,
      onMove,
      onEnd,
      transitionActive,
      moveType,
      activePrevSlide,
      activeNextSlide,
      changeSlide
    }
  }
})
</script>

<style lang="scss" scoped>
.slide-container {
  position: relative;
  display: flex;
  justify-content: center;
}

.slide-wrapper {
  overflow: hidden;
}

.slide {
  display: flex;

  &:hover {
    will-change: transform;
  }
}
</style>
