<template>
  <div class='feed-container'>
      <h1>Feed</h1>
      <div class='text-container'>
        <p v-for='(line, index) in feed' :key="'line' + index">{{line}}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Feed',
  props: {
    feed: Array
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