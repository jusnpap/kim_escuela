import { useState } from 'react'
import InteractiveMap from './InteractiveMap'
import ClassroomInterior from './ClassroomInterior'
import './index.css'

export default function App() {
  const [activeZone, setActiveZone] = useState(null)
  const [viewMode, setViewMode] = useState('map') // 'map' or 'interior'

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {viewMode === 'map' ? (
        <InteractiveMap 
          activeZone={activeZone} 
          setActiveZone={setActiveZone} 
          onEnter3D={() => setViewMode('interior')} 
        />
      ) : (
        <ClassroomInterior 
          zone={activeZone} 
          onBack={() => setViewMode('map')} 
        />
      )}
    </div>
  )
}
