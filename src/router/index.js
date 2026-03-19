import { createRouter, createWebHistory } from 'vue-router'
import LoginStaff from '../views/LoginStaff.vue'
import ProveedorForm from '../views/ProveedorForm.vue'
import { useAuthStore } from '../stores/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginStaff
    },
    {
      path: '/suppliers',
      name: 'Suppliers',
      component: ProveedorForm,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()
        if (authStore.isAuthenticated) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/',
      redirect: '/login'
    }
  ],
})

export default router
