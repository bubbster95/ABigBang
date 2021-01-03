<template>
  <div class='space-container'>
    <button id="rotate" class="available" @click="clickEvent($event)" title="tool tip">
        Rotate wildly!
        <div class='cool-down' id='rotate-cool-down'></div>
    </button>

    <button v-if="Elements.particles.amount >= 50" id="mass" @click="clickEvent($event)" title="tool tip">
      Add mass
    </button>

    <button v-if="Elements.carbon.amount >= 10" id="carbonMoon" @click="clickEvent($event)" title="tool tip">
      Carbon moon
    </button>
  </div>
</template>

<script>
export default {
  name: 'Space',
  props: ['clickEvent', 'Elements']
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
