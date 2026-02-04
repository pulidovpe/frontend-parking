import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { MapPin, Navigation } from 'lucide-react'
import MapSkeleton from './MapSkeleton'

// Fix para los iconos de Leaflet en Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Componente para centrar el mapa
function MapCenterController({ center }) {
  const map = useMap()
  
  useEffect(() => {
    if (center) {
      map.setView(center, 13)
    }
  }, [center, map])
  
  return null
}

// Icono personalizado para parkings
const parkingIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3" fill="#2563EB"></circle>
    </svg>
  `),
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
})

// Icono para ubicación del usuario
const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#10B981" stroke="white" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  `),
  iconSize: [30, 30],
  iconAnchor: [15, 15],
})

export default function MapView({ 
  parkings = [], 
  userLocation, 
  onParkingClick,
  className = '' 
}) {
  const [mapCenter, setMapCenter] = useState(
    userLocation || [10.4806, -66.9036] // Caracas por defecto
  )
  const [isMapReady, setIsMapReady] = useState(false)

  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation)
    }
  }, [userLocation])

  // Simular carga del mapa
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapReady(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (!isMapReady) {
    return (
      <div className={className}>
        <MapSkeleton />
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <MapContainer 
        center={mapCenter} 
        zoom={13} 
        className="w-full h-full rounded-lg"
        zoomControl={true}
        preferCanvas={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        touchZoom={true}
      >
        <MapCenterController center={userLocation} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          minZoom={10}
          updateWhenIdle={true}
          updateWhenZooming={false}
          keepBuffer={2}
          maxNativeZoom={19}
          tileSize={256}
        />

        {/* Marcador de ubicación del usuario */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <div className="text-center">
                <p className="font-semibold">Tu ubicación</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Marcadores de parkings */}
        {parkings.map((parking) => (
          <Marker
            key={parking.id}
            position={[parking.latitude, parking.longitude]}
            icon={parkingIcon}
          >
            <Popup>
              <div className="min-w-[250px]">
                <h3 className="font-bold text-lg mb-2">{parking.name}</h3>
                <p className="text-sm text-slate-600 mb-3">{parking.address}</p>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Precio/hora:</span>
                    <span className="font-semibold text-primary">
                      ${parking.hourlyRate}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Disponibles:</span>
                    <span className={`font-semibold ${
                      parking.availableSpaces > 0 ? 'text-secondary' : 'text-error'
                    }`}>
                      {parking.availableSpaces || 0} espacios
                    </span>
                  </div>
                  
                  {parking.distance !== undefined && parking.distance !== null && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Distancia:</span>
                      <span className="text-sm font-medium text-slate-900 flex items-center">
                        <Navigation className="h-3 w-3 mr-1" />
                        {parking.distance.toFixed(1)} km
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="text-sm text-slate-600">Horario:</span>
                    <span className="text-sm font-medium text-slate-900">
                      {parking.isOpen24Hours ? '24 horas' : `${parking.openingTime} - ${parking.closingTime}`}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onParkingClick && onParkingClick(parking)
                  }}
                  className="w-full bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition"
                >
                  Ver detalles
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}