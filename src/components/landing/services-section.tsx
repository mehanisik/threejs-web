import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  BrandIdentityIllustration,
  DigitalDesignIllustration,
  LogoDesignIllustration,
  PrintDesignIllustration,
} from "@/components/ui/illustrations";
import { useHackerText } from "@/hooks/use-hacker-text";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSupabaseTable } from "@/hooks/use-supabase-query";

export const ServicesSection = () => {
  const { records: services } = useSupabaseTable("services");
  const targetRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { amount: 0.3, once: true });

  const titleHacker = useHackerText("What I Do");

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    isMobile ? ["0%", "0%"] : ["0%", "-80%"],
  );

  const illustrationMap: Record<string, React.FC<{ className?: string }>> = {
    "Logo Design": LogoDesignIllustration,
    "Brand Identity": BrandIdentityIllustration,
    "Print Design": PrintDesignIllustration,
    "Digital Design": DigitalDesignIllustration,
  };

  return (
    <section
      ref={targetRef}
      className={`${isMobile ? "h-auto" : "h-[300vh]"} relative overflow-x-clip`}
    >
      <div
        ref={inViewRef}
        className={`${isMobile ? "relative" : "sticky top-0 h-screen"}  overflow-hidden`}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
          className="px-4 py-8"
        >
          <div className="flex items-baseline justify-end gap-3 md:gap-6">
            <motion.span
              className="text-4xl md:text-6xl lg:text-8xl font-thin text-foreground/30 font-mono"
              initial={{ opacity: 0, rotate: -45 }}
              animate={
                isInView
                  ? { opacity: 1, rotate: 0 }
                  : { opacity: 0, rotate: -45 }
              }
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              02
            </motion.span>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-8xl uppercase font-extrabold tracking-tight cursor-pointer font-mono"
              onMouseEnter={titleHacker.startHacking}
              onMouseLeave={titleHacker.stopHacking}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {titleHacker.displayText}
              {titleHacker.isHacking && (
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
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>

        <motion.div
          style={{ x }}
          className="flex flex-col md:flex-row items-start gap-6 md:gap-8 lg:gap-12 px-4 pb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {services?.map((service, idx) => {
            const Illustration = illustrationMap[service.title];
            return (
              <motion.div
                key={service.id}
                className="group flex h-full w-[85vw] flex-shrink-0 flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/20 md:w-[42vw] md:p-8 lg:w-[32vw] xl:w-[28vw]"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
              >
                <div className="mb-4">
                  <span className="font-mono text-lg text-foreground/50 tracking-wider lg:text-xl">
                    {service.service_code}
                  </span>
                </div>
                {Illustration ? (
                  <div className="mb-6 flex h-64 items-center justify-center">
                    <Illustration className="text-foreground" />
                  </div>
                ) : (
                  <div className="mb-6 flex h-64 items-center justify-center bg-red-200">
                    <span>No Illustration</span>
                  </div>
                )}
                <h3 className="mb-4 text-2xl font-semibold">
                  {service.title}
                </h3>
                <p className="flex-1 leading-relaxed text-foreground/70">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
          {!isMobile && <div className="w-[15vw] flex-shrink-0" />}
        </motion.div>
      </div>
    </section>
  );
};
