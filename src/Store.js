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
                click: function(action){
                    store.commit('exchange', action);
                },
                action: 'rotate',
                elemGain: 'particles',
                elemLoss: 'particles',
                price: 0,
                income: 10
            },
            'sort': {
                title: 'Sort particles',
                msg: 'While filtering particles you found something useful.',
                click: function(action){
                    store.commit('exchange', action);
                },
                action: 'sort',
                elemGain: 'hydrogen',
                elemLoss: 'particles',
                price: 10,
                income: 5
            },
            'mass': {
                title: 'Add Mass',
                msg: 'You committed some mass to your core, your influance can reach further.',
                click: function(action){
                    store.commit('exchange', action);
                },
                action: 'mass',
                inflation: 50,
                elemGain: 'mass',
                elemLoss: 'particles',
                price: 100,
                income: 100
            }
        },
        Elements: {
            'particles': {
                title: 'Particles ',
                amount: 0,
                msg: 'Particles make up everything, even you. You\'re going to want a lot'
            },
            'mass': {
                title: 'Mass ',
                amount: 1,
                msg: 'Mass is power and influance, collect more.'
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
        exchange (state, action) {
            let button = state.SpaceButtons[action]
            let loss = state.Elements[button.elemLoss]
            let gain = state.Elements[button.elemGain]
            if (loss.amount >= button.price){
                loss.amount = loss.amount - button.price;
                gain.amount = gain.amount + button.income;
                store.commit('updateFeed', loss.msg);
                if (button.inflation) {
                    store.commit('inflate', action)
                }
            } else {
                store.commit('updateFeed', ('Not enough, ' + loss.title))
            }
        },
        inflate (state, action) {
            let button = state.SpaceButtons[action]
            button.price += button.inflation
        }
        ,
        deflate (state, {action, rate}) {
            let button = state.SpaceButtons[action]
            button.price -= button.deflation * rate
        }
    }
})

export default store