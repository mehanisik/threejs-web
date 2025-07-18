import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import siteConfig from "~/config";
import { SectionTitle } from "../ui/typography";

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const sectionIsInView = useInView(sectionRef, { amount: 0.2 });
  const titleIsInView = useInView(titleRef, { amount: 0.5 });
  const imageIsInView = useInView(imageRef, { amount: 0.3 });
  const contentIsInView = useInView(contentRef, { amount: 0.3 });
  const statsIsInView = useInView(statsRef, { amount: 0.5 });

  const { about } = siteConfig;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const imageVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: -15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const listItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const statsVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.15,
      },
    },
  };

  const statItemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full bg-background text-foreground min-h-screen overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={sectionIsInView ? "visible" : "hidden"}
    >
      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate={titleIsInView ? "visible" : "hidden"}
      >
        <SectionTitle ref={titleRef}>About</SectionTitle>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[60vh] border-t border-foreground pt-8">
        {/* Image Section */}
        <motion.div
          ref={imageRef}
          className="bg-background relative overflow-hidden min-h-[32rem] h-full w-full"
          variants={imageVariants}
          initial="hidden"
          animate={imageIsInView ? "visible" : "hidden"}
        >
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-foreground/10 to-transparent"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-foreground/5 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/4 w-36 h-36 rounded-full bg-foreground/5 blur-xl"
              animate={{
                scale: [1, 0.8, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </div>

          {/* Main Image Container */}
          <motion.div
            className="relative w-full h-full group"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.4 },
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-orange-200/20 via-transparent to-purple-200/20 blur-2xl z-10"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <motion.img
              src="https://framerusercontent.com/images/3QdiP4GDqvu2kknZsKKm5PbHE.webp"
              alt="Portrait"
              className="w-full h-full aspect-[3/5] object-cover transition-all duration-700 group-hover:brightness-110 group-hover:contrast-105 z-20"
              whileHover={{
                filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />

            {/* Corner Decorations */}
            <motion.div
              className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-40"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            />
            <motion.div
              className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-40"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            />

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full opacity-60 z-50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-3 -left-3 w-6 h-6 bg-purple-400 rounded-full opacity-40 z-50"
              animate={{
                y: [0, -10, 0],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          ref={contentRef}
          className="bg-background text-foreground p-8 md:px-16 flex flex-col justify-between relative"
          variants={contentVariants}
          initial="hidden"
          animate={contentIsInView ? "visible" : "hidden"}
        >
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-foreground/10 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/3 left-0 w-48 h-48 bg-gradient-radial from-foreground/5 to-transparent rounded-full blur-2xl"
              animate={{
                scale: [1, 0.8, 1],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 3,
              }}
            />
          </div>

          {/* Main Content */}
          <div className="space-y-8 relative z-10">
            <div className="space-y-6">
              <motion.p
                className="text-sm md:text-base leading-relaxed text-foreground max-w-lg"
                variants={textVariants}
                whileHover={{
                  x: 8,
                  transition: { duration: 0.3 },
                }}
              >
                {about.bio}
              </motion.p>

              {about.highlights && (
                <motion.div variants={listVariants}>
                  <motion.ul
                    className="list-disc pl-5 text-sm md:text-base text-foreground space-y-1"
                    variants={listVariants}
                  >
                    {about.highlights.map((item, idx) => (
                      <motion.li
                        key={item}
                        variants={listItemVariants}
                        whileHover={{
                          x: 5,
                          color: "#f97316",
                          transition: { duration: 0.2 },
                        }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <motion.div
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 relative z-10"
            variants={statsVariants}
            initial="hidden"
            animate={statsIsInView ? "visible" : "hidden"}
          >
            <motion.div
              className="space-y-2 group"
              variants={statItemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <h3 className="text-xs font-semibold tracking-wider text-foreground uppercase group-hover:text-foreground transition-colors duration-300">
                Based
              </h3>
              <p className="text-sm text-foreground group-hover:text-orange-300 transition-colors duration-300">
                {about.name && siteConfig.contact.address
                  ? `Based in ${siteConfig.contact.address}`
                  : "-"}
              </p>
            </motion.div>

            <motion.div
              className="space-y-2 group"
              variants={statItemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <h3 className="text-xs font-semibold tracking-wider text-foreground uppercase group-hover:text-foreground transition-colors duration-300">
                Languages
              </h3>
              <p className="text-sm text-foreground group-hover:text-purple-300 transition-colors duration-300">
                English
              </p>
            </motion.div>

            <motion.div
              className="space-y-2 group"
              variants={statItemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <h3 className="text-xs font-semibold tracking-wider text-foreground uppercase group-hover:text-foreground transition-colors duration-300">
                Skills
              </h3>
              <p className="text-sm text-foreground group-hover:text-blue-300 transition-colors duration-300">
                {about.tools.join(", ")}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
