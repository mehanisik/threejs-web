import { motion } from "framer-motion";
import { GeometricShape } from "./geometric-shape";

export function LandingSection() {
  return (
    <div
      id="home"
      className="relative w-full h-[calc(100vh-100px)] overflow-hidden bg-background"
    >
      <GeometricShape />
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            "Manners matter. But style brings people together."
          </motion.h1>
        </div>
      </div>
    </div>
  );
}
