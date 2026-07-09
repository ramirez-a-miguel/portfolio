"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import { getAboutCopy, getAboutStructure } from "@/services/about-copy.service";
import type { PortfolioAbout, PortfolioPerson, PortfolioSocialLink } from "@/types/portfolio-data";
import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Row,
  Tag,
  Text,
} from "@once-ui-system/core";
import type { ReactNode } from "react";
import React from "react";

type AboutClientProps = {
  about: PortfolioAbout;
  person: PortfolioPerson;
  social: PortfolioSocialLink[];
  workPath: string;
  professionalProjects: ReactNode;
  personalProjects: ReactNode;
};

export function AboutClient({
  about,
  person,
  social,
  workPath,
  professionalProjects,
  personalProjects,
}: AboutClientProps) {
  const { language } = useLanguage();
  const copy = getAboutCopy(language);
  const structure = getAboutStructure(about, copy);

  return (
    <>
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Row fillWidth s={{ direction: "column" }} horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Row>
            {person.languages && person.languages.length > 0 && (
              <LanguageSwitcher languages={person.languages} size="l" />
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={copy.introTitle}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.calendar.display && (
              <Row
                fitWidth
                border="brand-alpha-medium"
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
              >
                <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                <Row paddingX="8">{copy.scheduleCall}</Row>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Row>
            )}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social
                  .filter((item) => item.essential)
                  .map(
                    (item) =>
                      item.link && (
                        <React.Fragment key={item.name}>
                          <Row s={{ hide: true }}>
                            <Button
                              key={item.name}
                              href={item.link}
                              prefixIcon={item.icon}
                              label={item.name}
                              size="s"
                              weight="default"
                              variant="secondary"
                            />
                          </Row>
                          <Row hide s={{ hide: false }}>
                            <IconButton
                              size="l"
                              key={`${item.name}-icon`}
                              href={item.link}
                              icon={item.icon}
                              variant="secondary"
                            />
                          </Row>
                        </React.Fragment>
                      ),
                  )}
              </Row>
            )}
          </Column>

          {about.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {copy.introDescription}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading as="h2" id={copy.workTitle} variant="display-strong-s" marginBottom="m">
                {copy.workTitle}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => {
                  const translatedExperience = copy.work[index];

                  return (
                    <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                      <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                        <Text id={experience.company} variant="heading-strong-l">
                          {experience.company}
                        </Text>
                        <Text variant="heading-default-xs" onBackground="neutral-weak">
                          {experience.timeframe}
                        </Text>
                      </Row>
                      <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                        {translatedExperience?.role ?? experience.role}
                      </Text>
                      <Column as="ul" gap="16">
                        {(translatedExperience?.achievements ?? experience.achievements).map(
                          (achievement: string, achievementIndex: number) => (
                            <Text
                              as="li"
                              variant="body-default-m"
                              key={`${experience.company}-${achievementIndex}`}
                            >
                              {achievement}
                            </Text>
                          ),
                        )}
                      </Column>
                    </Column>
                  );
                })}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={copy.studiesTitle} variant="display-strong-s" marginBottom="m">
                {copy.studiesTitle}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {copy.studies[index] ?? institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={copy.technicalTitle}
                variant="display-strong-s"
                marginBottom="40"
              >
                {copy.technicalTitle}
              </Heading>
              <Column fillWidth gap="l">
                {about.technical.skills.map((skill, index) => {
                  const translatedSkill = copy.technical[index];

                  return (
                    <Column key={`${skill.title}-${index}`} fillWidth gap="4">
                      <Text id={translatedSkill?.title ?? skill.title} variant="heading-strong-l">
                        {translatedSkill?.title ?? skill.title}
                      </Text>
                      <Text variant="body-default-m" onBackground="neutral-weak">
                        {translatedSkill?.description ?? skill.description}
                      </Text>
                      {skill.tags && skill.tags.length > 0 && (
                        <Row wrap gap="8" paddingTop="8">
                          {skill.tags.map((tag, tagIndex) => (
                            <Tag key={`${skill.title}-${tagIndex}`} size="l">
                              {tag}
                            </Tag>
                          ))}
                        </Row>
                      )}
                    </Column>
                  );
                })}
              </Column>
            </>
          )}

          <Column fillWidth gap="16" marginTop="40" marginBottom="40">
            <Column gap="8">
              <Heading as="h2" id={copy.selectedProjectsTitle} variant="display-strong-s">
                {copy.selectedProjectsTitle}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {copy.selectedProjectsDescription}
              </Text>
            </Column>
            {professionalProjects}
            <Button href={workPath} variant="secondary" size="s" arrowIcon>
              {copy.viewAllProjects}
            </Button>
          </Column>

          <Column fillWidth gap="16" marginBottom="40">
            <Column gap="8">
              <Heading as="h2" id={copy.personalProjectsTitle} variant="display-strong-s">
                {copy.personalProjectsTitle}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {copy.personalProjectsDescription}
              </Text>
            </Column>
            {personalProjects}
          </Column>
        </Column>
      </Row>
    </>
  );
}
