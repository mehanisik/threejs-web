export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export const services: Service[] = [
  {
    id: "01",
    title: "App & Web Design",
    description:
      "Creating sleek, user-centered designs for mobile apps and responsive websites. I focus on usability, clarity, and a visual style that aligns with your brand goals.",
    image: "/product-design-2.webp",
  },
  {
    id: "02",
    title: "Web & UI/UX Design",
    description:
      "Designing modern, accessible, and engaging interfaces for websites and digital products — with an emphasis on seamless user flows and intuitive navigation.",
    image: "/product-design-3.webp",
  },
  {
    id: "03",
    title: "Branding",
    description:
      "Building visual systems that define your brand’s personality — from foundational design elements to consistent application across print and digital platforms.",
    image: "/product-design-4.webp",
  },
  {
    id: "04",
    title: "Logo Design",
    description:
      "Creating distinctive, scalable logos that communicate your brand’s essence — crafted with balance, simplicity, and lasting impact in mind.",
    image: "/product-design-5.webp",
  },
];
