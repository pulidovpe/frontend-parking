import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'
import authService from '../services/auth'
import Input from '../components/shared/Input'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    token: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (formData.newPassword.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }

    if (formData.token.length !== 8) {
      setError('El código debe tener 8 caracteres')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await authService.resetPassword(formData.token, formData.newPassword)
      setSuccess(true)
      
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al resetear la contraseña')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-secondary" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            ¡Contraseña Actualizada!
          </h2>
          <p className="text-slate-600 mb-6">
            Tu contraseña ha sido cambiada exitosamente. 
            Ya puedes iniciar sesión con tu nueva contraseña.
          </p>
          <p className="text-sm text-slate-500">
            Redirigiendo al login en 3 segundos...
          </p>
        </div>
      </div>
    )
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
            Resetear Contraseña
          </h1>
          <p className="text-slate-600 mt-2">
            Ingresa el código de 8 caracteres que recibiste por correo
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
              label="Código de Recuperación (8 caracteres)"
              type="text"
              name="token"
              value={formData.token}
              onChange={handleChange}
              placeholder="ABCD1234"
              maxLength={8}
              required
              className="uppercase"
            />

            <div className="relative">
              <Input
                label="Nueva Contraseña"
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Mínimo 8 caracteres"
                required
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

            <div className="relative">
              <Input
                label="Confirmar Nueva Contraseña"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-11 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Reseteando...
                </>
              ) : (
                'Resetear Contraseña'
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-slate-600">
              ¿No recibiste el código?{' '}
              <Link 
                to="/forgot-password" 
                className="text-primary hover:text-primary-dark font-medium"
              >
                Reenviar
              </Link>
            </p>
            <Link 
              to="/login" 
              className="block text-slate-600 hover:text-slate-900"
            >
              Volver al login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}