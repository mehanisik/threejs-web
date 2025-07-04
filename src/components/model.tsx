import {Color,MeshPhysicalMaterial,Object3D} from "three"
import { useRef } from 'react'
import { useGLTF, MeshReflectorMaterial } from '@react-three/drei'


const material = new MeshPhysicalMaterial({
  color: new Color('#bb86a1').convertSRGBToLinear(),
  roughness: 0,
  clearcoat: 1,
  clearcoatRoughness: 0,
})

function Model(props: any) {
  const group = useRef<Object3D | null>(null)
  const { nodes } = useGLTF('/pink-d.glb') as any
  
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
            blur={[0, 0]}
            resolution={2048}
            mixBlur={0}
            mixStrength={0}
            depthScale={0}
            minDepthThreshold={0}
            color="#ff2bae"
            metalness={0}
            roughness={1}
          />
      </mesh>
    <mesh receiveShadow castShadow material={material} geometry={nodes.Sphere.geometry} position={[-1.93, 1, -0.94]} rotation={[-Math.PI, 0.73, -Math.PI]} />
    <mesh receiveShadow castShadow material={material} geometry={nodes.Sphere001.geometry} position={[4.49, 2.34, 3.58]} scale={[2.33, 2.33, 2.33]} />
    <mesh
      receiveShadow
      castShadow
      material={material}
      geometry={nodes.Sphere001.geometry}
      position={[-16, 5, 17]}
      rotation={[-0.26, 0.04, -0.16]}
      scale={[5, 5, 5]}
    />
    <mesh receiveShadow castShadow material={material} geometry={nodes.Sphere002.geometry} position={[-5.28, 4.8, 5.12]} />
    <mesh receiveShadow castShadow material={material} geometry={nodes.Sphere003.geometry} position={[-10.13, 1.3, -3.95]} rotation={[-0.15, 0.01, -0.02]} />
    <mesh
      receiveShadow
      castShadow
      material={material}
      geometry={nodes.Sphere004.geometry}
      position={[-19.36, 1.05, -2.05]}
      rotation={[0, 0, 0.64]}
      scale={[-1.33, -1.33, -1.33]}
    />
    <mesh receiveShadow castShadow material={material} geometry={nodes.Sphere005.geometry} position={[-18.17, 0.94, -2.35]} scale={[0.87, 0.87, 0.87]} />
    <mesh
      receiveShadow
      castShadow
      material={material}
      geometry={nodes.Torus.geometry}
      position={[-0.36, 1.46, 0.73]}
      rotation={[Math.PI, 0.73, -2.64]}
      scale={[2, 2, 2]}
    />

    <mesh receiveShadow castShadow material={material} geometry={nodes.Cone.geometry} position={[2.3, 1.91, -4.41]} scale={[1.86, 1.86, 1.86]} />
    <mesh receiveShadow castShadow material={material} geometry={nodes.Cone001.geometry} position={[-4.82, 0.47, -5.51]} rotation={[2.14, 0, -0.58]} />
    <mesh
      receiveShadow
      castShadow
      material={material}
      geometry={nodes.Cube.geometry}
      position={[-5.36, 1.94, 5.46]}
      rotation={[0, 0.42, 0]}
      scale={[1.9, 1.9, 1.9]}
    />
    <mesh receiveShadow castShadow material={material} geometry={nodes.Cube001.geometry} position={[-1.8, 1, -10.04]} rotation={[0, -0.23, 0]} />
    <mesh receiveShadow castShadow material={material} geometry={nodes.Cylinder.geometry} position={[-12.3, 2.41, 1.53]} />
    <mesh
      receiveShadow
      castShadow
      material={material}
      geometry={nodes.Cylinder001.geometry}
      position={[-10.47, 1.57, -8.75]}
      rotation={[Math.PI / 2, 0, -1.87]}
      scale={[1.55, 1.55, 1.55]}
    />
    <mesh receiveShadow castShadow material={material} geometry={nodes.Cylinder002.geometry} position={[-1.15, 3.38, 14.39]} rotation={[0, Math.PI, 0]} />
    <mesh receiveShadow castShadow material={material} geometry={nodes.Icosphere.geometry} position={[7.29, 0.6, -5.63]} scale={[0.64, 0.64, 0.64]} />
    <mesh receiveShadow castShadow material={material} geometry={nodes.Icosphere001.geometry} position={[7.26, 0.98, 12.9]} rotation={[-0.26, 0.04, -0.16]} />
  </group>
  )
}

useGLTF.preload('/pink-d.glb')

export default Model
