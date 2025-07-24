import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Animated Logo Design Illustration
export const LogoDesignIllustration = ({ className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className={`flex h-full w-full items-center justify-center ${className}`}
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full max-h-48 max-w-48"
        role="img"
        aria-labelledby="logo-design-title"
      >
        <title id="logo-design-title">Logo Design Illustration</title>
        <defs>
          <radialGradient
            id="logo-glow"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(100 100) rotate(90) scale(80)"
          >
            <stop stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="logo-line-gradient"
            x1="50"
            y1="50"
            x2="150"
            y2="150"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="currentColor" stopOpacity="0" />
            <stop offset="0.5" stopColor="currentColor" stopOpacity="1" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.circle
          cx="100"
          cy="100"
          r="80"
          fill="url(#logo-glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        <motion.path
          d="M 50,100 A 50,50 0 0,1 150,100"
          stroke="url(#logo-line-gradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="200"
          strokeDashoffset="200"
          animate={
            isInView ? { strokeDashoffset: 0 } : { strokeDashoffset: 200 }
          }
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
        />

        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.circle
            cx="100"
            cy="100"
            r="10"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.2, type: "spring" }}
          />
          <motion.path
            d="M100 70 L100 130 M70 100 L130 100"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ scale: 0, rotate: -90 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
          />
        </motion.g>

        <motion.g
          initial={{ opacity: 0 }}
          animate={
            isInView ? { opacity: [0, 0.5, 0] } : { opacity: 0 }
          }
          transition={{
            duration: 3,
            delay: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1,
          }}
        >
          <circle cx="60" cy="60" r="3" fill="currentColor" />
          <circle cx="140" cy="140" r="2" fill="currentColor" />
          <circle cx="70" cy="130" r="1.5" fill="currentColor" />
        </motion.g>
      </svg>
    </div>
  );
};

// Animated Brand Identity Illustration
export const BrandIdentityIllustration = ({ className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className={`flex h-full w-full items-center justify-center ${className}`}
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full max-h-48 max-w-48"
        role="img"
        aria-labelledby="brand-identity-title"
      >
        <title id="brand-identity-title">
          Brand Identity Design Illustration
        </title>
        <defs>
          <filter id="brand-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <motion.polygon
            points="100,30 170,70 170,130 100,170 30,130 30,70"
            stroke="currentColor"
            strokeWidth="2"
            fill="currentColor"
            fillOpacity="0.1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.g>

        <motion.g
          filter="url(#brand-glow)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.path
            d="M100 90 L70 130 L130 130 Z"
            fill="currentColor"
            initial={{ scale: 0, y: 20 }}
            animate={isInView ? { scale: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.2, type: "spring" }}
          />
          <motion.circle
            cx="100"
            cy="70"
            r="12"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.5 }}
          />
        </motion.g>

        <motion.g
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <motion.line
            x1="100"
            y1="70"
            x2="100"
            y2="90"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.5, delay: 2 }}
          />
          <motion.line
            x1="70"
            y1="130"
            x2="30"
            y2="70"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.5, delay: 2.2 }}
          />
          <motion.line
            x1="130"
            y1="130"
            x2="170"
            y2="70"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.5, delay: 2.4 }}
          />
        </motion.g>
      </svg>
    </div>
  );
};

