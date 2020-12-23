<template>
  <div class="elements-container">
    <h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Elements',
  props: {
    title: String
  }
}
</script>

<style scoped>
  .elements-container {
    position: relative;
    top: 0;
    width: 25%;
    height: 90vh;
    margin: 10px;
    display: inline-block;
    background-color: lightblue;
  }
</style>
