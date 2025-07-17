import { ArrowUpRight } from "lucide-react";
import siteConfig from "~/config";
import { socialLinks } from "~/constants/social-links";
import { FooterForm } from "../form/footer-form";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { SectionTitle } from "../ui/typography";

export function FooterSection() {
  return (
    <footer className="w-full border-t border-border min-h-screen  flex flex-col lg:flex-row items-stretch justify-between relative py-8 lg:py-0">
      <div className="flex-1 flex flex-col justify-between px-6 lg:px-12 pt-8 lg:pt-16 pb-8">
        <div>
          <SectionTitle>{siteConfig.footer.callToAction}</SectionTitle>
        </div>
        <div className="my-8">
          <svg
            width="97"
            height="98"
            fill="currentColor"
            className="animate-spin text-foreground"
            style={{ animationDuration: "4s" }}
          >
            <title>Spinning Logo</title>
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M8 64.742a8 8 0 0 1-8-8V41a8 8 0 0 1 8-8h17.43a7.099 7.099 0 0 0 7.1-7.099V8a8 8 0 0 1 8-8H56.27a8 8 0 0 1 8 8v18.744A6.256 6.256 0 0 0 70.527 33H88.01a8 8 0 0 1 8 8v15.742a8 8 0 0 1-8 8h-19.61a4.13 4.13 0 0 0-4.13 4.129v20.398a8 8 0 0 1-8 8H40.53a8 8 0 0 1-8-8V69.713a4.972 4.972 0 0 0-4.972-4.971H8Zm56.27-29.869a3.132 3.132 0 0 0-3.132-3.131h-25.76a3.636 3.636 0 0 0-3.636 3.636V60.57a4.957 4.957 0 0 0 4.957 4.957h23.118a4.453 4.453 0 0 0 4.452-4.453V34.873Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="space-y-6">
          <Badge
            variant="outline"
            className="text-sm text-foreground bg-transparent border-border px-2 py-1"
          >
            Let's connect
          </Badge>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-foreground underline  transition-colors ml-1 block"
          >
            {siteConfig.contact.email}
          </a>
          <div className="flex flex-wrap gap-6 text-base mt-2">
            {socialLinks.map((link) => (
              <Button
                key={link.name}
                asChild
                variant="link"
                className="flex items-center gap-2 text-foreground  border border-foreground transition-colors group px-2 py-1 h-auto"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  {link.name}
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200"
                  />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 lg:px-12 py-8 lg:py-16">
        <Card className="w-full max-w-2xl h-full border-none shadow-none">
          <FooterForm />
        </Card>
      </div>
    </footer>
  );
}
