import { AboutSection } from "@/components/landing/about-section";
import { FooterSection } from "@/components/landing/footer-section";
import { LandingSection } from "@/components/landing/landing-section";
import { PreviewSection } from "@/components/landing/preview-section";
import { ProjectsSection } from "@/components/landing/projects-section";
import { ServicesSection } from "@/components/landing/services-section";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { PageWrapper } from "@/components/ui/page-wrapper";

export function HomePage() {
  return (
    <>
      <title>Home | Mami</title>
      <meta name="description" content={`Personal website of Mami`} />
      <meta name="keywords" content={"Design,Development"} />
      <PageWrapper>
        <LandingSection />
        <AboutSection />
        <ServicesSection />
        <PreviewSection />
        <ProjectsSection />
        <FooterSection />
        <ThemeSwitcher />
      </PageWrapper>
    </>
  );
}
