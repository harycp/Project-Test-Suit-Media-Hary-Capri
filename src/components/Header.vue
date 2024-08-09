<script>
export default {
  data() {
    return {
      lastScrollY: 0,
      isHidden: false,
      menuActive: false,
      isAtTop: true // New data property
    }
  },
  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive
    },
    handleScroll() {
      if (window.scrollY > this.lastScrollY) {
        // Scrolling down
        this.isHidden = true
      } else {
        // Scrolling up
        this.isHidden = false
      }

      this.isAtTop = window.scrollY === 0 // Check if at the top of the page
      this.lastScrollY = window.scrollY
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<template>
  <div class="container">
    <nav class="navbar" :class="{ hidden: isHidden }">
      <div class="container-nav">
        <div class="logo">
          <router-link :to="{ name: 'home' }">
            <img class="logo" src="../assets/LogoSuitMedia.png" alt="Suitmedia Logo" />
          </router-link>
        </div>
        <button class="navbar-toggler" @click="toggleMenu">☰</button>
        <div :class="{ menu: true, 'menu-active': menuActive }">
          <router-link :to="{ name: 'work' }" active-class="active">Work</router-link>
          <router-link to="/about" active-class="active">About</router-link>
          <router-link to="/services" active-class="active">Services</router-link>
          <router-link :to="{ name: 'ideas' }" active-class="active">Ideas</router-link>
          <router-link to="/careers" active-class="active">Careers</router-link>
          <router-link to="/contact" active-class="active">Contact</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
* {
  font-family: 'Urbanist', sans-serif;
}

.container {
  padding: 0 40px;
}

.navbar {
  transition: all 0.3s ease;
  padding: 20px;
  position: fixed;
  width: 100%;
  z-index: 100;
  top: 0;
  background-color: rgba(240, 108, 52, 0.9);
  color: white;
  left: 0;
}

.navbar.hidden {
  transform: translateY(-100%);
}

.container-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.logo img {
  height: 40px;
  transition: filter 0.3s ease; /* Smooth transition for the logo color change */
}

.menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.menu a {
  text-decoration: none;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  padding-bottom: 5px;
}

.menu a.active {
  border-bottom: 4px solid white;
}

.menu a:hover {
  text-decoration: underline;
}

.navbar-toggler {
  display: none;
}

@media (max-width: 600px) {
  .navbar-toggler {
    display: block;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 2rem;
  }

  .menu {
    display: none;
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: white;
    padding: 1rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    z-index: 99;
  }

  .menu-active {
    display: flex;
  }

  .menu a {
    color: #f06c34;
  }

  .menu a.active {
    border-bottom: 2px solid #f06c34; /* Bottom border for active menu on mobile */
  }
}
</style>
