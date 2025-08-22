import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useRoute } from "wouter";

export type PageWrapperProps = {
  children: ReactNode;
};

export const PageWrapper = ({ children }: PageWrapperProps) => {
  const [isMatch] = useRoute("/");
  return (
    <>
      {isMatch && (
        <motion.div
          className="relative w-full bg-background text-foreground scroll-smooth noise antialiased"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};
