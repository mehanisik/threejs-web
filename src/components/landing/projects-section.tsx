import {
  AnimatePresence,
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { projects } from "~/constants/projects";
import { useMousePosition } from "~/hooks/use-mouse-position";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "../ui/table";
import { SectionTitle } from "../ui/typography";

export function ProjectsSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const titleIsInView = useInView(titleRef, {
    amount: 0.5,
  });

  const tableIsInView = useInView(tableRef, {
    amount: 0.3,
  });

  const sectionIsInView = useInView(sectionRef, {
    amount: 0.1,
  });

  const [, setLocation] = useLocation();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const { x, y } = useMousePosition();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
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

  const tableVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.05,
      },
    },
  };

  const rowVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -20,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const headerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="w-full relative font-sans px-0 py-0 flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate={sectionIsInView ? "visible" : "hidden"}
    >
      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate={titleIsInView ? "visible" : "hidden"}
      >
        <SectionTitle ref={titleRef}>Featured Projects</SectionTitle>
      </motion.div>

      <div className="w-full px-2">
        <motion.div
          variants={tableVariants}
          initial="hidden"
          animate={tableIsInView ? "visible" : "hidden"}
        >
          <Table ref={tableRef}>
            <TableHeader>
              <motion.tr
                className="text-xs uppercase text-muted-foreground font-semibold border-b border-border"
                variants={headerVariants}
              >
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
              </motion.tr>
            </TableHeader>
            <TableBody>
              {projects.map((project, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <motion.tr
                    key={project.title}
                    className={`group cursor-pointer transition-colors duration-150 border-b border-foreground ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-transparent text-foreground"
                    }`}
                    variants={rowVariants}
                    whileHover={{
                      scale: 1.01,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{
                      scale: 0.99,
                      transition: { duration: 0.1 },
                    }}
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
                        <motion.div
                          whileHover={{ rotate: 135 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </motion.div>
                      </Link>
                    </TableCell>
                  </motion.tr>
                );
              })}
            </TableBody>
          </Table>
        </motion.div>

        <AnimatePresence>
          {activeIdx !== null && projects[activeIdx]?.image && x && y && (
            <motion.div
              className="fixed z-50 pointer-events-none hidden md:block"
              style={{
                left: x + 20,
                top: y - 100,
                width: 520,
                height: 320,
              }}
              initial={{
                opacity: 0,
                scale: 0.8,
                rotateX: -10,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                rotateX: 5,
                y: -10,
              }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <motion.img
                src={projects[activeIdx].image}
                alt={projects[activeIdx].title}
                className="w-full h-full object-cover rounded-lg shadow-2xl border border-border"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
