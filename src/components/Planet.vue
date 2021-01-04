<template>
  <div class='planet-container'>
    <button id="sort" class="available" @click="clickEvent('sort')" title="tool tip">
        Sort particles
        <div class='cool-down' id='sort-cool-down'></div>
    </button>
  </div>
</template>

<script>
// import store from '../Store'
export default {
  name: 'Planet',
  props: ['clickEvent']
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

  .null {
    display: none;
  }

  .build-buttons {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 30%;
    margin: 0px 10px;
  }

  .available, .cooling {
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
