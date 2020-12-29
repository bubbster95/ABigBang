<template>
  <div class='cosmos-container'>
    <div class='nav'>

        <router-link
        v-for="link in links"
        :key="link.inner"
        :to="link.to"
        :class="link.class"
        >
            <h1>{{link.inner}}</h1>
        </router-link>

    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Playspace',
  computed: {
    links () {
      return this.$store.state.Links
    } 
  }
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

  .null {
      display: none;
  }
</style>