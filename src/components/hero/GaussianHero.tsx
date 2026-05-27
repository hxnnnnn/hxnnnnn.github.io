import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import {
  generateColors,
  generateDispersedPositions,
  generateHeadTargetPositions,
} from './pointCloud'

const PARTICLE_COUNT = 3500

interface ParticleFieldProps {
  progress: number
  reducedMotion: boolean
}

function ParticleField({ progress, reducedMotion }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const dispersed = useMemo(() => generateDispersedPositions(PARTICLE_COUNT), [])
  const target = useMemo(() => generateHeadTargetPositions(PARTICLE_COUNT), [])
  const colors = useMemo(() => generateColors(PARTICLE_COUNT), [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(dispersed.slice(), 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [dispersed, colors])

  useFrame((state) => {
    const points = pointsRef.current
    if (!points) return

    const positions = points.geometry.attributes.position.array as Float32Array
    const t = reducedMotion ? 0.85 : progress
    const time = state.clock.elapsedTime

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const wobble = reducedMotion
        ? 0
        : Math.sin(time * 0.5 + i * 0.01) * 0.02 * (1 - t)
      positions[i3] =
        dispersed[i3] * (1 - t) + target[i3] * t + wobble
      positions[i3 + 1] =
        dispersed[i3 + 1] * (1 - t) + target[i3 + 1] * t + wobble
      positions[i3 + 2] =
        dispersed[i3 + 2] * (1 - t) + target[i3 + 2] * t
    }
    points.geometry.attributes.position.needsUpdate = true
    points.rotation.y = reducedMotion ? 0 : time * 0.05 * (1 - t * 0.5)
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

interface GaussianHeroProps {
  progress: number
  reducedMotion: boolean
  onReady?: () => void
}

function Scene({ progress, reducedMotion }: Omit<GaussianHeroProps, 'onReady'>) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#6366f1" />
      <pointLight position={[-4, -2, 2]} intensity={0.6} color="#22d3ee" />
      <ParticleField progress={progress} reducedMotion={reducedMotion} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!reducedMotion && progress < 0.3}
        autoRotateSpeed={0.4}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 4}
      />
    </>
  )
}

export function GaussianHero({
  progress,
  reducedMotion,
  onReady,
}: GaussianHeroProps) {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => onReady?.()}
      >
        <Suspense fallback={null}>
          <Scene progress={progress} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  )
}
