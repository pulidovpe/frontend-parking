import { create } from 'zustand'
import authService from '../services/auth'

const useAuthStore = create((set) => ({
  user: authService.getCurrentUser(),
  isAuthenticated: authService.isAuthenticated(),
  isLoading: false,
  error: null,

  // Acción: Login
  login: async (credentials) => {
    set({ isLoading: true, error: null })
    try {
      const data = await authService.login(credentials)
      set({ user: data.user, isAuthenticated: true, isLoading: false })
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión'
      set({ error: errorMessage, isLoading: false })
      throw error
    }
  },

  // Acción: Registro
  register: async (userData) => {
    set({ isLoading: true, error: null })
    try {
      const data = await authService.register(userData)
      set({ isLoading: false })
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al registrarse'
      set({ error: errorMessage, isLoading: false })
      throw error
    }
  },

  // Acción: Logout
  logout: () => {
    authService.logout()
    set({ user: null, isAuthenticated: false })
  },

  // Limpiar errores
  clearError: () => set({ error: null }),
}))

export default useAuthStore