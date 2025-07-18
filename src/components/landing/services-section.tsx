import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { services } from "~/constants/services";
import { useIsMobile } from "~/hooks/use-mobile";
import { SectionTitle } from "../ui/typography";

export const ServicesSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { amount: 0.3, once: true });

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
      ref={targetRef}
      className={`${isMobile ? "h-auto" : "h-[300vh]"} relative overflow-x-clip`}
    >
      <div
        ref={inViewRef}
        className={`${isMobile ? "relative" : "sticky top-0 h-screen"} border-b border-border overflow-hidden`}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
        >
          <SectionTitle>What I Do</SectionTitle>
        </motion.div>
        <motion.div
          style={{ x }}
          className="flex flex-col md:flex-row items-center gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              className="bg-zinc-900 text-white backdrop-blur-md border border-foreground/10 rounded-2xl p-6 md:p-8 w-[80vw] md:w-[40vw] lg:w-[30vw] flex-shrink-0 h-[70vh] flex flex-col justify-between group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.7, delay: 0.3 + idx * 0.1 }}
            >
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl md:text-3xl font-bold max-w-[80%]">
                    {service.title}
                  </h3>
                  <span className=" font-mono">{service.id}</span>
                </div>
                <p className=" mt-4 text-base md:text-lg">
                  {service.description}
                </p>
              </div>
              <div className="w-full h-96 rounded-lg mt-6 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
            </motion.div>
          ))}
          {!isMobile && <div className="w-[40vw] flex-shrink-0" />}
        </motion.div>
      </div>
    </section>
  );
};
