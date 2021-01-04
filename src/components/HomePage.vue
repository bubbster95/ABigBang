<template>
    <div id="app">
        <Feed :feed="feed"/>
        <Cosmos :Elements="Elements" :Feed="feed"/>
        <Elements :elements="Elements"/>
    </div>
</template>

<script>
import Feed from './Feed.vue'
import Cosmos from './Cosmos'
import Elements from './Elements.vue'

export default {
  name: 'HomePage',
  data() {
        return {
            feed: ['You pop into existence. Everything is dark and cold.'],
            Elements: {
                'particles': {
                    title: 'Particles ',
                    class: 'null',
                    amount: 0,
                    msg: 'Particles make up everything, even you. You\'re going to want a lot'
                },
                'mass': {
                    title: 'Mass ',
                    class: 'null',
                    amount: 1,
                    msg: 'Mass is power and influance, collect more.'
                },
                'water': {
                    title: 'H2O ',
                    class: 'null',
                    amount: 0,
                    msg: 'Water gives life, and it isn\'t easy to come by.'
                },
                'hydrogen': {
                    title: 'H ',
                    class: 'null',
                    amount: 0,
                    msg: 'Hydrogen makes water and/or goes boom.'
                },
                'oxygen': {
                    title: 'O ',
                    class: 'null',
                    amount: 0,
                    msg: 'Oxygen allows life to keep living, and it makes water, so this is important stuff.'
                },
                'carbon': {
                    title: 'C ',
                    class: 'null',
                    amount: 0,
                    msg: 'Carbon is the building block of all life.'
                }
            } 
        }
    },
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

