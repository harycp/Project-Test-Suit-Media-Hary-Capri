<script>
import Header from '../components/Header.vue'
import Banner from '../components/Banner.vue'

export default {
  components: {
    Header,
    Banner
  }
}
</script>

<template>
  <div id="works">
    <Header />
    <Banner
      imageUrl="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      title="Work"
      subtitle="Lets get to work with us"
    />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  scroll-behavior: smooth;
}
</style>
