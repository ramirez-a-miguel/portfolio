import { CustomMDX, ScrollToHash } from "@/components";
import { Projects } from "@/components/work/Projects";
import { getPortfolioDataSync } from "@/lib/portfolio-data";
import { baseURL } from "@/resources";
import {
  getProjectAvatars,
  getProjectBySlug,
  getProjectEntries,
  getSlugPath,
} from "@/services/project.service";
import { formatDate } from "@/utils/formatDate";
import {
  AvatarGroup,
  Column,
  Heading,
  Line,
  Media,
  Meta,
  Row,
  Schema,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const projects = getProjectEntries();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = getSlugPath(routeParams.slug);
  const project = getProjectBySlug(slugPath);
  const { work } = getPortfolioDataSync();

  if (!project) return {};

  return Meta.generate({
    title: project.metadata.title,
    description: project.metadata.summary,
    baseURL: baseURL,
    image: project.metadata.image || `/api/og/generate?title=${project.metadata.title}`,
    path: `${work.path}/${project.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = getSlugPath(routeParams.slug);
  const project = getProjectBySlug(slugPath);
  const { about, person, work } = getPortfolioDataSync();

  if (!project) {
    notFound();
  }

  const avatars = getProjectAvatars(project);

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="article"
        baseURL={baseURL}
        path={`${work.path}/${project.slug}`}
        title={project.metadata.title}
        description={project.metadata.summary}
        datePublished={project.metadata.publishedAt}
        dateModified={project.metadata.publishedAt}
        image={
          project.metadata.image ||
          `/api/og/generate?title=${encodeURIComponent(project.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/work">
          <Text variant="label-strong-m">Projects</Text>
        </SmartLink>
        <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
          {project.metadata.publishedAt && formatDate(project.metadata.publishedAt)}
        </Text>
        <Heading variant="display-strong-m">{project.metadata.title}</Heading>
      </Column>
      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          {project.metadata.team && <AvatarGroup reverse avatars={avatars} size="s" />}
          <Text variant="label-default-m" onBackground="brand-weak">
            {project.metadata.team?.map((member, idx) => (
              <span key={idx}>
                {idx > 0 && (
                  <Text as="span" onBackground="neutral-weak">
                    ,{" "}
                  </Text>
                )}
                <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
              </span>
            ))}
          </Text>
        </Row>
      </Row>
      {project.metadata.images.length > 0 && (
        <Media
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt="image"
          src={project.metadata.images[0]}
        />
      )}
      {project.metadata.techStack && project.metadata.techStack.length > 0 && (
        <Column maxWidth="xs" fillWidth gap="16">
          <Heading as="h2" variant="heading-strong-l">
            Tech stack
          </Heading>
          <Row wrap gap="8">
            {project.metadata.techStack.map((technology) => (
              <Tag key={technology} size="l">
                {technology}
              </Tag>
            ))}
          </Row>
        </Column>
      )}
      {(project.metadata.demoEmbedUrl || project.metadata.demoUrl) && (
        <Column maxWidth="m" fillWidth gap="16">
          <Column maxWidth="xs" gap="8">
            <Heading as="h2" variant="heading-strong-l">
              Live demo
            </Heading>
            {project.metadata.demoUrl && (
              <SmartLink href={project.metadata.demoUrl} suffixIcon="arrowUpRightFromSquare">
                <Text variant="body-default-s">Open Vercel demo</Text>
              </SmartLink>
            )}
          </Column>
          {project.metadata.demoEmbedUrl && (
            <Row
              overflow="hidden"
              radius="m"
              border="neutral-alpha-weak"
              background="surface"
              style={{ aspectRatio: "16 / 9" }}
            >
              <iframe
                title={`${project.metadata.title} demo`}
                src={project.metadata.demoEmbedUrl}
                loading="lazy"
                style={{ border: "0", width: "100%", height: "100%" }}
              />
            </Row>
          )}
        </Column>
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={project.content} />
      </Column>
      {project.metadata.repositoryUrl && (
        <SmartLink href={project.metadata.repositoryUrl} suffixIcon="github">
          <Text variant="body-default-s">View repository</Text>
        </SmartLink>
      )}
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          Related projects
        </Heading>
        <Projects exclude={[project.slug]} range={[2]} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
