import { useParams } from "wouter";
import { ProjectDashboard } from "@/components/project/project-dashboard";
import { PageSEO } from "@/components/seo/page-seo";

export const ProjectPage = () => {
  const { id } = useParams();

  return (
    <>
      <PageSEO
        title={`Project ${id} - Muhammed Hasturk Portfolio`}
        description={`View details and information about project ${id} in Muhammed Hasturk's portfolio. Explore the design process, technologies used, and creative solutions implemented.`}
        keywords={`Project ${id}, Portfolio, Graphic Design, UX/UI, Branding, ${id}`}
        type="article"
        url={`/projects/${id}`}
        section="Portfolio"
        tags={["Graphic Design", "Portfolio", "Project", "UX/UI"]}
      />
      <ProjectDashboard />
    </>
  );
};
