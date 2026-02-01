import api from './api'

const parkingService = {
  // Buscar parkings cercanos (usando /search)
  getNearbyParkings: async (latitude, longitude, radius = 5) => {
    console.log('🔍 Buscando parkings con:', { 
      lat: latitude, 
      lng: longitude, 
      radiusKm: radius 
    })
    
    try {
      const response = await api.get('/parkings/search', {
        params: { 
          lat: latitude,
          lng: longitude,
          radiusKm: radius
        }
      })
      
      console.log('✅ Respuesta del backend:', response.data)
      
      // El backend devuelve { success, data, count, searchParams }
      // Necesitamos extraer y mapear el array 'data'
      const parkings = response.data.data || []
      
      // Mapear los datos del backend al formato que espera el frontend
      const mappedParkings = parkings.map(parking => ({
        id: parking.id,
        name: parking.name,
        description: parking.description,
        address: parking.address,
        city: parking.city,
        state: parking.state,
        latitude: parking.latitude,
        longitude: parking.longitude,
        hourlyRate: parking.hourlyRate,
        availableSpaces: parking.availableSpaces,
        totalSpaces: parking.totalSpaces,
        distance: parseFloat(parking.distanceKm), // Convertir a número
        isOpen24Hours: parking.is24Hours,
        openingTime: parking.openingTime,
        closingTime: parking.closingTime,
        status: parking.status,
        imageUrl: parking.imageUrl,
        hasMultipleLevels: parking.hasMultipleLevels,
        totalLevels: parking.totalLevels,
      }))
      
      console.log('✅ Parkings mapeados:', mappedParkings)
      return mappedParkings
      
    } catch (error) {
      console.error('❌ Error en búsqueda de parkings:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        params: error.config?.params
      })
      throw error
    }
  },

  // Obtener detalles de un parking
  getParkingById: async (parkingId) => {
    console.log('🔍 Obteniendo parking:', parkingId)
    try {
      const response = await api.get(`/parkings/${parkingId}`)
      console.log('✅ Parking obtenido:', response.data)
      
      // Si el backend devuelve { success, data }
      const parking = response.data.data || response.data
      return parking
    } catch (error) {
      console.error('❌ Error obteniendo parking:', error.response?.data || error)
      throw error
    }
  },

  // Obtener espacios de un parking
  getParkingSpaces: async (parkingId) => {
    console.log('🔍 Obteniendo espacios del parking:', parkingId)
    try {
      const response = await api.get(`/spaces/parking/${parkingId}`)
      console.log('✅ Espacios obtenidos:', response.data)
      
      // Si el backend devuelve { success, data }
      const spaces = response.data.data || response.data
      return spaces
    } catch (error) {
      console.error('❌ Error obteniendo espacios:', error.response?.data || error)
      throw error
    }
  },

  // Buscar parkings (con filtros opcionales)
  searchParkings: async (filters = {}) => {
    const response = await api.get('/parkings', {
      params: filters
    })
    return response.data
  },
}

export default parkingService