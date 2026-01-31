import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Rutas protegidas */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />

      {/* Rutas futuras (placeholder) */}
      <Route path="/parkings" element={<ProtectedRoute><div className="p-8">Próximamente: Buscar Parkings</div></ProtectedRoute>} />
      <Route path="/reservations" element={<ProtectedRoute><div className="p-8">Próximamente: Mis Reservas</div></ProtectedRoute>} />
      <Route path="/loyalty" element={<ProtectedRoute><div className="p-8">Próximamente: Mis Puntos</div></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><div className="p-8">Próximamente: Configuración</div></ProtectedRoute>} />
    </Routes>
  )
}

export default App