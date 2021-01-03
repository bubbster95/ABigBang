<template>
  <div class='cosmos-container'>
    <div class='nav'>
      <h1 @click="switchTabs('space')">Space</h1>
      <h1 v-if="makeAvailable()" @click="switchTabs('planet')">Planet</h1>
      <Space v-if="this.visibleTab.space==true" :clickEvent="this.clickEvent" :Elements="this.Elements"/>
      <Planet v-if="this.visibleTab.planet==true" :clickEvent="this.clickEvent" :Elements="this.Elements"/>
    </div>
  </div>
</template>

<script>
import Space from './Space'
import Planet from './Planet'
export default {
  name: 'Cosmos',
  props: ['clickEvent', 'Elements'],
  data: () => {
    return {
      visibleTab: {
        space: true,
        planet: false
      },
      availableTab: {
        space: true,
        planet: false
      }
    }
  },
  methods: {
    switchTabs: function(current) {
      for (const tab in this.visibleTab) {
        this.visibleTab[tab] = false
      }
      this.visibleTab[current] = true 

    },
    makeAvailable: function() {
    if (this.availableTab.planet == true) return true
    
    if (this.Elements.particles.amount >= 20) {
      this.availableTab.planet = true
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