import { useState } from 'react'
import { Save, AlertCircle, CheckCircle } from 'lucide-react'
import useAuthStore from '../store/authStore'
import DashboardLayout from '../components/layout/DashboardLayout'
import Input from '../components/shared/Input'

export default function Profile() {
  const { user } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError(null)
    setSuccess(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    // Simular guardado (en la próxima fase conectaremos con el backend)
    setTimeout(() => {
      setIsSaving(false)
      setSuccess(true)
      setIsEditing(false)
      
      setTimeout(() => setSuccess(false), 3000)
    }, 1000)
  }

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    })
    setIsEditing(false)
    setError(null)
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Mi Perfil</h1>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-secondary/10 border border-secondary rounded-lg flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-secondary" />
            <p className="text-secondary font-medium">
              Perfil actualizado correctamente
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-error/10 border border-error rounded-lg flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-error" />
            <p className="text-error">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Personal */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Información Personal
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Nombre"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
                <Input
                  label="Apellido"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </div>

              <div className="mb-4">
                <Input
                  label="Correo Electrónico"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={true}
                  className="bg-slate-50"
                />
                <p className="text-xs text-slate-500 mt-1">
                  El correo electrónico no puede ser modificado
                </p>
              </div>

              <Input
                label="Teléfono"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+58 412-XXX-XXXX"
                disabled={!isEditing}
              />
            </div>

            {/* Account Info (Read-only) */}
            <div className="border-t border-slate-200 pt-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Información de la Cuenta
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Tipo de cuenta:</span>
                  <span className="font-medium text-slate-900">
                    {user?.role === 'DRIVER' ? 'Conductor' : 'Administrador'}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Estado de verificación:</span>
                  <span className={`font-medium ${user?.isEmailVerified ? 'text-secondary' : 'text-warning'}`}>
                    {user?.isEmailVerified ? 'Verificado ✓' : 'Pendiente'}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-600">Autenticación 2FA:</span>
                  <span className={`font-medium ${user?.twoFactorEnabled ? 'text-secondary' : 'text-slate-400'}`}>
                    {user?.twoFactorEnabled ? 'Activado ✓' : 'Desactivado'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4 pt-4">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="btn-primary"
                >
                  Editar Perfil
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="btn-primary disabled:opacity-50 flex items-center"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}