<template>
  <div class="container">
    <div class="header">
      <h2>Registrar proveedor</h2>
      <button @click="logout" class="logout-btn">Cerrar Sesión</button>
    </div>

    <form @submit.prevent="guardarProveedor">

      <FormField
        id="name"
        label="Nombre"
        v-model="proveedor.name"
        placeholder="Ingrese nombre"
        required
      />

      <FormField
        id="contact"
        label="Contacto"
        v-model="proveedor.contact"
        placeholder="Teléfono o persona"
      />

      <FormField
        id="email"
        label="Email"
        v-model="proveedor.email"
        type="email"
        placeholder="correo@ejemplo.com"
      />

      <FormField
        id="phone"
        label="Teléfono"
        v-model="proveedor.phone_number"
        placeholder="Número celular"
      />

      <button type="submit">Guardar</button>

    </form>

    <p v-if="mensaje">{{ mensaje }}</p>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth.js'
import FormField from '@/components/FormField.vue'

const router = useRouter()
const authStore = useAuthStore()
const { token } = storeToRefs(authStore)

const proveedor = ref({
  name: "",
  contact: "",
  email: "",
  phone_number: ""
})
const mensaje = ref("")

function logout() {
  authStore.logout()
  router.push('/login')
}

async function guardarProveedor(){
  const { error } = await useFetch('/api/suppliers', {
    headers: {
      Authorization: token.value ? `Bearer ${token.value}` : undefined
    }
  })
    .post(proveedor.value)
    .json()

  if(error.value){
    mensaje.value = "Error al guardar proveedor"
  }else{
    mensaje.value = "Proveedor guardado correctamente"
    proveedor.value = {
      name: "",
      contact: "",
      email: "",
      phone_number: ""
    }
  }
}
</script>

<style scoped>
.container{
  width: 450px;
  margin: 50px auto;
  padding: 30px 40px;
  background: #f9fbfd;
  border: 1px solid #d0e4f7;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

h2{
  color: #1565c0; 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  font-size: 24px;
}

.logout-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.logout-btn:hover {
  background-color: #c82333;
}

label{
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: #2c3e50;
}

input{
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 14px;
  border: 1px solid #aacbea;
  border-radius: 6px;
  font-size: 15px;
  background: #ffffff;
}

button{
  width: 100%;
  padding: 12px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover{
  background-color: #155fa0;
}

p{
  text-align: center;
  margin-top: 18px;
  color: #1565c0;
  font-weight: bold;
}
</style>