// Animated Print Design Illustration
export const PrintDesignIllustration = ({ className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className={`flex h-full w-full items-center justify-center ${className}`}
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full max-h-48 max-w-48"
        role="img"
        aria-labelledby="print-design-title"
      >
        <title id="print-design-title">
          Print Design Services Illustration
        </title>
        <motion.g
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <motion.path
            d="M40 60 H160 V140 H40 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="currentColor"
            fillOpacity="0.1"
            rx="8"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.path
            d="M70 60 V140"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1, delay: 1.5 }}
          />
        </motion.g>

        <motion.g
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <motion.circle
            cx="95"
            cy="85"
            r="15"
            fill="currentColor"
            fillOpacity="0.5"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
          />
          <motion.rect
            x="120"
            y="75"
            width="25"
            height="4"
            rx="2"
            fill="currentColor"
            fillOpacity="0.7"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: "120px 77px" }}
          />
          <motion.rect
            x="120"
            y="85"
            width="18"
            height="3"
            rx="1.5"
            fill="currentColor"
            fillOpacity="0.6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.7, ease: "easeOut" }}
            style={{ transformOrigin: "120px 86.5px" }}
          />
        </motion.g>

        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.path
            d="M90 110 Q110 120 130 110"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1, delay: 2.2 }}
          />
          <motion.path
            d="M90 120 Q110 130 130 120"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.7"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1, delay: 2.4 }}
          />
        </motion.g>
      </svg>
    </div>
  );
};

export const DigitalDesignIllustration = ({ className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className={`flex h-full w-full items-center justify-center ${className}`}
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full max-h-48 max-w-48"
        role="img"
        aria-labelledby="digital-design-title"
      >
        <title id="digital-design-title">Digital Design Illustration</title>
        <defs>
          <linearGradient
            id="digital-screen"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <rect
            x="40"
            y="50"
            width="120"
            height="100"
            rx="8"
            fill="url(#digital-screen)"
          />
          <rect
            x="40"
            y="50"
            width="120"
            height="100"
            rx="8"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </motion.g>

        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.circle
            cx="60"
            cy="70"
            r="10"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
          />
          <motion.rect
            x="80"
            y="65"
            width="60"
            height="10"
            rx="5"
            fill="currentColor"
            fillOpacity="0.7"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
            style={{ transformOrigin: "80px 70px" }}
          />

          <motion.rect
            x="60"
            y="90"
            width="80"
            height="40"
            rx="4"
            fill="currentColor"
            fillOpacity="0.2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.6 }}
          />
          <motion.path
            d="M70 100 H130 M70 110 H110 M70 120 H120"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.5"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1, delay: 2 }}
          />
        </motion.g>

        <motion.g
          initial={{ opacity: 0 }}
          animate={
            isInView ? { opacity: [0, 1, 0] } : { opacity: 0 }
          }
          transition={{
            duration: 2.5,
            delay: 2.5,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <circle cx="150" cy="60" r="2" fill="currentColor" />
          <circle cx="50" cy="140" r="1.5" fill="currentColor" />
        </motion.g>
      </svg>
    </div>
  );
};

// Demo component showing all illustrations
export const GraphicDesignServices = () => {
  const services = [
    {
      title: "Logo Design",
      description:
        "Creating unique and memorable logos that represent your brand's identity and values. From concept to final design, I craft logos that make lasting impressions.",
      illustration: LogoDesignIllustration,
    },
    {
      title: "Brand Identity",
      description:
        "Developing comprehensive brand identities including color palettes, typography, and visual guidelines that ensure consistency across all touchpoints.",
      illustration: BrandIdentityIllustration,
    },
    {
      title: "Print Design",
      description:
        "Designing for print media including business cards, brochures, flyers, and posters. High-quality designs optimized for various printing processes.",
      illustration: PrintDesignIllustration,
    },
    {
      title: "Digital Design",
      description:
        "Creating digital assets for web and mobile platforms. Responsive designs that work seamlessly across all devices and screen sizes.",
      illustration: DigitalDesignIllustration,
    },
  ];

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <motion.h1
          className="mb-16 text-center text-6xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Graphic Design Services
        </motion.h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service, index) => {
            const IllustrationComponent = service.illustration;

            return (
              <motion.div
                className="rounded-lg border border-gray-700 bg-gray-900 p-8 transition-colors hover:border-gray-600"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="mb-6 h-64">
                  <IllustrationComponent className="text-white" />
                </div>

                <h3 className="mb-4 text-2xl font-semibold">{service.title}</h3>
                <p className="leading-relaxed text-gray-300">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
