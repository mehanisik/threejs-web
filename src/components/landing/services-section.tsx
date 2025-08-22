import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  delayedTransition,
  scaleXRevealVariants,
  scrollRevealVariants,
  useScrollReveal,
} from "@/constants/animations";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSupabase } from "@/hooks/use-supabase";

import supabase from "@/lib/supabase";

export function ServicesSection() {
  const { data: services } = useSupabase({
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*, images(*)")
        .eq("images.type", "services")
        .order("order_index", { ascending: true });
      return { data, error, status: 200, statusText: "OK" };
    },
  });

  const targetRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { inViewRef, isInView } = useScrollReveal();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    isMobile ? ["0%", "0%"] : ["0%", "-80%"],
  );

  return (
    <section
      id="services"
      ref={targetRef}
      className={`${isMobile ? "h-auto" : "h-[300vh]"} relative overflow-x-clip`}
      style={{ position: "relative" }}
    >
      <div
        ref={inViewRef}
        className={`${isMobile ? "relative" : "sticky top-0 h-screen"} overflow-hidden`}
      >
        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={delayedTransition()}
          className="px-4 py-8"
        >
          <div className="flex items-baseline justify-end gap-3 md:gap-6">
            <motion.span
              className="text-4xl md:text-6xl lg:text-8xl font-thin text-foreground/30 font-mono"
              variants={scaleXRevealVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={delayedTransition(0.2)}
            >
              02
            </motion.span>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-8xl uppercase font-extrabold tracking-tight cursor-pointer font-mono"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              My Service
              {isInView && (
                <motion.span
                  className="opacity-75"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  |
                </motion.span>
              )}
            </motion.h1>
          </div>
          <motion.div
            className="w-24 md:w-32 lg:w-40 h-px bg-foreground/30 ml-auto mt-4"
            variants={scaleXRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={delayedTransition(0.5)}
          />
        </motion.div>

        <motion.div
          style={{ x }}
          className="flex flex-col md:flex-row items-start gap-6 md:gap-8 lg:gap-12 px-4 pb-8"
          variants={scrollRevealVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={delayedTransition(0.2)}
        >
          {services?.map((service, idx) => {
            return (
              <motion.div
                key={service.id}
                className="group flex h-full w-[85vw] flex-shrink-0 flex-col md:w-[42vw] lg:w-[32vw] xl:w-[28vw] card"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
              >
                <div className="mb-6 aspect-[4/3] overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
                  {service.images[0].image_url ? (
                    <img
                      src={service.images[0].image_url}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-foreground/10   ">
                      <span className="text-foreground/50">No Image</span>
                    </div>
                  )}
                </div>

                <h2 className="mb-2 text-2xl font-bold text-foreground">
                  {service.title}
                </h2>

                <p className="text-sm text-foreground/70">
                  {service.description || "Service"}
                </p>
              </motion.div>
            );
          })}
          {!isMobile && <div className="w-[15vw] flex-shrink-0" />}
        </motion.div>
      </div>
    </section>
  );
}
