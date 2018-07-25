<template>
  <v-layout column>
    <template v-for="(rec, i) in recommendations">
      <v-flex v-bind:key="rec.id">
        <h1 v-if="i === 0">For You</h1>
        <h1 v-if="rec.attributes.title">{{ rec.attributes.title.stringForDisplay }}</h1>
        <v-layout align-start row fill-height wrap v-if="rec.relationships.contents">
          <v-flex xs6 sm4 md3 lg2 v-for="item in rec.relationships.contents.data" v-bind:key="item.id">
            <MusicCard :name="item.attributes.name" :artwork="item.attributes.artwork" :artist="item.attributes.curatorName || item.attributes.artistName" :media="item">
            </MusicCard>
          </v-flex>
        </v-layout>
        <template v-if="rec.relationships.recommendations">
          <template v-for="(list, j) in rec.relationships.recommendations.data">
            <h2>{{ list.attributes.reason.stringForDisplay }}</h2>
            <v-layout align-start row fill-height wrap v-bind:key="j">
              <v-flex xs6 sm4 md3 lg2 v-for="(item, k) in list.relationships.contents.data" v-bind:key="k">
                <MusicCard :name="item.attributes.name" :artwork="item.attributes.artwork" :artist="item.attributes.curatorName || item.attributes.artistName" :media="item">
                </MusicCard>
              </v-flex>
            </v-layout>
          </template>
        </template>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';
import MusicCard from '../components/MusicCard';
export default {
  name: "Recommendations",
  computed: mapState('explore', {
    recommendations: 'recommendations',
  }),
  created() {
    this.$store.dispatch('explore/updateRecommendations');
  },
  components: {
    MusicCard: MusicCard
  }
}
</script>

<style>

</style>
