<template>
  <div class='cosmos-container'>
    <div class='nav'>
      <h1 @click="switchTabs('space')">Space</h1>
      <h1 v-if="makeAvailable('availableTab', 'planet', this.upgrades.sorter >= 1)" @click="switchTabs('planet')">Planet</h1>
      <Space
      v-if="this.visibleTab.space==true"
      :data="this" :Elements="Elements"/>
      
      <Planet
      v-if="this.visibleTab.planet==true"
      :data="this" :Elements="Elements"/>
    </div>
  </div>
</template>

<script>
import Space from './Space'
import Planet from './Planet'
export default {
  name: 'Cosmos',
  props: ['Elements', 'Feed'],
  data: () => {
    return {
      buttons: {
        rotate: {
          msg: 'Your wild rotation is attractive.',
          // cooldown: 1,
          // available: true,
          gain: {particles: 10},
          loss: {particles: 0},
        },
        sorter: {
          msg: 'You\'ve got a lot on your plate, so you create a way to organize some particles.',
          // otherFunctions: ['massIncreas'],
          inflation: 50,
          gain: {sorter: 1},
          loss: {particles: 50}
        },
        sort: {
          availableMsg: 'You can try organizing those particles? Might find something good.',
          msg: 'While filtering particles you found something useful.',
          cooldown: 5,
          available: true,
          gain: {hydrogen: 10, carbon: 10, oxygen: 10},
          loss: {particles: 10}
        },
        mass: {
          msg: 'You committed some mass to your core, your influance can reach further.',
          otherFunctions: ['massIncreas'],
          inflation: 50,
          gain: {mass: 1},
          loss: {particles: 100}
        },
        carbonMoon: {
          msg: 'A ball of carbon circles around you collecting carbon on your behalf.',
          gain: {cMoon: 1},
          loss: {mass: 1, carbon: 20}
        },
        add: {
          msg: 'You re-alocated some mass to a moon.',
          gain: {cMoon: 1},
          loss: {mass: 1}
        },
        subtract: {
          msg: 'You removed some mass from a moon.',
          gain: {mass: 1},
          loss: {cMoon: 1}
        }
      },
      visibleTab: {
        space: true,
        planet: false
      },
      availableTab: {
        space: true,
        planet: false
      },
      availableButtons: {
        rotate: true,
        sorter: false,
        mass: false,
        carbonMoon: false,
        carbonManager: false,
        sort: true,

      },
      upgrades: {
        sorter: 0
      },
      moons: {
        cMoon: 0
      }
    }
  },
  methods: {
    clickEvent: function(name) {
      let button = this.buttons[name]

      if (button.available == false) {
        this.updateFeed('Too hot, wait for cool down');
      } else {
        this.exchangeRate(name);
        this.coolDown(name);
        
        if (button.otherFunctions) {
          button.otherFunctions.map(thisFunction => {  
            this[thisFunction](name);
          })
        }
      }
    },
    toolTip: function(name) {
      const button = this.buttons[name] 

      const gainKeys = Object.keys(button.gain);
      const lossKeys = Object.keys(button.loss);

      let tipText = '';

      lossKeys.map(loss => {
          if (button.loss[loss] > 0) {
            tipText += ('-' + button.loss[loss] + ' ' + loss) + '  '
          }
      });

      gainKeys.map(gain => {
        if (button.gain[gain] > 0) {
            tipText += ('+' + button.gain[gain] + ' ' + gain) + '  '
          }
      });

      return tipText
    },
    massIncreas: function() {
      this.buttons['rotate'].gain['particles'] = 10 * this.Elements['mass'].amount;
    },
    updateFeed: function(text) {
      this.Feed.unshift(text);
      if (this.Feed.length > 20) {
          this.Feed.pop();
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
        console.log('loss',loss)
        if (!this.Elements[loss]) {
          if(this.moons[loss] == 1) { 
            this.updateFeed('You should not destroy your' + loss + '.')
            sufficientFunds = false
          } 
        } else if (this.Elements[loss].amount < losses[loss]) {
          this.updateFeed('Not enough, ' + loss + '.')
          sufficientFunds = false
        } 
      });

      if (sufficientFunds == true) {
        lossKeys.map(loss => {
          if (!this.Elements[loss]) {
            if(this.moons[loss] || this.moons[loss] == 0) {
              this.moons[loss] -= losses[loss]
            } 
          } else {
            this.Elements[loss].amount -= losses[loss]
            if (button.inflation) {
              this.inflate(name, loss)
            }
          }
        }); 

        gainKeys.map(gain => {
          if (!this.Elements[gain]) {

            if (this.moons[gain] || this.moons[gain] == 0){
              this.moons[gain] += gains[gain]
              console.log('if', gain, this.moons[gain])
            } else {
              this.upgrades[gain] += gains[gain]
              console.log('else', gain, this.upgrades[gain])
            }

          } else {
            this.Elements[gain].amount += gains[gain]

            // If element hasen't become visible yet
            this.Elements[gain].class = 'element'
          }
        });
        this.updateFeed(button.msg);
      }
    },
    coolDown: function(name) {
      let button = this.buttons[name];
      button.available = false;
      let timer = 100;

      let cool = setInterval(function(){
          const coolDown = document.getElementById(name + '-cool-down');
          if (timer <= 0) {
              clearInterval(cool);
              if (coolDown) {
                  coolDown.style.width = 0;
              }
              button.available = true;
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
    },
    switchTabs: function(current) {
      for (const tab in this.visibleTab) {
        this.visibleTab[tab] = false
      }
      this.visibleTab[current] = true
    },
    makeAvailable: function(path, name, condition) {
      if (this[path][name] == true) return true
      if (condition) {
        this[path][name] = true
      }
    }
  },
  components: {
    Space,
    Planet
  }
}
</script>

<style>
    .cosmos-container {
    position: relative;
    width: 50%;
    height: 90vh;
    margin: 10px;
    display: inline-block;
    background-color: lightcoral;
  }

  .tab {
    background-color: transparent;
    border: none;
  }

  .null {
      display: none;
  }
</style>