import { useCallback, useEffect } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "@/motion";

interface ModalProps {
  isActive: boolean;
  imageSrc: string;
  altText: string;
}

export const ProjectModal = ({ isActive, imageSrc, altText }: ModalProps) => {
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const springConfig = {
    damping: 40,
    stiffness: 300,
    mass: 0.5,
  };

  const mouseMove = useCallback(
    (e: MouseEvent) => {
      const offsetX = 20;
      const offsetY = -20;
      const modalWidth = 320;
      const modalHeight = 240;

      let x = e.clientX + offsetX;
      let y = e.clientY + offsetY;

      if (x + modalWidth > window.innerWidth) {
        x = e.clientX - modalWidth - offsetX;
      }
      if (y + modalHeight > window.innerHeight) {
        y = e.clientY - modalHeight - offsetY;
      }

      mouse.x.set(x);
      mouse.y.set(y);
    },
    [mouse.x, mouse.y],
  );

  const smoothMouse = {
    x: useSpring(mouse.x, springConfig),
    y: useSpring(mouse.y, springConfig),
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [mouseMove]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            damping: 25,
            stiffness: 300,
          }}
          className="fixed pointer-events-none z-50"
          style={{
            left: smoothMouse.x,
            top: smoothMouse.y,
          }}
        >
          <motion.div
            className="relative bg-background border-2 border-foreground/40 rounded-xl overflow-hidden shadow-2xl w-80 h-60"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2)",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative w-full h-full">
              {imageSrc ? (
                <motion.img
                  src={imageSrc || "https://placehold.co/320x240"}
                  alt={altText}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-foreground/10 flex items-center justify-center">
                  <span className="text-foreground/50 text-sm">
                    {imageSrc ? "No image" : "Loading..."}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
