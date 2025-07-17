import { AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { projects } from "~/constants/projects";
import { useMousePosition } from "~/hooks/use-mouse-position";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { SectionTitle } from "../ui/typography";

export function ProjectsSection() {
  const [, setLocation] = useLocation();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const { x, y } = useMousePosition();

  return (
    <section className="min-h-screen w-full relative  font-sans px-0 py-0 flex flex-col items-center">
      <div className="w-full pt-8 pb-4 px-2">
        <SectionTitle>Featured Projects</SectionTitle>
      </div>

      <div className="w-full px-2">
        <Table>
          <TableHeader>
            <TableRow className="text-xs uppercase text-muted-foreground font-semibold border-b border-border">
              <TableHead className="text-left py-2 pl-2 w-16 hidden sm:table-cell">
                No.
              </TableHead>
              <TableHead className="text-left py-2">Title</TableHead>
              <TableHead className="text-left py-2 w-48 hidden md:table-cell ">
                City
              </TableHead>
              <TableHead className="text-left py-2 w-48 hidden md:table-cell">
                Date
              </TableHead>
              <TableHead className="text-left py-2 w-48 hidden md:table-cell">
                Tags
              </TableHead>
              <TableHead className="text-right py-2 pr-2 w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project, idx) => {
              const isActive = activeIdx === idx;
              return (
                <TableRow
                  key={project.title}
                  className={`group cursor-pointer transition-colors duration-150 border-b border-border ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent text-foreground"
                  }`}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onMouseLeave={() => setActiveIdx(null)}
                  onClick={() => setLocation(project.url)}
                  tabIndex={0}
                >
                  <TableCell className="py-3 pl-2 font-mono text-xs md:text-sm align-middle hidden sm:table-cell">
                    <Link href={project.url}>
                      {project.number?.toString().padStart(3, "0")}
                    </Link>
                  </TableCell>
                  <TableCell
                    className="py-3 font-medium text-base md:text-lg align-middle max-w-[200px] sm:max-w-none
                               sm:whitespace-normal break-words"
                  >
                    <Link href={project.url}>{project.title}</Link>
                  </TableCell>
                  <TableCell className="py-3 text-sm align-middle hidden md:table-cell">
                    <Link href={project.url}>{project.city || ""}</Link>
                  </TableCell>
                  <TableCell className="py-3 text-sm align-middle hidden md:table-cell">
                    <Link href={project.url}>{project.date || ""}</Link>
                  </TableCell>
                  <TableCell className="py-3 text-sm align-middle hidden md:table-cell">
                    <Link href={project.url}>{project.tags || ""}</Link>
                  </TableCell>
                  <TableCell className="py-3 pr-2 text-right align-middle">
                    <Link
                      href={project.url}
                      aria-label={`View ${project.title}`}
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-transparent group-hover:bg-white/10 transition-colors duration-150"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-[135deg]" />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <AnimatePresence>
          {activeIdx !== null && projects[activeIdx]?.image && x && y && (
            <div
              className="fixed z-50 pointer-events-none hidden md:block"
              style={{
                left: x + 20,
                top: y - 100,
                width: 520,
                height: 320,
              }}
            >
              <img
                src={projects[activeIdx].image}
                alt={projects[activeIdx].title}
                className="w-full h-full object-cover rounded-lg shadow-2xl border border-border"
                onLoad={() =>
                  console.log("Image loaded:", projects[activeIdx].title)
                }
                onError={() =>
                  console.log(
                    "Image failed to load:",
                    projects[activeIdx].title,
                  )
                }
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
