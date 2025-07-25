import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useRoute } from "wouter";

export type PageWrapperProps = {
  children: ReactNode;
};

export const PageWrapper = ({ children }: PageWrapperProps) => {
  const [isMatch] = useRoute("/");
  return (
    <AnimatePresence>
      {isMatch && (
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          exit={{ x: "-100vw" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="w-full min-h-screen bg-background text-foreground  scroll-smooth"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
