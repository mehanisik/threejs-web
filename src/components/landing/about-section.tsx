import { motion } from "framer-motion";
import {
  delayedTransition,
  scaleRevealVariants,
  scaleXRevealVariants,
  scrollRevealVariants,
  slideRevealVariants,
  useScrollReveal,
} from "@/constants/animations";
import { useHackerText } from "@/hooks/use-hacker-text";
import { useSupabase } from "@/hooks/use-supabase";
import supabase from "@/lib/supabase";

export const AboutSection = () => {
  const { data: images } = useSupabase({
    queryFn: async () => {
      const { data, error } = await supabase
        .from("images")
        .select("*")
        .eq("type", "portrait");
      return { data, error, status: 200, statusText: "OK" };
    },
  });

  const aboutHacker = useHackerText("About Me");
  const { inViewRef, isInView } = useScrollReveal();

  return (
    <section
      id="about"
      className="w-full min-h-screen pl-6 md:pl-12 lg:pl-16 xl:pl-20 py-8 md:py-12 lg:py-16"
    >
      <div ref={inViewRef} className="flex flex-col lg:flex-row min-h-screen">
        <div className="flex-1 relative flex items-center justify-center p-4 md:p-8 lg:p-16">
          <div className="absolute top-4 md:top-8 left-4 md:left-8 flex items-baseline space-x-3 md:space-x-6">
            <motion.div
              className="text-4xl md:text-6xl lg:text-[6rem] font-thin text-foreground/30 select-none cursor-pointer"
              variants={scrollRevealVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={delayedTransition(0.2)}
              onMouseEnter={aboutHacker.startHacking}
              onMouseLeave={aboutHacker.stopHacking}
            >
              01{" "}
              <motion.span
                className="text-foreground font-normal"
                variants={scrollRevealVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={delayedTransition(0.5)}
              >
                {aboutHacker.displayText}
                {aboutHacker.isHacking && (
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
              </motion.span>
            </motion.div>
          </div>

          <motion.div
            className="relative w-72 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[28rem] xl:w-80 xl:h-96 group mt-8 lg:mt-0"
            variants={scaleRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={delayedTransition(0.2)}
          >
            <motion.div
              className="absolute -inset-2 md:-inset-4 border border-foreground/20"
              variants={scaleRevealVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={delayedTransition(0.5)}
              whileHover={{
                borderColor: "rgba(255, 255, 255, 0.4)",
                transition: { duration: 0.3 },
              }}
            />

            <motion.div
              className="absolute -top-1 -left-1 md:-top-2 md:-left-2 w-3 h-3 md:w-4 md:h-4 border-l border-t border-foreground/40"
              variants={scaleRevealVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={delayedTransition(0.7)}
            />

            <motion.img
              src={images?.[0]?.url || undefined}
              alt="Portrait"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              drag
              dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
              dragElastic={0.1}
              whileDrag={{
                scale: 1.02,
                rotate: 1,
                cursor: "grabbing",
              }}
            />
            <motion.div
              className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-3 h-3 md:w-4 md:h-4 border-r border-b border-foreground/40"
              variants={scaleRevealVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={delayedTransition(0.9)}
            />

            <motion.div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          <motion.div
            className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2"
            variants={scrollRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={delayedTransition(1.2)}
          >
            <div className="flex items-center space-x-2 md:space-x-3">
              <motion.div
                className="w-4 md:w-8 h-px bg-foreground/30"
                variants={scaleXRevealVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={delayedTransition(1.4)}
              />
              <span className="text-xs font-light tracking-widest uppercase text-foreground/60">
                Graphic Designer
              </span>
              <motion.div
                className="w-4 md:w-8 h-px bg-foreground/30"
                variants={scaleXRevealVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={delayedTransition(1.6)}
              />
            </div>
          </motion.div>
        </div>

        <div className="flex-1 flex flex-col justify-center p-4 md:p-8 lg:p-16 space-y-6 md:space-y-8 lg:space-y-16">
          <motion.div
            className="relative"
            variants={slideRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={delayedTransition(0.2)}
          >
            <motion.div
              className="absolute -left-6 md:-left-12 -top-4 md:-top-8 text-4xl md:text-[6rem] font-thin text-foreground/10 leading-none"
              variants={scrollRevealVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={delayedTransition(0.4)}
            >
              "
            </motion.div>

            <motion.p
              className="text-sm md:text-base lg:text-lg xl:text-xl font-light leading-relaxed text-foreground max-w-lg pl-4 md:pl-8"
              variants={scrollRevealVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={delayedTransition(0.6)}
            >
              {
                "Passionate designer and developer creating digital experiences that matter. With expertise in modern web technologies and a keen eye for design, I build solutions that are both beautiful and functional."
              }
            </motion.p>

            <motion.div
              className="w-8 md:w-12 h-px bg-foreground/30 mt-4 md:mt-6 ml-4 md:ml-8"
              variants={scaleXRevealVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={delayedTransition(0.8)}
            />
          </motion.div>

          <motion.div
            className="space-y-6 md:space-y-8 lg:space-y-12"
            variants={scrollRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={delayedTransition(0.3)}
          >
            <motion.div
              className="group"
              variants={slideRevealVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={delayedTransition(0.5)}
              whileHover={{ x: 5 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline space-y-2 sm:space-y-0 sm:space-x-6 md:space-x-8">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/50 sm:w-16 md:w-20">
                  Based
                </span>
                <div className="flex-1">
                  <motion.div
                    className="h-px bg-foreground/20 mb-2"
                    variants={scaleXRevealVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={delayedTransition(0.7)}
                  />
                  <p className="text-sm md:text-base lg:text-lg font-light text-foreground group-hover:text-foreground/70 transition-colors duration-300">
                    Warsaw, Poland
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group"
              variants={slideRevealVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={delayedTransition(0.7)}
              whileHover={{ x: 5 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline space-y-2 sm:space-y-0 sm:space-x-6 md:space-x-8">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/50 sm:w-16 md:w-20">
                  Speaks
                </span>
                <div className="flex-1">
                  <motion.div
                    className="h-px bg-foreground/20 mb-2"
                    variants={scaleXRevealVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={delayedTransition(0.9)}
                  />
                  <p className="text-sm md:text-base lg:text-lg font-light text-foreground group-hover:text-foreground/70 transition-colors duration-300">
                    English
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group"
              variants={slideRevealVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={delayedTransition(0.9)}
              whileHover={{ x: 5 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-6 md:space-x-8">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/50 sm:w-16 md:w-20 sm:mt-1">
                  Skills
                </span>
                <div className="flex-1">
                  <motion.div
                    className="h-px bg-foreground/20 mb-3 md:mb-4"
                    variants={scaleXRevealVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={delayedTransition(1.1)}
                  />
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {[
                      "Figma",
                      "Photoshop",
                      "Illustrator",
                      "Premiere Pro",
                      "After Effects",
                    ].map((tool, index) => (
                      <motion.span
                        key={tool}
                        className="px-2 md:px-3 py-1 text-xs md:text-sm bg-foreground/5 border border-foreground/20 rounded text-foreground/80"
                        variants={scaleRevealVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={delayedTransition(1.3 + index * 0.1)}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(255,255,255,0.1)",
                        }}
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-4 md:bottom-8 right-4 md:right-8 text-xs font-light text-foreground/30 tracking-[0.3em]"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            001
          </motion.div>
        </div>
      </div>
    </section>
  );
};
