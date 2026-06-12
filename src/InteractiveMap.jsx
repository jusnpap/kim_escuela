import React, { useRef } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { X, Box } from 'lucide-react'

const zones = [
  { id: 'inicial', title: "Bloque de Educación Inicial", desc: "Aulas sin mesas tradicionales, con piso de goma EVA. Incluye Rincón de la Calma y Aula Multisensorial con luces LED.", style: { left: '8%', top: '48%', width: '28%', height: '18%' }, zoom: 2.2, has3D: true },
  { id: 'juegos', title: "Juegos Infantiles Inclusivos", desc: "Columpio adaptado con arnés tipo silla y subibaja accesible.", style: { left: '8%', top: '68%', width: '25%', height: '17%' }, zoom: 2.5, has3D: true },
  { id: 'admin', title: "Área Administrativa", desc: "Dirección, Secretaría y Sala de Docentes accesibles.", style: { left: '10%', top: '15%', width: '22%', height: '14%' }, zoom: 2.2, has3D: true },
  { id: 'biblioteca_cine', title: "Biblioteca y Sala de Cine", desc: "Biblioteca y Sala de Cine Educativo con rampas y espacios exclusivos para sillas de ruedas.", style: { left: '10%', top: '30%', width: '22%', height: '16%' }, zoom: 2.4, has3D: true },
  { id: 'entrada', title: "Ingreso Principal y Seguridad", desc: "Puerta principal con rampa de acceso antideslizante, barandillas dobles y caseta de vigilancia.", style: { left: '2%', top: '33%', width: '12%', height: '12%' }, zoom: 2.5, has3D: true },
  { id: 'egb', title: "Aulas EGB", desc: "Aulas inclusivas con mesas ajustables para silla de ruedas.", style: { left: '60%', top: '18%', width: '15%', height: '38%' }, zoom: 2.0, has3D: true },
  { id: 'patio', title: "Patio Central", desc: "Suelo liso ideal para tránsito en silla de ruedas, con gran árbol central.", style: { left: '35%', top: '20%', width: '23%', height: '28%' }, zoom: 2.0, has3D: true },
  { id: 'servicios', title: "Comedor, Enfermería y Baños", desc: "Bloque completo con Comedor Escolar, Cocina, Enfermería, Baños Normales y Baño Accesible.", style: { left: '41%', top: '51%', width: '17%', height: '18%' }, zoom: 2.2, has3D: true },
  { id: 'cancha', title: "Cancha Deportiva Accesible", desc: "Superficie de goma lisa a nivel cero (sin bordillos), aros de básquet de altura ajustable y líneas de alto contraste para baja visión.", style: { left: '61%', top: '61%', width: '20%', height: '20%' }, zoom: 2.2, has3D: true },
  { id: 'huerto', title: "Áreas Verdes y Huerto", desc: "Mesas de cultivo elevadas para que niños en silla de ruedas puedan sembrar.", style: { left: '68%', top: '2%', width: '20%', height: '14%' }, zoom: 2.5, has3D: true }
]

export default function InteractiveMap({ activeZone, setActiveZone, onEnter3D }) {
  const transformRef = useRef(null)

  const handleZoneClick = (zone) => {
    setActiveZone(zone)
    if (transformRef.current) {
      transformRef.current.zoomToElement(zone.id, zone.zoom, 800)
    }
  }

  const resetView = () => {
    setActiveZone(null)
    if (transformRef.current) transformRef.current.resetTransform()
  }

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#e2e8f0', position: 'relative' }}>
      
      <TransformWrapper ref={transformRef} initialScale={1} minScale={1} maxScale={4} centerOnInit={true} limitToBounds={true}>
        <TransformComponent wrapperStyle={{ width: '100vw', height: '100vh' }}>
          <div style={{ position: 'relative', width: '100vw', margin: 'auto' }}>
            <img src="/plano.jpeg" alt="Plano" style={{ display: 'block', width: '100%', height: 'auto' }} onLoad={() => transformRef.current?.centerView()} />
            
            {zones.map((zone) => (
              <div
                key={zone.id} id={zone.id} onClick={() => handleZoneClick(zone)}
                style={{
                  position: 'absolute', cursor: 'pointer', borderRadius: '8px',
                  border: activeZone?.id === zone.id ? '3px solid #4CAF50' : 'none',
                  boxShadow: activeZone?.id === zone.id ? '0 0 15px rgba(76, 175, 80, 0.5)' : 'none',
                  backgroundColor: activeZone?.id === zone.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                  transition: 'all 0.3s ease', ...zone.style
                }}
                onMouseEnter={(e) => { if (activeZone?.id !== zone.id) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)' }}
                onMouseLeave={(e) => { if (activeZone?.id !== zone.id) e.currentTarget.style.backgroundColor = 'transparent' }}
              />
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>

      <div style={{
        position: 'absolute', bottom: activeZone ? '0' : '-300px', left: '50%', transform: 'translateX(-50%)',
        backgroundColor: '#ffffff', padding: '20px', borderRadius: '16px 16px 0 0', width: '90%', maxWidth: '400px',
        boxShadow: '0 -10px 25px rgba(0,0,0,0.1)', borderTop: '5px solid #4CAF50', transition: 'bottom 0.4s ease-out', zIndex: 10
      }}>
        {activeZone && (
          <>
            <button onClick={resetView} style={{ position: 'absolute', right: 15, top: 15, background: 'none', border: 'none', cursor: 'pointer' }}><X color="#888" /></button>
            <h2 style={{ margin: '0 0 10px 0', color: '#2c3e50', fontSize: '20px', paddingRight: '20px' }}>{activeZone.title}</h2>
            <p style={{ margin: '0 0 15px 0', color: '#555', fontSize: '15px', lineHeight: '1.5' }}>{activeZone.desc}</p>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              {activeZone.has3D && (
                <button 
                  onClick={onEnter3D}
                  style={{ flex: 1, backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
                >
                  <Box size={18} /> Ver Interior 3D
                </button>
              )}
              <button 
                onClick={resetView}
                style={{ flex: 1, backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              >
                Volver
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
