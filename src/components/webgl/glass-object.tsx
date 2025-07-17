import { Suspense, useRef } from "react";
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useIsMobile } from "~/hooks/use-mobile";

export function GlassObject() {
  const isMobile = useIsMobile();
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => new THREE.TorusGeometry(2, 0.8, 16, 100), []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Suspense fallback={null}>
      <mesh ref={meshRef} geometry={geometry} scale={isMobile ? 0.5 : 1}>
        <MeshTransmissionMaterial
          backside={false}
          samples={10}
          resolution={512}
          transmission={1}
          roughness={0.0}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={0.02}
          anisotropy={0.1}
          distortion={0.0}
          distortionScale={0.3}
          temporalDistortion={0.5}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="white"
          color="white"
        />
      </mesh>
    </Suspense>
  );
}
