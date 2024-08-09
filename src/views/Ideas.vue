<script>
import Header from '../components/Header.vue'
import Banner from '../components/Banner.vue'
import ListPost from '../components/ListPost.vue'

export default {
  components: {
    Header,
    Banner,
    ListPost
  }
}
</script>

<template>
  <div id="ideas">
    <Header />
    <Banner
      imageUrl="https://images.unsplash.com/photo-1515965885361-f1e0095517ea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      title="Ideas"
      subtitle="Where all our great things begin"
    />
    <ListPost />
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
