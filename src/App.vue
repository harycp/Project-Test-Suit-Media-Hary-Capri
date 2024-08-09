<script>
import Header from './components/Header.vue'
import Banner from './components/Banner.vue'

export default {
  components: {
    Header,
    Banner
  }
}
</script>

<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Banner />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  scroll-behavior: smooth;
  font-family: 'Urbanist', sans-serif;
}
</style>
