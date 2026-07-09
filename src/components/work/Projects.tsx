import { ProjectCard, T } from "@/components";
import {
  getProjectLogo,
  getProjectYear,
  normalizePublicImagePath,
  selectProjectEntries,
} from "@/services/project.service";
import type { ProjectCategory, ProjectRange } from "@/services/project.service";
import { Column, Flex, Heading, Row, Tag, Text } from "@once-ui-system/core";
import Image from "next/image";
import Link from "next/link";
import styles from "./Projects.module.scss";

interface ProjectsProps {
  range?: ProjectRange;
  exclude?: string[];
  category?: ProjectCategory;
  variant?: "list" | "bento";
}

export function Projects({ range, exclude, category, variant = "list" }: ProjectsProps) {
  const displayedProjects = selectProjectEntries({ range, exclude, category });

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
                    {getProjectYear(post)}
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
