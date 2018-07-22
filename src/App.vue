<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <router-link tag="v-list-tile"
          v-for="(item, i) in items"
          :exact="item.exact"
          :to="item.path"
          :key="i"
          value="albums"><v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content></router-link>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-container class="Container" fill-height row>
        <v-layout row wrap>
        <v-flex xs3>
          <v-layout fill-height align-center justify-center>
            <Controls />
          </v-layout>
        </v-flex>
        <v-flex xs6 fill-height="">
          <Player />
        </v-flex>
        </v-layout>
      </v-container>
      <v-btn flat @click.stop="authButton" color="primary" v-html="authorized ? 'LOGOUT' : 'LOGIN'">
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Player from './components/Player';
import Controls from './components/Controls';
import { mapState } from 'vuex';
export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: true,
      items: [{
        icon: 'album',
        title: 'Albums',
        exact: true,
        path: '/albums'
      },
      {
        icon: 'music_note',
        title: 'Songs',
        exact: true,
        path: '/songs'
      }],
      miniVariant: true,
      right: true,
      rightDrawer: false
    }
  },
  computed: mapState({
    authorized: 'authorized'
  }),
  methods: {
    authButton () {
      this.authorized ? this.$store.dispatch('deauthorize') : this.$store.dispatch('authorize');
    }
  },
  components: {
    Player: Player,
    Controls: Controls
  }
}
</script>

<style scoped>
.Container {
  width: auto;
  padding: 0;
  height: 100%;
}
.Controls {
}
</style>
