<template>
  <div>
    <v-toolbar>
      <v-text-field
        class="mt-2"
        label="Search"
        prepend-inner-icon="search"
        solo
        single-line
        mt10
      ></v-text-field>
    </v-toolbar>
    <v-container>
    <p class="display-1">Recommendations</p>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'explore',
  computed: mapState({
    recommendations: 'recommendations'
  }),
  created() {
    this.$store.dispatch('explore/updateRecommendations');
  }
}
</script>
