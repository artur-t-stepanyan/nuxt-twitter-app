
export const state = () => ({
  tweets: [],
  includes: []
})

export const mutations = {
  setTweets(state, tweets) {
    state.tweets = tweets
  },
  setIncludes(state, includes) {
    state.includes = includes
  }
}

export const actions = {
  async fetchTweets (state, query) {
    if (typeof query === 'undefined' || !query || query.trim() === '') {
      return;
    }

    await this.$axios.get(`tweets/search/recent?query=${query}&expansions=author_id&user.fields=profile_image_url`)
      .then((response) => {
        state.commit('setTweets',response.data.data)
        state.commit('setIncludes', response.data.includes)
      })
  }
}

export const getters = {
  getTweets: s => s.tweets,
  getIncludes: s => s.getIncludes,
}