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
      console.log(song);
      switch (song.type) {
        case 'library-songs':
          music
            .setQueue({ items: [song.attributes.playParams] })
            .then(queue => {
              console.log(queue);
              music.play();
            })
            .catch(err => {
              console.log(err);
            });
          break;
        case 'library-albums':
          music
            .setQueue({ album: song.id })
            .then(queue => {
              console.log(queue);
              music.play();
            })
            .catch(err => {
              console.log(err);
            });
          break;
      }
    },
    changeCurrentMedia(state, payload) {
      console.log(payload.currentMedia);
      state.currentMedia = payload.currentMedia;
      this.dispatch('player/updateQueue');
    },
    changeProgress(state, payload) {
      console.log(payload.progress.progress);
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
      console.log(payload.items);
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
            console.log(songs);
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
      console.log('updating queue');
      commit('updateQueue', { items: music.player.queue.items });
    },
    playNext(context, { song }) {
      music
        .playNext({ album: song.id })
        .then(res => {
          console.log(res);
          this.dispatch('player/updateQueue');
        })
        .catch(err => {
          console.log(err);
        });
    },
    playLater(context, { song }) {
      music
        .playLater({ album: song.id })
        .then(res => {
          console.log(res);
          this.dispatch('player/updateQueue');
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeFromQueue(context, { index }) {
      var items = music.player.queue.items;
      items.splice(index, 1);
      console.log(items);
      if (index > -1) {
        music
          .setQueue({ items: items })
          .then(queue => {
            console.log(queue);
            this.dispatch('player/updateQueue');
            music.pause();
            music.play();
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
