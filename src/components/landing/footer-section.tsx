import { ArrowUpRight } from "lucide-react";
import { socialLinks } from "@/constants/social-links";
import { motion, PRESETS, STAGGER_PRESETS, useInViewAnimation } from "@/motion";
import { FooterForm } from "../forms/footer-form";
import { Button } from "../ui/button";

export function FooterSection() {
  const { ref: sectionRef, controls: sectionControls } =
    useInViewAnimation(0.2);

  return (
    <footer
      id="contact"
      className="w-full relative overflow-hidden bg-background text-foreground"
    >
      <motion.div
        className="min-h-screen flex flex-col lg:flex-row items-stretch justify-between px-4 py-8 lg:py-16"
        ref={sectionRef}
        variants={STAGGER_PRESETS.container}
        animate={sectionControls}
        initial="hidden"
      >
        <div className="flex-1 flex flex-col justify-between pr-0 lg:pr-8 xl:pr-16">
          <motion.div
            className="flex items-baseline justify-start gap-3 md:gap-6 mb-12 md:mb-16"
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
              05
            </motion.span>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-8xl uppercase font-extrabold tracking-tight cursor-pointer font-mono"
              variants={PRESETS.fadeInLeft}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              Contact Me
            </motion.h1>
          </motion.div>

          <motion.div
            className="space-y-6 md:space-y-8"
            variants={STAGGER_PRESETS.item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="flex flex-col space-y-4"
              variants={PRESETS.fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg md:text-xl font-medium text-foreground">
                Let's work together
              </h3>
              <p className="text-sm md:text-base text-foreground/70 max-w-md">
                Ready to bring your vision to life? Let's discuss your project
                and create something amazing together.
              </p>
            </motion.div>

            <motion.div
              className="mt-4 md:mt-6 flex flex-wrap gap-4 md:gap-6"
              variants={PRESETS.fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.7 }}
            >
              {socialLinks.map((link) => (
                <motion.div
                  key={link.name}
                  variants={STAGGER_PRESETS.item}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
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
                      aria-label={link.name}
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

            <div className="flex-1 min-h-8 lg:min-h-0" />
          </motion.div>
        </div>

        <div className="flex-1 flex flex-col justify-center pl-0 lg:pl-8 xl:pl-16">
          <motion.div
            variants={PRESETS.fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.8 }}
          >
            <FooterForm />
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
