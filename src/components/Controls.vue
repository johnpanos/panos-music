<template>
  <span>
    <v-btn flat icon @click.stop="previous">
      <v-icon size="36">skip_previous</v-icon>
    </v-btn>
    <v-btn flat icon @click.stop="onClick">
      <p size="36" v-html="currentState == 'paused' ? 'play_arrow' : 'pause_arrow'"></p>
    </v-btn>
    <v-btn flat icon @click.stop="next">
      <v-icon size="36">skip_next</v-icon>
    </v-btn>
  </span>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Controls',
  computed: mapState({
    currentState: 'currentState',
    currentMedia: 'currentMedia',
    progress: 'progress'
  }),
  methods: {
    onClick () {
      this.$store.dispatch(this.currentState == "playing" ? "pause" : "play");
    },
    previous () {
      this.$store.dispatch("previous");
    },
    next () {
      this.$store.dispatch("next");
    }
  }
}
</script>

<style scoped>
</style>
