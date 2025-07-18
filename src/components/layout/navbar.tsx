import { AudioLines, VolumeOff } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";
import { Link } from "wouter";
import { Nav } from "~/components/ui/nav";
import { NavButton } from "~/components/ui/nav-button";
import { navLinks } from "~/constants/nav-links";
import { socialLinks } from "~/constants/social-links";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { useAudio } from "./audio-context";

const menuVariants: Variants = {
  open: {
    width: "480px",
    height: "650px",
    top: "-25px",
    right: "-25px",
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    width: "100px",
    height: "40px",
    top: "0px",
    right: "0px",
    transition: {
      duration: 0.75,
      delay: 0.35,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const Navbar = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { isPlaying, toggleAudio } = useAudio();
  return (
    <>
      <div className="fixed left-12 top-12 z-50">
        <Link href="" className="flex items-center gap-2 text-foreground">
          <svg
            viewBox="0 0 32 32"
            width="32"
            height="32"
            fill="none"
            className="w-8 h-8 text-foreground"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Mami Hasturk</title>
            <rect
              x="4"
              y="4"
              width="24"
              height="24"
              rx="6"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M10 22V10L22 22V10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-foreground font-bold text-lg tracking-tight ">
            Mami Hasturk
          </span>
        </Link>
      </div>
      <div className="fixed right-12 top-12 z-50 flex items-center gap-4">
        <motion.div
          className="bg-foreground shadow-2xl  rounded-3xl relative w-[480px] h-[650px]"
          variants={menuVariants}
          animate={isActive ? "open" : "closed"}
          initial="closed"
        >
          <AnimatePresence>
            <Nav active={isActive} links={navLinks} footerLinks={socialLinks} />
          </AnimatePresence>
        </motion.div>
        <NavButton
          isActive={isActive}
          toggleMenu={() => {
            setIsActive(!isActive);
          }}
        />
      </div>

      <div className="fixed left-8 bottom-8 z-50">
        <Button
          variant="ghost"
          className={cn("group relative")}
          onClick={toggleAudio}
        >
          {isPlaying ? (
            <AudioLines
              className={cn("h-20 w-20", isPlaying && "animate-accordion-up")}
            />
          ) : (
            <VolumeOff className="h-20 w-20" />
          )}
        </Button>
      </div>
    </>
  );
};
