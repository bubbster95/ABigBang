import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        feed: ['You pop into existance. Everything is dark and cold.'],
        Space: {
            'rotate': {
                name: 'rotate',
                class: 'available',
                title: 'Rotate wildly!',
                msg: 'Your wild rotation is attractive.',
                click: function(name){
                    store.commit('exchange', name);
                    store.commit('isMore')
                },
                cooldown: 10,
                elemGain: 'particles',
                elemLoss: 'particles',
                price: 0,
                income: 10
            },
            'sort': {
                name: 'sort',
                class: 'null',
                title: 'Sort particles',
                availableMsg: 'You can try organizing those particles? Might find something good.',
                msg: 'While filtering particles you found something useful.',
                click: function(name){
                    store.commit('exchange', name);
                },
                elemGain: 'hydrogen',
                elemLoss: 'particles',
                price: 10,
                income: 5
            },
            'mass': {
                name: 'mass',
                class: 'null',
                title: 'Add Mass',
                availableMsg: 'You have enough particles to generate mass, maybe try it out?',
                msg: 'You committed some mass to your core, your influance can reach further.',
                click: function(name){
                    store.commit('exchange', name);
                },
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
        isMore (state) {
            if (state.Elements['particles'].amount >= 50 && state.Space.sort.class === 'null') {
                state.Space.sort.class = 'available';
                state.Space.mass.class = 'available';
            }
        },
        exchange (state, name) {
            let button = state.Space[name]
            let loss = state.Elements[button.elemLoss]
            let gain = state.Elements[button.elemGain]
            if (loss.amount >= button.price){
                loss.amount = loss.amount - button.price;
                gain.amount = gain.amount + button.income;
                store.commit('updateFeed', button.msg);
                if (button.inflation) {
                    store.commit('inflate', name)
                }
            } else {
                store.commit('updateFeed', ('Not enough, ' + loss.title))
            }
        },
        inflate (state, name) {
            let button = state.Space[name]
            button.price += button.inflation
        }
        ,
        deflate (state, {name, rate}) {
            let button = state.Space[name]
            button.price -= button.deflation * rate
        }
    }
})

export default store