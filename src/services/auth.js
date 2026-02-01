import api from './api'

const authService = {
  // Registro de usuario
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  // Login
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    const { user, accessToken, refreshToken } = response.data
    
    // Guardar en localStorage
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('user', JSON.stringify(user))
    
    return response.data
  },

  // Logout
  logout: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  },

  // Verificar email
  verifyEmail: async (token) => {
    const response = await api.get(`/auth/verify?token=${token}`)
    return response.data
  },

  // Solicitar recuperación de contraseña
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  // Resetear contraseña
  resetPassword: async (token, newPassword) => {
    const response = await api.post('/auth/reset-password', {
      token,
      newPassword,
    })
    return response.data
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user')
    
    // Verificar que no sea null, undefined, o la string "undefined"
    if (!userStr || userStr === 'undefined' || userStr === 'null') {
      return null
    }
    
    try {
      return JSON.parse(userStr)
    } catch (error) {
      console.error('Error parsing user from localStorage:', error)
      // Limpiar localStorage si está corrupto
      localStorage.removeItem('user')
      return null
    }
  },

  // Verificar si está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken')
  },
}

export default authService