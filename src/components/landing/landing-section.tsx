import { Canvas } from "@react-three/fiber";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "../layout/navbar";
import { Scene } from "../webgl/scene";

export const LandingSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7 }}
      className="h-screen bg-background"
    >
      <Navbar />
      <Canvas gl={{ antialias: false }} camera={{ position: [0, 0, 6] }}>
        <Scene />
      </Canvas>
    </motion.div>
  );
};
