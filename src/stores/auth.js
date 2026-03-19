import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'))
  const isAuthenticated = computed(() => !!token.value)

  async function login(email, password) {
    const { data, error } = await useFetch('/api/login/staff')
      .post({ email, password })
      .json()

    if (!error.value && data.value?.token) {
      token.value = data.value.token
      localStorage.setItem('token', token.value)
      return { success: true, token: token.value }
    }

    return {
      success: false,
      error: error.value || 'Login failed',
    }
  }

  function logout() {
    token.value = null
    localStorage.removeItem('token')
  }

  return {
    token,
    isAuthenticated,
    login,
    logout,
  }
})
