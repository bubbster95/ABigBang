<template>
  <div v-if='!button.noTT' class='tool-tip' :id='button.id + "-tool-tip"'>
  </div>
</template>

<script>
import handle from '../Handler'
export default {
  name: 'ToolTip',
  props: {
      button: Object
  },
  methods: {
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
