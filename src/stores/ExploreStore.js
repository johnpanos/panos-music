const music = window.MusicKit.getInstance();
export default {
  namespaced: true,
  state: {
    searchHints: [],
    recommendations: [],
    loading: false,
    search: {
      query: '',
      loading: false,
      results: []
    }
  },
  mutations: {
    updateSearchHints(state, payload) {
      state.searchHints = payload.searchHints;
      state.loading = false;
    },
    updateLoading(state, payload) {
      state.loading = payload.loading;
    },
    // Search
    updateQuery(state, payload) {
      state.search.query = payload.query;
    },
    updateResults(state, payload) {
      state.search.results = payload.results;
    },
    updateRecommendations(state, payload) {
      console.log('update');
      state.recommendations = payload.recommendations;
    }
  },
  actions: {
    updateSearchHints(context, { search }) {
      context.commit('updateLoading', { loading: true });
      music.api.searchHints(search).then(searchHints => {
        console.log(searchHints);
        context.commit('updateSearchHints', { searchHints: searchHints.terms });
      });
    },
    updateLoading(context, { loading }) {
      context.commit('updateLoading', { loading: loading });
    },
    // Search
    updateQuery(context, { query }) {
      context.commit('updateQuery', { query: query });
    },
    search(context, { query }) {
      music.api.search(query, { limit: 10 }).then(searchResults => {
        console.log(searchResults);
        context.commit('updateResults', { results: searchResults });
      });
    },
    updateRecommendations(context) {
      music.api.recommendations().then(recommendations => {
        console.log(recommendations);
        context.commit('updateRecommendations', {
          recommendations: recommendations
        });
      });
    }
  }
};
