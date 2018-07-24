<template>
  <v-snackbar
    v-model="snackbarShow"
    timeout="4000"
    bottom
    left
    multi-line
  >
    {{ snackbarText }}
    <v-btn
      dark
      flat
      @click="snackbarShow = false"
    >
      OK
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "snackbar",
  computed: {
    snackbarText: {
      get() {
        return this.$store.state.player.snackbarText;
      }
    },
    snackbarShow: {
      get() {
        return this.$store.state.player.snackbarShow;
      },
      set(boolean) {
        return this.$store.dispatch('player/changeSnackbarShow', { snackbarShow: boolean });
      }
    },
    created() {
      this.snackbarShow = true;
    }
  }
}
</script>

<style>

</style>
