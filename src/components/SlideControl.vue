<template>
  <ul class="slide-control" :style="cssVars">
    <li
      v-for="(item, index) in imagesLength"
      :key="item"
      :class="{ active: activeIndex === index }"
    >
      <button @click="emit('changeTo', index)">
        {{ item }}
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'SlideControl',
  props: {
    imagesLength: {
      type: Number,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    },
    dotsColor: {
      type: String,
      required: true
    },
    activeDotColor: {
      type: String,
      required: true
    }
  },
  setup: (props, { emit }) => {
    const cssVars = computed(() => ({
      '--dots-color': props.dotsColor,
      '--active-dot-color': props.activeDotColor
    }))

    return { emit, cssVars }
  }
})
</script>

<style scoped>
.slide-control {
  bottom: -44px;
}
.slide-control li button {
  display: block;
  width: 13px;
  height: 13px;
  background: var(--dots-color);
  border-radius: 50%;
  overflow: hidden;
  text-indent: -9999px;
  margin: 5px;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  transition: 0.4s all ease;
}
.slide-control li.active button,
.slide-control li button:hover {
  background: var(--active-dot-color);
}
</style>
