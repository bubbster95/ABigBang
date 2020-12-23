import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        feed: ['I exist, but how? all I see is darkness. Am I all there is?'],
        space: 'Open Space'
    }, 
    mutations: {
        change (state, text) {
            state.feed.push(text)
        }
    }
})

export default store