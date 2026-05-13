import { Projects } from "@/components/work/Projects";
import { getPortfolioDataSync } from "@/lib/portfolio-data";
import { baseURL } from "@/resources";
import {
  Avatar,
  Badge,
  Button,
  Column,
  Heading,
  Meta,
  Row,
  Schema,
  Tag,
  Text,
} from "@once-ui-system/core";
import styles from "./home.module.scss";

export const dynamic = "force-dynamic";

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
                  <strong>{home.featured.label}</strong>
                </Row>
              </Badge>
            )}
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
            <Row gap="12" wrap>
              <Button href="/work" variant="primary" size="m" weight="default" arrowIcon>
                View projects
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
                About Miguel
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
            <Row gap="8" wrap horizontal="center">
              {person.languages?.map((language) => (
                <Tag key={language} size="s">
                  {language}
                </Tag>
              ))}
            </Row>
          </section>

          <div className={styles.metricGrid}>
            <section className={styles.metricPanel}>
              <Text variant="heading-strong-xl">{projectCount}</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Project stories
              </Text>
            </section>
            <section className={styles.metricPanel}>
              <Text variant="heading-strong-xl">10+</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Years experience
              </Text>
            </section>
          </div>

          <section className={styles.stackPanel}>
            <Text variant="heading-strong-s">Core stack</Text>
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
              Featured projects
            </Heading>
            <Text onBackground="neutral-weak" variant="body-default-m">
              Selected work with tech stack notes, case studies, and live demo links.
            </Text>
          </Column>
          <Button href="/work" variant="secondary" size="s" suffixIcon="arrowRight">
            All projects
          </Button>
        </div>
        <Projects category="professional" variant="bento" />
      </section>

      <section className={styles.projectsSection}>
        <div className={styles.sectionHeader}>
          <Column gap="8">
            <Heading as="h2" variant="heading-strong-xl">
              Personal projects
            </Heading>
            <Text onBackground="neutral-weak" variant="body-default-m">
              Independent products and experiments where I can test ideas end to end.
            </Text>
          </Column>
          <Button href="/work" variant="secondary" size="s" suffixIcon="arrowRight">
            Explore more
          </Button>
        </div>
        <Projects category="personal" variant="bento" />
      </section>
    </Column>
  );
}
