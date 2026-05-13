import { Projects } from "@/components/work/Projects";
import { getPortfolioDataSync } from "@/lib/portfolio-data";
import { baseURL } from "@/resources";
import { Column, Heading, Line, Media, Meta, Schema, Text } from "@once-ui-system/core";

export const dynamic = "force-dynamic";

const projectsBanner = "/images/projects-banner.jpg";

export async function generateMetadata() {
  const { work } = getPortfolioDataSync();

  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: projectsBanner,
    path: work.path,
  });
}

export default function Work() {
  const { about, person, work } = getPortfolioDataSync();

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={projectsBanner}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
      <Column fillWidth gap="16" marginBottom="40" paddingX="l">
        <Media
          priority
          aspectRatio="5 / 2"
          radius="m"
          sizes="(max-width: 960px) 100vw, 960px"
          alt="Cloud infrastructure, AI, data platform, and security project banner"
          src={projectsBanner}
        />
        <Text align="center" variant="body-default-m" onBackground="neutral-weak">
          Cloud architecture, secure platforms, data services, and modernization projects.
        </Text>
      </Column>
      <Column fillWidth gap="16" marginBottom="40">
        <Column gap="8" paddingX="l">
          <Heading as="h2" variant="heading-strong-xl">
            Professional projects
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Client-facing architecture, cloud, data, and modernization work.
          </Text>
        </Column>
        <Projects category="professional" />
      </Column>
      <Column fillWidth gap="16" marginBottom="40">
        <Line marginX="l" />
        <Column gap="8" paddingX="l">
          <Heading as="h2" variant="heading-strong-xl">
            Personal projects
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Independent builds, experiments, and products I maintain outside client work.
          </Text>
        </Column>
        <Projects category="personal" />
      </Column>
    </Column>
  );
}
