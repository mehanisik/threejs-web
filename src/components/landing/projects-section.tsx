import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { getProjects } from "@/lib/projects";
import { ProjectModal } from "../ui/project-modal";

export function ProjectsSection() {
  const {
    data: { projects },
  } = useSuspenseQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
  const containerRef = useRef<HTMLDivElement>(null!);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section
      id="portfolio"
      className="w-full relative font-sans overflow-hidden"
      ref={containerRef}
      style={{ position: "relative" }}
    >
      <div className="px-4 py-8 md:py-16">
        <div className="flex items-baseline justify-start gap-3 md:gap-6 mb-12 md:mb-16">
          <span className="text-4xl md:text-6xl lg:text-8xl font-thin text-foreground/30 font-mono">
            04
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-8xl uppercase font-extrabold tracking-tight cursor-pointer font-mono">
            Featured Projects
            <span className="opacity-75">|</span>
          </h1>
        </div>

        <div className="w-24 md:w-32 lg:w-40 h-px bg-foreground/30 mb-8 md:mb-12" />

        <div className="space-y-4 md:space-y-6">
          {(!projects || projects.length === 0) && (
            <div className="text-center py-8 text-foreground/70">
              <p>No projects found</p>
            </div>
          )}

          {projects?.slice(0, 5).map((project, idx) => (
            <Link
              to="/projects/$slug"
              key={project.id}
              params={{ slug: project.slug ?? "" }}
            >
              <div
                className="group cursor-pointer"
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                <div className="border border-foreground/15 hover:border-foreground/40 transition-all duration-300 p-6 md:p-8 bg-background group-hover:bg-foreground/5 group-hover:shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-4 md:gap-8">
                          <div className="flex-shrink-0">
                            <span className="text-xs md:text-sm font-mono text-foreground/50 tracking-wider group-hover:text-foreground/70 transition-colors duration-300">
                              {project.order_index?.toString().padStart(3, "0")}
                            </span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-2 group-hover:text-foreground transition-colors duration-300 group-hover:translate-x-1 transform-gpu">
                              {project.title}
                            </h2>
                            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm md:text-base text-foreground/70 group-hover:text-foreground/80 transition-colors duration-300">
                              <span className="group-hover:translate-x-1 transform-gpu transition-transform duration-300">
                                {project.city}
                              </span>
                              <span className="group-hover:translate-x-1 transform-gpu transition-transform duration-300 delay-75">
                                {project.date}
                              </span>
                            </div>
                            {project.description && (
                              <p className="mt-3 text-sm md:text-base text-foreground/60 leading-relaxed group-hover:text-foreground/70 transition-colors duration-300 group-hover:translate-x-1 transform-gpu delay-100">
                                {project.description ?? ""}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 border border-foreground/30 group-hover:border-foreground/60 transition-all duration-300 flex items-center justify-center group-hover:bg-foreground/10">
                          <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-foreground/60 group-hover:text-foreground transition-all duration-300 group-hover:rotate-90 transform-gpu" />
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-px bg-foreground/10 mt-6 md:mt-8 group-hover:bg-foreground/20 transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {projects && projects.length > 5 && (
            <div className="text-center pt-8">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 hover:border-foreground/40 transition-all duration-300 text-foreground/70 hover:text-foreground group"
              >
                View All {projects.length} Projects
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              </Link>
            </div>
          )}
        </div>
      </div>

      <ProjectModal
        isActive={activeIdx !== null}
        imageSrc={projects[activeIdx ?? 0]?.coverImage?.[0]?.image_url ?? ""}
        altText={projects[activeIdx ?? 0]?.title ?? ""}
      />
    </section>
  );
}
