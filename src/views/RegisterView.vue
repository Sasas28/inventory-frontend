<script setup>
import { onMounted, reactive } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()

// Reactive form data object
const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: '',
  agreeToTerms: false
})

const handleRegister = async () => {
  await auth.register({
      name: form.name,
      email: form.email,
      role: form.role,
      password: form.password,
      password_confirmation: form.password_confirmation,
  })

  //Clearing the form after successful registration
  if (auth.user) {
    form.name = ''
    form.email = ''
    form.role = ''
    form.password = ''
    form.password_confirmation = ''
    form.agreeToTerms = false
  }
}
//Clear error messages when the page loads
onMounted(() => {
    auth.clearMessages()
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
      
      <!-- Form Header -->
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p class="mt-2 text-sm text-gray-600">
          Already have an account? 
          <RouterLink
    to="/login"
    class="font-medium text-indigo-600 hover:text-indigo-500"
>
    Sign in
</RouterLink>
        </p>
      </div>

      <!-- Notification Alerts -->
      <div v-if="auth.successMessage" class="bg-green-50 border-l-4 border-green-400 p-4 rounded text-sm text-green-700">
        {{ auth.successMessage }}
      </div>
      <div
    v-if="auth.errorMessage" class="bg-red-50 border-l-4 border-red-400 p-4 rounded text-red-700"
>
        {{ auth.errorMessage }}
      </div>

      <!-- Registration Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm space-y-4">
          
          <!-- Full Name Field -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              id="name" 
              v-model="form.name" 
              type="text" 
              required 
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="John Doe"
            />
            <p v-if="auth.validationErrors.name" class="text-red-500 text-sm mt-1">{{ auth.validationErrors.name[0] }}</p>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <input 
              id="email" 
              v-model="form.email" 
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
            />
            <p v-if="auth.validationErrors.email" class="text-red-500 text-sm mt-1">{{ auth.validationErrors.email[0] }}</p>
          </div>

          <!-- Role Field -->
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
            <input 
              id="role" 
              v-model="form.role" 
              type="text" 
              required 
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="staff"
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
            <p v-if="auth.validationErrors.password" class="text-red-500 text-sm mt-1">{{ auth.validationErrors.password[0] }}</p>
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input 
              id="confirm-password" 
              v-model="form.password_confirmation" 
              type="password" 
              required 
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <!-- Terms Agreement Checkbox -->
        <div class="flex items-center">
          <input 
            id="terms" 
            v-model="form.agreeToTerms" 
            type="checkbox" 
            required
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label for="terms" class="ml-2 block text-sm text-gray-900">
            I agree to the <a href="#" class="text-indigo-600 hover:text-indigo-500">Terms</a> and <a href="#" class="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
          </label>
        </div>

        <!-- Submit Button -->
        <div>
          <button 
            type="submit" 
            :disabled="auth.loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            {{auth.loading ? 'Registering...' : 'Register'}}
          </button>
        </div>
      </form>

    </div>
  </div>
</template>
