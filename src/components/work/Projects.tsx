import { ProjectCard, T } from "@/components";
import { getProjectEntries } from "@/utils/utils";
import { Column, Flex, Heading, Row, Tag, Text } from "@once-ui-system/core";
import Image from "next/image";
import Link from "next/link";
import styles from "./Projects.module.scss";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  category?: "professional" | "personal";
  variant?: "list" | "bento";
}

function normalizePublicImagePath(src: string) {
  return src.startsWith("/public/") ? src.replace("/public", "") : src;
}

function getProjectLogo(logo?: string, image?: string) {
  return normalizePublicImagePath(logo || image || "/images/projects-banner.jpg");
}

export function Projects({ range, exclude, category, variant = "list" }: ProjectsProps) {
  let allProjects = getProjectEntries();

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  if (category) {
    allProjects = allProjects.filter((post) => post.metadata.category === category);
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  if (variant === "bento") {
    return (
      <div className={styles.bentoGrid}>
        {displayedProjects.map((post, index) => {
          const image = post.metadata.images[0]
            ? normalizePublicImagePath(post.metadata.images[0])
            : "";
          const logo = getProjectLogo(post.metadata.logo, image);
          const hasProjectLogo = Boolean(post.metadata.logo);
          const featured = index === 0;

          return (
            <Link
              key={post.slug}
              href={`/work/${post.slug}`}
              className={`${styles.bentoCard} ${featured ? styles.featuredCard : ""}`}
            >
              <div className={styles.bentoLogo}>
                <img
                  src={logo}
                  alt=""
                  aria-hidden="true"
                  className={hasProjectLogo ? styles.logoContain : styles.logoCover}
                />
              </div>
              {image && (
                <div className={styles.bentoMedia}>
                  <Image
                    priority={index < 2}
                    src={image}
                    alt={post.metadata.title}
                    fill
                    sizes={
                      featured
                        ? "(max-width: 960px) 100vw, 620px"
                        : "(max-width: 960px) 100vw, 360px"
                    }
                  />
                </div>
              )}
              <Flex direction="column" fillWidth gap="16" className={styles.bentoContent}>
                <Row fillWidth horizontal="between" vertical="start" gap="12">
                  <Text variant="label-default-s" onBackground="brand-weak">
                    <T
                      id={post.metadata.category === "personal" ? "personalBadge" : "featuredBadge"}
                    />
                  </Text>
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    {new Date(post.metadata.publishedAt).getFullYear()}
                  </Text>
                </Row>
                <Column gap="8">
                  <Heading
                    as="h3"
                    wrap="balance"
                    variant={featured ? "heading-strong-xl" : "heading-strong-l"}
                  >
                    {post.metadata.title}
                  </Heading>
                  <Text
                    className={styles.bentoDescription}
                    onBackground="neutral-weak"
                    variant="body-default-s"
                  >
                    {post.metadata.summary}
                  </Text>
                </Column>
                {post.metadata.techStack && post.metadata.techStack.length > 0 && (
                  <Row wrap gap="8" className={styles.bentoTags}>
                    {post.metadata.techStack.slice(0, featured ? 7 : 4).map((technology) => (
                      <Tag key={technology} size="s">
                        {technology}
                      </Tag>
                    ))}
                  </Row>
                )}
              </Flex>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
          demoUrl={post.metadata.demoUrl || ""}
          repositoryUrl={post.metadata.repositoryUrl || ""}
          techStack={post.metadata.techStack || []}
        />
      ))}
    </Column>
  );
}
