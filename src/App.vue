<template>
  <VueSlide
    :images-url="[
      'https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      'https://images.unsplash.com/photo-1552083375-1447ce886485?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    ]"
    show-control
    control-with-thumbnail
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
@import '../dist/style.css';

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
