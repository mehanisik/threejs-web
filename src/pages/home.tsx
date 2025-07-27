import { AboutSection } from "@/components/landing/about-section";
import { FooterSection } from "@/components/landing/footer-section";
import { LandingSection } from "@/components/landing/landing-section";
import { PreviewSection } from "@/components/landing/preview-section";
import { ProjectsSection } from "@/components/landing/projects-section";
import { ServicesSection } from "@/components/landing/services-section";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { PageSEO } from "@/components/seo/page-seo";
import { PageWrapper } from "@/components/ui/page-wrapper";
import { siteConfig } from "@/constants/site-config";

export function HomePage() {
  return (
    <>
      <PageSEO
        title={siteConfig.seo.defaultTitle}
        description={siteConfig.seo.defaultDescription}
        keywords={siteConfig.seo.defaultKeywords}
        type="website"
        url="/"
      />
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
