import { createRouter, createMemoryHistory} from 'vue-router'
import Register from '../views/RegisterView.vue'
import Login from '../views/LoginView.vue'
import Dashboard from '../views/DashboardView.vue'
import Home from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth.js'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/register',
        component: Register,
        meta: {
            guest: true
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            guest: true
        }
    },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

router.beforeEach(async (to) => {

    const auth = useAuthStore()

    if (auth.user === null) {

        await auth.getUser()

    }

    if (to.meta.requiresAuth && !auth.authenticated) {

        return '/login'

    }

    if (to.meta.guest && auth.authenticated) {

        return '/dashboard'

    }

})

export default router