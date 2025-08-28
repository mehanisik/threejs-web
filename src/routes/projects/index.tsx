import { createFileRoute, Link } from "@tanstack/react-router";
import { FooterSection } from "@/components/landing/footer-section";
import { NotFound } from "@/components/ui/not-found";
import { PageWrapper } from "@/components/ui/page-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { getProjects } from "@/lib/projects";

export const Route = createFileRoute("/projects/")({
  loader: async () => {
    const { projects } = await getProjects();
    return {
      projects,
    };
  },
  pendingComponent: ProjectsPending,
  component: RouteComponent,
});

function RouteComponent() {
  const { projects } = Route.useLoaderData();
  if (!projects) return <NotFound />;
  return (
    <PageWrapper>
      <div className="w-full p-8">
        <div className="text-left mb-16 pt-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <span aria-hidden>{"\u2190"}</span>
            Back
          </Link>
          <h1 className="text-4xl uppercase md:text-5xl font-bold tracking-tight mb-4">
            My Projects
          </h1>
          <p className="text-2xl md:text-5xl font-light">
            I turn ideas into vision, blending design and
            <br />
            technology into meaningful solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => {
            const coverImage =
              Array.isArray(project.coverImage) &&
              project.coverImage[0]?.image_url
                ? project.coverImage[0].image_url
                : null;

            return (
              <Link
                to={`/projects/$slug`}
                params={{ slug: project.slug! }}
                key={project.slug}
                className="group relative overflow-hidden aspect-[4/3] md:aspect-[3/2] cursor-pointer"
              >
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt={`${project.title} preview`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                )}

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="max-w-md">
                    <h3 className="text-3xl md:text-4xl font-bold mb-3 ">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags?.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm font-medium bg-white/20 text-white rounded-full backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-white/80">
                      <span>{project.city}</span>
                      <span>{new Date(project.date || "").getFullYear()}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            );
          })}
        </div>
      </div>
      <FooterSection />
    </PageWrapper>
  );
}

function ProjectsPending() {
  return (
    <PageWrapper>
      <div className="w-full p-8">
        <div className="text-left mb-16 pt-20">
          <Skeleton className="h-5 w-20 mb-4" />
          <Skeleton className="h-10 w-64 mb-3" />
          <Skeleton className="h-8 w-[28rem] max-w-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {["skel-1", "skel-2", "skel-3", "skel-4", "skel-5", "skel-6"].map(
            (id) => (
              <div
                key={id}
                className="relative overflow-hidden aspect-[4/3] md:aspect-[3/2]"
              >
                <Skeleton className="absolute inset-0 w-full h-full" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <Skeleton className="h-8 w-2/3 mb-3" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
      <FooterSection />
    </PageWrapper>
  );
}
