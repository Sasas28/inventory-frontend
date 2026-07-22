<script setup>
    import { onMounted } from 'vue'
    import { useAuthStore } from './stores/auth'

    const auth = useAuthStore()

    onMounted(async () => {
        await auth.getUser()
    })

    const logout = async () => {
        await auth.logout()
    }
</script>

<template>
    <nav class="bg-slate-900 text-white px-6 py-4 shadow-md">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <RouterLink to="/" class="text-xl font-bold tracking-wide hover:text-blue-400 transition">ADEV INVENTORY APP</RouterLink>
            <div class="flex items-center gap-6">
                <template v-if="!auth.authenticated">
                    <RouterLink to="/login" class="hover:text-blue-400 transition font-medium">Login</RouterLink>
                    <RouterLink to="/register" class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition font-medium shadow-sm">Register</RouterLink>
                </template>
                <template v-else>
                  <RouterLink to="/dashboard" class="hover:text-blue-400 transition font-medium">DASHBOARD</RouterLink>
                  <button @click="logout" class="hover:text-blue-400 transition font-medium" :disabled="auth.loading">{{auth.loading? 'Logging out...' : 'LOGOUT'}}</button>
                </template>
            </div>
        </div>
    </nav>
    <div
        v-if="Object.keys(auth.errorMessage).length"
        class="bg-red-50 border-l-4 border-red-400 p-4 rounded"
    >
        <p>{{ auth.errorMessage }}</p>
    </div>
    <main>
        <RouterView/>
    </main>
</template>
