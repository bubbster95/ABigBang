import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        feed: ['You pop into existence. Everything is dark and cold.'],
        Links: {
            'space': {
                to: "/space",
                inner: 'Space',
                class: 'link'
            },
            'planet': {
                to: '/planet',
                inner: 'Planet',
                class: 'null'
            }
        },
        Space: {
            rotate: {
                path: 'state.Space.rotate',
                id: 'rotate',
                class: 'available',
                title: 'Rotate wildly!',
                msg: 'Your wild rotation is attractive.',
                click: (path) => {
                    store.commit('exchangeRate', path);
                    store.commit('isMore');
                    store.commit('coolDown', path);
                },
                cooldown: 1,
                gain: {particles: 10},
                loss: {particles: 0},
                noTT: true
            },
            mass: {
                id: 'mass',
                path: 'state.Space.mass',
                class: 'null',
                title: 'Add Mass',
                availableMsg: 'You have enough particles to generate mass, maybe try it out?',
                msg: 'You committed some mass to your core, your influance can reach further.',
                click: function(path){
                    store.commit('exchangeRate', path);
                    store.commit('massIncreas');
                },
                inflation: 50,
                gain: {mass: 1},
                loss: {particles: 10}
            },
            carbonMoon: {
                id: 'carbonMoon',
                path: 'state.Space.carbonMoon',
                class: 'null',
                title: 'Carbon Moon',
                msg: 'A ball of carbon circles around you collecting carbon on your behalf.',
                click: function(path){
                    store.commit('exchangeRate', path);
                    store.commit('isMore');
                    store.commit('coolDown', path)
                },
                gain: {carbon: 10},
                loss: {mass: 1, carbon: 10}
            },
        },
        Planet: {
            sort: {
                id: 'sort',
                path: 'state.Planet.sort',
                class: 'null',
                title: 'Sort particles',
                availableMsg: 'You can try organizing those particles? Might find something good.',
                msg: 'While filtering particles you found something useful.',
                click: function(path){
                    store.commit('exchangeRate', path);
                    store.commit('chooseAmount', ['hydrogen', 'carbon', 'oxygen']);
                    store.commit('coolDown', path);
                },
                cooldown: 0,
                gain: {hydrogen: 0},
                loss: {particles: 10}
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
                msg: 'Carbon is the building block of all life.'
            }
        }
    }, 
    mutations: {
        massIncreas (state) {
            state.Space['rotate'].gain['particles'] = 10 * state.Elements['mass'].amount;
        },
        chooseAmount (state, choices) {
            choices.map(choice => {
                let gain = state.Elements[choice];
                let roll = Math.floor(Math.random()* 5)
                if (roll > 0) {
                    gain.class = 'element';
                }
                return gain.amount += roll;
            })
        },
        updateFeed (state, text) {
            state.feed.unshift(text);
            if (state.feed.length > 20) {
                state.feed.pop();
            }
        },
        isMore (state) {
            if (state.Elements['particles'].amount >= 0 && state.Planet.sort.class === 'null') {
                state.Planet.sort.class = 'available';
                state.Links.planet.class = 'link';
            } else if (state.Elements['particles'].amount >= 100 && state.Space.mass.class === 'null'){
                state.Space.mass.class = 'available';
            } else if (state.Elements['carbon'].amount >=5 && state.Space.carbonMoon.class === 'null'){
                state.Space.carbonMoon.class = 'available';
            }
        },
        exchangeRate (state, path) {
            let button;
            if (state.Planet[path]) {
                button = state.Planet[path]
            } else {
                button = state.Space[path]
            }

            const losses = button.loss;
            const gains = button.gain;
            
            const lossKeys = Object.keys(losses);
            const gainKeys = Object.keys(gains);

            let sufficientFunds = true;

            lossKeys.map(loss => {
                if (state.Elements[loss].amount < losses[loss]) {
                    store.commit('updateFeed', ('Not enough, ' + loss + '.'))
                    sufficientFunds = false
                } 
            });

            if (sufficientFunds == true) {
                lossKeys.map(loss => {
                    state.Elements[loss].amount -= losses[loss]
                    if (button.inflation) {
                        store.commit('inflate', {path, loss})
                    }
                }); 
                gainKeys.map(gain => {
                    state.Elements[gain].amount += gains[gain]

                    // If element hasen't become visible yet
                    state.Elements[gain].class = 'element'
                });
                store.commit('updateFeed', button.msg);
            }
        },
        coolDown (state, path) {
            let button;
            if (state.Planet[path]) {
                button = state.Planet[path]
            } else {
                button = state.Space[path]
            }
            
            let timer = 100;
            const originalFunction = button.click;
            button.click = function() {
                store.commit('updateFeed', 'Too hot, wait for cool down.')  
            };

            let cool = setInterval(function(){
                const coolDown = document.getElementById(button.path + '-cool-down');
                if (timer <= 0) {
                   clearInterval(cool);
                   if (coolDown){
                    coolDown.style.width = 0;
                   }
                   button.click = originalFunction;
                } else {
                    if (coolDown) {
                        coolDown.style.width = timer + '%';
                    }
                    timer -= 1;
                }
            }, 10 * button.cooldown)
        },
        inflate (state, {path, loss}) {
            const button = state.Space[path]
            button.loss[loss] += button.inflation
        },
        deflate (state, {path, rate}) {
            const button = state.Space[path]
            button.loss[0] -= button.deflation * rate
        }
    }
})

export default store