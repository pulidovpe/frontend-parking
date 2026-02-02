import { create } from 'zustand'
import parkingService from '../services/parkings'

const useParkingStore = create((set, get) => ({
  parkings: [],
  selectedParking: null,
  userLocation: null,
  isLoading: false,
  error: null,

  // Establecer ubicación del usuario
  setUserLocation: (location) => {
    set({ userLocation: location })
  },

  // Buscar parkings cercanos
  fetchNearbyParkings: async (latitude, longitude, radius) => {
    set({ isLoading: true, error: null })
    try {
      const data = await parkingService.getNearbyParkings(latitude, longitude, radius)
      console.log('Parkings recibidos del backend:', data)
      set({ parkings: data, isLoading: false })
      return data
    } catch (error) {
      console.error('Error completo:', error)
      
      if (error.response?.status === 404) {
        const errorMessage = 'La ruta de búsqueda de parkings no está disponible en el backend.'
        console.warn(errorMessage)
        set({ 
          error: errorMessage, 
          isLoading: false,
          parkings: []
        })
      } else if (error.response?.status === 401) {
        const errorMessage = 'No estás autenticado. Por favor inicia sesión nuevamente.'
        set({ error: errorMessage, isLoading: false, parkings: [] })
      } else {
        const errorMessage = error.response?.data?.message || 'Error al buscar parkings'
        set({ error: errorMessage, isLoading: false, parkings: [] })
      }
      throw error
    }
  },

  // Seleccionar un parking
  selectParking: async (parkingId) => {
    set({ isLoading: true, error: null })
    
    try {
      console.log('📍 Intentando obtener detalles del parking:', parkingId)
      
      // Obtener detalles del parking (esta ruta parece funcionar)
      const parkingResponse = await parkingService.getParkingById(parkingId)
      const parking = parkingResponse.data || parkingResponse
      console.log('✅ Detalles del parking obtenidos:', parking)
      
      // Intentar obtener espacios disponibles
      let spaces = []
      try {
        const spacesResponse = await parkingService.getParkingSpaces(parkingId, 'AVAILABLE')
        spaces = spacesResponse.data || spacesResponse || []
        console.log('✅ Espacios obtenidos:', spaces)
      } catch (spacesError) {
        // Si falla la carga de espacios, solo logear pero NO fallar todo
        console.warn('⚠️ No se pudieron cargar los espacios:', spacesError.response?.data?.message || spacesError.message)
        
        // NO propagar el error, solo usar array vacío
        spaces = []
      }
      
      const result = { ...parking, spaces }
      console.log('✅ Parking seleccionado completo:', result)
      
      set({ 
        selectedParking: result,
        isLoading: false 
      })
      
      return result
      
    } catch (error) {
      console.error('❌ Error al seleccionar parking:', error)
      
      const errorMessage = error.response?.data?.message || 'Error al cargar parking'
      set({ error: errorMessage, isLoading: false })
      
      throw error
    }
  },

  // Limpiar parking seleccionado
  clearSelectedParking: () => {
    set({ selectedParking: null })
  },

  // Limpiar errores
  clearError: () => set({ error: null }),
}))

export default useParkingStore