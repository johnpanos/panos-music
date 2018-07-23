<template>
  <v-card class="Card" @mouseover="mouseOver" @mouseout="mouseOut" v-on:dblclick="playSong()">
    <div class="ButtonContainer">
      <img v-lazy="formatArtworkUrl()" class="Image"/>
      <transition name="fade">
        <v-btn
          v-if="showPlayButton"
          color="primary"
          dark
          small
          absolute
          fab
          class="PlayButton"
          @click.stop="playSong()"
        >
          <v-icon>play_arrow</v-icon>
        </v-btn>
      </transition>
    </div>
    <v-card-title class="Title">
      {{ name }}
    </v-card-title>
    <v-card-title class="Title Subtitle">{{ artist }}</v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    name: String,
    artist: String,
    artwork: Object,
    media: Object
  },
  data () {
    return {
      showPlayButton: false
    }
  },
  methods: {
    formatArtworkUrl() {
      return window.MusicKit.formatArtworkURL(this.artwork, 250, 250);
    },
    mouseOver() {
      this.showPlayButton = true;
    },
    mouseOut() {
      this.showPlayButton = false;
    },
    playSong() {
      this.$store.dispatch('playSong', { song: this.media });
    },
  }
}
</script>

<style scoped>
.Card {
  margin-bottom: 10px;
  margin-right: 10px
}
.Image {
  width: 100%;
  height: auto;
}
.Title {
  margin-left: 15px;
  margin-bottom: 3px;
  font-size: 1.3rem;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0;
}
.Subtitle {
  padding-bottom: 10px;
  font-size: 1.0rem;
}
.ButtonContainer {
  position: relative;
}
.PlayButton {
  left: 10px;
  bottom: 15px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
