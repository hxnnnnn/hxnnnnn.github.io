import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../../theme/ThemeContext'
import {
  generateColors,
  generateDispersedPositions,
  generateHeadTargetPositions,
} from './pointCloud'

const PARTICLE_COUNT = 3500

interface ParticleFieldProps {
  progress: number
  reducedMotion: boolean
  theme: 'dark' | 'light'
}

function ParticleField({ progress, reducedMotion, theme }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const dispersed = useMemo(() => generateDispersedPositions(PARTICLE_COUNT), [])
  const target = useMemo(() => generateHeadTargetPositions(PARTICLE_COUNT), [])
  const colors = useMemo(() => generateColors(PARTICLE_COUNT, theme), [theme])

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

  const isLight = theme === 'light'

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={isLight ? 0.052 : 0.045}
        vertexColors
        transparent
        opacity={isLight ? 0.9 : 0.85}
        sizeAttenuation
        depthWrite={false}
        blending={
          isLight ? THREE.NormalBlending : THREE.AdditiveBlending
        }
      />
    </points>
  )
}

interface GaussianHeroProps {
  progress: number
  reducedMotion: boolean
  onReady?: () => void
}

function Scene({
  progress,
  reducedMotion,
  theme,
}: Omit<GaussianHeroProps, 'onReady'> & { theme: 'dark' | 'light' }) {
  return (
    <>
      <ambientLight intensity={theme === 'light' ? 0.65 : 0.4} />
      <pointLight
        position={[4, 4, 4]}
        intensity={theme === 'light' ? 0.9 : 1.2}
        color={theme === 'light' ? '#8a7e9a' : '#6366f1'}
      />
      <pointLight
        position={[-4, -2, 2]}
        intensity={theme === 'light' ? 0.5 : 0.6}
        color={theme === 'light' ? '#7a9488' : '#22d3ee'}
      />
      <ParticleField
        progress={progress}
        reducedMotion={reducedMotion}
        theme={theme}
      />
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
  const { theme } = useTheme()

  return (
    <div className="absolute inset-0">
      <Canvas
        key={theme}
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => onReady?.()}
      >
        <Suspense fallback={null}>
          <Scene
            progress={progress}
            reducedMotion={reducedMotion}
            theme={theme}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
