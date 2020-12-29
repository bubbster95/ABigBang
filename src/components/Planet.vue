<template>
  <div class='planet-container'>
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
  name: 'Planet',
  computed: {
    buttons () {
      return this.$store.state.Planet
    }
  },
  methods: {
    click: function(button) {
      return button.click(button.name)
    }
  }
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
