<template>
  <v-card class="Card">
    <img :src="formatArtworkUrl()" class="Image"/>
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
    artwork: Object
  },
  methods: {
    formatArtworkUrl() {
      return window.MusicKit.formatArtworkURL(this.artwork, 500, 500);
    }
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
</style>
