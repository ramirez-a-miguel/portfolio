import { baseURL } from "@/resources";
import { Meta } from "@once-ui-system/core";
import { AdminPortfolioEditor } from "./AdminPortfolioEditor";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return Meta.generate({
    title: "Portfolio Admin",
    description: "Authenticated portfolio content editor",
    baseURL: baseURL,
    path: "/admin",
  });
}

export default function AdminPage() {
  return <AdminPortfolioEditor />;
}
