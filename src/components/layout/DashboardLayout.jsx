import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  MapPin, 
  LogOut, 
  User, 
  Map, 
  History, 
  Award,
  Menu,
  X,
  Settings
} from 'lucide-react'
import useAuthStore from '../../store/authStore'

export default function DashboardLayout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      name: 'Buscar Parkings',
      path: '/parkings',
      icon: <Map className="h-5 w-5" />,
      // badge: 'Próximamente',
    },
    {
      name: 'Mis Reservas',
      path: '/reservations',
      icon: <History className="h-5 w-5" />,
      badge: 'Próximamente',
    },
    {
      name: 'Mis Puntos',
      path: '/loyalty',
      icon: <Award className="h-5 w-5" />,
      badge: 'Próximamente',
    },
    {
      name: 'Mi Perfil',
      path: '/profile',
      icon: <User className="h-5 w-5" />,
    },
    {
      name: 'Configuración',
      path: '/settings',
      icon: <Settings className="h-5 w-5" />,
      badge: 'Próximamente',
    },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Mobile */}
      <header className="lg:hidden bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">ParkSmart</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            {isSidebarOpen ? (
              <X className="h-6 w-6 text-slate-700" />
            ) : (
              <Menu className="h-6 w-6 text-slate-700" />
            )}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-slate-200 min-h-screen sticky top-0">
          {/* Logo */}
          <div className="p-6 border-b border-slate-200">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">ParkSmart</span>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center justify-between px-4 py-3 rounded-lg transition
                  ${isActive(item.path)
                    ? 'bg-primary text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                  }
                  ${item.badge ? 'opacity-60 cursor-not-allowed' : ''}
                `}
                onClick={(e) => item.badge && e.preventDefault()}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-200">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </aside>

        {/* Sidebar Mobile */}
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/50" onClick={() => setIsSidebarOpen(false)}>
            <aside 
              className="w-64 bg-white h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* User Info */}
              <div className="p-4 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Mobile */}
              <nav className="p-4 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => !item.badge && setIsSidebarOpen(false)}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-lg transition
                      ${isActive(item.path)
                        ? 'bg-primary text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                      }
                      ${item.badge ? 'opacity-60 cursor-not-allowed' : ''}
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>

              {/* Logout Mobile */}
              <div className="p-4 border-t border-slate-200 absolute bottom-0 w-full bg-white">
                <button
                  onClick={() => {
                    setIsSidebarOpen(false)
                    handleLogout()
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Cerrar Sesión</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}