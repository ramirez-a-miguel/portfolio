import { Projects } from "@/components/work/Projects";
import { getPortfolioDataSync } from "@/lib/portfolio-data";
import { baseURL } from "@/resources";
import { Column, Meta, Schema } from "@once-ui-system/core";
import { AboutClient } from "./AboutClient";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const { about } = getPortfolioDataSync();

  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const { about, person, social, work } = getPortfolioDataSync();

  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <AboutClient
        about={about}
        person={person}
        social={social}
        workPath={work.path}
        professionalProjects={<Projects category="professional" range={[1, 2]} />}
        personalProjects={<Projects category="personal" />}
      />
    </Column>
  );
}
