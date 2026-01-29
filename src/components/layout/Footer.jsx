import { MapPin, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">ParkSmart</span>
            </div>
            <p className="text-slate-400 max-w-md">
              La solución inteligente para encontrar y reservar estacionamiento en Venezuela. 
              Rápido, seguro y conveniente.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-slate-400 hover:text-white transition">
                  Características
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-slate-400 hover:text-white transition">
                  Cómo funciona
                </a>
              </li>
              <li>
                <Link to="/login" className="text-slate-400 hover:text-white transition">
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-slate-400 hover:text-white transition">
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-slate-400">
                <Mail className="h-5 w-5" />
                <span>info@parksmart.ve</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-400">
                <Phone className="h-5 w-5" />
                <span>+58 412-XXX-XXXX</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; {currentYear} ParkSmart Venezuela. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}