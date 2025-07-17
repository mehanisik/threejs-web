import { Helmet } from "react-helmet-async";
import { AboutSection } from "~/components/landing/about-section";
import { FooterSection } from "~/components/landing/footer-section";
import { LandingSection } from "~/components/landing/landing-section";
import { PreviewSection } from "~/components/landing/preview-section";
import { ProjectsSection } from "~/components/landing/projects-section";
import { ServicesSection } from "~/components/landing/services-section";
import { ThemeSwitcher } from "~/components/layout/theme-switcher";
import siteConfig from "~/config";
import { AudioProvider } from "../components/layout/audio-context";

export function HomePage() {
  return (
    <AudioProvider>
      <Helmet>
        <title>Home | {siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        <meta name="keywords" content={siteConfig.keywords.join(", ")} />
      </Helmet>
      <main className="flex flex-col gap-8 bg-background text-foreground">
        <LandingSection />
        <AboutSection />
        <ServicesSection />
        <PreviewSection />
        <ProjectsSection />
        <FooterSection />
        <ThemeSwitcher />
      </main>
    </AudioProvider>
  );
}
