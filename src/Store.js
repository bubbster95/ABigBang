import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        feed: ['You pop into existence. Everything is dark and cold.'],
        Space: {
            'rotate': {
                name: 'rotate',
                class: 'available',
                title: 'Rotate wildly!',
                msg: 'Your wild rotation is attractive.',
                click: function(name){
                    store.commit('exchange', name);
                    store.commit('isMore');
                    store.commit('coolDown', name)
                },
                cooldown: 1,
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
                    store.commit('chooseAmount', ['hydrogen', 'carbon', 'oxygen']);
                    store.commit('coolDown', name);
                },
                cooldown: 2,
                elemGain: 'hydrogen',
                elemLoss: 'particles',
                price: 10,
                income: 0
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
                income: 1
            }
        },
        Planet: {
            'carbonMoon': {
                name: 'carbonMoon',
                class: 'available',
                title: 'Carbon Moon',
                msg: 'A ball of carbon circles around you collecting carbon on your behalf.',
                click: function(name){
                    store.commit('exchange', name);
                    store.commit('isMore');
                    store.commit('coolDown', name)
                },
                cooldown: 30,
                elemGain: 'carbon',
                elemLoss: 'mass',
                price: 1,
                income: 100
            },
            'sort': {
                name: 'sort',
                class: 'null',
                title: 'Sort particles',
                availableMsg: 'You can try organizing those particles? Might find something good.',
                msg: 'While filtering particles you found something useful.',
                click: function(name){
                    store.commit('exchange', name);
                    store.commit('chooseAmount', ['hydrogen', 'carbon', 'oxygen']);
                    store.commit('coolDown', name);
                },
                cooldown: 2,
                elemGain: 'hydrogen',
                elemLoss: 'particles',
                price: 10,
                income: 0
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
                income: 1
            }
        },
        Elements: {
            'particles': {
                title: 'Particles ',
                class: 'null',
                amount: 0,
                msg: 'Particles make up everything, even you. You\'re going to want a lot'
            },
            'mass': {
                title: 'Mass ',
                class: 'null',
                amount: 1,
                msg: 'Mass is power and influance, collect more.'
            },
            'water': {
                title: 'H2O ',
                class: 'null',
                amount: 0,
                msg: 'Water gives life, and it isn\'t easy to come by.'
            },
            'hydrogen': {
                title: 'H ',
                class: 'null',
                amount: 0,
                msg: 'Hydrogen makes water and/or goes boom.'
            },
            'oxygen': {
                title: 'O ',
                class: 'null',
                amount: 0,
                msg: 'Oxygen allows life to keep living, and it makes water, so this is important stuff.'
            },
            'carbon': {
                title: 'C ',
                class: 'null',
                amount: 0,
                msg: 'Carbon is the building blaco of all life.'
            }
        }
    }, 
    mutations: {
        chooseAmount (state, choices) {
            choices.map(choice => {
                let gain = state.Elements[choice];
                let roll = Math.floor(Math.random()* 5)
                if (roll > 0) {
                    gain.class = 'element';
                }
                return gain.amount = gain.amount + roll;
            })
        },
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
            let button;
            if (state.Planet[name]) {
                button = state.Planet[name]
            } else {
                button = state.Space[name]
            }
            const loss = state.Elements[button.elemLoss]
            const gain = state.Elements[button.elemGain]
            gain.class = 'element';
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
        coolDown (state, name) {
            let button;
            if (state.Planet[name]) {
                button = state.Planet[name]
            } else {
                button = state.Space[name]
            }
            const coolDown = document.getElementById(button.name + '-cool-down');
            let timer = 100;
            const originalFunction = button.click;
            button.click = function() {
                store.commit('updateFeed', 'Too hot, wait for cool down.')  
            };

            let cool = setInterval(function(){
                if (timer <= 0) {
                   clearInterval(cool);
                   coolDown.style.width = 0;
                   button.click = originalFunction;
                } else {
                    coolDown.style.width = timer + '%';
                    timer -= 1;
                }
            }, 10 * button.cooldown)
        },
        inflate (state, name) {
            const button = state.Space[name]
            button.price += button.inflation
        },
        deflate (state, {name, rate}) {
            const button = state.Space[name]
            button.price -= button.deflation * rate
        }
    }
})

export default store