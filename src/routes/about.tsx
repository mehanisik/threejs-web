import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { PageWrapper } from "@/components/ui/page-wrapper";
import { siteConfig } from "@/constants/site-config";
import { getPotraitImage } from "@/lib/images";
import { motion, PRESETS, STAGGER_PRESETS } from "@/motion";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const { data: potraitImage } = useSuspenseQuery({
    queryKey: ["potraitImage"],
    queryFn: () => getPotraitImage(),
  });

  return (
    <PageWrapper>
      <section className="w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 md:py-24">
        <motion.div
          variants={STAGGER_PRESETS.container}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-16"
        >
          <motion.div variants={PRESETS.fadeInUp} className="relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div>
                <motion.h1
                  variants={PRESETS.fadeInUp}
                  className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
                >
                  About
                  <span className="text-primary">.</span>
                </motion.h1>
                <motion.p
                  variants={PRESETS.fadeInUp}
                  className="mt-4 max-w-2xl text-foreground/80 text-base md:text-lg"
                >
                  {siteConfig.about.subtitle}
                </motion.p>
              </div>

              <motion.div
                variants={PRESETS.scaleIn}
                className="relative md:col-span-5 md:col-start-8"
              >
                <div className="relative w-full max-w-md md:max-w-none md:w-full justify-self-end mx-auto">
                  <div className="pointer-events-none absolute -inset-3 rounded-lg bg-gradient-to-b from-foreground/5 to-transparent" />
                  <div className="absolute -inset-2 rounded-lg border border-foreground/15 group-hover:border-foreground/25 transition-colors" />
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-l border-t border-foreground/30" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-foreground/30" />
                  <motion.img
                    src={potraitImage}
                    alt="Portrait"
                    className="relative w-full aspect-[3/4] rounded-lg object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-sm"
                    whileHover={{ scale: 1.015 }}
                    drag
                    dragConstraints={{
                      left: -20,
                      right: 20,
                      top: -20,
                      bottom: 20,
                    }}
                    dragElastic={0.1}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={PRESETS.fadeInUp} className="max-w-3xl">
            <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
              {siteConfig.about.description}
            </p>
          </motion.div>

          <motion.div
            variants={STAGGER_PRESETS.containerSlow}
            className="flex flex-col gap-6"
          >
            <motion.h2
              variants={PRESETS.fadeInUp}
              className="text-xl font-semibold tracking-wider uppercase text-foreground/70"
            >
              Core Skills
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {siteConfig.about.skills.map((skill) => (
                <motion.div key={skill} variants={STAGGER_PRESETS.item}>
                  <Badge
                    variant="outline"
                    className="w-full justify-start px-3 py-2 text-foreground/90 border-foreground/20 hover:bg-foreground/5"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={STAGGER_PRESETS.container}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={STAGGER_PRESETS.item}
              className="p-6 border border-foreground/10 rounded-lg hover:border-foreground/20 transition-colors"
            >
              <div className="text-sm uppercase tracking-widest text-foreground/50">
                Focus
              </div>
              <div className="mt-2 text-lg font-medium">
                Brand Identity & UI/UX
              </div>
              <p className="mt-2 text-sm text-foreground/70">
                Design systems, accessible interfaces, and cohesive visual
                storytelling.
              </p>
            </motion.div>
            <motion.div
              variants={STAGGER_PRESETS.item}
              className="p-6 border border-foreground/10 rounded-lg hover:border-foreground/20 transition-colors"
            >
              <div className="text-sm uppercase tracking-widest text-foreground/50">
                Approach
              </div>
              <div className="mt-2 text-lg font-medium">
                Research → Iterate → Refine
              </div>
              <p className="mt-2 text-sm text-foreground/70">
                User-centered discovery, rapid prototyping, and thoughtful
                polish.
              </p>
            </motion.div>
            <motion.div
              variants={STAGGER_PRESETS.item}
              className="p-6 border border-foreground/10 rounded-lg hover:border-foreground/20 transition-colors"
            >
              <div className="text-sm uppercase tracking-widest text-foreground/50">
                Tools
              </div>
              <div className="mt-2 text-lg font-medium">Figma · Adobe CC</div>
              <p className="mt-2 text-sm text-foreground/70">
                Pragmatic toolset chosen for collaboration and speed.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
