import { defineStore } from 'pinia'
import api from '../lib/axios'
import router from '../router'

export const useAuthStore = defineStore('auth', {

    state: () => ({
        user: null,

        loading: false,

        successMessage: '',

        errorMessage: '',

        validationErrors: {}
    }),

    getters: {

        authenticated: (state) => !!state.user

    },

    actions: {

        clearMessages() {

            this.successMessage = ''
            this.errorMessage = ''
            this.validationErrors = {}

        },

        async csrf() {

            await api.get('/sanctum/csrf-cookie')

        },

        async register(form) {

            this.loading = true
            this.clearMessages()

            try {

                await this.csrf()

                const response = await api.post('/api/register', form)

                this.successMessage = response.data.message

                await this.getUser()

                router.push('/dashboard')

            } catch (error) {
                if (!error.response) {
                    this.errorMessage = 'Unable to connect to the server.'
                } else if (error.response.status === 422) {

                    this.validationErrors = error.response.data.errors

                } else {

                    this.errorMessage = error.response.data.message

                }

            } finally {

                this.loading = false

            }

        },

        async login(form) {

            this.loading = true
            this.clearMessages()

            try {

                await this.csrf()

                const response = await api.post('/api/login', form)

                this.successMessage = response.data.message

                await this.getUser()

                router.push('/dashboard')

            } catch (error) {

                if (error.response?.status === 422) {

                    this.validationErrors = error.response.data.errors

                } else {

                    this.errorMessage = error.response?.data?.message ?? 'Login failed.'

                }

            } finally {

                this.loading = false

            }

        },

        async getUser() {

            try {

                const response = await api.get('/api/user')

                this.user = response.data

            } catch {

                this.user = null

            }

        },

        async logout() {

            this.loading = true

            this.clearMessages()

            try {

                const response = await api.post('/api/logout')

                this.successMessage = response.data.message

                this.user = null

                router.push('/login')

            } catch (error) {

                if (!error.response) {
                    this.errorMessage = 'Unable to connect to the server.'
                } else if (error.response.status === 422) {

                    this.validationErrors = error.response.data.errors

                } else {

                    this.errorMessage = error.response.data.message

                }

            } finally {

                this.loading = false

            }

        }

    }

})