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
