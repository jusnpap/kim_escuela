import React from 'react'

const colors = {
  initial: '#ffd8a8', egb: '#a8d8ea', admin: '#e2d5f8', services: '#ffe2e2',
  foamy: ['#ff9999', '#99ccff', '#99ff99', '#ffff99'], wallInside: '#f8f9fa'
}

export default function BuildingBlocks({ activeZone, setActiveZone }) {
  const handleClick = (e, zoneData) => {
    e.stopPropagation()
    setActiveZone(zoneData)
  }

  const isInitialActive = activeZone?.id === 'inicial'

  return (
    <group position={[0, 0, 0]}>
      
      {/* 1. EDUCACIÓN INICIAL Y MULTISENSORIAL */}
      <group position={[-10, 0, 8]} onClick={(e) => handleClick(e, {
        id: 'inicial', title: "Bloque de Educación Inicial",
        desc: "Aulas sin mesas tradicionales. Observa el piso pedagógico, el Rincón de la Calma tipo tipí y el Aula Multisensorial con tubos LED y piscina de pelotas.",
        camPos: [-10, 8, 14], target: [-10, 0, 8]
      })}>
        {/* Paredes exteriores */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[14, 3, 8]} />
          <meshStandardMaterial color={colors.initial} roughness={0.7} />
        </mesh>
        
        {/* Techo (Se oculta al hacer clic) */}
        {!isInitialActive && (
          <mesh position={[0, 3.1, 0]} castShadow receiveShadow>
            <boxGeometry args={[14.5, 0.2, 8.5]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        )}

        {/* INTERIOR (Solo visible cuando se oculta el techo, o a través del techo si es transparente, pero aquí lo ocultamos) */}
        {isInitialActive && (
          <group position={[0, 0, 0]}>
            {/* Vaciado interior simulado superponiendo una caja ligeramente más pequeña */}
            <mesh position={[0, 1.55, 0]}>
              <boxGeometry args={[13.5, 3.2, 7.5]} />
              <meshStandardMaterial color={colors.wallInside} side={1} /> {/* side=1 es THREE.BackSide */}
            </mesh>

            {/* PISO PEDAGÓGICO DE GOMA EVA (Inicial 1 y 2) */}
            <group position={[-3, 0.1, 0]}>
              {[...Array(16)].map((_, i) => (
                <mesh key={i} position={[(i % 4) * 1.5 - 2.25, 0, Math.floor(i / 4) * 1.5 - 2.25]} rotation={[-Math.PI/2, 0, 0]}>
                  <planeGeometry args={[1.4, 1.4]} />
                  <meshStandardMaterial color={colors.foamy[i % 4]} />
                </mesh>
              ))}
              
              {/* RINCÓN DE LA CALMA (Tipí) */}
              <mesh position={[-2.5, 1, -2.5]}>
                <coneGeometry args={[1, 2, 4]} />
                <meshStandardMaterial color="#d4c4b7" />
              </mesh>
              {/* Luz tenue dentro del rincón de la calma */}
              <pointLight position={[-2.5, 0.5, -2.5]} intensity={0.5} color="#ffa500" />
            </group>

            {/* AULA MULTISENSORIAL */}
            <group position={[4, 0, 0]}>
              {/* Piscina de pelotas */}
              <mesh position={[0, 0.5, -2]} castShadow>
                <boxGeometry args={[3, 1, 3]} />
                <meshStandardMaterial color="#4CAF50" transparent opacity={0.8} />
              </mesh>
              {/* Pelotas simuladas */}
              {[...Array(20)].map((_, i) => (
                <mesh key={i} position={[(Math.random()-0.5)*2.5, 0.5 + Math.random()*0.4, -2 + (Math.random()-0.5)*2.5]}>
                  <sphereGeometry args={[0.2]} />
                  <meshStandardMaterial color={colors.foamy[i % 4]} />
                </mesh>
              ))}

              {/* Tubos de Burbujas LED */}
              <mesh position={[2, 1.5, 2]}>
                <cylinderGeometry args={[0.3, 0.3, 3, 16]} />
                <meshStandardMaterial color="#00ffff" transparent opacity={0.6} emissive="#00ffff" emissiveIntensity={0.5} />
              </mesh>
              <mesh position={[1, 1.5, 2.5]}>
                <cylinderGeometry args={[0.3, 0.3, 3, 16]} />
                <meshStandardMaterial color="#ff00ff" transparent opacity={0.6} emissive="#ff00ff" emissiveIntensity={0.5} />
              </mesh>
            </group>
          </group>
        )}
      </group>

      {/* 2. JUEGOS INFANTILES INCLUSIVOS */}
      <group position={[-10, 0, 16]} onClick={(e) => handleClick(e, {
        id: 'juegos', title: "Juegos Infantiles Inclusivos",
        desc: "Columpio adaptado con arnés tipo silla (respaldo alto) y subibaja para sillas de ruedas.",
        camPos: [-10, 4, 20], target: [-10, 0, 16]
      })}>
        {/* Estructura del columpio */}
        <mesh position={[0, 2, 0]} castShadow>
          <boxGeometry args={[4, 0.2, 0.2]} />
          <meshStandardMaterial color="#795548" />
        </mesh>
        <mesh position={[-1.8, 1, 0]} castShadow><cylinderGeometry args={[0.1, 0.1, 2]} /><meshStandardMaterial color="#795548" /></mesh>
        <mesh position={[1.8, 1, 0]} castShadow><cylinderGeometry args={[0.1, 0.1, 2]} /><meshStandardMaterial color="#795548" /></mesh>
        
        {/* Silla adaptada con arnés (respaldo alto) */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.8, 0.1, 0.8]} />
          <meshStandardMaterial color="#FF9800" />
        </mesh>
        <mesh position={[0, 0.9, -0.35]} castShadow>
          <boxGeometry args={[0.8, 0.8, 0.1]} />
          <meshStandardMaterial color="#FF9800" />
        </mesh>
        {/* Cuerdas */}
        <mesh position={[-0.3, 1.25, 0]}><cylinderGeometry args={[0.02, 0.02, 1.5]} /><meshStandardMaterial color="#000" /></mesh>
        <mesh position={[0.3, 1.25, 0]}><cylinderGeometry args={[0.02, 0.02, 1.5]} /><meshStandardMaterial color="#000" /></mesh>
      </group>

      {/* 3. PATIO CENTRAL (Árbol) */}
      <group position={[0, 0, 0]} onClick={(e) => handleClick(e, {
        id: 'patio', title: "Patio Central",
        desc: "Suelo liso ideal para tránsito en silla de ruedas, con el gran árbol central.",
        camPos: [0, 8, 8], target: [0, 0, 0]
      })}>
        <mesh position={[0, 1.5, 0]} castShadow><cylinderGeometry args={[0.8, 1.2, 3]} /><meshStandardMaterial color="#5D4037" /></mesh>
        <mesh position={[0, 4, 0]} castShadow><sphereGeometry args={[3]} /><meshStandardMaterial color="#4CAF50" /></mesh>
        <mesh position={[1.5, 3.5, 1.5]} castShadow><sphereGeometry args={[2]} /><meshStandardMaterial color="#4CAF50" /></mesh>
        <mesh position={[-1.5, 3.5, -1.5]} castShadow><sphereGeometry args={[2]} /><meshStandardMaterial color="#4CAF50" /></mesh>
      </group>

      {/* Otros bloques (Simplificados visualmente en el exterior, pero se les puede añadir interior) */}
      <group position={[10, 0, 4]} onClick={(e) => handleClick(e, {
        id: 'egb', title: "Aulas EGB", desc: "Aulas con mesas ajustables y rampas de acceso.", camPos: [10, 8, 12], target: [10, 0, 4]
      })}>
        <mesh position={[0, 2, 0]} castShadow><boxGeometry args={[6, 4, 16]} /><meshStandardMaterial color={colors.egb} /></mesh>
        {activeZone?.id !== 'egb' && <mesh position={[0, 4.1, 0]}><boxGeometry args={[6.5, 0.2, 16.5]} /><meshStandardMaterial color="#fff" /></mesh>}
      </group>

    </group>
  )
}
