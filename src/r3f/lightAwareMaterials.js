import * as THREE from 'three'

const converted = new WeakMap()

function toStandard(from) {
  if (converted.has(from)) return converted.get(from)

  if (from.isMeshStandardMaterial || from.isMeshPhysicalMaterial) {
    from.envMapIntensity = Math.max(from.envMapIntensity ?? 1, 0.85)
    if (from.roughness !== undefined) from.roughness = Math.min(1, Math.max(0.18, from.roughness * 0.92))
    converted.set(from, from)
    return from
  }

  if (from.isMeshBasicMaterial || from.isMeshLambertMaterial || from.isMeshPhongMaterial) {
    const std = new THREE.MeshStandardMaterial({
      map: from.map ?? null,
      color: from.color.clone(),
      transparent: from.transparent,
      opacity: from.opacity,
      side: from.side,
      depthWrite: from.depthWrite,
      depthTest: from.depthTest,
      alphaTest: from.alphaTest,
      metalness: 0.18,
      roughness: 0.38,
      envMapIntensity: 1,
    })
    converted.set(from, std)
    return std
  }

  return from
}

/** GLTF often ships MeshBasicMaterial — it ignores lights. Swap for standard so scene lights read. */
export function applyLightAwareMaterials(root) {
  if (!root) return
  root.traverse((child) => {
    if (!child.isMesh || !child.material) return
    if (Array.isArray(child.material)) {
      child.material = child.material.map(toStandard)
    } else {
      child.material = toStandard(child.material)
    }
  })
}
