import { MapPin, Clock, DollarSign, Navigation } from 'lucide-react'

export default function ParkingCard({ parking, onClick }) {
  const { 
    name, 
    address, 
    hourlyRate, 
    availableSpaces, 
    distance,
    isOpen24Hours,
    openingTime,
    closingTime,
    city,
    state
  } = parking

  const isAvailable = availableSpaces > 0
  
  // Construir dirección completa
  const fullAddress = city && state ? `${address}, ${city}` : address

  return (
    <div 
      onClick={() => onClick(parking)}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer border-l-4 border-primary"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-slate-900 mb-1">{name}</h3>
          <p className="text-sm text-slate-600 flex items-start">
            <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
            {fullAddress}
          </p>
        </div>
        {distance !== undefined && distance !== null && (
          <div className="bg-primary/10 px-3 py-1 rounded-full ml-2">
            <p className="text-sm font-semibold text-primary flex items-center whitespace-nowrap">
              <Navigation className="h-3 w-3 mr-1" />
              {distance.toFixed(1)} km
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-slate-600">Tarifa/hora</p>
            <p className="font-semibold text-slate-900">${hourlyRate}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${
            isAvailable ? 'bg-secondary/10' : 'bg-error/10'
          }`}>
            <MapPin className={`h-4 w-4 ${
              isAvailable ? 'text-secondary' : 'text-error'
            }`} />
          </div>
          <div>
            <p className="text-xs text-slate-600">Disponibles</p>
            <p className={`font-semibold ${
              isAvailable ? 'text-secondary' : 'text-error'
            }`}>
              {availableSpaces} espacios
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center text-sm text-slate-600 pt-3 border-t border-slate-100">
        <Clock className="h-4 w-4 mr-2" />
        {isOpen24Hours ? (
          <span>Abierto 24 horas</span>
        ) : (
          <span>{openingTime} - {closingTime}</span>
        )}
      </div>
    </div>
  )
}