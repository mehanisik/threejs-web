import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Animated Logo Design Illustration
export const LogoDesignIllustration = ({ className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className={`w-full h-full flex items-center justify-center ${className}`}
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-48 max-h-48"
        role="img"
        aria-labelledby="logo-design-title"
      >
        <title id="logo-design-title">Logo Design Illustration</title>
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="502"
          strokeDashoffset="502"
          animate={
            isInView ? { strokeDashoffset: 0 } : { strokeDashoffset: 502 }
          }
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.rect
            x="85"
            y="60"
            width="8"
            height="60"
            fill="currentColor"
            rx="1"
            animate={isInView ? { scaleY: [0, 1] } : { scaleY: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{ transformOrigin: "89px 120px" }}
          />
          <motion.polygon
            points="85,120 93,120 89,130"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 1.3 }}
          />
        </motion.g>

        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
          }
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <circle
            cx="120"
            cy="80"
            r="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="110"
            y="110"
            width="24"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            rx="2"
          />
          <motion.path
            d="M50 140 Q65 130 80 140"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray="30"
            strokeDashoffset="30"
            animate={
              isInView ? { strokeDashoffset: 0 } : { strokeDashoffset: 30 }
            }
            transition={{ duration: 1, delay: 2 }}
          />
        </motion.g>

        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: [0, 1, 0] } : { opacity: 0 }}
          transition={{
            duration: 2,
            delay: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1,
          }}
        >
          <circle cx="140" cy="60" r="2" fill="currentColor" />
          <circle cx="60" cy="100" r="1.5" fill="currentColor" />
          <circle cx="150" cy="140" r="1" fill="currentColor" />
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
      className={`w-full h-full flex items-center justify-center ${className}`}
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-48 max-h-48"
        role="img"
        aria-labelledby="brand-identity-title"
      >
        <title id="brand-identity-title">
          Brand Identity Design Illustration
        </title>
        <motion.g
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.circle
            cx="60"
            cy="70"
            r="15"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
          <motion.circle
            cx="90"
            cy="70"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />
          <motion.circle
            cx="120"
            cy="70"
            r="15"
            fill="currentColor"
            opacity="0.6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          />
        </motion.g>

        <motion.g
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <motion.rect
            x="40"
            y="110"
            width="40"
            height="6"
            fill="currentColor"
            rx="3"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            style={{ transformOrigin: "40px 113px" }}
          />
          <motion.rect
            x="40"
            y="125"
            width="60"
            height="4"
            fill="currentColor"
            opacity="0.7"
            rx="2"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            style={{ transformOrigin: "40px 127px" }}
          />
          <motion.rect
            x="40"
            y="135"
            width="50"
            height="4"
            fill="currentColor"
            opacity="0.7"
            rx="2"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 1.7 }}
            style={{ transformOrigin: "40px 137px" }}
          />
        </motion.g>

        <motion.g
          initial={{ opacity: 0, rotate: -45, scale: 0 }}
          animate={
            isInView
              ? { opacity: 1, rotate: 0, scale: 1 }
              : { opacity: 0, rotate: -45, scale: 0 }
          }
          transition={{ duration: 1, delay: 1.9 }}
        >
          <rect
            x="130"
            y="110"
            width="30"
            height="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            rx="4"
          />
          <circle cx="145" cy="125" r="8" fill="currentColor" opacity="0.3" />
        </motion.g>

        {/* Connecting lines */}
        <motion.g
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.5"
        >
          <motion.path
            d="M90 85 L90 100 L130 100 L130 110"
            fill="none"
            strokeDashoffset="100"
            animate={
              isInView ? { strokeDashoffset: 0 } : { strokeDashoffset: 100 }
            }
            transition={{ duration: 1.5, delay: 2.2 }}
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
      className={`w-full h-full flex items-center justify-center ${className}`}
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-48 max-h-48"
        role="img"
        aria-labelledby="print-design-title"
      >
        <title id="print-design-title">
          Print Design Services Illustration
        </title>
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.rect
            x="52"
            y="122"
            width="80"
            height="50"
            fill="currentColor"
            opacity="0.2"
            rx="4"
            initial={{ x: 70, y: 140 }}
            animate={isInView ? { x: 52, y: 122 } : { x: 70, y: 140 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
          <motion.rect
            x="54"
            y="118"
            width="80"
            height="50"
            fill="currentColor"
            opacity="0.4"
            rx="4"
            initial={{ x: 67, y: 135 }}
            animate={isInView ? { x: 54, y: 118 } : { x: 67, y: 135 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          />
          <motion.rect
            x="56"
            y="114"
            width="80"
            height="50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            rx="4"
            initial={{ x: 64, y: 130 }}
            animate={isInView ? { x: 56, y: 114 } : { x: 64, y: 130 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          />
        </motion.g>

        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          {/* Logo on card */}
          <circle cx="70" cy="128" r="6" fill="currentColor" opacity="0.6" />
          {/* Text lines */}
          <rect
            x="85"
            y="125"
            width="35"
            height="2"
            fill="currentColor"
            opacity="0.4"
            rx="1"
          />
          <rect
            x="85"
            y="130"
            width="25"
            height="2"
            fill="currentColor"
            opacity="0.4"
            rx="1"
          />
          <rect
            x="85"
            y="135"
            width="30"
            height="2"
            fill="currentColor"
            opacity="0.4"
            rx="1"
          />
        </motion.g>

        {/* Brochure */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <rect
            x="110"
            y="60"
            width="40"
            height="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            rx="2"
          />
          <motion.rect
            x="115"
            y="70"
            width="30"
            height="3"
            fill="currentColor"
            opacity="0.6"
            rx="1"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: 1.7 }}
            style={{ transformOrigin: "115px 71.5px" }}
          />
          <motion.rect
            x="115"
            y="80"
            width="25"
            height="2"
            fill="currentColor"
            opacity="0.4"
            rx="1"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: 1.9 }}
            style={{ transformOrigin: "115px 81px" }}
          />
          <motion.rect
            x="115"
            y="85"
            width="20"
            height="2"
            fill="currentColor"
            opacity="0.4"
            rx="1"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: 2.1 }}
            style={{ transformOrigin: "115px 86px" }}
          />
        </motion.g>

        <motion.g
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <rect
            x="40"
            y="50"
            width="50"
            height="70"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            rx="3"
          />
          <motion.rect
            x="45"
            y="60"
            width="40"
            height="20"
            fill="currentColor"
            opacity="0.3"
            rx="2"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            style={{ transformOrigin: "65px 70px" }}
          />
          <motion.rect
            x="45"
            y="85"
            width="30"
            height="2"
            fill="currentColor"
            opacity="0.5"
            rx="1"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: 2.2 }}
            style={{ transformOrigin: "45px 86px" }}
          />
          <motion.rect
            x="45"
            y="90"
            width="25"
            height="2"
            fill="currentColor"
            opacity="0.5"
            rx="1"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: 2.4 }}
            style={{ transformOrigin: "45px 91px" }}
          />
        </motion.g>

        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: [0, 1, 0] } : { opacity: 0 }}
          transition={{
            duration: 2,
            delay: 2.6,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1,
          }}
        >
          <circle cx="160" cy="90" r="2" fill="currentColor" />
          <circle cx="30" cy="80" r="1.5" fill="currentColor" />
          <rect
            x="158"
            y="130"
            width="4"
            height="4"
            fill="currentColor"
            opacity="0.6"
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
      className={`w-full h-full flex items-center justify-center ${className}`}
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-48 max-h-48"
        role="img"
        aria-labelledby="digital-design-title"
      >
        <title id="digital-design-title">Digital Design Illustration</title>
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <rect
            x="60"
            y="60"
            width="80"
            height="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            rx="4"
          />
          <rect
            x="95"
            y="125"
            width="10"
            height="8"
            fill="currentColor"
            opacity="0.6"
          />
          <rect
            x="85"
            y="135"
            width="30"
            height="4"
            fill="currentColor"
            opacity="0.4"
            rx="2"
          />
        </motion.g>

        {/* Screen content - Website mockup */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {/* Header */}
          <motion.rect
            x="65"
            y="65"
            width="70"
            height="8"
            fill="currentColor"
            opacity="0.3"
            rx="1"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            style={{ transformOrigin: "65px 69px" }}
          />

          {/* Navigation dots */}
          <circle cx="70" cy="69" r="1.5" fill="currentColor" />
          <circle cx="75" cy="69" r="1.5" fill="currentColor" opacity="0.6" />
          <circle cx="80" cy="69" r="1.5" fill="currentColor" opacity="0.6" />

          {/* Content blocks */}
          <motion.rect
            x="70"
            y="80"
            width="25"
            height="15"
            fill="currentColor"
            opacity="0.4"
            rx="2"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          />
          <motion.rect
            x="100"
            y="80"
            width="25"
            height="15"
            fill="currentColor"
            opacity="0.2"
            rx="2"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 1.7 }}
          />

          {/* Text lines */}
          <motion.rect
            x="70"
            y="100"
            width="40"
            height="2"
            fill="currentColor"
            opacity="0.5"
            rx="1"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: 1.9 }}
            style={{ transformOrigin: "70px 101px" }}
          />
          <motion.rect
            x="70"
            y="105"
            width="35"
            height="2"
            fill="currentColor"
            opacity="0.5"
            rx="1"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: 2.1 }}
            style={{ transformOrigin: "70px 106px" }}
          />
        </motion.g>

        {/* Mobile device */}
        <motion.g
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <rect
            x="150"
            y="80"
            width="25"
            height="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            rx="8"
          />
          <circle cx="162.5" cy="85" r="1" fill="currentColor" opacity="0.6" />
          <motion.rect
            x="155"
            y="90"
            width="15"
            height="8"
            fill="currentColor"
            opacity="0.3"
            rx="1"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            style={{ transformOrigin: "162.5px 94px" }}
          />
          <motion.rect
            x="155"
            y="100"
            width="10"
            height="1"
            fill="currentColor"
            opacity="0.4"
            rx="0.5"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4, delay: 2 }}
            style={{ transformOrigin: "155px 100.5px" }}
          />
          <motion.rect
            x="155"
            y="103"
            width="8"
            height="1"
            fill="currentColor"
            opacity="0.4"
            rx="0.5"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4, delay: 2.2 }}
            style={{ transformOrigin: "155px 103.5px" }}
          />
        </motion.g>

        {/* Tablet */}
        <motion.g
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <rect
            x="25"
            y="90"
            width="35"
            height="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            rx="4"
          />
          <motion.rect
            x="30"
            y="95"
            width="25"
            height="8"
            fill="currentColor"
            opacity="0.3"
            rx="1"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          />
          <motion.rect
            x="30"
            y="105"
            width="15"
            height="1"
            fill="currentColor"
            opacity="0.4"
            rx="0.5"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4, delay: 2.3 }}
            style={{ transformOrigin: "30px 105.5px" }}
          />
        </motion.g>

        {/* Connection lines */}
        <motion.g
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.3"
        >
          <motion.path
            d="M140 90 L150 90"
            strokeDashoffset="20"
            animate={
              isInView ? { strokeDashoffset: 0 } : { strokeDashoffset: 20 }
            }
            transition={{ duration: 1, delay: 2.5 }}
          />
          <motion.path
            d="M60 100 L60 102"
            strokeDashoffset="10"
            animate={
              isInView ? { strokeDashoffset: 0 } : { strokeDashoffset: 10 }
            }
            transition={{ duration: 0.8, delay: 2.7 }}
          />
        </motion.g>

        {/* Floating pixels/elements */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: [0, 1, 0] } : { opacity: 0 }}
          transition={{
            duration: 2.5,
            delay: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1.5,
          }}
        >
          <rect x="45" y="70" width="2" height="2" fill="currentColor" />
          <rect x="165" y="125" width="2" height="2" fill="currentColor" />
          <circle cx="180" cy="70" r="1" fill="currentColor" />
          <circle cx="20" cy="120" r="1.5" fill="currentColor" />
        </motion.g>
      </svg>
    </div>
  );
};

