export function generateDispersedPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 2.5 + Math.random() * 2
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
  }
  return positions
}

/** Ellipsoid point cloud approximating a head silhouette */
export function generateHeadTargetPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3)
  let placed = 0

  while (placed < count) {
    const x = (Math.random() - 0.5) * 1.1
    const y = (Math.random() - 0.3) * 1.6 - 0.1
    const z = (Math.random() - 0.5) * 0.9

    const nx = x / 0.55
    const ny = y / 0.75
    const nz = z / 0.45
    const d = nx * nx + ny * ny + nz * nz

    if (d <= 1) {
      positions[placed * 3] = x
      positions[placed * 3 + 1] = y
      positions[placed * 3 + 2] = z
      placed++
    }
  }

  return positions
}

export function generateColors(count: number): Float32Array {
  const colors = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const t = Math.random()
    colors[i * 3] = 0.39 + t * 0.2
    colors[i * 3 + 1] = 0.45 + t * 0.35
    colors[i * 3 + 2] = 0.95 + t * 0.05
  }
  return colors
}
