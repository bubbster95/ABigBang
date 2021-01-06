<template>
  <div class='space-container'>
    <div class="build-buttons">
      <button
      v-if="data.makeAvailable('availableButtons', 'rotate', true)"
      id="rotate"
      class="available"
      @click="data.clickEvent('rotate')"
      :title="data.toolTip('rotate')">
          Rotate wildly!
          <div class='cool-down' id='rotate-cool-down'></div>
      </button>

      <button
      v-if="data.makeAvailable('availableButtons', 'sorter', data.upgrades.sorter.amount >= 2)"
      id="atmosphere"
      @click="data.clickEvent('atmosphere')"
      :title="data.toolTip('atmosphere')">
        Collect atmosphere
      </button>

      <button
      v-if="data.makeAvailable('availableButtons', 'sorter', Elements.particles.amount >= 50)"
      id="sorter"
      @click="data.clickEvent('sorter')"
      :title="data.toolTip('sorter')">
        Create sorter
      </button>

      <button
      v-if="data.makeAvailable('availableButtons', 'mass', Elements.particles.amount >= 50)"
      id="mass"
      @click="data.clickEvent('mass')"
      :title="data.toolTip('mass')">
        Add mass
      </button>

      <button
      v-if="data.makeAvailable('availableButtons', 'carbonMoon', data.upgrades.sorter.amount >= 1)"
      id="carbonMoon"
      @click="data.clickEvent('carbonMoon')"
      :title="data.toolTip('carbonMoon')">
        Carbon moon
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Space',
  props: ['data', 'Elements']
}
</script>

<style scoped>
  .space-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 20px 10px;
  }

  .build-buttons {
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

  .start-cool {
    animation: coolDown;
    animation-timing-function: linear;
  }

  @keyframes coolDown {
    0% {width: 100%;}
    100% {width: 0px;}
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
