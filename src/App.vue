<template>
  <v-app :dark="dark">
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      mobile-break-point="800"
      fixed
      app
    >
      <v-list>
        <router-link
          tag="v-list-tile"
          v-for="(item, i) in items"
          :exact="item.exact"
          :to="item.path"
          :key="i"
          active-class="RouteActive">
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </router-link>
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
      <v-menu offset-y offset-x :nudge-width="200" :close-on-content-click="false">
        <v-btn
          slot="activator"
          icon
        >
          <v-icon>settings</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile>
              <v-switch
                label="Dark Mode"
                v-model="dark"
                color="primary"
              ></v-switch>
          </v-list-tile>
        </v-list>
      </v-menu>
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
  computed: {
    authorized: {
      get() {
        return this.$store.state.authorized;
      }
    },
    dark: {
      get() {
        return this.$store.state.dark;
      },
      set(boolean) {
        this.$store.commit('changeDark', { dark: boolean });
      }
    }
  },
  methods: {
    authButton () {
      this.authorized ? this.$store.dispatch('deauthorize') : this.$store.dispatch('authorize');
    },
    hasAccepted() {
      return localStorage.getItem('privacy') == true;
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
.RouteActive {
  color: white
}
</style>
