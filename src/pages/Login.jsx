import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, MapPin, AlertCircle } from 'lucide-react'
import useAuthStore from '../store/authStore'
import Input from '../components/shared/Input'

export default function Login() {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuthStore()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    twoFactorCode: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [needs2FA, setNeeds2FA] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    clearError()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      await login(formData)
      navigate('/dashboard')
    } catch (err) {
      // Si el backend requiere 2FA, mostramos el campo
      if (err.response?.data?.requires2FA) {
        setNeeds2FA(true)
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <MapPin className="h-10 w-10 text-primary" />
            <span className="text-2xl font-bold text-primary">ParkSmart</span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mt-4">
            Iniciar Sesión
          </h1>
          <p className="text-slate-600 mt-2">
            Accede a tu cuenta para gestionar tus reservas
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error rounded-lg flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-error mt-0.5" />
              <p className="text-sm text-error">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Correo Electrónico"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
              autoComplete="email"
            />

            <div className="relative">
              <Input
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-11 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {needs2FA && (
              <Input
                label="Código 2FA (6 dígitos)"
                type="text"
                name="twoFactorCode"
                value={formData.twoFactorCode}
                onChange={handleChange}
                placeholder="000000"
                maxLength={6}
                required
              />
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-slate-300" />
                <span className="text-slate-600">Recordarme</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-primary hover:text-primary-dark font-medium"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
            {isLoading ? (
                <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
                </>
            ) : (
                'Iniciar Sesión'
            )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              ¿No tienes cuenta?{' '}
              <Link 
                to="/register" 
                className="text-primary hover:text-primary-dark font-medium"
              >
                Regístrate gratis
              </Link>
            </p>
          </div>
        </div>

        {/* Volver al inicio */}
        <div className="mt-6 text-center">
          <Link 
            to="/" 
            className="text-slate-600 hover:text-slate-900 inline-flex items-center space-x-2"
          >
            <span>← Volver al inicio</span>
          </Link>
        </div>
      </div>
    </div>
  )
}