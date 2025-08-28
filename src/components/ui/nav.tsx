import { Link } from "@tanstack/react-router";
import { motion, type Variants } from "motion/react";

interface NavProps {
  active: boolean;
  links: { title: string; href: string }[];
  footerLinks: { name: string; url: string }[];
}

const perspective: Variants = {
  initial: {
    opacity: 0,
    rotateX: 90,
    translateY: 80,
    translateX: -20,
  },
  enter: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    translateX: 0,
    transition: {
      duration: 0.65,
      delay: 0.5 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
      opacity: { duration: 0.35 },
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] },
  },
};

const slideIn: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.75 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "tween", ease: "easeInOut" },
  },
};

export const Nav: React.FC<NavProps> = ({ active, links, footerLinks }) => {
  if (!active) return null;
  return (
    <div
      className="flex flex-col justify-between h-full box-border"
      style={{ padding: "100px 40px 50px 40px" }}
    >
      <div className="flex gap-2.5 flex-col">
        {links.map((link, i) => {
          const { title, href } = link;
          return (
            <div
              key={`b_${title}`}
              className="perspective-120"
              style={{ perspective: "120px", perspectiveOrigin: "bottom" }}
            >
              <motion.div
                custom={i}
                variants={perspective}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                {href.startsWith("/") ? (
                  <Link
                    to={href}
                    className="no-underline text-background text-5xl hover:text-yellow-500 transition-colors duration-300"
                    aria-label={`Go to ${title}`}
                  >
                    {title}
                  </Link>
                ) : (
                  <Link
                    to="/"
                    hash={href}
                    className="no-underline text-background text-5xl hover:text-yellow-500 transition-colors duration-300"
                    aria-label={`Go to ${title} section`}
                  >
                    {title}
                  </Link>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
      <motion.div className="flex flex-wrap">
        {footerLinks.map((link, i) => {
          const { name, url } = link;
          return (
            <motion.a
              key={`f_${name}`}
              href={url}
              variants={slideIn}
              custom={i}
              initial="initial"
              animate="enter"
              exit="exit"
              className="w-1/2 mt-1.5 text-background hover:text-background/70 transition-colors duration-300"
            >
              {name}
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
};
