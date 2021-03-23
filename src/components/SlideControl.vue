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

<style lang="scss" scoped>
.slide-control {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  position: absolute;
  z-index: 20;
  bottom: -44px;

  li {
    button {
      display: block;
      width: 13px;
      height: 13px;
      background: var(--dots-color);
      border-radius: 50%;
      overflow: hidden;
      text-indent: -9999px;
      margin: 5px;
      border: none;
      cursor: pointer;
      outline: none;
      transition: 0.4s all ease;
    }

    &.active button,
    button:hover {
      background: var(--active-dot-color);
    }
  }
}
</style>
