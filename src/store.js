import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const music = window.MusicKit.getInstance();

import PlayerStore from './stores/PlayerStore';
import ExploreStore from './stores/ExploreStore';

const store = new Vuex.Store({
  modules: {
    player: PlayerStore,
    explore: ExploreStore
  }
});

music.addEventListener('mediaItemDidChange', mediaItem => {
  store.commit('player/changeCurrentMedia', { currentMedia: mediaItem });
});

music.addEventListener('playbackDurationDidChange', duration => {
  store.commit('player/changeDuration', { duration: duration });
});

music.addEventListener('playbackProgressDidChange', progress => {
  store.commit('player/changeProgress', { progress: progress });
});

music.addEventListener('playbackStateDidChange', state => {
  store.commit('player/changeState', {
    currentState: window.MusicKit.PlaybackStates[state.state]
  });
});

export default store;
