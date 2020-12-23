<template>
  <div class='feed-container'>
      <h1>Feed</h1>
      <div class='text-container' v-on:change='read(feed)'>
        <p class='feed'>{{feed[0]}}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Feed',
  props: {
    feed: Array
  },
  methods: {
    read (feed) {
      let container = document.querySelector('.text-container');
      feed.map(text => {
        console.log("Yoyoyoy", text, 'container', container)
      })
    }
  }
}
</script>

<style scoped>
  .feed-container {
    width: 30%;
    height: 90vh;
    margin: 10px;
    display: inline-block;
    background-color: lightcyan;
  }

  .feed {
    margin: 5px;

  }
</style>