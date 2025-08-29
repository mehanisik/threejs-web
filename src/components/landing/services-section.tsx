import { useSuspenseQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { getServices } from "@/lib/services";
import { motion, PRESETS, STAGGER_PRESETS, useInViewAnimation } from "@/motion";
import type { Service } from "@/types/admin.types";

export function ServicesSection() {
  const { data: services } = useSuspenseQuery({
    queryKey: ["services"],
    queryFn: () => getServices(),
  });
  const targetRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { ref: sectionRef, controls: sectionControls } =
    useInViewAnimation(0.2);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    isMobile ? ["0%", "0%"] : ["0%", "-80%"],
  );

  const openDialog = (service: Service) => {
    setSelectedService(service);
  };

  const closeDialog = () => {
    setSelectedService(null);
  };

  return (
    <>
      <section
        id="services"
        ref={targetRef}
        className={`${isMobile ? "h-auto" : "h-[300vh]"} relative overflow-x-clip`}
        style={{ position: "relative" }}
      >
        <div
          className={`${isMobile ? "relative" : "sticky top-0 h-screen"} overflow-hidden`}
        >
          <motion.div
            className="px-4 py-8"
            ref={sectionRef}
            variants={STAGGER_PRESETS.container}
            animate={sectionControls}
            initial="hidden"
          >
            <motion.div
              className="flex items-baseline justify-end gap-3 md:gap-6"
              variants={STAGGER_PRESETS.item}
            >
              <motion.span
                className="text-4xl md:text-6xl lg:text-8xl font-thin text-foreground/30 font-mono"
                variants={PRESETS.scaleIn}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.3 },
                }}
              >
                02
              </motion.span>
              <motion.h1
                className="text-4xl md:text-6xl lg:text-8xl uppercase font-extrabold tracking-tight cursor-pointer font-mono"
                variants={PRESETS.fadeInLeft}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                My Service
              </motion.h1>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-24 md:w-32 lg:w-40 h-px bg-foreground/30 ml-auto mt-4"
            variants={PRESETS.fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
          />

          <motion.div
            className="px-4 py-8"
            style={{ x }}
            variants={STAGGER_PRESETS.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
              variants={STAGGER_PRESETS.container}
            >
              {services?.map((service) => (
                <motion.div
                  key={service.id}
                  variants={STAGGER_PRESETS.item}
                  className="group cursor-pointer"
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  onClick={() => openDialog(service)}
                >
                  <motion.div
                    className="border border-foreground/15 hover:border-foreground/40 transition-all duration-300 p-4 md:p-6 bg-background min-h-[300px] md:min-h-[350px] flex flex-col"
                    whileHover={{
                      borderColor: "rgba(255, 255, 255, 0.4)",
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                      transition: { duration: 0.3 },
                    }}
                  >
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1">
                        <motion.h3
                          className="text-lg md:text-xl lg:text-2xl font-light mb-3 group-hover:text-foreground transition-colors duration-300 line-clamp-2"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {service.title}
                        </motion.h3>
                        <p className="text-xs md:text-sm text-foreground/70 line-clamp-3 leading-relaxed min-h-[3.5rem] md:min-h-[4rem] mb-4">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {service.images && service.images.length > 0 && (
                      <div className="relative aspect-video overflow-hidden rounded-lg mt-auto">
                        <img
                          src={service.images[0].image_url}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          decoding="async"
                          fetchPriority="high"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                    )}

                    <div className="mt-3 text-center">
                      <span className="text-xs text-foreground/60 group-hover:text-foreground/80 transition-colors duration-300">
                        Click to learn more
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {selectedService && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeDialog}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              {selectedService.images && selectedService.images.length > 0 ? (
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={selectedService.images[0].image_url}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                    <div className="space-y-4">
                      <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight drop-shadow-2xl">
                        {selectedService.title}
                      </h2>
                      <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl drop-shadow-lg">
                        {selectedService.description}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeDialog}
                    className="absolute top-6 right-6 z-10 rounded-full bg-black/50 hover:bg-black/70 text-white p-3 transition-all duration-300 hover:scale-110"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="space-y-4">
                      <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground">
                        {selectedService.title}
                      </h2>
                      <p className="text-lg md:text-xl lg:text-2xl text-foreground/80 leading-relaxed max-w-3xl">
                        {selectedService.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedService.images && selectedService.images.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm p-8">
                  <h4 className="text-2xl font-medium text-foreground/90 mb-6 border-b border-foreground/20 pb-3">
                    More Images
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedService.images
                      .slice(1)
                      .map((image, imageIndex) => (
                        <div
                          key={`${selectedService.id}-image-${imageIndex + 1}`}
                          className="group relative aspect-video overflow-hidden rounded-lg border border-foreground/10 hover:border-foreground/30 transition-all duration-300"
                        >
                          <img
                            src={image.image_url}
                            alt={`${selectedService.title} - ${imageIndex + 2}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
