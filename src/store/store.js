import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    movie_name: ''
  },
  mutations: {
    change(state, movie) {
      state.movie_name = movie
    }
  },
  getters: {
    movie_name: state => state.movie_name
  }
})

export default store;