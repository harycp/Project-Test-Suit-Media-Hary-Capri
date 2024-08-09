import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'

const app = createApp(App)

app.use(router)

app.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://via.placeholder.com/150?text=Error',
  loading: 'https://via.placeholder.com/150?text=Loading...',
  attempt: 1,
  observer: true,
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  }
})

app.mount('#app')
