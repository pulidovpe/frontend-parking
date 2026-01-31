import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'
import authService from '../services/auth'
import Input from '../components/shared/Input'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await authService.forgotPassword(email)
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar el correo')
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
            ¡Correo Enviado!
          </h2>
          <p className="text-slate-600 mb-6">
            Si existe una cuenta con el correo <strong>{email}</strong>, 
            recibirás un código de 8 caracteres para resetear tu contraseña.
          </p>
          <p className="text-sm text-slate-500 mb-6">
            Revisa tu bandeja de entrada y tu carpeta de spam.
          </p>
          <Link 
            to="/reset-password" 
            className="btn-primary inline-block mb-3"
          >
            Ir a Resetear Contraseña
          </Link>
          <br />
          <Link 
            to="/login" 
            className="text-primary hover:text-primary-dark font-medium"
          >
            Volver al login
          </Link>
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
            ¿Olvidaste tu contraseña?
          </h1>
          <p className="text-slate-600 mt-2">
            Ingresa tu correo y te enviaremos un código para resetearla
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              autoComplete="email"
            />

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
                  Enviando...
                </>
              ) : (
                'Enviar Código'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/login" 
              className="text-slate-600 hover:text-slate-900 inline-flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver al login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}