import type { LanguageCode } from "@/lib/translations";
import type { PortfolioAbout } from "@/types/portfolio-data";

export type AboutCopy = {
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

export type AboutStructureItem = {
  title: string;
  display: boolean;
  items: string[];
};

const aboutCopies: Record<LanguageCode, AboutCopy> = {
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
  it: {
    introTitle: "Introduzione",
    introDescription:
      "Miguel è un esperto IT con oltre un decennio di esperienza nella regione DACH, specializzato in consulenza tecnica, strategia cloud e modernizzazione dell'infrastruttura. Il suo lavoro collega i requisiti di business con l'architettura tecnica, con un forte focus su Oracle Cloud Infrastructure, Kubernetes, piattaforme dati enterprise e ambienti multi-cloud sicuri.",
    workTitle: "Esperienza professionale",
    studiesTitle: "Formazione",
    technicalTitle: "Competenze tecniche",
    selectedProjectsTitle: "Progetti selezionati",
    selectedProjectsDescription:
      "Uno sguardo più ravvicinato al lavoro sui progetti, alle demo e alle scelte tecnologiche.",
    personalProjectsTitle: "Progetti personali",
    personalProjectsDescription:
      "Progetti indipendenti e realizzazioni pratiche in cui esploro idee di prodotto, architettura e dettagli di implementazione.",
    scheduleCall: "Prenota una call",
    viewAllProjects: "Vedi tutti i progetti",
    work: [
      {
        role: "Senior Account Cloud Engineer / Senior Technical Solutions Engineer",
        achievements: [
          "Agisce come consulente di fiducia per i clienti, collaborando con pre-sales manager, cloud architect ed esperti di dominio per comprendere gli obiettivi dei clienti e progettare soluzioni enterprise cloud-native su Oracle Cloud Infrastructure.",
          "Progetta architetture tecniche e supporta adozione, ottimizzazione e governance per OCI, Oracle Database Services, Oracle Autonomous AI Database e Kubernetes Engine.",
          "In precedenza ha lavorato come Technical Solutions Engineer per piattaforme database nella regione DACH, fornendo soluzioni tecnologiche on-premises, ibride e cloud.",
        ],
      },
      {
        role: "Technical Consultant / Business Analyst",
        achievements: [
          "Ha realizzato soluzioni cloud enterprise e landing zone sicure allineate agli standard BSI IT-Grundschutz e BSI C5, incluso il lavoro con AWS Landing Zone Accelerator.",
          "Ha creato documentazione architetturale, runbook, playbook, pipeline CI/CD e report Cloud FinOps con Txture per supportare le operation cloud e la trasparenza dei costi.",
          "Ha collaborato in ambienti agili internazionali su applicazioni cloud-native e modernizzazione dell'infrastruttura per clienti del settore automotive.",
        ],
      },
      {
        role: "Research Assistant e Fullstack Developer",
        achievements: [
          "Ricercatore scientifico nel progetto KA3 finanziato dal BMBF presso il Cologne Center for Analysis and Archiving of AV Data.",
          "Ha sviluppato un frontend per curare e archiviare dati audiovisivi presso l'Università di Colonia. Il Language Archive Cologne è stato progettato per un uso intensivo e di lungo periodo.",
          "Ha supportato esperimenti di machine learning per riconoscere fenomeni che possono ridurre lo sforzo manuale di annotazione in grandi dataset audiovisivi.",
        ],
      },
    ],
    studies: [
      "Programma AWS re/Start in Cloud Computing, Colonia, Germania - formazione pratica su AWS compute, storage, networking, CLI, CDK, SDK, Bash e Python.",
      "Magister Artium in Scienze della comunicazione e Fonetica con enfasi sulla Linguistica computazionale; studi complementari in Filologia romanza ed Etnologia.",
    ],
    technical: [
      {
        title: "Architettura cloud e consulenza",
        description:
          "Tradurre obiettivi dei clienti e requisiti di business in architetture tecniche scalabili, strategia cloud, assessment e modelli di governance.",
      },
      {
        title: "Ingegneria cloud native",
        description:
          "Cloud engineer certificato Kubernetes, con esperienza su Kubernetes, OKE, tecnologie container, CI/CD, automazione e modernizzazione dell'infrastruttura.",
      },
      {
        title: "Piattaforme dati enterprise",
        description:
          "Consulenza su piattaforme Oracle Database, inclusi Oracle Database, RAC, GoldenGate, Autonomous AI Database, servizi database e architetture di migrazione.",
      },
    ],
  },
  nl: {
    introTitle: "Introductie",
    introDescription:
      "Miguel is een IT-expert met meer dan tien jaar ervaring in de DACH-regio, gespecialiseerd in technisch advies, cloudstrategie en modernisering van infrastructuur. Zijn werk verbindt bedrijfsvereisten met technische architectuur, met een sterke focus op Oracle Cloud Infrastructure, Kubernetes, enterprise dataplatforms en veilige multi-cloudomgevingen.",
    workTitle: "Werkervaring",
    studiesTitle: "Opleiding",
    technicalTitle: "Technische vaardigheden",
    selectedProjectsTitle: "Geselecteerde projecten",
    selectedProjectsDescription:
      "Een nadere blik op projectwerk, demo's en de technologische keuzes daarachter.",
    personalProjectsTitle: "Persoonlijke projecten",
    personalProjectsDescription:
      "Eigen projecten en praktische builds waarin ik productideeën, architectuur en implementatiedetails verken.",
    scheduleCall: "Plan een gesprek",
    viewAllProjects: "Bekijk alle projecten",
    work: [
      {
        role: "Senior Account Cloud Engineer / Senior Technical Solutions Engineer",
        achievements: [
          "Treedt op als vertrouwde adviseur voor klanten en werkt samen met pre-sales managers, cloudarchitecten en domeinexperts om klantdoelen te begrijpen en cloud-native enterprise oplossingen op Oracle Cloud Infrastructure vorm te geven.",
          "Ontwerpt technische architecturen en ondersteunt adoptie, optimalisatie en governance voor OCI, Oracle Database Services, Oracle Autonomous AI Database en Kubernetes Engine.",
          "Was eerder Technical Solutions Engineer voor databaseplatforms in de DACH-regio en leverde on-premises, hybride en cloudtechnologieoplossingen.",
        ],
      },
      {
        role: "Technical Consultant / Business Analyst",
        achievements: [
          "Realiseerde enterprise cloudoplossingen en veilige landing zones volgens BSI IT-Grundschutz en BSI C5, inclusief werk met AWS Landing Zone Accelerator.",
          "Maakte architectuurdocumentatie, runbooks, playbooks, CI/CD-pijplijnen en Cloud FinOps-rapportages met Txture ter ondersteuning van cloudoperaties en kostentransparantie.",
          "Werkte in internationale agile omgevingen aan cloud-native applicaties en infrastructuurmodernisering voor klanten in de automobielsector.",
        ],
      },
      {
        role: "Research Assistant en Fullstack Developer",
        achievements: [
          "Wetenschappelijk medewerker in het door BMBF gefinancierde KA3-project bij het Cologne Center for Analysis and Archiving of AV Data.",
          "Ontwikkelde een frontend voor het cureren en archiveren van audiovisuele data aan de Universiteit van Keulen. Het Language Archive Cologne was ontworpen voor langdurig en intensief gebruik.",
          "Ondersteunde machine-learningexperimenten voor het herkennen van fenomenen die de handmatige annotatie-inspanning in grote AV-datasets kunnen verminderen.",
        ],
      },
    ],
    studies: [
      "AWS re/Start-programma in Cloud Computing, Keulen, Duitsland - praktijkgerichte training afgerond op het gebied van AWS compute, storage, networking, CLI, CDK, SDK, Bash en Python.",
      "Magister Artium in Communicatiewetenschappen en Fonetiek met nadruk op computationele taalkunde; bijvakken Romaanse filologie en etnologie.",
    ],
    technical: [
      {
        title: "Cloudarchitectuur en advies",
        description:
          "Klantdoelen en bedrijfsvereisten vertalen naar schaalbare technische architecturen, cloudstrategie, assessments en governancemodellen.",
      },
      {
        title: "Cloud-native engineering",
        description:
          "Gecertificeerd Kubernetes- en cloudengineer, met ervaring in Kubernetes, OKE, containertechnologieën, CI/CD, automatisering en infrastructuurmodernisering.",
      },
      {
        title: "Enterprise dataplatforms",
        description:
          "Advies over Oracle Database-platforms, waaronder Oracle Database, RAC, GoldenGate, Autonomous AI Database, databaseservices en migratiearchitectuur.",
      },
    ],
  },
};

export function getAboutCopy(language: LanguageCode): AboutCopy {
  return aboutCopies[language] ?? aboutCopies.en;
}

export function getAboutStructure(about: PortfolioAbout, copy: AboutCopy): AboutStructureItem[] {
  return [
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
}
