import siteConfig from "~/config";
import { Badge } from "../ui/badge";
import { SectionBadge, SectionTitle } from "../ui/typography";

export function AboutSection() {
  return (
    <div className="relativew-full">
      <div className="w-full pt-8 pb-4 px-2">
        <SectionTitle>About Me</SectionTitle>
      </div>

      <main className="px-4 sm:px-6 md:px-12 w-full">
        <div className="w-full">
          <div className="w-full border-y py-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between w-full gap-12">
              <div className="flex flex-col justify-center w-full lg:w-1/2 px-4 lg:px-8">
                <SectionBadge>About</SectionBadge>
                <p className="text-3xl md:text-5xl font-semibold leading-tight mb-8 text-left mt-4">
                  {siteConfig.about.bio}
                </p>
              </div>
              <div className="flex flex-col items-end justify-center w-full lg:w-1/2 px-4 lg:px-8">
                <div className="w-48 h-60 max-w-full border-2 border-foreground overflow-hidden mb-4 bg-muted flex items-center justify-center">
                  <img
                    src="/person.webp"
                    alt="Portrait of designer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-bold text-lg md:text-xl mb-1">
                  {siteConfig.about.name}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full border-b py-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between w-full gap-12">
              <div className="flex flex-col justify-center w-full lg:w-1/2 px-4 lg:px-8">
                <SectionBadge>Mission</SectionBadge>
                <h3 className="text-2xl md:text-4xl font-semibold leading-tight mb-8 text-left mt-4">
                  {siteConfig.about.mission}
                </h3>
                <p className="text-base md:text-lg leading-relaxed font-light text-foreground max-w-2xl text-left mb-6">
                  {siteConfig.about.missionDescription}
                </p>
                <div className="flex flex-wrap gap-3">
                  {siteConfig.about.tools.map((tool) => (
                    <Badge
                      variant="outline"
                      className="border-foreground"
                      key={tool}
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end justify-center w-full lg:w-1/2 px-4 lg:px-8">
                <div className="w-48 h-60 max-w-full border-2 border-foreground overflow-hidden mb-4 bg-muted flex items-center justify-center">
                  <img
                    src="/2.jpg"
                    alt="Portrait of designer thinking"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
