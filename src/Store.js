import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        feed: ['I exist, but how? all I see is darkness. Am I all there is?'],
        SpaceButtons: {
            'rotate': {
                title: 'Rotate wildly!',
                msg: 'Your wild rotation has attracted something.',
                click: function(text, elem, pay){
                    store.commit('updateFeed', text)
                    store.commit('income', {elem, pay})
                },
                collect: 'particles',
                pay: 10
            },
            'sort': {
                title: 'Sort particles',
                msg: 'While filtering particles you found something useful.',
                click: function(text, elem, pay, loss, price){
                    store.commit('updateFeed', text)
                    store.commit('income', {elem, pay})
                    store.commit('cost', {loss, price})
                },
                collect: 'hydrogen',
                loss: 'particles',
                price: 10,
                pay: 5
            },
            'moon': {
                title: 'Attract Moon',
                msg: 'Jettisoning spare particles has earned you a moon; good work!',
                click: function(text){
                    store.commit('updateFeed', text)
                }
            }
        },
        Elements: {
            'particles': {
                title: 'Particles ',
                amount: 0,
                msg: 'Particles make up everything, even you. You\'re going to want a lot',
                first: function(text){
                    store.commit('updateFeed', text)
                }
            },
            'water': {
                title: 'H2O ',
                amount: 0,
                msg: 'Water gives life, and it isn\'t easy to come by.'
            },
            'hydrogen': {
                title: 'H ',
                amount: 0,
                msg: 'Hydrogen makes water and/or goes boom.'
            },
            'oxygen': {
                title: 'O ',
                amount: 0,
                msg: 'Oxygen allows life to keep living, and it makes water, so this is important stuff.'
            }
        }
    }, 
    mutations: {
        updateFeed (state, text) {
            state.feed.unshift(text);
            if (state.feed.length > 20) {
                state.feed.pop();
            }
        },
        cost (state, {loss, price}) {
            if (state.Elements[loss].amount >= price){
                state.Elements[loss].amount = state.Elements[loss].amount - price;
            }
        },
        income (state, {elem, pay}) {
            state.Elements[elem].amount = state.Elements[elem].amount + pay;
        }
    }
})

export default store