<template>
  <div class="login-container">
    <h2>Iniciar Sesión - Staff</h2>
    <form @submit.prevent="handleLogin">
      <FormField
        id="login-email"
        label="Email"
        v-model="email"
        type="email"
        required
      />
      <FormField
        id="login-password"
        label="Contraseña"
        v-model="password"
        type="password"
        required
      />
      <button type="submit" :disabled="loading">
        {{ loading ? 'Ingresando...' : 'Ingresar' }}
      </button>
    </form>
    <p v-if="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import FormField from '@/components/FormField.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const mensaje = ref('')
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  mensaje.value = ''

  const result = await authStore.login(email.value, password.value)

  if (result.success) {
    mensaje.value = 'Login exitoso'
    router.push('/suppliers')
  } else {
    mensaje.value = 'Error: ' + result.error
  }

  loading.value = false
}
</script>

<style scoped>
.login-container {
  width: 400px;
  margin: 50px auto;
  padding: 30px;
  background: #f9fbfd;
  border: 1px solid #d0e4f7;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

h2 {
  text-align: center;
  color: #1565c0;
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  color: #2c3e50;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #aacbea;
  border-radius: 6px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover:not(:disabled) {
  background-color: #155fa0;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

p {
  text-align: center;
  margin-top: 15px;
  color: #1565c0;
}
</style>
