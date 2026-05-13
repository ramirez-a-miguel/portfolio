import { getPortfolioDataSync } from "@/lib/portfolio-data";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  category?: "professional" | "personal";
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  logo?: string;
  image?: string;
  images: string[];
  tag?: string | string[];
  team: Team[];
  link?: string;
  demoUrl?: string;
  demoEmbedUrl?: string;
  repositoryUrl?: string;
  techStack?: string[];
};

export function getProjectEntries() {
  return getPortfolioDataSync()
    .projects.filter((project) => project.slug && project.title)
    .map((project) => ({
      metadata: {
        category: project.category ?? "professional",
        title: project.title,
        subtitle: "",
        publishedAt: project.publishedAt,
        summary: project.summary,
        logo: project.logo || "",
        image: project.images[0] || "",
        images: project.images,
        tag: "",
        team: project.team,
        link: project.link,
        demoUrl: project.demoUrl,
        demoEmbedUrl: project.demoEmbedUrl,
        repositoryUrl: project.repositoryUrl,
        techStack: project.techStack,
      } satisfies Metadata,
      slug: project.slug,
      content: project.content,
    }));
}
