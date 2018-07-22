<template>
  <v-container fluid>
    <v-jumbotron>
      <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <h3 class="display-3">Panos Music (Beta)</h3>

            <span class="subheading">Panos Music is an open source modular Apple Music client that allows you to listen to Apple Music from any device that has a web browser. It is made in Vue and based off of <a href="https://developer.apple.com/documentation/musickitjs">MusicKit JS</a>, which is currently in beta. If you encounter any bugs, or if you'd like a feature added, please create an issue on Github.</span>

            <v-divider class="my-3"></v-divider>

            <div class="title mb-3">Login to start listening</div>

            <v-btn
              class="mx-0"
              color="primary"
              large
              @click.stop="login"
            >
              Login
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  computed: mapState({
    authorized: 'authorized'
  }),
  methods: {
    login() {
      this.$store.dispatch('authorize');
    }
  },
  created() {
    this.authorized ? this.$router.push("albums") : null;
  }
}
</script>
