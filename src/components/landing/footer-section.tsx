import { motion, useInView, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import siteConfig from "~/config";
import { socialLinks } from "~/constants/social-links";
import { FooterForm } from "../form/footer-form";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { SectionTitle } from "../ui/typography";

export function FooterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const connectRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, { amount: 0.3 });
  const titleIsInView = useInView(titleRef, { amount: 0.5 });
  const logoIsInView = useInView(logoRef, { amount: 0.7 });
  const connectIsInView = useInView(connectRef, { amount: 0.5 });
  const formIsInView = useInView(formRef, { amount: 0.3 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const logoVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -45,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const connectVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const socialVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const formVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full border-t border-border min-h-screen flex flex-col lg:flex-row items-stretch justify-between relative py-8 lg:py-0"
    >
      <div className="flex-1 flex flex-col justify-between px-6 lg:px-12 pt-8 lg:pt-16 pb-8">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={titleIsInView ? "visible" : "hidden"}
        >
          <SectionTitle ref={titleRef}>
            {siteConfig.footer.callToAction}
          </SectionTitle>
        </motion.div>

        <motion.div
          className="my-8"
          variants={logoVariants}
          initial="hidden"
          animate={logoIsInView ? "visible" : "hidden"}
        >
          <motion.svg
            ref={logoRef}
            width="97"
            height="98"
            fill="currentColor"
            className="text-foreground"
            animate={{ rotate: 360 }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3 },
            }}
          >
            <title>Spinning Logo</title>
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M8 64.742a8 8 0 0 1-8-8V41a8 8 0 0 1 8-8h17.43a7.099 7.099 0 0 0 7.1-7.099V8a8 8 0 0 1 8-8H56.27a8 8 0 0 1 8 8v18.744A6.256 6.256 0 0 0 70.527 33H88.01a8 8 0 0 1 8 8v15.742a8 8 0 0 1-8 8h-19.61a4.13 4.13 0 0 0-4.13 4.129v20.398a8 8 0 0 1-8 8H40.53a8 8 0 0 1-8-8V69.713a4.972 4.972 0 0 0-4.972-4.971H8Zm56.27-29.869a3.132 3.132 0 0 0-3.132-3.131h-25.76a3.636 3.636 0 0 0-3.636 3.636V60.57a4.957 4.957 0 0 0 4.957 4.957h23.118a4.453 4.453 0 0 0 4.452-4.453V34.873Z"
              clipRule="evenodd"
            />
          </motion.svg>
        </motion.div>

        <motion.div
          ref={connectRef}
          className="space-y-6"
          variants={connectVariants}
          initial="hidden"
          animate={connectIsInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <Badge
              variant="outline"
              className="text-sm text-foreground bg-transparent border-border px-2 py-1"
            >
              Let's connect
            </Badge>
          </motion.div>

          <motion.a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-foreground underline transition-colors ml-1 block"
            variants={itemVariants}
            whileHover={{
              x: 5,
              transition: { duration: 0.2 },
            }}
          >
            {siteConfig.contact.email}
          </motion.a>

          <motion.div
            className="flex flex-wrap gap-6 text-base mt-2"
            variants={itemVariants}
          >
            {socialLinks.map((link, index) => (
              <motion.div
                key={link.name}
                variants={socialVariants}
                custom={index}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.1 },
                }}
              >
                <Button
                  asChild
                  variant="link"
                  className="flex items-center gap-2 text-foreground border border-foreground transition-colors group px-2 py-1 h-auto"
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    {link.name}
                    <motion.div
                      whileHover={{
                        x: 4,
                        y: -4,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <ArrowUpRight size={16} />
                    </motion.div>
                  </a>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        ref={formRef}
        className="flex-1 flex items-center justify-center px-6 lg:px-12 py-8 lg:py-16"
        variants={formVariants}
        initial="hidden"
        animate={formIsInView ? "visible" : "hidden"}
      >
        <Card className="w-full max-w-2xl h-full border-none shadow-none">
          <FooterForm />
        </Card>
      </motion.div>
    </motion.footer>
  );
}
