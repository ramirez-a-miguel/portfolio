"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { PortfolioAbout, PortfolioHome, PortfolioPerson } from "@/types/portfolio-data";
import { Avatar, Badge, Button, Column, Heading, Row, Text } from "@once-ui-system/core";
import type { ReactNode } from "react";
import styles from "./home.module.scss";

const coreStack = [
  {
    name: "K8s",
    label: "Kubernetes",
    logo: "/logos/kubernetes.svg",
  },
  {
    name: "AWS",
    label: "Amazon Web Services",
    logo: "/logos/aws.svg",
  },
  {
    name: "OCI",
    label: "Oracle Cloud Infrastructure",
    logo: "/logos/oracle.svg",
  },
  {
    name: "DevSecOps",
    label: "Security-first delivery",
    logo: "/logos/devsecops.svg",
  },
  {
    name: "Azure DevOps",
    label: "Azure DevOps",
    logo: "/logos/azure-devops.svg",
  },
  {
    name: "GCP",
    label: "Google Cloud Platform",
    logo: "/logos/gcp.svg",
  },
  {
    name: "Angular",
    label: "Angular",
    logo: "/logos/angular.svg",
  },
  {
    name: "Python",
    label: "Python",
    logo: "/logos/python.svg",
  },
];

type HomeClientProps = {
  home: PortfolioHome;
  about: PortfolioAbout;
  person: PortfolioPerson;
  projectCount: number;
  professionalProjects: ReactNode;
  personalProjects: ReactNode;
};

export function HomeClient({
  home,
  about,
  person,
  projectCount,
  professionalProjects,
  personalProjects,
}: HomeClientProps) {
  const { t } = useLanguage();

  return (
    <>
      <div className={styles.homeGrid}>
        <section className={styles.heroPanel}>
          <Column fillWidth gap="24">
            {home.featured.display && (
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2" gap="12" vertical="center">
                  <strong>{t("homeFeaturedLabel")}</strong>
                </Row>
              </Badge>
            )}
            <Heading wrap="balance" variant="display-strong-l">
              {t("homeHeadline")}
            </Heading>
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {t("homeSubline")}
            </Text>
            <Row gap="12" wrap>
              <Button href="/work" variant="primary" size="m" weight="default" arrowIcon>
                {t("viewProjects")}
              </Button>
              <Button
                id="about"
                data-border="rounded"
                href={about.path}
                variant="secondary"
                size="m"
                weight="default"
                arrowIcon
              >
                {t("aboutMiguel")}
              </Button>
            </Row>
          </Column>
        </section>

        <aside className={styles.sideGrid} aria-label="Portfolio summary">
          <section className={styles.profilePanel}>
            {about.avatar.display && <Avatar src={person.avatar} size="xl" />}
            <Column gap="4" horizontal="center">
              <Text variant="heading-strong-m">{person.name}</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {person.role}
              </Text>
            </Column>
            {person.languages?.length > 0 && <LanguageSwitcher languages={person.languages} />}
          </section>

          <div className={styles.metricGrid}>
            <section className={styles.metricPanel}>
              <Text variant="heading-strong-xl">{projectCount}</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {t("projectStories")}
              </Text>
            </section>
            <section className={styles.metricPanel}>
              <Text variant="heading-strong-xl">10+</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {t("yearsExperience")}
              </Text>
            </section>
          </div>

          <section className={styles.stackPanel}>
            <Text variant="heading-strong-s">{t("coreStack")}</Text>
            <div className={styles.stackList}>
              {coreStack.map((technology) => (
                <div
                  key={technology.name}
                  className={styles.stackItem}
                  aria-label={technology.label}
                  title={technology.label}
                >
                  <img src={technology.logo} alt="" aria-hidden="true" />
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <section className={styles.projectsSection}>
        <div className={styles.sectionHeader}>
          <Column gap="8">
            <Heading as="h2" variant="heading-strong-xl">
              {t("featuredProjects")}
            </Heading>
            <Text onBackground="neutral-weak" variant="body-default-m">
              {t("featuredProjectsDescription")}
            </Text>
          </Column>
          <Button href="/work" variant="secondary" size="s" suffixIcon="arrowRight">
            {t("allProjects")}
          </Button>
        </div>
        {professionalProjects}
      </section>

      <section className={styles.projectsSection}>
        <div className={styles.sectionHeader}>
          <Column gap="8">
            <Heading as="h2" variant="heading-strong-xl">
              {t("personalProjects")}
            </Heading>
            <Text onBackground="neutral-weak" variant="body-default-m">
              {t("personalProjectsDescription")}
            </Text>
          </Column>
          <Button href="/work" variant="secondary" size="s" suffixIcon="arrowRight">
            {t("exploreMore")}
          </Button>
        </div>
        {personalProjects}
      </section>
    </>
  );
}
