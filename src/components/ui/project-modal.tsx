import { motion, type Variants } from "framer-motion";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

interface ModalProps {
  modal: { active: boolean; index: number };
  projects: {
    title: string;
    subtitle: string;
    href: string;
    imgSrc: string;
  }[];
  containerRef: React.RefObject<HTMLDivElement>;
}

export const ProjectModal = ({ modal, projects, containerRef }: ModalProps) => {
  const { index, active } = modal;
  const modalRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorLabelRef = useRef(null);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const cursor = {
    _x: useMotionValue(0),
    _y: useMotionValue(0),
  };

  const mouseMove = (e: any) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const styles = getComputedStyle(containerRef.current);
      const paddingLeft = Number.parseFloat(styles.paddingLeft) || 0;
      const paddingTop = Number.parseFloat(styles.paddingTop) || 0;
      const borderLeftWidth = Number.parseFloat(styles.borderLeftWidth) || 0;
      const borderTopWidth = Number.parseFloat(styles.borderTopWidth) || 0;
      const x = e.clientX - rect.left - paddingLeft - borderLeftWidth;
      const y = e.clientY - rect.top - paddingTop - borderTopWidth;
      mouse.x.set(x);
      mouse.y.set(y);
    }
  };

  const cursorMove = (e: any) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const styles = getComputedStyle(containerRef.current);
      const paddingLeft = Number.parseFloat(styles.paddingLeft) || 0;
      const paddingTop = Number.parseFloat(styles.paddingTop) || 0;
      const borderLeftWidth = Number.parseFloat(styles.borderLeftWidth) || 0;
      const borderTopWidth = Number.parseFloat(styles.borderTopWidth) || 0;
      const x = e.clientX - rect.left - paddingLeft - borderLeftWidth;
      const y = e.clientY - rect.top - paddingTop - borderTopWidth;
      cursor._x.set(x);
      cursor._y.set(y);
    }
  };

  const smoothOptions = {
    damping: 40,
    stiffness: 300,
    mass: 0.5,
  };

  const cursorMoveSmoothOptions = {
    damping: 20,
    stiffness: 300,
    mass: 0.5,
  };

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const smoothCursor = {
    _x: useSpring(cursor._x, cursorMoveSmoothOptions),
    _y: useSpring(cursor._y, cursorMoveSmoothOptions),
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousemove", cursorMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousemove", cursorMove);
    };
  }, []);

  const scaleAnimation: Variants = {
    initial: {
      scale: 0,
      x: "-50%",
      y: "-50%",
    },
    open: {
      scale: 1,
      x: "-50%",
      y: "-50%",
      transition: {
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    closed: {
      scale: 0,
      x: "-50%",
      y: "-50%",
      transition: {
        duration: 0.4,
        ease: [0.32, 0, 0.67, 0],
      },
    },
  };

  return (
    <motion.div
      variants={scaleAnimation}
      initial={"initial"}
      animate={active ? "open" : "closed"}
      ref={modalRef}
      className="h-[350px] w-[400px] hidden md:flex items-center justify-center absolute overflow-hidden pointer-events-none"
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
      }}
    >
      <div
        className="h-full w-full absolute transition-[top] duration-500 ease-[cubic-bezier(0.76, 0, 0.24, 1)]"
        style={{
          top: `${index * -100}%`,
        }}
      >
        {projects.map((project, i) => {
          const { title, imgSrc } = project;
          return (
            <div
              key={title}
              className="relative h-full flex items-center justify-center p-1 rounded-lg"
            >
              <img
                src={imgSrc}
                alt={title}
                height={0}
                className="h-auto rounded-lg"
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
