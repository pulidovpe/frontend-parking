import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, MapPin, AlertCircle, CheckCircle } from 'lucide-react'
import useAuthStore from '../store/authStore'
import Input from '../components/shared/Input'

export default function Register() {
  const navigate = useNavigate()
  const { register, isLoading, error, clearError } = useAuthStore()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    clearError()
    
    // Limpiar error de validación del campo específico
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'El nombre es requerido'
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'El apellido es requerido'
    }
    
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = 'Email inválido'
    }
    
    if (formData.password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres'
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden'
    }
    
    if (formData.phone && !formData.phone.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)) {
      errors.phone = 'Teléfono inválido'
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    try {
      const { confirmPassword, ...userData } = formData
      await register({
        ...userData,
        role: 'DRIVER', // Rol por defecto
      })
      
      setSuccess(true)
      
      // Redirigir después de 3 segundos
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (err) {
      console.error('Error en registro:', err)
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
            ¡Registro Exitoso!
          </h2>
          <p className="text-slate-600 mb-6">
            Te hemos enviado un correo de verificación a <strong>{formData.email}</strong>.
            Por favor, revisa tu bandeja de entrada y verifica tu cuenta.
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
            Crear Cuenta
          </h1>
          <p className="text-slate-600 mt-2">
            Únete a la revolución del estacionamiento inteligente
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Nombre"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Juan"
                error={validationErrors.firstName}
                required
              />
              <Input
                label="Apellido"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Pérez"
                error={validationErrors.lastName}
                required
              />
            </div>

            <Input
              label="Correo Electrónico"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              error={validationErrors.email}
              required
            />

            <Input
              label="Teléfono (opcional)"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+58 412-XXX-XXXX"
              error={validationErrors.phone}
            />

            <div className="relative">
              <Input
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 8 caracteres"
                error={validationErrors.password}
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
                label="Confirmar Contraseña"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
                error={validationErrors.confirmPassword}
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

            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg">
              <p className="font-medium mb-1">La contraseña debe contener:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Al menos 8 caracteres</li>
                <li>Letras y números</li>
              </ul>
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
                Creando cuenta...
                </>
            ) : (
                'Crear Cuenta'
            )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              ¿Ya tienes cuenta?{' '}
              <Link 
                to="/login" 
                className="text-primary hover:text-primary-dark font-medium"
              >
                Inicia sesión
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