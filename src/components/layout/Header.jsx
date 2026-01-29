import { Link } from 'react-router-dom'
import { Menu, X, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">ParkSmart</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-700 hover:text-primary transition">
              Características
            </a>
            <a href="#how-it-works" className="text-slate-700 hover:text-primary transition">
              Cómo funciona
            </a>
            <a href="#contact" className="text-slate-700 hover:text-primary transition">
              Contacto
            </a>
            <Link 
              to="/login" 
              className="text-primary hover:text-primary-dark font-medium transition"
            >
              Iniciar Sesión
            </Link>
            <Link 
              to="/register" 
              className="btn-primary"
            >
              Registrarse
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-slate-700" />
            ) : (
              <Menu className="h-6 w-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <a 
              href="#features" 
              className="block px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Características
            </a>
            <a 
              href="#how-it-works" 
              className="block px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Cómo funciona
            </a>
            <a 
              href="#contact" 
              className="block px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </a>
            <Link 
              to="/login" 
              className="block px-4 py-2 text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Iniciar Sesión
            </Link>
            <Link 
              to="/register" 
              className="block btn-primary text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Registrarse
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}