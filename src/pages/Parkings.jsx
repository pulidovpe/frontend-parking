import { useState, useEffect } from 'react'
import './Parkings.css'
import { Search, MapPin, Filter, AlertCircle, Loader } from 'lucide-react'
import DashboardLayout from '../components/layout/DashboardLayout'
import MapView from '../components/map/MapView'
import ParkingCard from '../components/map/ParkingCard'
import useParkingStore from '../store/parkingStore'

export default function Parkings() {
  const {
    parkings,
    userLocation,
    isLoading,
    error,
    setUserLocation,
    fetchNearbyParkings,
    selectParking,
    clearError,
  } = useParkingStore()

  const [searchRadius, setSearchRadius] = useState(5)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [showMap, setShowMap] = useState(true)

  // Obtener ubicación del usuario al cargar
  useEffect(() => {
    getUserLocation()
  }, [])

  // Función auxiliar para solicitar ubicación
  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
        async (position) => {
        const location = [
            position.coords.latitude,
            position.coords.longitude
        ]
        console.log('📍 Ubicación obtenida:', location)
        setUserLocation(location)
        
        // Buscar parkings cercanos automáticamente
        try {
            await fetchNearbyParkings(
            position.coords.latitude,
            position.coords.longitude,
            searchRadius
            )
        } catch (err) {
            console.error('Error al buscar parkings:', err)
        }
        
        setIsGettingLocation(false)
        },
        (error) => {
        console.error('❌ Error obteniendo ubicación:', error)
        
        let errorMessage = ''
        switch(error.code) {
            case error.PERMISSION_DENIED:
            errorMessage = 'Permisos de ubicación denegados. Por favor, actívalos en la configuración del navegador.'
            break
            case error.POSITION_UNAVAILABLE:
            errorMessage = 'Ubicación no disponible. Verifica que el GPS esté activado.'
            break
            case error.TIMEOUT:
            errorMessage = 'Tiempo de espera agotado al obtener ubicación.'
            break
            default:
            errorMessage = 'Error desconocido al obtener ubicación.'
        }
        
        alert(errorMessage + '\n\nUsando ubicación por defecto (Caracas).')
        
        setIsGettingLocation(false)
        
        // Usar ubicación por defecto (Caracas)
        const defaultLocation = [10.4806, -66.9036]
        setUserLocation(defaultLocation)
        
        // Buscar con ubicación por defecto
        fetchNearbyParkings(defaultLocation[0], defaultLocation[1], searchRadius)
            .catch(err => console.error('Error con ubicación por defecto:', err))
        },
        {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
        }
    )
  }

  const getUserLocation = () => {
    if (!navigator.geolocation) {
        alert('Tu navegador no soporta geolocalización.\n\nUsando ubicación por defecto (Caracas).')
        const defaultLocation = [10.4806, -66.9036]
        setUserLocation(defaultLocation)
        fetchNearbyParkings(defaultLocation[0], defaultLocation[1], searchRadius)
        return
    }

    setIsGettingLocation(true)
    clearError()

    // Solicitar ubicación directamente
    // En móvil moderno, esto dispara el prompt de permisos automáticamente
    requestLocation()
  }

  const handleSearch = async () => {
    if (!userLocation) {
      getUserLocation()
      return
    }

    clearError()
    try {
      await fetchNearbyParkings(
        userLocation[0],
        userLocation[1],
        searchRadius
      )
    } catch (err) {
      console.error('Error en búsqueda:', err)
    }
  }

  const handleParkingClick = async (parking) => {
    console.log('🅿️ Parking clickeado:', parking)
    
    // Limpiar error anterior
    clearError()
    
    try {
      // Mostrar loading
      console.log('⏳ Cargando detalles del parking...')
      
      const parkingWithSpaces = await selectParking(parking.id)
      
      console.log('✅ Parking con espacios cargado:', parkingWithSpaces)
      
      // Extraer datos correctamente
      const parkingData = parkingWithSpaces.data || parkingWithSpaces
      const availableCount = parkingData.spaces?.length || parking.availableSpaces || 0
      
      // Construir mensaje con datos reales
      const message = [
        `📍 ${parkingData.name || parking.name}`,
        '',
        `📌 Dirección: ${parkingData.address || parking.address}`,
        parkingData.city ? `   ${parkingData.city}, ${parkingData.state || ''}` : '',
        '',
        `💵 Tarifa: $${parkingData.hourlyRate || parking.hourlyRate}/hora`,
        `🅿️  Espacios disponibles: ${availableCount}`,
        parking.distance ? `📏 Distancia: ${parking.distance.toFixed(1)} km` : '',
        '',
        `🕐 Horario: ${parkingData.isOpen24Hours || parkingData.is24Hours || parking.isOpen24Hours 
          ? '24 horas' 
          : `${parkingData.openingTime || parking.openingTime} - ${parkingData.closingTime || parking.closingTime}`}`,
        '',
        parkingData.description ? `ℹ️  ${parkingData.description}` : '',
        '',
        '✅ Detalles cargados correctamente',
        '',
        '📱 En la Fase 5 podrás:',
        '  • Ver mapa de espacios disponibles',
        '  • Seleccionar espacio específico',
        '  • Hacer reserva con fecha/hora',
      ].filter(Boolean).join('\n')
      
      alert(message)
      
    } catch (err) {
      console.error('❌ Error completo al cargar parking:', err)
      console.error('❌ Error response:', err.response)
      
      // Si falla, mostrar info básica que ya tenemos
      const fallbackMessage = [
        `📍 ${parking.name}`,
        '',
        `📌 ${parking.address}`,
        parking.city ? `   ${parking.city}` : '',
        '',
        `💵 Tarifa: $${parking.hourlyRate}/hora`,
        `🅿️  Espacios: ${parking.availableSpaces || 0}`,
        parking.distance ? `📏 Distancia: ${parking.distance.toFixed(1)} km` : '',
        '',
        `🕐 ${parking.isOpen24Hours ? '24 horas' : `${parking.openingTime} - ${parking.closingTime}`}`,
        '',
        '⚠️ No se pudieron cargar los detalles completos',
        '(Tu sesión sigue activa)',
      ].filter(Boolean).join('\n')
      
      alert(fallbackMessage)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Buscar Estacionamientos
          </h1>
          <p className="text-slate-600">
            Encuentra el parking perfecto cerca de ti
          </p>
        </div>

        {/* Barra de búsqueda */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Radio de búsqueda
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-semibold text-slate-900 min-w-[60px]">
                  {searchRadius} km
                </span>
              </div>
            </div>

            <div className="flex items-end space-x-2">
              <button
                onClick={getUserLocation}
                disabled={isGettingLocation}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition flex items-center disabled:opacity-50"
              >
                <MapPin className="h-5 w-5 mr-2" />
                {isGettingLocation ? 'Obteniendo...' : 'Mi ubicación'}
              </button>
              
              <button
                onClick={handleSearch}
                disabled={isLoading || !userLocation}
                className="btn-primary flex items-center disabled:opacity-50"
              >
                <Search className="h-5 w-5 mr-2" />
                {isLoading ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-error/10 border border-error rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-error mt-0.5" />
            <div className="flex-1">
              <p className="text-error font-medium">{error}</p>
              <p className="text-sm text-error/80 mt-1">
                Verifica tu conexión o intenta nuevamente
              </p>
            </div>
          </div>
        )}

        {/* Toggle Vista */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-slate-600">
            {parkings.length > 0 ? (
              <>Encontrados <strong>{parkings.length}</strong> estacionamientos</>
            ) : (
              'No hay parkings en esta área'
            )}
          </p>
          <button
            onClick={() => setShowMap(!showMap)}
            className="lg:hidden px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium"
          >
            {showMap ? 'Ver Lista' : 'Ver Mapa'}
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader className="h-8 w-8 text-primary animate-spin" />
          </div>
        )}

        {/* Contenido Principal */}
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lista de Parkings */}
            <div className={`space-y-4 ${showMap ? 'hidden lg:block' : ''}`}>
                {parkings.length > 0 ? (
                    parkings.map((parking) => (
                    <ParkingCard
                        key={parking.id}
                        parking={parking}
                        onClick={handleParkingClick}
                    />
                    ))
                ) : (
                    !isLoading && (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <MapPin className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-600 mb-2">No se encontraron parkings</p>
                        <p className="text-sm text-slate-500">
                        Intenta ampliar el radio de búsqueda o cambiar tu ubicación
                        </p>
                    </div>
                    )
                )}
            </div>

            {/* Mapa */}
            <div className={`${showMap ? '' : 'hidden lg:block'}`}>
              <div className="sticky top-4">
                <MapView
                  parkings={parkings}
                  userLocation={userLocation}
                  onParkingClick={handleParkingClick}
                  className="h-[600px]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}