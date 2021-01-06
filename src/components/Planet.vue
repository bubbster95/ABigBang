<template>
  <div class='planet-container'>

    <div class="cool-down-buttons">
      <button
        v-if="data.makeAvailable('availableButtons', 'rotate', data.upgrades.sorter >= 1)"
        id="sort"
        @click="data.clickEvent('sort')"
        :title="data.toolTip('sort')"
      >
        Sort particles
        <div class='cool-down' id='sort-cool-down'></div>
      </button>

      <h4>Mass: </h4>
      <h4>{{data.moons.mass.amount}}</h4>
    </div>

    <div
    v-if="data.makeAvailable('availableButtons', 'carbonManager', data.moons.cMoon.amount >= 1)"
    id="carbon-manager"
    class="manager">
      <h4>Carbon moon</h4>
      <button
        class="add"
        @click="data.clickEvent('add', 'cMoon')"
        :title="data.toolTip('add')"
      >
        ^
      </button>
      <h4>{{data.moons.cMoon.amount}}</h4>
      <button
        class="subtract"
        @click="data.clickEvent('subtract', 'cMoon')"
        :title="data.toolTip('subtract')"
      >v</button>
    </div>
  </div>
</template>

<script>
// import store from '../Store'
export default {
  name: 'Planet',
  props: ['data', 'Elements']
}
</script>

<style scoped>
  .planet-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 20px 10px;
    display: inline-block;
  }

  .cool-down-buttons {
    position: relative;
    display: flex;
    width: 80%;
    justify-content: center;
    align-items: center;
  }

  .cooling, button {
    position: relative;
    margin: 5px;
  }

  .cool-down {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgba(255, 0, 0, .5);
  }
   .start-cool {
    animation: coolDown;
    animation-timing-function: linear;
  }

  @keyframes coolDown {
    0% {width: 100%;}
    100% {width: 0px;}
  }

  .manager {
    position: relative;
    display: flex;
    background-color: aquamarine;
    width: 90%;
    justify-content: center;
    align-items: center;
  }

  .add, .subtract {
    height: 50%;
  }

  .tool-tip{
    position: absolute;
    top: 30px;
    left: 20px;
    z-index: 1;
    padding: 5px;
    display: block;
    background-color: white;
  }
</style>
