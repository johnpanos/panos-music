<template>
      <v-card class="Card">
        <v-layout fill-height align-start>
        <img class="Image" :src="formatArtworkUrl(currentMedia)"/>
        <v-layout align-space-between justify-space-between column fill-height="">
            <v-layout fill-height align-center column>
              <v-flex xs6 align-center>
                <p v-if="currentMedia" class="Title">{{ currentMedia.item.title }}</p>
              </v-flex>
              <v-flex xs6 align-center justify-center style="text-align:center;">
                <p v-if="currentMedia" class="Subtitle">{{ currentMedia.item.artistName}} - {{ currentMedia.item.albumName }}</p>
              </v-flex>
            </v-layout>
            <v-progress-linear
              v-model="progress"
              :active="currentState != 'stopped'"
              :indeterminate="currentState == 'waiting' || currentState == 'loading'"
              class="Progress"
            ></v-progress-linear>
        </v-layout>
        </v-layout>
      </v-card>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Player',
  computed: mapState('player', {
    currentState: 'currentState',
    currentMedia: 'currentMedia',
    progress: 'progress'
  }),
  methods: {
    formatArtworkUrl(media) {
      return window.MusicKit.formatArtworkURL(this.currentMedia.item.attributes.artwork, 250, 250);
    }
  }
}
</script>

<style scoped>
.Title {
  margin: 0;
  padding: 0;
  font-size: 1.5em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
.Subtitle {
  margin: 0;
  font-size: 1.0rem;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  padding: 0;
}
.Player {
  margin: 0;
  padding: 0;
}
.Image {
  width: auto;
  height: 100%;
}
.Card {
  height: 100%;
}
.Progress {
  margin: 0;
  padding: 0;
  align-self: flex-end;
}
</style>
