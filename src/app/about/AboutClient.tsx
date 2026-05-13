"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import type {
  PortfolioAbout,
  PortfolioPerson,
  PortfolioSocialLink,
} from "@/types/portfolio-data";
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

type AboutCopy = {
  introTitle: string;
  introDescription: string;
  workTitle: string;
  studiesTitle: string;
  technicalTitle: string;
  selectedProjectsTitle: string;
  selectedProjectsDescription: string;
  personalProjectsTitle: string;
  personalProjectsDescription: string;
  scheduleCall: string;
  viewAllProjects: string;
  work: Array<{
    role: string;
    achievements: string[];
  }>;
  studies: string[];
  technical: Array<{
    title: string;
    description: string;
  }>;
};

const aboutCopies: Record<string, AboutCopy> = {
  en: {
    introTitle: "Introduction",
    introDescription:
      "Miguel is an IT expert with over a decade of experience across the DACH region, specializing in technical consulting, cloud strategy, and infrastructure modernization. His work bridges business requirements and technical architecture, with a strong focus on Oracle Cloud Infrastructure, Kubernetes, enterprise database platforms, and secure multi-cloud environments.",
    workTitle: "Work Experience",
    studiesTitle: "Studies",
    technicalTitle: "Technical Skills",
    selectedProjectsTitle: "Selected projects",
    selectedProjectsDescription:
      "A closer look at project work, demos, and the technology choices behind them.",
    personalProjectsTitle: "Personal projects",
    personalProjectsDescription:
      "Side projects and hands-on builds where I explore product ideas, architecture, and implementation details.",
    scheduleCall: "Schedule a call",
    viewAllProjects: "View all projects",
    work: [
      {
        role: "Senior Account Cloud Engineer / Senior Technical Solutions Engineer",
        achievements: [
          "Acts as a trusted advisor for customers, working with pre-sales managers, cloud architects, and subject matter experts to understand customer objectives and shape cloud-native enterprise solutions on Oracle Cloud Infrastructure.",
          "Designs technical architectures and supports adoption, optimization, and governance for OCI, Oracle Database Services, Oracle Autonomous AI Database, and Kubernetes Engine.",
          "Previously served as Technical Solutions Engineer for database platforms in the DACH region, providing on-premises, hybrid, and cloud technology solutions.",
        ],
      },
      {
        role: "Technical Consultant / Business Analyst",
        achievements: [
          "Delivered enterprise cloud solutions and secure landing zones aligned with BSI IT-Grundschutz and BSI C5 standards, including work with AWS Landing Zone Accelerator.",
          "Built architectural documentation, runbooks, playbooks, CI/CD pipelines, and Cloud FinOps reporting with Txture to support cloud operations and cost transparency.",
          "Collaborated in international agile environments on cloud-native applications and infrastructure modernization for automotive sector clients.",
        ],
      },
      {
        role: "Research Assistant and Fullstack Developer",
        achievements: [
          "Scientific Researcher for the BMBF-funded project KA3 at the Cologne Center for Analysis and Archiving of AV Data.",
          "Built a frontend for curating and archiving AV data at the University of Cologne. The Language Archive Cologne was designed for long-term and intensive use.",
          "Supported machine-learning experiments for recognizing phenomena that can reduce manual annotation effort in large AV datasets.",
        ],
      },
    ],
    studies: [
      "AWS re/Start Program in Cloud Computing, Cologne, Germany - completed hands-on training across AWS compute, storage, networking, CLI, CDK, SDK, Bash, and Python.",
      "Magister Artium in Communication Sciences and Phonetics with emphasis on Computational Linguistics; subsidiary studies in Romance philology and Ethnology.",
    ],
    technical: [
      {
        title: "Cloud Architecture & Advisory",
        description:
          "Translating customer objectives and business requirements into scalable technical architectures, cloud strategy, assessments, and governance models.",
      },
      {
        title: "Cloud Native Engineering",
        description:
          "Certified Kubernetes and cloud engineer working across Kubernetes, OKE, container technologies, CI/CD, automation, and infrastructure modernization.",
      },
      {
        title: "Enterprise Data Platforms",
        description:
          "Advising on Oracle database platforms, including Oracle Database, RAC, GoldenGate, Autonomous AI Database, database services, and migration architecture.",
      },
    ],
  },
  es: {
    introTitle: "Introducción",
    introDescription:
      "Miguel es un experto en TI con más de una década de experiencia en la región DACH, especializado en consultoría técnica, estrategia cloud y modernización de infraestructura. Su trabajo conecta los requisitos de negocio con la arquitectura técnica, con foco en Oracle Cloud Infrastructure, Kubernetes, plataformas de bases de datos empresariales y entornos multi-cloud seguros.",
    workTitle: "Experiencia profesional",
    studiesTitle: "Estudios",
    technicalTitle: "Habilidades técnicas",
    selectedProjectsTitle: "Proyectos seleccionados",
    selectedProjectsDescription:
      "Una mirada más cercana al trabajo en proyectos, demos y decisiones tecnológicas.",
    personalProjectsTitle: "Proyectos personales",
    personalProjectsDescription:
      "Proyectos propios y desarrollos prácticos donde exploro ideas de producto, arquitectura e implementación.",
    scheduleCall: "Agendar una llamada",
    viewAllProjects: "Ver todos los proyectos",
    work: [
      {
        role: "Senior Account Cloud Engineer / Senior Technical Solutions Engineer",
        achievements: [
          "Actúa como asesor de confianza para clientes, colaborando con preventa, arquitectos cloud y especialistas para entender objetivos y diseñar soluciones empresariales cloud-native en Oracle Cloud Infrastructure.",
          "Diseña arquitecturas técnicas y apoya la adopción, optimización y gobernanza de OCI, Oracle Database Services, Oracle Autonomous AI Database y Kubernetes Engine.",
          "Anteriormente trabajó como Technical Solutions Engineer para plataformas de bases de datos en la región DACH, cubriendo soluciones on-premises, híbridas y cloud.",
        ],
      },
      {
        role: "Technical Consultant / Business Analyst",
        achievements: [
          "Entregó soluciones cloud empresariales y landing zones seguras alineadas con BSI IT-Grundschutz y BSI C5, incluyendo trabajo con AWS Landing Zone Accelerator.",
          "Creó documentación de arquitectura, runbooks, playbooks, pipelines CI/CD y reportes Cloud FinOps con Txture para apoyar operaciones cloud y transparencia de costes.",
          "Colaboró en entornos ágiles internacionales en aplicaciones cloud-native y modernización de infraestructura para clientes del sector automotriz.",
        ],
      },
      {
        role: "Research Assistant y Fullstack Developer",
        achievements: [
          "Investigador científico para el proyecto KA3 financiado por el BMBF en el Cologne Center for Analysis and Archiving of AV Data.",
          "Construyó un frontend para curar y archivar datos audiovisuales en la Universidad de Colonia. Language Archive Cologne fue diseñado para uso intensivo y de largo plazo.",
          "Apoyó experimentos de machine learning para reconocer fenómenos que reducen el esfuerzo manual de anotación en grandes conjuntos de datos audiovisuales.",
        ],
      },
    ],
    studies: [
      "Programa AWS re/Start en Cloud Computing, Colonia, Alemania - formación práctica en compute, storage, networking, CLI, CDK, SDK, Bash y Python.",
      "Magister Artium en Ciencias de la Comunicación y Fonética con énfasis en Lingüística Computacional; estudios secundarios en Filología Románica y Etnología.",
    ],
    technical: [
      {
        title: "Arquitectura cloud y asesoría",
        description:
          "Traducir objetivos de cliente y requisitos de negocio en arquitecturas técnicas escalables, estrategia cloud, evaluaciones y modelos de gobernanza.",
      },
      {
        title: "Ingeniería cloud native",
        description:
          "Ingeniero certificado en Kubernetes y cloud, trabajando con Kubernetes, OKE, contenedores, CI/CD, automatización y modernización de infraestructura.",
      },
      {
        title: "Plataformas de datos empresariales",
        description:
          "Asesoría en plataformas Oracle Database, incluyendo Oracle Database, RAC, GoldenGate, Autonomous AI Database, servicios de base de datos y arquitectura de migración.",
      },
    ],
  },
  de: {
    introTitle: "Einführung",
    introDescription:
      "Miguel ist ein IT-Experte mit mehr als zehn Jahren Erfahrung in der DACH-Region, spezialisiert auf technische Beratung, Cloud-Strategie und Infrastrukturmodernisierung. Seine Arbeit verbindet Geschäftsanforderungen mit technischer Architektur, mit Fokus auf Oracle Cloud Infrastructure, Kubernetes, Enterprise-Datenbankplattformen und sichere Multi-Cloud-Umgebungen.",
    workTitle: "Berufserfahrung",
    studiesTitle: "Ausbildung",
    technicalTitle: "Technische Fähigkeiten",
    selectedProjectsTitle: "Ausgewählte Projekte",
    selectedProjectsDescription:
      "Ein genauerer Blick auf Projektarbeit, Demos und technologische Entscheidungen.",
    personalProjectsTitle: "Persönliche Projekte",
    personalProjectsDescription:
      "Eigene Projekte und praktische Builds, in denen ich Produktideen, Architektur und Implementierungsdetails erkunde.",
    scheduleCall: "Termin vereinbaren",
    viewAllProjects: "Alle Projekte ansehen",
    work: [
      {
        role: "Senior Account Cloud Engineer / Senior Technical Solutions Engineer",
        achievements: [
          "Agiert als Trusted Advisor für Kunden und arbeitet mit Pre-Sales-Managern, Cloud-Architekten und Fachexperten zusammen, um Kundenziele zu verstehen und cloud-native Enterprise-Lösungen auf Oracle Cloud Infrastructure zu gestalten.",
          "Entwirft technische Architekturen und unterstützt Adoption, Optimierung und Governance für OCI, Oracle Database Services, Oracle Autonomous AI Database und Kubernetes Engine.",
          "War zuvor als Technical Solutions Engineer für Datenbankplattformen in der DACH-Region tätig und lieferte On-Premises-, Hybrid- und Cloud-Technologielösungen.",
        ],
      },
      {
        role: "Technical Consultant / Business Analyst",
        achievements: [
          "Lieferte Enterprise-Cloud-Lösungen und sichere Landing Zones nach BSI IT-Grundschutz und BSI C5, inklusive Arbeit mit AWS Landing Zone Accelerator.",
          "Erstellte Architekturdokumentation, Runbooks, Playbooks, CI/CD-Pipelines und Cloud-FinOps-Reporting mit Txture für Cloud Operations und Kostentransparenz.",
          "Arbeitete in internationalen agilen Umgebungen an cloud-nativen Anwendungen und Infrastrukturmodernisierung für Kunden aus dem Automobilsektor.",
        ],
      },
      {
        role: "Research Assistant und Fullstack Developer",
        achievements: [
          "Wissenschaftlicher Mitarbeiter im BMBF-geförderten Projekt KA3 am Cologne Center for Analysis and Archiving of AV Data.",
          "Entwickelte ein Frontend zur Kuratierung und Archivierung audiovisueller Daten an der Universität zu Köln. Das Language Archive Cologne wurde für langfristige und intensive Nutzung konzipiert.",
          "Unterstützte Machine-Learning-Experimente zur Erkennung von Phänomenen, die manuellen Annotationsaufwand in großen AV-Datensätzen reduzieren können.",
        ],
      },
    ],
    studies: [
      "AWS re/Start Program in Cloud Computing, Köln - praktische Ausbildung in AWS Compute, Storage, Networking, CLI, CDK, SDK, Bash und Python.",
      "Magister Artium in Kommunikationswissenschaften und Phonetik mit Schwerpunkt Computerlinguistik; Nebenfächer Romanische Philologie und Ethnologie.",
    ],
    technical: [
      {
        title: "Cloud-Architektur und Beratung",
        description:
          "Übersetzung von Kundenzielen und Geschäftsanforderungen in skalierbare technische Architekturen, Cloud-Strategie, Assessments und Governance-Modelle.",
      },
      {
        title: "Cloud Native Engineering",
        description:
          "Zertifizierter Kubernetes- und Cloud Engineer mit Arbeit an Kubernetes, OKE, Container-Technologien, CI/CD, Automatisierung und Infrastrukturmodernisierung.",
      },
      {
        title: "Enterprise-Datenplattformen",
        description:
          "Beratung zu Oracle-Datenbankplattformen, einschließlich Oracle Database, RAC, GoldenGate, Autonomous AI Database, Datenbankservices und Migrationsarchitektur.",
      },
    ],
  },
  pt: {
    introTitle: "Introdução",
    introDescription:
      "Miguel é um especialista em TI com mais de uma década de experiência na região DACH, especializado em consultoria técnica, estratégia cloud e modernização de infraestrutura. O seu trabalho conecta requisitos de negócio com arquitetura técnica, com foco em Oracle Cloud Infrastructure, Kubernetes, plataformas de bases de dados empresariais e ambientes multi-cloud seguros.",
    workTitle: "Experiência profissional",
    studiesTitle: "Estudos",
    technicalTitle: "Competências técnicas",
    selectedProjectsTitle: "Projetos selecionados",
    selectedProjectsDescription:
      "Uma visão mais próxima do trabalho em projetos, demos e escolhas tecnológicas.",
    personalProjectsTitle: "Projetos pessoais",
    personalProjectsDescription:
      "Projetos próprios e construções práticas onde exploro ideias de produto, arquitetura e detalhes de implementação.",
    scheduleCall: "Agendar uma chamada",
    viewAllProjects: "Ver todos os projetos",
    work: [
      {
        role: "Senior Account Cloud Engineer / Senior Technical Solutions Engineer",
        achievements: [
          "Atua como consultor de confiança para clientes, trabalhando com pré-vendas, arquitetos cloud e especialistas para compreender objetivos e desenhar soluções empresariais cloud-native em Oracle Cloud Infrastructure.",
          "Desenha arquiteturas técnicas e apoia adoção, otimização e governança para OCI, Oracle Database Services, Oracle Autonomous AI Database e Kubernetes Engine.",
          "Anteriormente atuou como Technical Solutions Engineer para plataformas de bases de dados na região DACH, fornecendo soluções on-premises, híbridas e cloud.",
        ],
      },
      {
        role: "Technical Consultant / Business Analyst",
        achievements: [
          "Entregou soluções cloud empresariais e landing zones seguras alinhadas com BSI IT-Grundschutz e BSI C5, incluindo trabalho com AWS Landing Zone Accelerator.",
          "Criou documentação arquitetural, runbooks, playbooks, pipelines CI/CD e relatórios Cloud FinOps com Txture para apoiar operações cloud e transparência de custos.",
          "Colaborou em ambientes ágeis internacionais em aplicações cloud-native e modernização de infraestrutura para clientes do setor automóvel.",
        ],
      },
      {
        role: "Research Assistant e Fullstack Developer",
        achievements: [
          "Investigador científico no projeto KA3 financiado pelo BMBF no Cologne Center for Analysis and Archiving of AV Data.",
          "Construiu um frontend para curadoria e arquivo de dados audiovisuais na Universidade de Colônia. O Language Archive Cologne foi desenhado para uso intensivo e de longo prazo.",
          "Apoiou experiências de machine learning para reconhecer fenómenos que podem reduzir o esforço manual de anotação em grandes conjuntos de dados audiovisuais.",
        ],
      },
    ],
    studies: [
      "Programa AWS re/Start em Cloud Computing, Colônia, Alemanha - formação prática em AWS compute, storage, networking, CLI, CDK, SDK, Bash e Python.",
      "Magister Artium em Ciências da Comunicação e Fonética com ênfase em Linguística Computacional; estudos complementares em Filologia Românica e Etnologia.",
    ],
    technical: [
      {
        title: "Arquitetura cloud e consultoria",
        description:
          "Traduzir objetivos de clientes e requisitos de negócio em arquiteturas técnicas escaláveis, estratégia cloud, avaliações e modelos de governança.",
      },
      {
        title: "Engenharia cloud native",
        description:
          "Engenheiro certificado em Kubernetes e cloud, trabalhando com Kubernetes, OKE, tecnologias de contêineres, CI/CD, automação e modernização de infraestrutura.",
      },
      {
        title: "Plataformas de dados empresariais",
        description:
          "Consultoria em plataformas Oracle Database, incluindo Oracle Database, RAC, GoldenGate, Autonomous AI Database, serviços de base de dados e arquitetura de migração.",
      },
    ],
  },
};

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
  const copy = aboutCopies[language] ?? aboutCopies.en;
  const structure = [
    {
      title: copy.introTitle,
      display: about.intro.display,
      items: [],
    },
    {
      title: copy.workTitle,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: copy.studiesTitle,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: copy.technicalTitle,
      display: about.technical.display,
      items: copy.technical.map((skill) => skill.title),
    },
    {
      title: copy.selectedProjectsTitle,
      display: true,
      items: [],
    },
    {
      title: copy.personalProjectsTitle,
      display: true,
      items: [],
    },
  ];

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
