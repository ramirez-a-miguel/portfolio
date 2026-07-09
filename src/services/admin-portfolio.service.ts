import type { PortfolioData, PortfolioProject } from "@/types/portfolio-data";

export type SaveState = "idle" | "saving" | "saved" | "error";

export function createEmptyProject(sequence?: number): PortfolioProject {
  return {
    category: "professional",
    slug: sequence ? `project-${sequence}` : "new-project",
    title: "New Project",
    publishedAt: new Date().toISOString().slice(0, 10),
    summary: "",
    content: "## Overview\n\nDescribe the project here.",
    logo: "",
    images: [],
    link: "",
    demoUrl: "",
    demoEmbedUrl: "",
    repositoryUrl: "",
    techStack: [],
    team: [],
  };
}

export function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function csvToArray(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function formatPortfolioDraft(content: PortfolioData): string {
  return JSON.stringify(content, null, 2);
}

export function parsePortfolioDraft(jsonDraft: string): PortfolioData {
  return JSON.parse(jsonDraft) as PortfolioData;
}

export async function hasAdminSession(): Promise<boolean> {
  const response = await fetch("/api/admin/session");
  return response.ok;
}

export async function loadPortfolioContent(): Promise<PortfolioData> {
  const response = await fetch("/api/admin/content");

  if (!response.ok) {
    throw new Error("Unable to load portfolio content.");
  }

  return (await response.json()) as PortfolioData;
}

export async function loginAdmin(username: string, password: string): Promise<void> {
  const response = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed. Check ADMIN_USERNAME and ADMIN_PASSWORD.");
  }
}

export async function logoutAdmin(): Promise<void> {
  await fetch("/api/admin/logout", { method: "POST" });
}

export async function savePortfolioContent(content: PortfolioData): Promise<PortfolioData> {
  const response = await fetch("/api/admin/content", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unable to save content." }));
    throw new Error(error.message);
  }

  return (await response.json()) as PortfolioData;
}
