<template>
  <div class="banner">
    <div
      class="banner-image"
      :style="{
        backgroundImage: `url(${imageUrl})`,
        transform: `translateY(${scrollPosition * 0.5}px)`
      }"
    ></div>
    <div
      class="banner-text"
      :style="{
        transform: `translate(-50%, calc(-50% + ${scrollPosition * 0.3}px))`
      }"
    >
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      scrollPosition: 0
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scrollPosition = window.scrollY
    }
  }
}
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.banner {
  position: relative;
  width: 100%;
  height: 480px;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
  z-index: 1;
  margin-bottom: 20px;
}

.banner-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  transition: transform 0.3s ease;
  will-change: transform;
}

.banner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  will-change: transform;
}
</style>
