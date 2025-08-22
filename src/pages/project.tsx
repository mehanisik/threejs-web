import { motion, type Variants } from "framer-motion";
import { useParams } from "wouter";
import { ProjectDashboard } from "@/components/project/project-dashboard";
import { PageSEO } from "@/components/seo/page-seo";

const pageVariants: Variants = {
  initial: { y: "100%", opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 1.2, // slower
      ease: [0.22, 1, 0.36, 1], // smooth "easeOutExpo"-like curve
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1], // fast exit, no lag
    },
  },
};

export const ProjectPage = () => {
  const { slug } = useParams();

  return (
    <motion.div
      key={slug}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="w-full min-h-screen fixed inset-0 z-50 bg-background"
    >
      <PageSEO
        title={`Project ${slug} - Muhammed Hasturk Portfolio`}
        description={`View details and information about project ${slug} in Muhammed Hasturk's portfolio. Explore the design process, technologies used, and creative solutions implemented.`}
        keywords={`Project ${slug}, Portfolio, Graphic Design, UX/UI, Branding, ${slug}`}
        type="article"
        url={`/projects/${slug}`}
        section="Portfolio"
        tags={["Graphic Design", "Portfolio", "Project", "UX/UI"]}
      />
      <ProjectDashboard />
    </motion.div>
  );
};
