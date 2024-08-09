import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Ideas from '@/views/Ideas.vue'
import Work from '@/views/Work.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'
import Careers from '@/views/Careers.vue'
import Services from '@/views/Services.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ideas',
      name: 'ideas',
      component: Ideas
    },
    {
      path: '/work',
      name: 'work',
      component: Work
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/careers',
      name: 'careers',
      component: Careers
    },
    {
      path: '/services',
      name: 'services',
      component: Services
    }
  ]
})

export default router
