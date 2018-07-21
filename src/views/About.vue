<template>
  <div class="about">
    <v-btn v-on:click="counter = counter + 1">{{ counter }}</v-btn>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      text: 'This is an about page nerd',
      counter: 0
    }
  }
}
</script>