<template>
  <div class="elements-container">
    <h1>Elements</h1>
    <div :class="element.class" v-for="element in elements" :key="element.title">
      <h4 class="element-text">{{element.title}}</h4>
      <h4 class="element-text number">{{element.amount}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Elements',
  props: {
    elements: Object
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

  .element {
    position: relative;
    display: flex;
  }

  .element-text {
    margin: 10px;
  }

  .number {
    position: absolute;
    right: 0;
  }

  .null {
    display: none;
  }
</style>
