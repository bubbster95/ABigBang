<template>
  <div class='play-space-container'>
      <div class='build-buttons' v-for="button in buttons" :key="button.title">

        <!-- Buttons with coolDown -->
        <button
          v-if='button.cooldown' 
          :class="button.class"
          v-on:click="click(button)"
          @mouseover="toolTip(button)"
          @mouseout="toolTipOff(button)"
        >{{button.title}}
        <div class='cool-down' :id='button.name + "-cool-down"'></div>
        </button>

        <!-- regular buttons -->
        <button
          v-else
          :class="button.class"
          v-on:click="click(button)"
          @mouseover="toolTip(button)"
          @mouseout="toolTipOff(button)"
        >{{button.title}}
        </button>

        <!-- tool tip -->
        <div v-if='!button.noTT' class='null' :id='button.name + "-tool-tip"'></div>

      </div>
  </div>
</template>

<script>
import handle from '../Handler'
export default {
  name: 'Playspace',
  computed: {
    buttons () {
      return this.$store.state.Space
    }
  },
  methods: {
    click: function(button) {
      return button.click(button.name)
    },
    toolTip: (button) => {
      return handle.state.toolTip(button)
    },
    toolTipOff: (button) => {
      return handle.state.toolTipOff(button)
    }
  }
}
</script>

<style scoped>
  .play-space-container {
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
