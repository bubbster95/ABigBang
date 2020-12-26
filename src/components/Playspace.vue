<template>
  <div class='play-space-container'>
      <h1>Open Space</h1>
      <button v-for="button in buttons" :key="button.title" v-on:click="button.click(button.msg, button.collect, button.pay, button.loss, button.price)">{{button.title}}</button>
  </div>
</template>

<script>
export default {
  name: 'Playspace',
  props: {
    buttons: Object
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
</style>
