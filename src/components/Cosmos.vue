<template>
  <div class='cosmos-container'>
    <div class='nav'>
        <router-link to="/space"><h1>Space</h1></router-link>
        <router-link to="/planet"><h1>Planet</h1></router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Playspace'
}
</script>

<style>
    .cosmos-container {
    position: relative;
    width: 50%;
    height: 90vh;
    margin: 10px;
    display: inline-block;
    background-color: lightcoral;
  }
</style>