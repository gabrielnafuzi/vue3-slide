<template>
  <div class="arrow-navigation">
    <button class="arrow arrow-prev" @click="emit('prev')">
      <svg width="20px" height="40px" viewBox="0 0 50 80" xml:space="preserve">
        <polyline
          fill="none"
          stroke="#FFFFFF"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          points="45.63,75.8 0.375,38.087 45.63,0.375"
        />
      </svg>
    </button>
    <button class="arrow arrow-next" @click="emit('next')">
      <svg width="20px" height="40px" viewBox="0 0 50 80" xml:space="preserve">
        <polyline
          fill="none"
          stroke="#FFFFFF"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          points="0.375,0.375 45.63,38.087 0.375,75.8"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SlideArrowNavigation',
  setup: (_, { emit }) => {
    return { emit }
  }
})
</script>

<style scoped>
.arrow-navigation {
  position: absolute;
  height: 100%;
  width: 80vw;
  max-width: 850px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
}
.arrow {
  -webkit-appearance: none;
  border: 0;
  outline: 0;
  background: rgba(64, 64, 64, 0.77);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  padding: 0;
  cursor: pointer;
}
.arrow-prev:hover polyline,
.arrow-next:hover polyline,
.arrow-prev:focus polyline,
.arrow-next:focus polyline {
  stroke-width: 6;
}
.arrow-prev:active polyline,
.arrow-next:active polyline {
  stroke-width: 8;
  transition: all 0.1s ease-in-out;
}
.arrow polyline {
  transition: all 0.25s ease-in-out;
}
</style>
