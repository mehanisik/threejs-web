import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  delayedTransition,
  scaleRevealVariants,
  scaleXRevealVariants,
  scrollRevealVariants,
  useScrollReveal,
} from "@/constants/animations";
import { socialLinks } from "@/constants/social-links";
import { useHackerText } from "@/hooks/use-hacker-text";
import { FooterForm } from "../forms/footer-form";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function FooterSection() {
  const { inViewRef, isInView } = useScrollReveal();
  const titleHacker = useHackerText("Contact Me");

  return (
    <footer id="contact" className="w-full relative overflow-hidden">
      <div
        ref={inViewRef}
        className="min-h-screen flex flex-col lg:flex-row items-stretch justify-between px-4 py-8 lg:py-16"
      >
        <div className="flex-1 flex flex-col justify-between pr-0 lg:pr-8 xl:pr-16">
          <motion.div
            variants={scrollRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={delayedTransition()}
            className="flex items-baseline justify-start gap-3 md:gap-6 mb-12 md:mb-16"
          >
            <motion.span
              className="text-4xl md:text-6xl lg:text-8xl font-thin text-foreground/30 font-mono"
              variants={scaleRevealVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={delayedTransition(0.2)}
            >
              05
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
          </motion.div>

          <motion.div
            className="w-24 md:w-32 lg:w-40 h-px bg-foreground/30 mb-8 md:mb-12"
            variants={scaleXRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={delayedTransition(0.5)}
          />

          <motion.div
            className="mb-8 md:mb-12"
            variants={scaleRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={delayedTransition(0.3)}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <svg
              width="97"
              height="98"
              fill="currentColor"
              className="text-foreground/60 hover:text-foreground transition-colors duration-300"
            >
              <title>Spinning Logo</title>
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 64.742a8 8 0 0 1-8-8V41a8 8 0 0 1 8-8h17.43a7.099 7.099 0 0 0 7.1-7.099V8a8 8 0 0 1 8-8H56.27a8 8 0 0 1 8 8v18.744A6.256 6.256 0 0 0 70.527 33H88.01a8 8 0 0 1 8 8v15.742a8 8 0 0 1-8 8h-19.61a4.13 4.13 0 0 0-4.13 4.129v20.398a8 8 0 0 1-8 8H40.53a8 8 0 0 1-8-8V69.713a4.972 4.972 0 0 0-4.972-4.971H8Zm56.27-29.869a3.132 3.132 0 0 0-3.132-3.131h-25.76a3.636 3.636 0 0 0-3.636 3.636V60.57a4.957 4.957 0 0 0 4.957 4.957h23.118a4.453 4.453 0 0 0 4.452-4.453V34.873Z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>

          <motion.div
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Badge
                variant="outline"
                className="text-xs md:text-sm text-foreground/70 bg-transparent border-foreground/30 px-3 py-1.5"
              >
                Let's connect
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                href="mailto:mamihasturk@gmail.com"
                className="text-lg md:text-xl lg:text-2xl font-light text-foreground hover:text-foreground/80 transition-colors duration-300 border-b border-foreground/30 hover:border-foreground/60 pb-1"
              >
                mamihasturk@gmail.com
              </a>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4 md:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {socialLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Button
                    asChild
                    variant="ghost"
                    className="group border border-foreground/20 hover:border-foreground/40 bg-transparent hover:bg-foreground/5 transition-all duration-300 px-4 py-2 h-auto"
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm md:text-base text-foreground/70 hover:text-foreground"
                    >
                      {link.name}
                      <ArrowUpRight
                        size={16}
                        className="group-hover:rotate-45 transition-transform duration-300"
                      />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <div className="flex-1 min-h-8 lg:min-h-0" />
        </div>

        <motion.div
          className="flex-1 flex items-center justify-center mt-8 lg:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-full max-w-2xl">
            <FooterForm />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
