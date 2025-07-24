import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { useLocation } from "wouter";
import { useHackerText } from "@/hooks/use-hacker-text";
import { useSupabaseTable } from "@/hooks/use-supabase-query";
import { ProjectModal } from "../ui/project-modal";

export function ProjectsSection() {
  const { records: projects } = useSupabaseTable("projects", "*", {
    column: "number",
    ascending: true,
  });

  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null!);
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { amount: 0.3, once: true });
  const [, setLocation] = useLocation();

  const titleHacker = useHackerText("Featured Projects");

  return (
    <section
      className="w-full relative font-sans overflow-hidden"
      ref={containerRef}
    >
      <div ref={inViewRef} className="px-4 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
          className="flex items-baseline justify-start gap-3 md:gap-6 mb-12 md:mb-16"
        >
          <motion.span
            className="text-4xl md:text-6xl lg:text-8xl font-thin text-foreground/30 font-mono"
            initial={{ opacity: 0, rotate: -45 }}
            animate={
              isInView ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -45 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            04
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
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        <div className="space-y-4 md:space-y-6">
          {projects?.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              onClick={() => project.url && setLocation(project.url)}
              className="group cursor-pointer"
            >
              <div className="border border-foreground/15 hover:border-foreground/40 transition-all duration-300 p-6 md:p-8 bg-background">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-4 md:gap-8">
                      <motion.div
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-xs md:text-sm font-mono text-foreground/50 tracking-wider">
                          {project.number?.toString().padStart(3, "0")}
                        </span>
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <motion.h3
                          className="text-xl md:text-2xl lg:text-3xl font-light mb-2 group-hover:text-foreground transition-colors duration-300"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {project.title}
                        </motion.h3>

                        <div className="flex flex-wrap items-center gap-4 md:gap-8 text-sm text-foreground/70">
                          {project.city && (
                            <span className="flex-shrink-0">
                              {project.city}
                            </span>
                          )}
                          {project.date && (
                            <span className="flex-shrink-0">
                              {project.date}
                            </span>
                          )}
                          {project.tags && project.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {project.tags.slice(0, 3).map((tag, tagIdx) => (
                                <span
                                  key={`${project.id}-tag-${tag}-${tagIdx}`}
                                  className="text-xs px-2 py-1 border border-foreground/20 text-foreground/60"
                                >
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 3 && (
                                <span className="text-xs text-foreground/50">
                                  +{project.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.2, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 border border-foreground/30 group-hover:border-foreground/60 transition-colors duration-300 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-foreground/60 group-hover:text-foreground transition-colors duration-300" />
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="w-full h-px bg-foreground/10 mt-6 md:mt-8"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + idx * 0.1 }}
                  whileHover={{
                    scaleX: 1,
                    backgroundColor: "rgba(var(--foreground), 0.3)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal
        modal={{ index: activeIdx ?? 0, active: activeIdx !== null }}
        projects={
          projects?.map((project) => ({
            title: project.title,
            subtitle: project.city ?? "",
            href: project.url ?? "",
            imgSrc: project.image_url ?? "",
          })) ?? []
        }
        containerRef={containerRef}
      />
    </section>
  );
}
