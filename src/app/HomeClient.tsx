"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { PortfolioAbout, PortfolioHome, PortfolioPerson } from "@/types/portfolio-data";
import { Avatar, Button, Column, Heading, Row, Text } from "@once-ui-system/core";
import { motion } from "framer-motion";
import { CloudCogIcon, DatabaseIcon, ShieldCheckIcon } from "lucide-animated";
import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import { useRef } from "react";
import styles from "./home.module.scss";

type AnimatedIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

type AnimatedIconComponent = ForwardRefExoticComponent<
  {
    className?: string;
    size?: number;
  } & RefAttributes<AnimatedIconHandle>
>;

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

const heroSignals: Array<{
  label: string;
  Icon: AnimatedIconComponent;
}> = [
  {
    label: "Cloud architecture",
    Icon: CloudCogIcon,
  },
  {
    label: "Security governance",
    Icon: ShieldCheckIcon,
  },
  {
    label: "Data platforms",
    Icon: DatabaseIcon,
  },
];

function HeroSignalIcon({
  Icon,
  label,
  index,
}: {
  Icon: AnimatedIconComponent;
  label: string;
  index: number;
}) {
  const iconRef = useRef<AnimatedIconHandle>(null);

  return (
    <motion.div
      className={styles.heroRailItem}
      aria-label={label}
      title={label}
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.42, delay: 0.12 + index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => iconRef.current?.startAnimation()}
      onHoverEnd={() => iconRef.current?.stopAnimation()}
    >
      <Icon ref={iconRef} className={styles.heroRailIcon} size={44} />
    </motion.div>
  );
}

type HomeClientProps = {
  home: PortfolioHome;
  about: PortfolioAbout;
  person: PortfolioPerson;
  professionalProjects: ReactNode;
  personalProjects: ReactNode;
};

export function HomeClient({
  home,
  about,
  person,
  professionalProjects,
  personalProjects,
}: HomeClientProps) {
  const { t } = useLanguage();

  return (
    <>
      <div className={styles.homeGrid}>
        <section className={styles.heroPanel}>
          <div className={styles.heroLayout}>
            <Column className={styles.heroContent} fillWidth gap="24">
              <div className={styles.heroEyebrow}>{person.role}</div>
              <Heading wrap="balance" variant="display-strong-l">
                {t("homeHeadline")}
              </Heading>
              <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                {t("homeSubline")}
              </Text>
              <Row className={styles.heroActions} gap="12" wrap>
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
            <div className={styles.heroRail}>
              {heroSignals.map((signal, index) => (
                <HeroSignalIcon
                  key={signal.label}
                  Icon={signal.Icon}
                  label={signal.label}
                  index={index}
                />
              ))}
            </div>
          </div>
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
              <Text variant="heading-strong-s">{t("impactCardTitle")}</Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {t("impactCardBody")}
              </Text>
            </section>
            <section className={styles.metricPanel}>
              <Text variant="heading-strong-s">{t("trustCardTitle")}</Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {t("trustCardBody")}
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
