export const siteConfig = {
  name: "Muhammed Hasturk",
  title: "Muhammed Hasturk - Graphic Designer & UX/UI Specialist",
  description:
    "Creative Graphic Designer and UX/UI Specialist crafting beautiful digital experiences. Specializing in brand identity, user interface design, and visual storytelling.",
  keywords:
    "Graphic Designer, UX Designer, UI Designer, Brand Identity, Visual Design, Digital Design, Creative Portfolio",
  author: "Muhammed Hasturk",
  url: "https://muhammedhasturk.com",

  social: {
    instagram: "https://instagram.com/muhammedhasturk",
    email: "mailto:muhammedmustafahasturk@gmail.com",
    behance: "https://behance.net/muhammedhasturk",
    dribbble: "https://dribbble.com/mamihasturk",
  },

  navigation: {
    home: "Home",
    about: "About",
    services: "Services",
    projects: "Projects",
    contact: "Contact",
  },

  hero: {
    title: "Creative Designer & UX/UI Specialist",
    subtitle:
      "Crafting beautiful digital experiences that connect brands with their audiences",
    description:
      "I'm a passionate graphic designer and UX/UI specialist with over 5 years of experience creating compelling visual identities and intuitive user interfaces.",
    cta: "View My Work",
    ctaSecondary: "Get In Touch",
  },

  about: {
    title: "About Me",
    subtitle: "Passionate about design and user experience",
    description:
      "I'm a creative professional who believes in the power of thoughtful design to solve complex problems. With expertise in graphic design, user experience, and brand identity, I help businesses create meaningful connections with their audiences through beautiful, functional design.",
    skills: [
      "Graphic Design",
      "UX/UI Design",
      "Brand Identity",
      "Visual Design",
      "User Research",
      "Prototyping",
      "Adobe Creative Suite",
      "Figma",
      "Sketch",
      "InVision",
    ],
    experience: "5+ years",
    projects: "50+ completed",
    clients: "30+ satisfied",
  },

  services: {
    title: "Services I Offer",
    subtitle: "Comprehensive design solutions for your brand",
    items: [
      {
        title: "Brand Identity Design",
        description:
          "Complete brand identity packages including logos, color palettes, typography, and brand guidelines.",
        icon: "🎨",
      },
      {
        title: "UX/UI Design",
        description:
          "User-centered design solutions for web and mobile applications with focus on usability and aesthetics.",
        icon: "📱",
      },
      {
        title: "Print Design",
        description:
          "Business cards, brochures, posters, and other print materials that make lasting impressions.",
        icon: "📄",
      },
      {
        title: "Digital Marketing Assets",
        description:
          "Social media graphics, email templates, and digital marketing materials that drive engagement.",
        icon: "📈",
      },
      {
        title: "Web Design",
        description:
          "Beautiful, responsive websites that convert visitors into customers with intuitive navigation.",
        icon: "🌐",
      },
      {
        title: "Design Consultation",
        description:
          "Strategic design advice to help your business communicate effectively with your target audience.",
        icon: "💡",
      },
    ],
  },

  projects: {
    title: "Featured Projects",
    subtitle: "A selection of my recent work",
    description:
      "Each project represents a unique challenge and creative solution. From brand identity to complete UX/UI redesigns, I've helped businesses of all sizes achieve their design goals.",
    viewAll: "View All Projects",
    categories: [
      "All",
      "Brand Identity",
      "UX/UI Design",
      "Print Design",
      "Web Design",
      "Digital Marketing",
    ],
  },

  contact: {
    title: "Let's Work Together",
    subtitle: "Ready to bring your vision to life?",
    description:
      "I'm always excited to take on new projects and collaborate with passionate businesses. Whether you need a complete brand overhaul or just some design consultation, I'm here to help.",
    email: "muhammedmustafahasturk@gmail.com",
    location: "Istanbul, Turkey",
    availability: "Available for freelance projects",
    responseTime: "Usually responds within 24 hours",
  },

  footer: {
    description:
      "Creating meaningful design experiences that connect brands with their audiences.",
    copyright: "© 2024 Muhammed Hasturk. All rights reserved.",
    madeWith: "Made with ❤️ in Istanbul",
    links: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      sitemap: "Sitemap",
    },
  },

  seo: {
    defaultTitle: "Muhammed Hasturk - Graphic Designer & UX/UI Specialist",
    defaultDescription:
      "Creative Graphic Designer and UX/UI Specialist crafting beautiful digital experiences. Specializing in brand identity, user interface design, and visual storytelling.",
    defaultKeywords:
      "Graphic Designer, UX Designer, UI Designer, Brand Identity, Visual Design, Digital Design, Creative Portfolio",
    defaultImage: "/og-image.jpg",
    twitterHandle: "@muhammedhasturk",
  },

  performance: {
    preloadFonts: [
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
    ],
    preconnectDomains: [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
      "https://api.github.com",
    ],
  },
} as const;
