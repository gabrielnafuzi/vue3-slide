<template>
  <VueSlide
    :images-url="[
      'src/assets/img/foto1.jpg',
      'src/assets/img/foto2.jpg',
      'src/assets/img/foto3.jpg',
      'src/assets/img/foto4.jpg',
      'src/assets/img/foto5.jpg',
      'src/assets/img/foto6.jpg'
    ]"
  />
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
