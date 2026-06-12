import { X } from 'lucide-react'

export default function UIOverlay({ activeZone, setActiveZone }) {
  if (!activeZone) {
    return (
      <div style={{ position: 'absolute', top: '20px', left: '20px', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '15px', borderRadius: '8px', zIndex: 10 }}>
        <h2>Unidad Educativa "Raíces y Alas"</h2>
        <p>Haz clic en los bloques (ej. Bloque Educación Inicial o Juegos) para ver su interior y detalles.</p>
      </div>
    )
  }

  return (
    <div style={{
      position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
      backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px',
      width: '400px', borderTop: '4px solid #4CAF50', zIndex: 10,
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#333' }}>{activeZone.title}</h2>
        <button onClick={() => setActiveZone(null)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X color="#888" /></button>
      </div>
      <p style={{ color: '#555', marginTop: '10px' }}>{activeZone.desc}</p>
      <button onClick={() => setActiveZone(null)} style={{ marginTop: '10px', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}>
        Volver
      </button>
    </div>
  )
}
