<template>
  <v-app :dark="dark">
    <v-dialog v-model="unsupportedCodec" persistent max-width="450" lazy>
      <v-card>
        <v-card-title class="headline">Unsupported Codec</v-card-title>
        <v-card-text>
          It appears that your browser does not support the codec required to play Apple Music content.
          This is not a limitation of Panos Music, but it of MusicKit, which Panos Music is based off of.
          <br/><br/>
          This problem is usually found in Firefox on Linux, and can be fixed by using Chrome or another browser
          with supported codecs.
          <br/><br/>
          <span class="font-weight-medium">Codec:</span><br/><code>audio/mp4;codecs="mp4a.40.2"</code>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.native="unsupportedCodec = false">GOT IT</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      mobile-break-point="800"
      fixed
      app
      width="225"
    >
      <v-list>
        <template v-for="(item, i) in items">
          <router-link
            tag="v-list-tile"
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
            <v-divider v-if="item.divider" :key="i"></v-divider>
          </template>
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
          <v-flex xs5 md4>
            <v-layout fill-height align-center justify-center>
              <Controls />
            </v-layout>
          </v-flex>
          <v-flex xs7 md8 lg6 fill-height="">
            <Player />
          </v-flex>
        </v-layout>
      </v-container>
      <v-menu offset-y offset-x :nudge-width="200" :close-on-content-click="false">
        <v-btn
          slot="activator"
          icon
        >
          <v-badge right>
          <span slot="badge" v-if="queue.length > 0">{{ queue.length }}</span>
            <v-icon>list</v-icon>
          </v-badge>
        </v-btn>
        <v-list two-line>
          <template v-for="(song, index) in queue">
            <v-list-tile :key="index">
                <v-list-tile-content>
                  <v-list-tile-title v-html="song.attributes.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="song.attributes.artistName"></v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon @click.stop="removeFromQueue(index)">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-list-tile-action>
            </v-list-tile>
            <v-divider
              :key="index"
            ></v-divider>
          </template>
        </v-list>
      </v-menu>
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
    <Snackbar />
  </v-app>
</template>

<script>
import Player from './components/Player';
import Controls from './components/Controls';
import Snackbar from './components/Snackbar';
export default {
  name: 'App',
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'explore',
          title: 'Explore',
          exact: true,
          path: '/explore',
          divider: true
        },
        {
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
        }
      ],
      miniVariant: false,
      unsupportedCodec: true
    }
  },
  computed: {
    authorized: {
      get() {
        return this.$store.state.player.authorized;
      }
    },
    dark: {
      get() {
        return this.$store.state.player.dark;
      },
      set(boolean) {
        this.$store.commit('player/changeDark', { dark: boolean });
      }
    },
    queue: {
      get() {
        return this.$store.state.player.queue;
      }
    }
  },
  methods: {
    authButton() {
      this.authorized ? this.$store.dispatch('player/deauthorize') : this.$store.dispatch('player/authorize');
    },
    hasAccepted() {
      return localStorage.getItem('privacy') == true;
    },
    removeFromQueue(index) {
      this.$store.dispatch('player/removeFromQueue', { index: index });
    }
  },
  components: {
    Player: Player,
    Controls: Controls,
    Snackbar: Snackbar
  },
  created() {
    // Check if it the browser supports the codec required for Apple Music
    const codecTester = document.createElement('video');
    this.unsupportedCodec = codecTester.canPlayType('audio/mp4;codecs="mp4a.40.2"') != "probably";
  }
}
</script>

<style scoped>
.Container {
  width: auto;
  padding: 0;
  height: 100%;
}
.RouteActive, .RouteActive div i {
  color: #E8364B;
}
</style>
