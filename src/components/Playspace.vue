<template>
  <div class='play-space-container'>
      <h1>Open Space</h1>
      <button 
        v-for="button in buttons"
        :key="button.title"
        :class="button.class"
        v-on:click="click(button)"
          >{{button.title}}</button>
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
</style>
