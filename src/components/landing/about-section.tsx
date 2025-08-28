import { useSuspenseQuery } from "@tanstack/react-query";
import { getPotraitImage } from "@/lib/images";
import { motion, PRESETS, STAGGER_PRESETS, useInViewAnimation } from "@/motion";

export const AboutSection = () => {
  const { data: potraitImage } = useSuspenseQuery({
    queryKey: ["potraitImage"],
    queryFn: () => getPotraitImage(),
  });

  const { ref: sectionRef, controls: sectionControls } =
    useInViewAnimation(0.2);
  const { ref: imageRef, controls: imageControls } = useInViewAnimation(0.3);

  return (
    <section
      id="about"
      className="w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 md:py-12 lg:py-16"
      ref={sectionRef}
    >
      <motion.div
        className="flex flex-col lg:flex-row min-h-screen gap-8 lg:gap-12 xl:gap-16"
        variants={STAGGER_PRESETS.container}
        animate={sectionControls}
        initial="hidden"
      >
        <motion.div
          className="flex-1 relative flex items-center justify-center p-4 md:p-8 lg:p-12"
          variants={STAGGER_PRESETS.item}
        >
          <motion.div
            className="absolute top-4 md:top-8 left-4 md:left-8 flex items-baseline space-x-2 md:space-x-3 lg:space-x-6"
            variants={PRESETS.fadeInLeft}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[6rem] font-thin text-foreground/30 select-none cursor-pointer">
              01{" "}
              <span className="text-foreground font-normal uppercase">
                About me
              </span>
            </div>
          </motion.div>

          <motion.div
            className="relative w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-96 lg:w-96 lg:h-[28rem] xl:w-80 xl:h-96 group mt-8 lg:mt-0"
            ref={imageRef}
            variants={PRESETS.scaleIn}
            animate={imageControls}
            initial="hidden"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
              className="absolute -inset-2 md:-inset-4 border border-foreground/20"
              whileHover={{
                borderColor: "rgba(255, 255, 255, 0.4)",
                transition: { duration: 0.3 },
              }}
            />

            <motion.div
              className="absolute -top-1 -left-1 md:-top-2 md:-left-2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 border-l border-t border-foreground/40"
              variants={PRESETS.fadeIn}
              animate={imageControls}
            />

            <motion.img
              src={potraitImage}
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
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            />
            <motion.div
              className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 border-r border-b border-foreground/40"
              variants={PRESETS.fadeIn}
              animate={imageControls}
            />

            <motion.div
              className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              whileHover={{ opacity: 1 }}
            />
          </motion.div>

          <motion.div
            className="absolute bottom-2 sm:bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2"
            variants={PRESETS.fadeInUp}
            animate={imageControls}
            initial="hidden"
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
              <motion.div
                className="w-2 sm:w-4 md:w-8 h-px bg-foreground/30"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              />
              <span className="text-xs sm:text-sm font-light tracking-widest uppercase text-foreground/60">
                Designer
              </span>
              <motion.div
                className="w-2 sm:w-4 md:w-8 h-px bg-foreground/30"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 flex flex-col justify-center p-4 md:p-8 lg:p-12 space-y-8 md:space-y-12"
          variants={STAGGER_PRESETS.item}
        >
          <motion.div
            className="relative"
            variants={PRESETS.fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="absolute -left-4 sm:-left-6 md:-left-12 -top-2 sm:-top-4 md:-top-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[6rem] font-thin text-foreground/10 leading-none"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              "
            </motion.div>

            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light leading-relaxed text-foreground max-w-lg pl-2 sm:pl-4 md:pl-8"
              variants={PRESETS.fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Creating visual stories that connect, inspire, and transform ideas
              into meaningful experiences.
            </motion.p>

            <motion.div
              className="w-6 sm:w-8 md:w-12 h-px bg-foreground/30 mt-2 sm:mt-4 md:mt-6 ml-2 sm:ml-4 md:ml-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </motion.div>

          <motion.div
            className="space-y-6"
            variants={PRESETS.fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="group"
              variants={PRESETS.fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline space-y-1 sm:space-y-0 sm:space-x-4 md:space-x-6 lg:space-x-8">
                <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-foreground/50 sm:w-12 md:w-16 lg:w-20">
                  Based
                </span>
                <div className="flex-1">
                  <motion.div
                    className="h-px bg-foreground/20 mb-1 sm:mb-2"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  />
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-foreground group-hover:text-foreground/70 transition-colors duration-300">
                    Warsaw, Poland
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group"
              variants={PRESETS.fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline space-y-1 sm:space-y-0 sm:space-x-4 md:space-x-6 lg:space-x-8">
                <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-foreground/50 sm:w-12 md:w-16 lg:w-20">
                  Focus
                </span>
                <div className="flex-1">
                  <motion.div
                    className="h-px bg-foreground/20 mb-1 sm:mb-2"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  />
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-foreground group-hover:text-foreground/70 transition-colors duration-300">
                    Brand Identity & UI/UX
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group"
              variants={PRESETS.fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start space-y-1 sm:space-y-0 sm:space-x-4 md:space-x-6 lg:space-x-8">
                <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-foreground/50 sm:w-12 md:w-16 lg:w-20 sm:mt-1">
                  Tools
                </span>
                <div className="flex-1">
                  <motion.div
                    className="h-px bg-foreground/20 mb-2 sm:mb-3 md:mb-4"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                  />
                  <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-3">
                    {["Figma", "Photoshop", "Illustrator", "After Effects"].map(
                      (tool, index) => (
                        <motion.span
                          key={tool}
                          className="px-1 sm:px-2 md:px-3 py-1 text-xs sm:text-sm bg-foreground/5 border border-foreground/20 rounded text-foreground/80"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{
                            duration: 0.5,
                            delay: 1.3 + index * 0.1,
                          }}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "rgba(255,255,255,0.1)",
                          }}
                        >
                          {tool}
                        </motion.span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-2 sm:bottom-4 md:bottom-8 right-2 sm:right-4 md:right-8 text-xs font-light text-foreground/30 tracking-[0.3em]"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            001
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