// Demo component showing all illustrations
export const GraphicDesignServices = () => {
  const services = [
    {
      id: 1,
      title: "Logo Design",
      description:
        "Creating unique and memorable logos that represent your brand's identity and values. From concept to final design, I craft logos that make lasting impressions.",
      illustration: LogoDesignIllustration,
    },
    {
      id: 2,
      title: "Brand Identity",
      description:
        "Developing comprehensive brand identities including color palettes, typography, and visual guidelines that ensure consistency across all touchpoints.",
      illustration: BrandIdentityIllustration,
    },
    {
      id: 3,
      title: "Print Design",
      description:
        "Designing for print media including business cards, brochures, flyers, and posters. High-quality designs optimized for various printing processes.",
      illustration: PrintDesignIllustration,
    },
    {
      id: 4,
      title: "Digital Design",
      description:
        "Creating digital assets for web and mobile platforms. Responsive designs that work seamlessly across all devices and screen sizes.",
      illustration: DigitalDesignIllustration,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-6xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Graphic Design Services
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IllustrationComponent = service.illustration;

            return (
              <motion.div
                key={service.id}
                className="bg-gray-900 rounded-lg p-8 border border-gray-700 hover:border-gray-600 transition-colors"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="h-64 mb-6">
                  <IllustrationComponent className="text-white" />
                </div>

                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">
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
