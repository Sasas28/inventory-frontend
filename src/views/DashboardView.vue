<script setup>
import { useAuthStore } from '../stores/auth'
import { ref } from 'vue'

// Sidebar state for mobile/desktop toggle
const sidebarOpen = ref(false)

// Dummy metrics data
const stats = [
  { title: 'Total Users', value: '12,480', change: '+12%', type: 'increase' },
  { title: 'New Orders', value: '450', change: '+5.4%', type: 'increase' },
  { title: 'Pending Issues', value: '18', change: '-2.1%', type: 'decrease' },
  { title: 'Total Revenue', value: '$45,210', change: '+8.3%', type: 'increase' }
]

// Dummy table data
const recentActivity = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Pending' },
  { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User', status: 'Inactive' },
]

const auth = useAuthStore()
</script>

<template>
    <!-- <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
            <div class="text-center">
                <h1 class="text-3xl font-extrabold text-gray-900">Welcome {{ auth.user.name }}</h1>
            </div>
        </div>
    </div> -->

    <div class="flex h-screen bg-gray-100 font-sans">
        <!-- Sidebar -->
        <aside :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'" class="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 flex flex-col">
        <div class="flex items-center justify-between h-16 px-6 bg-slate-800">
            <span class="text-xl font-bold tracking-wider">Ajaster Zamora</span>
            <button @click="sidebarOpen = false" class="md:hidden text-gray-400 hover:text-white">✕</button>
        </div>
        <nav class="flex-1 px-4 py-6 space-y-2">
            <!-- <a href="#" class="block px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium">Dashboard</a> -->
            <a href="#" class="block px-4 py-2.5 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white">Stock Overview</a>
            <a href="#" class="block px-4 py-2.5 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white">Stock In</a>
            <a href="#" class="block px-4 py-2.5 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white">Stock Out</a>
            <a href="#" class="block px-4 py-2.5 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white">Critical Stocks</a>
            <a href="#" class="block px-4 py-2.5 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white">Stock Management</a>
            <a href="#" class="block px-4 py-2.5 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white">Users</a>
        </nav>
        </aside>

        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col overflow-hidden">
        
        <!-- Top Navbar -->
        <header class="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
            <button @click="sidebarOpen = true" class="md:hidden text-gray-600 hover:text-gray-900 font-bold">☰ Menu</button>
            <h1 class="text-lg font-semibold text-gray-800 hidden md:block">Overview</h1>
            <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">Admin User</span>
            <div class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">A</div>
            </div>
        </header>

        <!-- Dashboard Scrollable Body -->
        <main class="flex-1 overflow-x-hidden overflow-y-auto p-6 space-y-6">
            
            <!-- Metric Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="stat in stats" :key="stat.title" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                <span class="text-sm text-gray-500 font-medium">{{ stat.title }}</span>
                <div class="flex items-baseline justify-between mt-2">
                <span class="text-2xl font-bold text-gray-900">{{ stat.value }}</span>
                <span :class="stat.type === 'increase' ? 'text-green-600' : 'text-red-600'" class="text-xs font-semibold">{{ stat.change }}</span>
                </div>
            </div>
            </div>

            <!-- Data Table Section -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-100">
                <h2 class="text-base font-semibold text-gray-800">Recent Activity</h2>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th class="px-6 py-3 font-semibold">Name</th>
                    <th class="px-6 py-3 font-semibold">Email</th>
                    <th class="px-6 py-3 font-semibold">Role</th>
                    <th class="px-6 py-3 font-semibold">Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 text-sm text-gray-700">
                    <tr v-for="person in recentActivity" :key="person.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 font-medium text-gray-900">{{ person.name }}</td>
                    <td class="px-6 py-4 text-gray-500">{{ person.email }}</td>
                    <td class="px-6 py-4">{{ person.role }}</td>
                    <td class="px-6 py-4">
                        <span :class="person.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'" class="px-2.5 py-1 text-xs font-medium rounded-full">
                        {{ person.status }}
                        </span>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>

        </main>
        </div>
    </div>
</template>