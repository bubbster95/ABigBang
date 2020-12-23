<template>
  <div class='play-space-container'>
      <h1>{{title}}</h1>
      <button v-on:click="change">Change Feed</button>
  </div>
</template>

<script>
export default {
  name: 'Playspace',
  props: {
    title: String
  },
  methods: {
      change: function(){
          this.$store.commit('change', 'text that gets sent when change feed button is pressed')
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
</style>
