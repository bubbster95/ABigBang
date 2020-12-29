<template>
  <div class='play-space-container'>
      <h1>Open Space</h1>
      <div class='build-buttons' v-for="button in buttons" :key="button.title">

        <!-- Buttons with coolDown -->
        <button
          v-if='button.cooldown' 
          :class="button.class"
          v-on:click="click(button)"
        >{{button.title}}
        <div class='cool-down' :id='button.name + "-cool-down"'></div>
        </button>

        <!-- regular buttons -->
        <button
          v-else
          :class="button.class"
          v-on:click="click(button)"
        >{{button.title}}
        </button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Playspace',
  props: {
    buttons: Object
  },
  methods: {
    click: function(button) {
      return button.click(button.name)
    }
  }
}
</script>

<style scoped>
  .play-space-container {
    position: relative;
    width: 50%;
    height: 90vh;
    margin: 10px;
    display: inline-block;
    background-color: lightcoral;
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
</style>
