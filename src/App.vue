<template>
  <div id="app">
    <Feed :feed="this.$store.state.feed"/>
    <Playspace :buttons="this.$store.state.Space"/>
    <Elements :elements="this.$store.state.Elements"/>
  </div>
</template>

<script>
import Feed from './components/Feed.vue'
import Playspace from './components/Playspace.vue'
import Elements from './components/Elements.vue'

export default {
  name: 'App',
  components: {
    Feed,
    Playspace,
    Elements
  }
}
</script>

<style>
  #app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: lightgreen;
  }

  h1 {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 15pt;
    margin: 0;
    position: relative;
    top: -10px;
    left: 10px;
  }
</style>

