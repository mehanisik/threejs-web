import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { services } from "~/constants/services";
import { useIsMobile } from "~/hooks/use-mobile";
import { SectionTitle } from "../ui/typography";

export const ServicesSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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
        className={`${isMobile ? "relative" : "sticky top-0 h-screen"} border-b border-border overflow-hidden p-5`}
      >
        <div className="w-full pt-8 pb-4 px-2">
          <SectionTitle>What I Do</SectionTitle>
        </div>
        <motion.div
          style={{ x }}
          className="flex flex-col md:flex-row items-center gap-8"
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-foreground/80 text-background backdrop-blur-md border border-border rounded-2xl p-6 md:p-8 w-[80vw] md:w-[40vw] lg:w-[30vw] flex-shrink-0 h-[70vh] flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl md:text-3xl font-bold text-background max-w-[80%]">
                    {service.title}
                  </h3>
                  <span className="text-background font-mono">
                    {service.id}
                  </span>
                </div>
                <p className="text-background mt-4 text-base md:text-lg">
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
            </div>
          ))}
          {!isMobile && <div className="w-[40vw] flex-shrink-0" />}
        </motion.div>
      </div>
    </section>
  );
};
