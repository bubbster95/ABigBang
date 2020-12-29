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
        <div class='tool-tip' :id='button.name + "-tool-tip"'></div>

      </div>
  </div>
</template>

<script>
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
      const toolTip = document.getElementById(button.name + '-tool-tip')
      toolTip.className = 'tool-tip'

      toolTip.style.top = event.clientY - 30 + 'px';
      toolTip.style.left = event.clientX - 300 + 'px';
      if (button.price > 0) {
        toolTip.innerHTML = button.elemLoss + '-' + button.price +'<br>'+ button.elemGain + '+' + button.income;
      } else {
        toolTip.innerHTML = button.elemGain + '+' + button.income;
      }
    },
    toolTipOff: (button) => {
      const toolTip = document.getElementById(button.name + '-tool-tip')
      toolTip.className = 'null'
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
    z-index: 1;
    display: block;
    background-color: burlywood;
  }
</style>
