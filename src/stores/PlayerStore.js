import config from '../config';

const music = window.MusicKit.configure(config);
export default {
  namespaced: true,
  state: {
    // Player
    currentState: 'paused',
    currentMedia: null,
    progress: null,
    duration: 0,

    // Media
    albums: [],
    songs: [],
    queue: [],

    // Snackbar

    snackbarText: '',
    snackbarShow: false,

    // Other
    authorized: localStorage.getItem('authorized') == 'true',
    dark: localStorage.getItem('dark') == 'true'
  },
  mutations: {
    updateAlbums(state, payload) {
      state.albums = payload.albums;
    },
    updateSongs(state, payload) {
      state.songs = payload.songs;
    },
    playSong(state, payload) {
      const song = payload.song;
      switch (song.type) {
        case 'library-songs':
          music
            .setQueue({ items: [song.attributes.playParams] })
            .then(queue => {
              music.play();
            })
            .catch(err => {
            });
          break;
        case 'library-albums':
          music
            .setQueue({ album: song.id })
            .then(queue => {
              music.play();
            })
            .catch(err => {
            });
          break;
      }
    },
    changeCurrentMedia(state, payload) {
      state.currentMedia = payload.currentMedia;
      this.dispatch('player/updateQueue');
    },
    changeProgress(state, payload) {
      state.progress = payload.progress.progress * 100;
    },
    changeDuration(state, payload) {
      state.duration = payload.duration;
    },
    changeAuthorized(state, payload) {
      state.authorized = payload.authorized;
    },
    changeState(state, payload) {
      state.currentState = payload.currentState;
    },
    changeDark(state, payload) {
      state.dark = payload.dark;
      localStorage.setItem('dark', payload.dark);
    },
    changeSnackbarShow(state, payload) {
      state.snackbarShow = payload.snackbarShow;
      console.log(payload);
    },
    changeSnackbarText(state, payload) {
      state.snackbarText = payload.snackbarText;
    },
    authorize(state) {
      state.authorized = true;
      localStorage.setItem('authorized', true);
      location.reload();
    },
    deauthorize(state) {
      state.authorized = false;
      localStorage.setItem('authorized', false);
      location.reload();
    },
    updateQueue(state, payload) {
      state.queue = payload.items;
    }
  },
  actions: {
    updateAlbums(context) {
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
    updateSongs(context) {
      var offset = 0;
      const getSongs = offset => {
        music.api.library
          .songs(null, { offset: offset, limit: 100 })
          .then(songs => {
            if (!context.state.songs) {
              context.commit('updateSongs', { songs: songs });
            } else {
              context.commit('updateSongs', {
                songs: context.state.songs.concat(songs)
              });
            }

            if (songs.length !== 0) {
              getSongs(offset + 100);
            }
          });
      };
      getSongs(offset);
    },
    playSong(context, payload) {
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
    playNext(context, { song }) {
      music
        .playNext({ album: song.id })
        .then(res => {
          this.dispatch('player/updateQueue');
          this.dispatch('player/changeSnackbarText', { snackbarText: `Added ${song.attributes.name} - ${song.attributes.artistName} to up next`});
          this.dispatch('player/changeSnackbarShow', { snackbarShow: true });
        })
        .catch(err => {
        });
    },
    playLater(context, { song }) {
      music
        .playLater({ album: song.id })
        .then(res => {
          this.dispatch('player/updateQueue');
          this.dispatch('player/changeSnackbarText', { snackbarText: `Added ${song.attributes.name} - ${song.attributes.artistName} to play later`});
          this.dispatch('player/changeSnackbarShow', { snackbarShow: true });
        })
        .catch(err => {
        });
    },
    removeFromQueue(context, { index }) {
      var items = music.player.queue.items;
      items.splice(index, 1);
      if (index > -1) {
        music
          .setQueue({ items: items })
          .then(queue => {
            this.dispatch('player/updateQueue');
            music.pause();
            music.play();
          })
          .catch(err => {
          });
      }
    },
    changeSnackbarShow({ commit }, { snackbarShow }) {
      commit('changeSnackbarShow', { snackbarShow: snackbarShow });
    },
    changeSnackbarText({ commit }, { snackbarText }) {
      commit('changeSnackbarText', { snackbarText: snackbarText });
    }
  }
};
