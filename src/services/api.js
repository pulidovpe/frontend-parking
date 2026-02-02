import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Instancia principal de Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Variable para evitar múltiples redirecciones
let isRefreshing = false

// Interceptor para agregar token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar errores y refrescar token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    console.log('🔴 Error en petición:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message
    })

    // Si el error es 401 y no es un retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // Si la petición fallida es a /auth/refresh, no intentar refrescar
      if (originalRequest.url?.includes('/auth/refresh')) {
        console.log('❌ Error en refresh, limpiando sesión')
        
        if (!isRefreshing) {
          isRefreshing = true
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('user')
          
          alert('Tu sesión ha expirado. Por favor inicia sesión nuevamente.')
          window.location.href = '/login'
        }
        
        return Promise.reject(error)
      }

      // Si ya estamos en proceso de refresh, no intentar de nuevo
      if (isRefreshing) {
        return Promise.reject(error)
      }

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        
        if (!refreshToken) {
          throw new Error('No refresh token available')
        }

        console.log('🔄 Intentando refrescar token...')
        isRefreshing = true

        // Intentar refrescar el token
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        })

        const { accessToken, refreshToken: newRefreshToken } = response.data

        // Guardar nuevos tokens
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', newRefreshToken)

        console.log('✅ Token refrescado correctamente')
        isRefreshing = false

        // Reintentar la petición original con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return api(originalRequest)
        
      } catch (refreshError) {
        console.error('❌ Error al refrescar token:', refreshError)
        
        if (!isRefreshing) {
          isRefreshing = true
          
          // Si falla el refresh, limpiar todo y redirigir al login
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('user')
          
          alert('Tu sesión ha expirado. Por favor inicia sesión nuevamente.')
          window.location.href = '/login'
        }
        
        return Promise.reject(refreshError)
      }
    }

    // Para cualquier otro error, solo rechazar sin redirigir
    return Promise.reject(error)
  }
)

export default api