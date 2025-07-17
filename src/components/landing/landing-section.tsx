import { Canvas } from "@react-three/fiber";
import { Navbar } from "../layout/navbar";
import { Scene } from "../webgl/scene";

export const LandingSection = () => {
  return (
    <div className="h-screen bg-background">
      <Navbar />
      <Canvas gl={{ antialias: false }} camera={{ position: [0, 0, 6] }}>
        <Scene />
      </Canvas>
    </div>
  );
};
