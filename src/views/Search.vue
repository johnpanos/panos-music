<template>
  <v-layout column>
    <v-flex v-if="results.albums.data">
      <h1>Albums</h1>
      <v-layout align-start row fill-height wrap>
        <v-flex xs6 sm4 md3 lg2 v-for="album in results.albums.data" v-bind:key="album.id">
          <MusicCard :name="album.attributes.name" :artwork="album.attributes.artwork" :artist="album.attributes.artistName" :media="album">
          </MusicCard>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex v-if="results.songs.data">
      <h1>Songs</h1>
      <v-layout align-start row fill-height wrap>
        <v-flex xs6 sm4 md3 lg2 v-for="song in results.songs.data" v-bind:key="song.id">
          <MusicCard :name="song.attributes.name" :artwork="song.attributes.artwork" :artist="song.attributes.artistName" :media="song">
          </MusicCard>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import MusicCard from '../components/MusicCard';

export default {
  name: "Search",
  computed: {
    results: {
      get() {
        return this.$store.state.explore.search.results;
      }
    }
  },
  created() {
    this.$store.dispatch('explore/search');
  },
  components: {
    MusicCard: MusicCard
  }
}
</script>

<style>

</style>
