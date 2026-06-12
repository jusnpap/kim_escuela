import { CameraControls, Environment, ContactShadows } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import BuildingBlocks from './BuildingBlocks'

export default function Scene({ activeZone, setActiveZone }) {
  const cameraControlsRef = useRef()

  useEffect(() => {
    if (activeZone && cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(
        activeZone.camPos[0], activeZone.camPos[1], activeZone.camPos[2],
        activeZone.target[0], activeZone.target[1], activeZone.target[2],
        true
      )
    } else if (cameraControlsRef.current) {
      // Vista general isométrica
      cameraControlsRef.current.setLookAt(0, 35, 35, 0, 0, 0, true)
    }
  }, [activeZone])

  return (
    <>
      <CameraControls ref={cameraControlsRef} makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
      
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight castShadow position={[15, 25, 10]} intensity={1.5} shadow-mapSize={[2048, 2048]} color="#fff1e0">
        <orthographicCamera attach="shadow-camera" args={[-25, 25, 25, -25, 0.1, 50]} />
      </directionalLight>

      {/* Terreno Base de la Maqueta */}
      <mesh receiveShadow position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#c6d5b0" roughness={0.9} />
      </mesh>
      
      <BuildingBlocks activeZone={activeZone} setActiveZone={setActiveZone} />

      <Environment preset="city" />
      <ContactShadows position={[0, 0.01, 0]} opacity={0.5} scale={50} blur={2.5} far={4} />
    </>
  )
}
