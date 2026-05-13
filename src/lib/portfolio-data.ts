import fs from "node:fs";
import path from "node:path";
import defaultPortfolioData from "@/data/portfolio.json";
import type { PortfolioData, PortfolioProject } from "@/types/portfolio-data";

const CONTENT_PATH = path.join(process.cwd(), "src", "data", "portfolio.json");

function cloneDefaultData(): PortfolioData {
  return JSON.parse(JSON.stringify(defaultPortfolioData)) as PortfolioData;
}

function cleanStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeProject(project: PortfolioProject): PortfolioProject {
  return {
    ...project,
    slug: project.slug.trim(),
    images: cleanStringArray(project.images),
    techStack: cleanStringArray(project.techStack),
    team: Array.isArray(project.team) ? project.team : [],
  };
}

export function getPortfolioDataSync(): PortfolioData {
  try {
    const file = fs.readFileSync(CONTENT_PATH, "utf-8");
    return JSON.parse(file) as PortfolioData;
  } catch (error) {
    console.warn("Falling back to bundled portfolio data:", error);
    return cloneDefaultData();
  }
}

export async function getPortfolioData(): Promise<PortfolioData> {
  return getPortfolioDataSync();
}

export async function savePortfolioData(data: PortfolioData): Promise<PortfolioData> {
  if (!data?.person?.name || !data?.home?.headline) {
    throw new Error("Portfolio data is missing required profile or homepage fields.");
  }

  const normalized: PortfolioData = {
    ...data,
    person: {
      ...data.person,
      languages: cleanStringArray(data.person.languages),
    },
    projects: data.projects.map(normalizeProject).filter((project) => project.slug),
  };

  await fs.promises.mkdir(path.dirname(CONTENT_PATH), { recursive: true });
  await fs.promises.writeFile(CONTENT_PATH, `${JSON.stringify(normalized, null, 2)}\n`, "utf-8");

  return normalized;
}
