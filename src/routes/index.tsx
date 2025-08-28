import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/landing/about-section";
import { FooterSection } from "@/components/landing/footer-section";
import { LandingSection } from "@/components/landing/landing-section";
import { PreviewSection } from "@/components/landing/preview-section";
import { ProjectsSection } from "@/components/landing/projects-section";
import { ServicesSection } from "@/components/landing/services-section";
import { Navbar } from "@/components/layout/navbar";
import { PageWrapper } from "@/components/ui/page-wrapper";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <PageWrapper>
      <Navbar />
      <LandingSection />
      <AboutSection />
      <ServicesSection />
      <PreviewSection />
      <ProjectsSection />
      <FooterSection />
    </PageWrapper>
  );
}
