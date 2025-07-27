import { siteConfig } from "./site-config";

export type SocialLink = {
  name: string;
  url: string;
};

export const socialLinks: SocialLink[] = [
  { name: "Instagram", url: siteConfig.social.instagram },
  { name: "Behance", url: siteConfig.social.behance },
  { name: "Dribbble", url: siteConfig.social.dribbble },
  { name: "Email", url: siteConfig.social.email },
];
