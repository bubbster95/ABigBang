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
    </div>

    <div v-if="data.makeAvailable('availableButtons', 'carbonManager', data.moons.cMoon >= 1)" class="carbon-manager">
      <button
        id="add"
        @click="data.clickEvent('add', 'cMoon')"
        :title="data.toolTip('add')"
      >
        ^
      </button>

      <button
        id="subtract"
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
  props: ['data']
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
    flex-direction: column;
    width: 30%;
    margin: 0px 10px;
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
