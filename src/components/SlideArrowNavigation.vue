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

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup: (_, { emit }) => {
    return { emit }
  }
})
</script>

<style lang="scss" scoped>
.arrow-navigation {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
}

.arrow {
  -webkit-appearance: none;
  background: transparent;
  border: 0;
  outline: 0;
  background: rgba(15, 15, 15, 0.7);
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  padding: 0;

  cursor: pointer;

  &-prev,
  &-next {
    &:hover,
    &:focus {
      polyline {
        stroke-width: 5;
      }
    }

    &:active polyline {
      stroke-width: 7;
      transition: all 100ms ease-in-out;
    }
  }

  polyline {
    transition: all 250ms ease-in-out;
  }
}
</style>
