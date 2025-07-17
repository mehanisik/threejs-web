import { Archive, Volume2, VolumeX } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";
import { Link } from "wouter";
import { Nav } from "~/components/ui/nav";
import { NavButton } from "~/components/ui/nav-button";
import { navLinks } from "~/constants/nav-links";
import { socialLinks } from "~/constants/social-links";
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
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <Archive className="w-6 h-6 text-foreground" />
          <span className="text-foreground font-bold text-lg">LOGO</span>
        </Link>
      </div>
      <div className="fixed right-12 top-12 z-50 flex items-center gap-4">
        <button
          type="button"
          onClick={toggleAudio}
          aria-label={
            isPlaying ? "Pause background audio" : "Play background audio"
          }
          className="p-2 rounded-full border border-foreground bg-background hover:bg-foreground/10 transition-colors"
        >
          {isPlaying ? (
            <Volume2 className="w-6 h-6 text-foreground" />
          ) : (
            <VolumeX className="w-6 h-6 text-foreground" />
          )}
        </button>
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
          toggleMenu={() => setIsActive(!isActive)}
        />
      </div>
    </>
  );
};
