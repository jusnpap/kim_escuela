import React, { useState } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'

// Mapeo de las zonas a sus respectivos renders generados por IA
const zoneImages = {
  inicial: [
    { src: '/renders/aula_inicial.png', label: 'Aula Inicial con Rincón de la Calma' },
    { src: '/renders/aula_multisensorial.png', label: 'Aula Multisensorial Interactiva' }
  ],
  juegos: [
    { src: '/renders/juegos.png', label: 'Juegos Inclusivos y Columpio Adaptado' }
  ],
  admin: [
    { src: '/renders/direccion.png', label: 'Oficina de Dirección Inclusiva' },
    { src: '/renders/secretaria.png', label: 'Secretaría con Mostrador Accesible' },
    { src: '/renders/sala_docentes.png', label: 'Sala de Docentes y Reuniones' }
  ],
  entrada: [
    { src: '/renders/patio_central.png', label: 'Ingreso Principal y Rampa Accesible (Imagen Ilustrativa Temporal)' }
  ],
  biblioteca_cine: [
    { src: '/renders/biblioteca_inclusiva.png', label: 'Biblioteca Inclusiva y Accesible' },
    { src: '/renders/sala_cine_inclusiva.png', label: 'Sala de Cine con Rampas y Espacios' }
  ],
  egb: [
    { src: '/renders/aulas_egb.png', label: 'Aula EGB con Mesas Ajustables' }
  ],
  patio: [
    { src: '/renders/patio_central.png', label: 'Patio Central Accesible' }
  ],
  servicios: [
    { src: '/renders/comedor_escolar.png', label: 'Comedor Escolar Moderno' },
    { src: '/renders/enfermeria.png', label: 'Enfermería y Primeros Auxilios' },
    { src: '/renders/bano_accesible.png', label: 'Baño Accesible Completo' },
    { src: '/renders/bano_normal.png', label: 'Baños Infantiles Normales' }
  ],
  cancha: [
    { src: '/renders/cancha_deportiva.png', label: 'Cancha Inclusiva: Suelo liso a nivel cero y Aros Ajustables' }
  ],
  huerto: [
    { src: '/renders/huerto.png', label: 'Huerto Escolar Inclusivo' }
  ]
}

export default function ClassroomInterior({ zone, onBack }) {
  const images = zoneImages[zone?.id] || zoneImages.inicial
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', backgroundColor: '#0f172a', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navbar Superior */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '20px', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' }}>
        <button 
          onClick={onBack}
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '30px', 
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', backdropFilter: 'blur(10px)',
            color: '#fff', fontWeight: 'bold', transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
        >
          <ArrowLeft size={20} /> Volver al Mapa 2D
        </button>
      </div>

      {/* Visor de Imágenes (Cinematic View) */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img 
            src={images[currentIndex].src} 
            alt={images[currentIndex].label}
            style={{ 
              maxWidth: '95vw', maxHeight: '90vh', objectFit: 'contain', 
              borderRadius: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              transition: 'opacity 0.4s ease-in-out'
            }}
          />

          {/* Controles de Carrusel (solo si hay más de 1 imagen) */}
          {images.length > 1 && (
            <>
              <button onClick={prevImage} style={{ position: 'absolute', left: '-60px', top: '50%', transform: 'translateY(-50%)', background: '#4CAF50', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', transition: 'transform 0.2s' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-50%) scale(1.1)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(-50%) scale(1)'}>
                <ChevronLeft size={30} />
              </button>
              <button onClick={nextImage} style={{ position: 'absolute', right: '-60px', top: '50%', transform: 'translateY(-50%)', background: '#4CAF50', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', transition: 'transform 0.2s' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-50%) scale(1.1)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(-50%) scale(1)'}>
                <ChevronRight size={30} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Título de la Imagen (Footer) */}
      <div style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: 'rgba(255,255,255,0.95)', padding: '15px 40px', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', textAlign: 'center' }}>
        <h3 style={{ margin: 0, color: '#1e293b', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {zone?.title}
        </h3>
        <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '15px', fontWeight: '500' }}>
          {images[currentIndex].label} {images.length > 1 && `(${currentIndex + 1}/${images.length})`}
        </p>
      </div>

    </div>
  )
}
