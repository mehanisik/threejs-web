import { Link, useParams } from "wouter";
import { projects } from "../constants/projects";
import { previewImages } from "../constants/preview-images";

export function ProjectPage() {
  const params = useParams();
  const project = projects.find(
    (p) => p.number === params.id || p.url.split("/").pop() === params.id,
  );

  if (!project) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="bg-red-100 text-red-800 p-6 rounded-lg font-mono uppercase">
          Project Not Found
        </div>
        <Link href="/" className="mt-8">
          Back to Projects
        </Link>
      </main>
    );
  }

  return (
    <main className="w-full bg-background text-foreground font-mono flex flex-col md:flex-row ">
      <aside className="w-1/2 h-screen flex flex-col justify-between px-12 py-10 bg-background border-r border-border">
        <div>
          <div className="flex justify-between items-start">
            <h1 className="text-6xl font-black tracking-tight leading-none uppercase">
              {project.title}
            </h1>
            <a
              href="/"
              className="text-xs uppercase tracking-widest opacity-70 hover:underline"
            >
              [close]
            </a>
          </div>
          <p className="mt-10 text-base leading-relaxed tracking-wide uppercase whitespace-pre-line">
            {project.description} + Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Reprehenderit officia, natus rem quae quasi ipsum
            similique incidunt non delectus illum dicta repellat illo vero eum
            aliquam at dolorum quos enim nam ipsam temporibus ab blanditiis
            asperiores explicabo? Quidem nam incidunt consectetur dolores
            corrupti eum vel totam, minus odio? Aliquam laborum commodi
            deserunt. Fugit repellat dignissimos doloribus quidem error
            asperiores accusamus cumque odio repudiandae iste quas eius placeat
            laboriosam illum autem, deleniti est, necessitatibus nesciunt,
            voluptate nihil quos ullam dolor consequuntur? Quasi ad cumque
            obcaecati a temporibus inventore perferendis aliquid itaque ex enim
            necessitatibus facere nemo cum labore aperiam molestias architecto,
            incidunt harum adipisci non soluta illo! Deserunt labore
            necessitatibus ea perferendis a magnam exercitationem suscipit
            dolore ipsum mollitia quas vel adipisci facilis voluptatibus
            officiis ratione, quos modi numquam totam enim? Voluptate animi
            porro neque deserunt sed nam accusantium earum in ipsum, ipsam
            quisquam rem deleniti aperiam ullam placeat eligendi pariatur?
          </p>
        </div>
        <div className="flex flex-col gap-8 mt-12 text-xs">
          <div className="flex flex-row justify-between">
            <div>
              <div className="mb-2">Role</div>
              <div className="uppercase">
                Art Direction
                <br />
                Web Design
                <br />
                Motion Design (UI Animation)
              </div>
            </div>
            <div className="text-right">
              <div className="mb-2">Year</div>
              <div>2024</div>
              <Link
                href={project.url}
                className="block mt-4 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                [Visit Live]
              </Link>
            </div>
          </div>
          <div>
            <div className="mb-2">Tools</div>
            <div className="uppercase">
              Figma
              <br />
              After Effects
              <br />
              Photoshop
            </div>
          </div>
          <div className="flex flex-row justify-between mt-8">
            <Link
              href={`/projects/${project?.number ? Number.parseInt(project.number, 10) - 1 : 1}`}
              className="underline"
            >
              [Prev]
            </Link>
            <Link
              href={`/projects/${project?.number ? Number.parseInt(project.number, 10) + 1 : 1}`}
              className="underline"
            >
              [Next]
            </Link>
          </div>
        </div>
      </aside>
      <div className="w-1/2 h-screen border  overflow-y-auto flex flex-col gap-4 items-center py-8 px-4">
        {previewImages.slice(0, 6).map((img) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className="w-full h-[60vh] object-cover"
          />
        ))}
      </div>
    </main>
  );
}
