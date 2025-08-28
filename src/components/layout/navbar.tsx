import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/ui/nav";
import { NavButton } from "@/components/ui/nav-button";
import { navLinks } from "@/constants/nav-links";
import { siteConfig } from "@/constants/site-config";
import { socialLinks } from "@/constants/social-links";
import { useNavbarVisibility } from "@/hooks/use-navbar-visibility";
import { motion, PRESETS, useInViewAnimation, type Variants } from "@/motion";

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

const navbarVariants: Variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  hidden: {
    y: -100,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const indicatorVariants: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  hidden: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

export const Navbar = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const isNavbarVisible = useNavbarVisibility(80);
  const { ref: logoRef, controls: logoControls } = useInViewAnimation(0.1);

  return (
    <nav aria-label="Main navigation">
      <motion.div
        className="fixed top-0 left-1/2 transform -translate-x-1/2 z-40"
        variants={indicatorVariants}
        animate={!isNavbarVisible ? "visible" : "hidden"}
        initial="hidden"
        aria-hidden="true"
      />

      <motion.div
        className="fixed left-12 top-12 z-50"
        variants={navbarVariants}
        animate={isNavbarVisible ? "visible" : "hidden"}
        initial="hidden"
      >
        <motion.div
          ref={logoRef}
          variants={PRESETS.fadeIn}
          animate={logoControls}
          initial="hidden"
        >
          <Link
            to="/"
            className="flex items-center gap-2 text-foreground"
            aria-label="Go to homepage"
          >
            <motion.svg
              viewBox="0 0 32 32"
              width="32"
              height="32"
              className="w-8 h-8"
              variants={PRESETS.scaleIn}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.3 },
              }}
            >
              <title>{siteConfig.name}</title>
              <motion.path
                d="M16 0C7.164 0 0 7.164 0 16s7.164 16 16 16 16-7.164 16-16S24.836 0 16 0zm0 30C8.268 30 2 23.732 2 16S8.268 2 16 2s14 6.268 14 14-6.268 14-14 14z"
                fill="currentColor"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              <motion.path
                d="M16 8c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 14c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"
                fill="currentColor"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
              />
            </motion.svg>

            <motion.span
              className="text-lg font-semibold"
              variants={PRESETS.fadeInLeft}
              whileHover={{
                x: 5,
                transition: { duration: 0.3 },
              }}
            >
              {siteConfig.name}
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        className="fixed right-12 top-12 z-50 flex items-center gap-4"
        variants={navbarVariants}
        animate={isNavbarVisible ? "visible" : "hidden"}
        initial="hidden"
      >
        <motion.div
          className="bg-foreground shadow-2xl rounded-3xl relative w-[480px] h-[650px]"
          variants={menuVariants}
          animate={isActive ? "open" : "closed"}
          initial="closed"
          role="dialog"
          aria-modal={isActive}
          aria-label="Navigation menu"
          aria-expanded={isActive}
        >
          <Nav active={isActive} links={navLinks} footerLinks={socialLinks} />
        </motion.div>
        <NavButton
          isActive={isActive}
          toggleMenu={() => {
            setIsActive(!isActive);
          }}
          aria-label={
            isActive ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isActive}
        />
      </motion.div>
    </nav>
  );
};
