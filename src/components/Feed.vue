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
    position: relative;
    width: 30%;
    height: 90vh;
    margin: 10px;
    display: inline-block;
    background-color: lightcyan;
  }


  .text-container {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 5px;
    top: 0;
    background: linear-gradient(to bottom, rgba(255 255 255 100), transparent);
  }
</style>