import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'

const app = createApp(App)

app.use(router)

app.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://random-image-pepebigotes.vercel.app/api/random-image',
  loading: 'https://via.placeholder.com/150?text=Loading...',
  attempt: 1
})

app.mount('#app')
