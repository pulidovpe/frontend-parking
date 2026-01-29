import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* Más rutas en fases futuras */}
    </Routes>
  )
}

export default App