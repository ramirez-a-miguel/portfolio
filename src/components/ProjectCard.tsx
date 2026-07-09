"use client";

import { T } from "@/components/LanguageProvider";
import type { TranslationKey } from "@/lib/translations";
import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  Row,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  demoUrl?: string;
  repositoryUrl?: string;
  techStack?: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  demoUrl,
  repositoryUrl,
  techStack = [],
}) => {
  const projectLinks: Array<{
    href: string;
    label: TranslationKey;
    suffixIcon: "arrowRight" | "arrowUpRightFromSquare" | "github";
  }> = [
    ...(content?.trim()
      ? [{ href, label: "readCaseStudy" as const, suffixIcon: "arrowRight" as const }]
      : []),
    ...(link
      ? [
          {
            href: link,
            label: "viewProject" as const,
            suffixIcon: "arrowUpRightFromSquare" as const,
          },
        ]
      : []),
    ...(demoUrl
      ? [
          {
            href: demoUrl,
            label: "liveDemo" as const,
            suffixIcon: "arrowUpRightFromSquare" as const,
          },
        ]
      : []),
    ...(repositoryUrl
      ? [{ href: repositoryUrl, label: "repository" as const, suffixIcon: "github" as const }]
      : []),
  ];

  return (
    <Column fillWidth gap="m">
      {images.length > 0 && (
        <Carousel
          aspectRatio="21 / 9"
          sizes="(max-width: 960px) 100vw, 960px"
          items={images.map((image) => ({
            slide: image,
            alt: title,
          }))}
        />
      )}
      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
        )}
        {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
            {description?.trim() && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            )}
            {techStack.length > 0 && (
              <Row wrap gap="8">
                {techStack.slice(0, 6).map((technology) => (
                  <Tag key={technology} size="s">
                    {technology}
                  </Tag>
                ))}
              </Row>
            )}
            <Flex gap="24" wrap>
              {projectLinks.map((projectLink) => (
                <SmartLink
                  key={`${projectLink.href}-${projectLink.label}`}
                  suffixIcon={projectLink.suffixIcon}
                  style={{ margin: "0", width: "fit-content" }}
                  href={projectLink.href}
                >
                  <Text variant="body-default-s">
                    <T id={projectLink.label} />
                  </Text>
                </SmartLink>
              ))}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};
