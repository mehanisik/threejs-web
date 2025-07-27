import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/constants/site-config";

interface PageSEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  structuredData?: Record<string, unknown>;
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
}

export const PageSEO = ({
  title,
  description,
  keywords,
  image = siteConfig.seo.defaultImage,
  url,
  type = "website",
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
  structuredData,
  noindex = false,
  nofollow = false,
  canonical,
}: PageSEOProps) => {
  const siteUrl = siteConfig.url;
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteUrl,
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.behance,
      siteConfig.social.dribbble,
    ],
    jobTitle: "Graphic Designer & UX/UI Specialist",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    description: siteConfig.description,
    image: fullImageUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Istanbul",
      addressCountry: "TR",
    },
    email: siteConfig.social.email.replace("mailto:", ""),
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author || siteConfig.author} />

      <meta
        name="robots"
        content={`${noindex ? "noindex" : "index"}, ${nofollow ? "nofollow" : "follow"}`}
      />

      <link rel="canonical" href={canonical || fullUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={`${siteConfig.name} Portfolio`} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content={siteConfig.seo.twitterHandle} />

      {type === "article" && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteConfig.name} />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://api.github.com" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
    </Helmet>
  );
};
