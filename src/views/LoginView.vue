<script setup>
import axios from 'axios'
import { ref, reactive } from 'vue'
import api from '../lib/axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

// Reactive form data object
const form = reactive({
  email: '',
  password: '',
})

// UI state messages
const errorMessage = ref('')
const successMessage = ref('')
const errors = ref({})

// Registration handler method
const handleLogin = async () => {
    await auth.login({
      email: form.email,
      password: form.password,
    })

    //Clearing the form after successful registration
    if (auth.user) {
      form.email = ''
      form.password = ''
    }
    //Clear error messages when the page loads
    onMounted(() => {
        auth.clearMessages()
    })

    // successMessage.value = ''
    // errorMessage.value = ''
    // errors.value = {}

    // try {
    //     //initialize CSRF protection
    //     await api.get('/sanctum/csrf-cookie')
        
    //     //Submit data payload to Laravel api route
    //     const response = await api.post('/api/login', {
    //         email: form.email,
    //         password: form.password
    //     })

    //     console.log(response.data)

    //     // Redirect user to the dashboard or home page
    //     router.push('/dashboard'); 
        
    //   } catch (error) {
    //     // Gracefully handle error responses from the backend
    //     if (error.response && error.response.data) {
    //       errorMessage.value = error.response.data.message || 'Invalid credentials';
    //     } else {
    //       errorMessage.value = 'Server connection failed. Try again later.';
    //     }
    //   }
}
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
      
      <!-- Form Header -->
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">Sign in</h2>
      </div>

      <!-- Notification Alerts -->
      <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-400 p-4 rounded text-sm text-red-700">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="bg-green-50 border-l-4 border-green-400 p-4 rounded text-sm text-green-700">
        {{ successMessage }}
      </div>

      <!-- Login Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm space-y-4">

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <input 
              id="email" 
              v-model="form.email" 
              type="email" 
              required 
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input 
              id="password" 
              v-model="form.password" 
              type="password" 
              required 
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button 
            type="submit" 
            :disabled="auth.loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            {{ auth.loading ? 'Logging in...' : 'Log in' }}
          </button>
        </div>
      </form>

    </div>
  </div>
</template>