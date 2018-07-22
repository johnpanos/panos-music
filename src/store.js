import Vue from 'vue';
import Vuex from 'vuex';

import config from './config';

Vue.use(Vuex);

window.MusicKit.configure(config);
const music = window.MusicKit.getInstance();
const musicKit = window.MusicKit;

const store = new Vuex.Store({
  state: {
    currentState: 'paused',
    currentMedia: null,
    progress: null,
    albums: null,
    authorized: localStorage.getItem('authorized') == 'true'
  },
  mutations: {
    updateAlbums(state, payload) {
      state.albums = payload.albums;
    },
    playSong(state, payload) {
      const song = payload.song;
      console.log(song);
      music
        .setQueue({ album: song.id })
        .then(queue => {
          console.log(queue);
          music.play();
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeCurrentMedia(state, payload) {
      console.log(payload.currentMedia);
      state.currentMedia = payload.currentMedia;
    },
    changeProgress(state, payload) {
      console.log(payload.progress.progress);
      state.progress = payload.progress.progress * 100;
    },
    changeAuthorized(state, payload) {
      state.authorized = payload.authorized;
    },
    changeState(state, payload) {
      state.currentState = payload.currentState;
    },
    authorize(state) {
      state.authorized = true;
      localStorage.setItem('authorized', true);
    },
    deauthorize(state) {
      state.authorized = false;
      localStorage.setItem('authorized', false);
      //location.reload();
    },
    updateQueue(state, payload) {
      console.log(payload.items);
      state.queue = payload.items;
    }
  },
  actions: {
    updateAlbums(context, payload) {
      var offset = 0;
      const getAlbums = offset => {
        music.api.library
          .albums(null, { offset: offset, limit: 100 })
          .then(albums => {
            if (!context.state.albums) {
              context.commit('updateAlbums', { albums: albums });
            } else {
              context.commit('updateAlbums', {
                albums: context.state.albums.concat(albums)
              });
            }

            if (albums.length !== 0) {
              getAlbums(offset + 100);
            }
          });
      };
      getAlbums(offset);
    },
    playSong(context, payload) {
      console.log(payload);
      context.commit('playSong', payload);
    },
    authorize({ commit }) {
      music
        .authorize()
        .then(success => {
          success ? commit('authorize') : commit('deauthorized');
        })
        .catch(() => {
          commit('deauthorize');
        });
    },
    deauthorize({ commit }) {
      music.unauthorize().then(() => {
        commit('deauthorize');
      });
    },

    play() {
      music.play();
    },
    pause() {
      music.pause();
    },
    previous() {
      music.skipToPreviousItem();
    },
    next() {
      music.skipToNextItem();
    },
    updateQueue({ commit }) {
      commit('updateQueue', { items: music.player.queue.items });
    },
    playNext({ commit }, payload) {
      const newSong = window.MusicKit.MediaItem(payload.song);
      console.log(newSong);
      music
        .playNext({ album: payload.song.id })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    playLater({ commit }, payload) {
      console.log('Play later');
      music
        .playLater({ album: payload.song.id })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});

music.addEventListener('mediaItemDidChange', mediaItem => {
  store.commit('changeCurrentMedia', { currentMedia: mediaItem });
  store.dispatch('updateQueue');
});

music.addEventListener('playbackDurationDidChange', duration => {
  //this.duration = duration.duration;
});

music.addEventListener('playbackProgressDidChange', progress => {
  store.commit('changeProgress', { progress: progress });
});

music.addEventListener('playbackStateDidChange', state => {
  console.log(window.MusicKit.PlaybackStates[state.state]);
  store.commit('changeState', {
    currentState: window.MusicKit.PlaybackStates[state.state]
  });
});

export default store;
