import { MapPin, History, Award } from 'lucide-react'
import useAuthStore from '../store/authStore'
import DashboardLayout from '../components/layout/DashboardLayout'

export default function Dashboard() {
  const { user } = useAuthStore()

  return (
    <DashboardLayout>
      {/* Bienvenida */}
      <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
          ¡Bienvenido, {user?.firstName}!
        </h1>
        <p className="text-slate-600">
          Gestiona tus reservas y encuentra el estacionamiento perfecto
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Reservas Activas</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Total Reservas</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">0</p>
            </div>
            <div className="bg-secondary/10 p-3 rounded-full">
              <History className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Puntos Acumulados</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">0</p>
            </div>
            <div className="bg-accent/10 p-3 rounded-full">
              <Award className="h-6 w-6 text-accent" />
            </div>
          </div>
        </div>
      </div>

      {/* Info Alert */}
      <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-lg">
        <p className="text-primary font-medium mb-2">
          ✨ ¡Todo listo para empezar!
        </p>
        <p className="text-slate-700">
          Estamos trabajando en las funcionalidades de búsqueda de parkings, sistema de reservas y más. 
          Pronto podrás disfrutar de todas las características de ParkSmart.
        </p>
      </div>
    </DashboardLayout>
  )
}