import { getPortfolioDataSync } from "@/lib/portfolio-data";
import type { PortfolioProject, PortfolioProjectTeamMember } from "@/types/portfolio-data";

export type ProjectCategory = NonNullable<PortfolioProject["category"]>;
export type ProjectRange = [number, number?];

export type ProjectMetadata = {
  category: ProjectCategory;
  title: string;
  subtitle: string;
  publishedAt: string;
  summary: string;
  logo: string;
  image: string;
  images: string[];
  tag: string | string[];
  team: PortfolioProjectTeamMember[];
  link: string;
  demoUrl: string;
  demoEmbedUrl: string;
  repositoryUrl: string;
  techStack: string[];
};

export type ProjectEntry = {
  metadata: ProjectMetadata;
  slug: string;
  content: string;
};

export type ProjectQuery = {
  range?: ProjectRange;
  exclude?: string[];
  category?: ProjectCategory;
};

const DEFAULT_PROJECT_IMAGE = "/images/projects-banner.jpg";

export function getSlugPath(slug: string | string[] | undefined): string {
  return Array.isArray(slug) ? slug.join("/") : slug || "";
}

export function normalizePublicImagePath(src = ""): string {
  return src.startsWith("/public/") ? src.replace("/public", "") : src;
}

export function getProjectLogo(logo?: string, image?: string): string {
  return normalizePublicImagePath(logo || image || DEFAULT_PROJECT_IMAGE);
}

export function getProjectYear(project: ProjectEntry): number {
  return new Date(project.metadata.publishedAt).getFullYear();
}

export function getProjectAvatars(project: ProjectEntry): Array<{ src: string }> {
  return project.metadata.team.map((member) => ({ src: member.avatar }));
}

export function getProjectEntries(): ProjectEntry[] {
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
      },
      slug: project.slug,
      content: project.content,
    }));
}

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return getProjectEntries().find((project) => project.slug === slug);
}

export function sortProjectEntries(projects: ProjectEntry[]): ProjectEntry[] {
  return [...projects].sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
  );
}

export function selectProjectEntries(query: ProjectQuery = {}): ProjectEntry[] {
  const { range, exclude, category } = query;
  let projects = getProjectEntries();

  if (exclude && exclude.length > 0) {
    projects = projects.filter((project) => !exclude.includes(project.slug));
  }

  if (category) {
    projects = projects.filter((project) => project.metadata.category === category);
  }

  const sortedProjects = sortProjectEntries(projects);

  return range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;
}
