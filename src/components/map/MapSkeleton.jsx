export default function MapSkeleton() {
  return (
    <div className="w-full h-full bg-slate-200 rounded-lg animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-2"></div>
        <p className="text-slate-600 font-medium">Cargando mapa...</p>
      </div>
    </div>
  )
}