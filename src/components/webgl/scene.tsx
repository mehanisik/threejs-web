import { PerspectiveCamera } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { Text } from "@react-three/drei";
import { GlassObject } from "./glass-object";
import { OrbitControls } from "@react-three/drei";
import { useIsMobile } from "~/hooks/use-mobile";

export function Scene() {
  const isMobile = useIsMobile();
  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={75}
        aspect={1}
        near={0.1}
        far={1000}
        position={[0, 0, 6]}
      />

      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        castShadow
      />

      <Environment preset="studio" />

      <Text
        position={[0, 0, -4]}
        fontSize={isMobile ? 0.7 : 2.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={isMobile ? 0.02 : 0.05}
        lineHeight={isMobile ? 1.2 : 1.2}
        font="/SpaceMono-Regular.ttf"
      >
        DESIGN THAT MAKE
        {"\n"}
        YOU LOOK TWICE
      </Text>

      <GlassObject />

      <OrbitControls
        enableRotate={false}
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate={false}
      />
    </>
  );
}
