import { useParams } from "wouter";
import { ProjectDashboard } from "@/components/project/project-dashboard";
import { PageSEO } from "@/components/seo/page-seo";

export const ProjectPage = () => {
  const { id } = useParams();

  return (
    <>
      <PageSEO
        title={`Project ${id} - Mami Hasturk Portfolio`}
        description={`View details and information about project ${id} in Mami Hasturk's portfolio. Explore the technologies used, features implemented, and development process.`}
        keywords={`Project ${id}, Portfolio, Web Development, React, Three.js, ${id}`}
        type="article"
        url={`/projects/${id}`}
        section="Portfolio"
        tags={["Web Development", "Portfolio", "Project"]}
      />
      <ProjectDashboard />
    </>
  );
};
