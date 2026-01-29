import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { 
  MapPin, 
  Clock, 
  CreditCard, 
  Shield, 
  Smartphone,
  TrendingUp,
  ChevronRight
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Landing() {
  const features = [
    {
      icon: <MapPin className="h-8 w-8" />,
      title: 'Encuentra Parkings Cercanos',
      description: 'Usa tu GPS para localizar estacionamientos disponibles en tiempo real cerca de ti.'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Reserva Instantánea',
      description: 'Reserva tu espacio en segundos y olvídate de dar vueltas buscando dónde estacionar.'
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: 'Pagos Flexibles',
      description: 'Paga en USD o VES con Binance, Cashea, Pagomóvil o transferencias bancarias.'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Seguro y Confiable',
      description: 'Autenticación de doble factor y encriptación de datos para tu tranquilidad.'
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: '100% Web, Sin Apps',
      description: 'Accede desde cualquier navegador o instala en tu inicio como una app nativa.'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Sistema de Puntos',
      description: 'Gana puntos con cada reserva y canjéalos por descuentos exclusivos.'
    }
  ]

  const howItWorksSteps = [
    {
      step: '1',
      title: 'Regístrate Gratis',
      description: 'Crea tu cuenta en menos de 2 minutos con tu email.'
    },
    {
      step: '2',
      title: 'Encuentra tu Parking',
      description: 'Usa el mapa interactivo para ver disponibilidad en tiempo real.'
    },
    {
      step: '3',
      title: 'Reserva y Paga',
      description: 'Selecciona tu espacio, reserva y paga con tu método preferido.'
    },
    {
      step: '4',
      title: 'Estaciona Tranquilo',
      description: 'Activa tu reserva al llegar y disfruta de tu espacio garantizado.'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-accent py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Estaciona Inteligente en Venezuela
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Encuentra, reserva y paga tu estacionamiento en segundos. 
            Sin vueltas, sin estrés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition inline-flex items-center justify-center"
            >
              Comenzar Gratis
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <a 
              href="#how-it-works" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition"
            >
              Ver Cómo Funciona
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            ¿Por qué elegir ParkSmart?
          </h2>
          <p className="text-xl text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            La plataforma más completa para gestionar tus estacionamientos en Venezuela
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <div className="text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Cómo Funciona
          </h2>
          <p className="text-xl text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Estacionar nunca fue tan fácil
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-primary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Únete a cientos de venezolanos que ya estacionan de forma inteligente
          </p>
          <Link 
            to="/register" 
            className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition inline-flex items-center"
          >
            Crear Cuenta Gratis
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}