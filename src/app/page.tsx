import { Projects } from "@/components/work/Projects";
import { getPortfolioDataSync } from "@/lib/portfolio-data";
import { baseURL } from "@/resources";
import { Column, Meta, Schema } from "@once-ui-system/core";
import { HomeClient } from "./HomeClient";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const { home } = getPortfolioDataSync();

  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  const { home, about, person, projects } = getPortfolioDataSync();
  const projectCount = projects.length;

  return (
    <Column maxWidth="l" fillWidth gap="40" paddingY="24" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <HomeClient
        home={home}
        about={about}
        person={person}
        projectCount={projectCount}
        professionalProjects={<Projects category="professional" variant="bento" />}
        personalProjects={<Projects category="personal" variant="bento" />}
      />
    </Column>
  );
}
