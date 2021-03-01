<template>
  <div>
    <ul>
      <li v-for="imagePath in imagesPath" :key="imagePath">
        <img :src="imagePath" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VueSlide',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const imagesPath: Array<string> = [
      'src/assets/img/foto1.jpg',
      'src/assets/img/foto2.jpg',
      'src/assets/img/foto3.jpg',
      'src/assets/img/foto4.jpg',
      'src/assets/img/foto5.jpg',
      'src/assets/img/foto6.jpg'
    ]

    return {
      imagesPath
    }
  }
})
</script>
