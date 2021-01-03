<template>
    <div id="app">
        <Feed :feed="feed"/>
        <Cosmos :clickEvent="clickEvent" :Elements="Elements"/>
        <Elements :elements="Elements"/>
    </div>
</template>

<script>
import Feed from './Feed.vue'
import Cosmos from './Cosmos'
import Elements from './Elements.vue'

export default {
  name: 'HomePage',
  data() {
        return {
            feed: ['You pop into existence. Everything is dark and cold.'],
            buttons: {
                rotate: {
                    msg: 'Your wild rotation is attractive.',
                    cooldown: 1,
                    gain: {particles: 10},
                    loss: {particles: 0},
                },
                mass: {
                    msg: 'You committed some mass to your core, your influance can reach further.',
                    otherFunctions: [this.massIncreas, this.diceRoll], 
                    inflation: 50,
                    gain: {mass: 1},
                    loss: {particles: 100}
                },
                carbonMoon: {
                    msg: 'A ball of carbon circles around you collecting carbon on your behalf.',
                    gain: {carbon: 10},
                    loss: {mass: 1, carbon: 10}
                },
                sort: {
                    availableMsg: 'You can try organizing those particles? Might find something good.',
                    msg: 'While filtering particles you found something useful.',
                    cooldown: 5,
                    gain: {hydrogen: Math.floor(Math.random()*5), carbon: Math.floor(Math.random()*5), oxygen: Math.floor(Math.random()*5)},
                    loss: {particles: 10}
                },
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
        }
    },
    methods: {
        clickEvent: function(event) {
            let button = event.target.id
            let buttonInfo = this.buttons[button]
            this.exchangeRate(button);
            this.coolDown(button);
            if (buttonInfo.otherFunctions) {
                buttonInfo.otherFunctions.map(thisFunction => {  
                    thisFunction()
                })
            }
        },
        massIncreas: function() {
            this.buttons['rotate'].gain['particles'] = 10 * this.Elements['mass'].amount;
        },
        diceRoll: function(max) {
            Math.floor(Math.random()* max)
        },
        updateFeed: function(text) {
            this.feed.unshift(text);
            if (this.feed.length > 20) {
                this.feed.pop();
            }
        },
        exchangeRate: function(name) {
            let button = this.buttons[name]
            const losses = button.loss;
            const gains = button.gain;
            
            const lossKeys = Object.keys(losses);
            const gainKeys = Object.keys(gains);

            let sufficientFunds = true;

            lossKeys.map(loss => {
                if (this.Elements[loss].amount < losses[loss]) {
                    this.updateFeed('Not enough, ' + loss + '.')
                    sufficientFunds = false
                } 
            });

            if (sufficientFunds == true) {
                lossKeys.map(loss => {
                    this.Elements[loss].amount -= losses[loss]
                    if (button.inflation) {
                        this.inflate(name, loss)
                    }
                }); 
                gainKeys.map(gain => {
                    this.Elements[gain].amount += gains[gain]

                    // If element hasen't become visible yet
                    this.Elements[gain].class = 'element'
                });
                this.updateFeed(button.msg);
            }
        },
        coolDown: function(name) {
            let button = this.buttons[name]
            
            let timer = 100;

            let cool = setInterval(function(){
                const coolDown = document.getElementById(name + '-cool-down');
                if (timer <= 0) {
                   clearInterval(cool);
                   if (coolDown){
                    coolDown.style.width = 0;
                   }
                } else {
                    if (coolDown) {
                        coolDown.style.width = timer + '%';
                    }
                    timer -= 1;
                }
            }, 10 * button.cooldown)
        },
        inflate: function(name, loss) {
            const button = this.buttons[name]
            button.loss[loss] += button.inflation
        }
    },
    components: {
        Feed,
        Cosmos,
        Elements
    }
}
</script>

<style>
  #app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: lightgreen;
  }

  h1 {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 15pt;
    margin: 0 10px;
    display: inline;
    position: relative;
    top: -10px;
    left: 10px;
    color: black;
    text-decoration: none;
  }
</style>

