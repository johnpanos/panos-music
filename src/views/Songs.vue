<template>
  <v-slide-y-transition appear>
    <v-data-table
      :headers="headers"
      :items="songs"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td @click.stop="playSong(props.item)">{{ props.item.attributes.name }}</td>
        <td class="text-xs-left">{{ millisToMinutesAndSeconds(props.item.attributes.durationInMillis) }}</td>
        <td class="text-xs-left">{{ props.item.attributes.artistName }}</td>
        <td class="text-xs-left">{{ props.item.attributes.albumName }}</td>
      </template>
    </v-data-table>
  </v-slide-y-transition>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Songs',
  data () {
    return {
      headers: [
        {
          text: 'Name',
          align: 'left',
          value: 'attributes.name'
        },
        { text: 'Time', value: 'attributes.durationInMillis' },
        { text: 'Artist', value: 'attributes.artistName' },
        { text: 'Album', value: 'attributes.albumName' }
      ],
    }
  },
  computed: mapState('player', {
    songs: 'songs'
  }),
  methods: {
    millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    },
    playSong(song) {
      this.$store.dispatch('player/playSong', { song: song })
    }
  },
  created() {
    if (this.songs.length === 0) {
      this.$store.dispatch('player/updateSongs')
    }
  }
}
</script>

<style>

</style>
