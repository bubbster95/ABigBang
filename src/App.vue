<template>
  <div id="app">
    <Feed :feed="this.$store.state.feed"/>
    <Cosmos />
    <Elements :elements="this.$store.state.Elements"/>
  </div>
</template>

<script>
import Feed from './components/Feed.vue'
import Cosmos from './components/Cosmos'
import Elements from './components/Elements.vue'

export default {
  name: 'App',
  components: {
    Feed,
    Cosmos,
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
    margin: 0 10px;
    display: inline;
    position: relative;
    top: -10px;
    left: 10px;
    color: black;
    text-decoration: none;
  }
</style>

