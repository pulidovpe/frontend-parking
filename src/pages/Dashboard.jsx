import { useNavigate } from 'react-router-dom'
import { LogOut, User, MapPin, History, Award } from 'lucide-react'
import useAuthStore from '../store/authStore'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header del Dashboard */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <MapPin className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">ParkSmart</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-slate-700 hover:text-primary transition"
            >
              <LogOut className="h-5 w-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bienvenida */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                ¡Bienvenido, {user?.firstName || 'Usuario'}!
              </h1>
              <p className="text-slate-600 mt-1">
                {user?.email}
              </p>
            </div>
          </div>
          
          <div className="bg-primary/5 border-l-4 border-primary p-4 mt-6">
            <p className="text-primary font-medium">
              ✨ Tu cuenta ha sido creada exitosamente
            </p>
            <p className="text-slate-700 mt-2">
              Estamos construyendo las funcionalidades de búsqueda de parkings, reservas y más. 
              ¡Próximamente podrás disfrutar de todas las características!
            </p>
          </div>
        </div>

        {/* Grid de Funcionalidades (Coming Soon) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center opacity-60">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Buscar Parkings
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Encuentra estacionamientos cercanos en tiempo real
            </p>
            <span className="inline-block bg-warning/20 text-warning text-xs font-medium px-3 py-1 rounded-full">
              Próximamente
            </span>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center opacity-60">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <History className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Mis Reservas
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Gestiona todas tus reservas activas e historial
            </p>
            <span className="inline-block bg-warning/20 text-warning text-xs font-medium px-3 py-1 rounded-full">
              Próximamente
            </span>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center opacity-60">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Mis Puntos
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Acumula puntos y obtén beneficios exclusivos
            </p>
            <span className="inline-block bg-warning/20 text-warning text-xs font-medium px-3 py-1 rounded-full">
              Próximamente
            </span>
          </div>
        </div>

        {/* Información del Usuario */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Información de la Cuenta
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Nombre completo:</span>
              <span className="font-medium text-slate-900">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Email:</span>
              <span className="font-medium text-slate-900">{user?.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span className="text-slate-600">Teléfono:</span>
              <span className="font-medium text-slate-900">
                {user?.phone || 'No registrado'}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-600">Rol:</span>
              <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                {user?.role === 'DRIVER' ? 'Conductor' : 'Administrador'}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}