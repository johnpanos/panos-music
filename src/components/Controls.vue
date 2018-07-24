<template>
  <span>
    <v-btn flat icon @click.stop="previous">
      <v-icon size="32">skip_previous</v-icon>
    </v-btn>
    <v-btn flat icon @click.stop="onClick" v-if="currentState === 'playing' || currentState === 'waiting' || currentState === 'loading'"> 
      <v-icon size="36">stop</v-icon>
    </v-btn>
    <v-btn flat icon @click.stop="onClick" v-if="currentState === 'paused' || currentState === 'stopped'"> 
      <v-icon size="36">play_arrow</v-icon>
    </v-btn>
    <v-btn flat icon @click.stop="next">
      <v-icon size="32">skip_next</v-icon>
    </v-btn>
  </span>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Controls',
  computed: mapState('player', {
    currentState: 'currentState',
    currentMedia: 'currentMedia',
    progress: 'progress'
  }),
  methods: {
    onClick () {
      this.$store.dispatch(this.currentState == "playing" ? "player/pause" : "player/play");
    },
    previous () {
      this.$store.dispatch("player/previous");
    },
    next () {
      this.$store.dispatch("player/next");
    }
  }
}
</script>

<style scoped>
</style>
