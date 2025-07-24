import type { Variants } from "framer-motion";
import { motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Calendar,
  ExternalLink,
  Wrench,
} from "lucide-react";
import { useRef } from "react";
import { Link, useParams } from "wouter";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PageWrapper } from "@/components/ui/page-wrapper";
import { useHackerText } from "@/hooks/use-hacker-text";
import { useSupabaseTable } from "@/hooks/use-supabase-query";

export function ProjectPage() {
  const params = useParams();
  const { records: projects } = useSupabaseTable("projects");
  const project = projects?.find((p) => p.number === Number(params.id));

  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { amount: 0.3, once: true });
  const titleHacker = useHackerText(project?.title || "Project");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <PageWrapper>
      <main className="w-full min-h-screen bg-background text-foreground overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-screen">
          <motion.section
            ref={inViewRef}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full lg:w-1/2 flex flex-col justify-between px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16 bg-background border-b lg:border-b-0 lg:border-r border-foreground/15"
          >
            <div className="flex-1 space-y-8 md:space-y-12">
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-baseline gap-3 md:gap-6">
                  <motion.span
                    className="text-2xl md:text-4xl lg:text-6xl font-thin text-foreground/30 font-mono"
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={
                      isInView
                        ? { opacity: 1, rotate: 0 }
                        : { opacity: 0, rotate: -45 }
                    }
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {String(project?.number || "01").padStart(2, "0")}
                  </motion.span>
                  <motion.h1
                    className="text-3xl md:text-5xl lg:text-7xl uppercase font-extrabold tracking-tight cursor-pointer font-mono flex-1"
                    onMouseEnter={titleHacker.startHacking}
                    onMouseLeave={titleHacker.stopHacking}
                    whileHover={{ scale: 1.02 }}
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
                  className="w-24 md:w-32 lg:w-40 h-px bg-foreground/30"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <p className="text-lg md:text-xl font-light text-foreground/70 tracking-wide">
                  {project?.city}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="space-y-8 md:space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <motion.div
                    className="space-y-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-sm font-medium flex items-center gap-2 text-foreground/60 uppercase tracking-wider">
                      <Briefcase className="w-4 h-4" />
                      Role
                    </h3>
                    <div className="text-base font-light leading-relaxed space-y-1">
                      <div>Art Direction</div>
                      <div>Web Design</div>
                      <div>Motion Design</div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="space-y-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-sm font-medium flex items-center gap-2 text-foreground/60 uppercase tracking-wider">
                      <Calendar className="w-4 h-4" />
                      Year
                    </h3>
                    <div className="space-y-4">
                      <div className="text-base font-light">2024</div>
                      {project?.url && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link
                            href={project.url}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/30 hover:border-foreground/60 bg-transparent hover:bg-foreground/5 transition-all duration-300 text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit live project"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Visit Live
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="space-y-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-sm font-medium flex items-center gap-2 text-foreground/60 uppercase tracking-wider">
                    <Wrench className="w-4 h-4" />
                    Tools
                  </h3>
                  <div className="text-base font-light leading-relaxed space-y-1">
                    <div>Figma</div>
                    <div>After Effects</div>
                    <div>Photoshop</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <motion.nav
              variants={itemVariants}
              className="flex justify-between items-center pt-8 border-t border-foreground/15 mt-8"
            >
              <motion.div whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
                <Link
                  href={`/projects/${project?.number ? project.number - 1 : 1}`}
                  className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300 px-4 py-2 border border-foreground/20 hover:border-foreground/40 bg-transparent hover:bg-foreground/5"
                  aria-label="Previous project"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Link>
              </motion.div>

              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link
                  href={`/projects/${project?.number ? project.number + 1 : 1}`}
                  className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300 px-4 py-2 border border-foreground/20 hover:border-foreground/40 bg-transparent hover:bg-foreground/5"
                  aria-label="Next project"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.nav>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-1/2 lg:h-screen border-t lg:border-t-0 border-foreground/15 bg-background"
          >
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="w-full h-full"
            >
              {project?.image && (
                <Carousel
                  orientation="vertical"
                  className="w-full h-full"
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                >
                  <CarouselContent className="h-full">
                    <CarouselItem className="h-full flex items-center justify-center p-4 md:p-8">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full h-full border border-foreground/10 hover:border-foreground/20 transition-colors duration-300 overflow-hidden group"
                      >
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                          loading="lazy"
                        />

                        <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <motion.div
                          className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ scale: 1.2 }}
                        />
                      </motion.div>
                    </CarouselItem>
                  </CarouselContent>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <CarouselPrevious className="top-4 left-1/2 -translate-x-1/2 rotate-90 border-foreground/30 hover:border-foreground/60 bg-background/80 backdrop-blur-sm" />
                    <CarouselNext className="bottom-4 left-1/2 -translate-x-1/2 rotate-90 border-foreground/30 hover:border-foreground/60 bg-background/80 backdrop-blur-sm" />
                  </motion.div>
                </Carousel>
              )}
            </motion.div>
          </motion.section>
        </div>

        <ThemeSwitcher />
      </main>
    </PageWrapper>
  );
}
