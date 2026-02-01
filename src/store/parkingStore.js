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
      set({ parkings: data, isLoading: false })
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al buscar parkings'
      set({ error: errorMessage, isLoading: false, parkings: [] })
      throw error
    }
  },

  // Seleccionar un parking
  selectParking: async (parkingId) => {
    set({ isLoading: true, error: null })
    try {
      const parking = await parkingService.getParkingById(parkingId)
      const spaces = await parkingService.getParkingSpaces(parkingId)
      
      set({ 
        selectedParking: { ...parking, spaces },
        isLoading: false 
      })
      return { ...parking, spaces }
    } catch (error) {
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