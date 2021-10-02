<template>
  <div id="app">
    <HelloWorld msg="Desafio Huggy"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Roboto;
  font-style: normal;
  margin-top: 60px;
}
</style>
