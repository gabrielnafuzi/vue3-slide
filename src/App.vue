<template>
  <VueSlide />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VueSlide from './components/VueSlide.vue'

export default defineComponent({
  name: 'App',
  components: {
    VueSlide
  }
})
</script>

<style lang="scss">
body {
  margin: 0px;
}

ul {
  padding: 0px;
  margin: 0px;
  list-style: none;
}

img {
  display: block;
  max-width: 100%;
}
</style>
