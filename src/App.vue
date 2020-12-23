<template>
  <div id="app">
    <Feed msg="This is my feed, whatever passes through this prop is a feed item"/>
    <Playspace msg="This is my PlaySpace, everything coming in here is a button?"/>
    <Elements msg="This is my Elements, everything coming in here is a change to my elements table."/>
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

