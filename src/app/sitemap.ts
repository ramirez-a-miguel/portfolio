import { baseURL, routes as routesConfig } from "@/resources";
import { getProjectEntries } from "@/utils/utils";

export default async function sitemap() {
  const workRoutes = getProjectEntries().map((project) => ({
    url: `${baseURL}/work/${project.slug}`,
    lastModified: project.metadata.publishedAt,
  }));

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...workRoutes];
}
