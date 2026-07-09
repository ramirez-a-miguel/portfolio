export const languageCodes = {
  English: "en",
  Spanish: "es",
  German: "de",
  Portuguese: "pt",
  Italian: "it",
  Dutch: "nl",
} as const;

export type LanguageName = keyof typeof languageCodes;
export type LanguageCode = (typeof languageCodes)[LanguageName];

export type TranslationKey =
  | "aboutMiguel"
  | "allProjects"
  | "buildWith"
  | "certifications"
  | "coreStack"
  | "exploreMore"
  | "featuredBadge"
  | "featuredProjects"
  | "featuredProjectsDescription"
  | "home"
  | "homeFeaturedLabel"
  | "homeHeadline"
  | "homeSubline"
  | "impactCardBody"
  | "impactCardTitle"
  | "personalBadge"
  | "personalProjects"
  | "personalProjectsDescription"
  | "projects"
  | "projectStories"
  | "readCaseStudy"
  | "repository"
  | "selectLanguage"
  | "viewProject"
  | "viewProjects"
  | "trustCardBody"
  | "trustCardTitle"
  | "liveDemo";

export const translations: Record<LanguageCode, Record<TranslationKey, string>> = {
  en: {
    aboutMiguel: "About Miguel",
    allProjects: "All projects",
    buildWith: "Build your portfolio with",
    certifications: "Certifications",
    coreStack: "Core stack",
    exploreMore: "Explore more",
    featuredBadge: "Featured",
    featuredProjects: "Featured projects",
    featuredProjectsDescription:
      "Selected work with tech stack notes, case studies, and live demo links.",
    home: "Home",
    homeFeaturedLabel: "Oracle Cloud - Current role",
    homeHeadline: "Cloud architecture, modernization, and technical advisory",
    homeSubline:
      "I'm Miguel, a Senior Cloud Engineer and Consultant in Amsterdam. I help organizations translate complex business needs into cloud strategy, scalable architecture, and modernization roadmaps.",
    impactCardBody: "Architecture should make the next move clearer, faster, and safer.",
    impactCardTitle: "Build for impact",
    personalBadge: "Personal",
    personalProjects: "Personal projects",
    personalProjectsDescription:
      "Independent products and experiments where I can test ideas end to end.",
    projects: "Projects",
    projectStories: "Project stories",
    readCaseStudy: "Read case study",
    repository: "Repository",
    selectLanguage: "Change language to",
    viewProject: "View project",
    viewProjects: "View projects",
    trustCardBody: "Good platforms earn confidence through clarity, resilience, and care.",
    trustCardTitle: "Engineer trust",
    liveDemo: "Live demo",
  },
  es: {
    aboutMiguel: "Sobre Miguel",
    allProjects: "Todos los proyectos",
    buildWith: "Crea tu portfolio con",
    certifications: "Certificaciones",
    coreStack: "Stack principal",
    exploreMore: "Ver más",
    featuredBadge: "Destacado",
    featuredProjects: "Proyectos destacados",
    featuredProjectsDescription:
      "Trabajo seleccionado con notas de stack tecnológico, casos de estudio y enlaces a demos.",
    home: "Inicio",
    homeFeaturedLabel: "Oracle Cloud - Rol actual",
    homeHeadline: "Arquitectura cloud, modernización y asesoría técnica",
    homeSubline:
      "Soy Miguel, Senior Cloud Engineer y Consultant en Amsterdam. Ayudo a organizaciones a convertir necesidades de negocio complejas en estrategia cloud, arquitectura escalable y hojas de ruta de modernización.",
    impactCardBody:
      "La arquitectura debe hacer que el siguiente paso sea más claro, rápido y seguro.",
    impactCardTitle: "Crear impacto",
    personalBadge: "Personal",
    personalProjects: "Proyectos personales",
    personalProjectsDescription:
      "Productos independientes y experimentos donde pruebo ideas de principio a fin.",
    projects: "Proyectos",
    projectStories: "Historias de proyectos",
    readCaseStudy: "Leer caso de estudio",
    repository: "Repositorio",
    selectLanguage: "Cambiar idioma a",
    viewProject: "Ver proyecto",
    viewProjects: "Ver proyectos",
    trustCardBody: "Las buenas plataformas generan confianza con claridad, resiliencia y cuidado.",
    trustCardTitle: "Diseñar confianza",
    liveDemo: "Demo en vivo",
  },
  de: {
    aboutMiguel: "Über Miguel",
    allProjects: "Alle Projekte",
    buildWith: "Erstelle dein Portfolio mit",
    certifications: "Zertifizierungen",
    coreStack: "Kern-Stack",
    exploreMore: "Mehr ansehen",
    featuredBadge: "Ausgewählt",
    featuredProjects: "Ausgewählte Projekte",
    featuredProjectsDescription:
      "Ausgewählte Arbeiten mit Tech-Stack-Notizen, Fallstudien und Links zu Live-Demos.",
    home: "Start",
    homeFeaturedLabel: "Oracle Cloud - Aktuelle Rolle",
    homeHeadline: "Cloud-Architektur, Modernisierung und technische Beratung",
    homeSubline:
      "Ich bin Miguel, Senior Cloud Engineer und Consultant in Amsterdam. Ich helfe Organisationen, komplexe Geschäftsanforderungen in Cloud-Strategie, skalierbare Architektur und Modernisierungs-Roadmaps zu übersetzen.",
    impactCardBody:
      "Architektur sollte den nächsten Schritt klarer, schneller und sicherer machen.",
    impactCardTitle: "Wirkung schaffen",
    personalBadge: "Persönlich",
    personalProjects: "Persönliche Projekte",
    personalProjectsDescription:
      "Eigene Produkte und Experimente, mit denen ich Ideen Ende zu Ende teste.",
    projects: "Projekte",
    projectStories: "Projektgeschichten",
    readCaseStudy: "Fallstudie lesen",
    repository: "Repository",
    selectLanguage: "Sprache wechseln zu",
    viewProject: "Projekt ansehen",
    viewProjects: "Projekte ansehen",
    trustCardBody: "Gute Plattformen schaffen Vertrauen durch Klarheit, Resilienz und Sorgfalt.",
    trustCardTitle: "Vertrauen entwickeln",
    liveDemo: "Live-Demo",
  },
  pt: {
    aboutMiguel: "Sobre Miguel",
    allProjects: "Todos os projetos",
    buildWith: "Crie o seu portfólio com",
    certifications: "Certificações",
    coreStack: "Stack principal",
    exploreMore: "Ver mais",
    featuredBadge: "Destaque",
    featuredProjects: "Projetos em destaque",
    featuredProjectsDescription:
      "Trabalhos selecionados com notas sobre o stack tecnológico, estudos de caso e links para demos.",
    home: "Início",
    homeFeaturedLabel: "Oracle Cloud - Função atual",
    homeHeadline: "Arquitetura cloud, modernização e consultoria técnica",
    homeSubline:
      "Sou Miguel, Senior Cloud Engineer e Consultant em Amsterdã. Ajudo organizações a transformar necessidades de negócio complexas em estratégia cloud, arquitetura escalável e roteiros de modernização.",
    impactCardBody: "A arquitetura deve tornar o próximo passo mais claro, rápido e seguro.",
    impactCardTitle: "Criar impacto",
    personalBadge: "Pessoal",
    personalProjects: "Projetos pessoais",
    personalProjectsDescription:
      "Produtos independentes e experimentos onde testo ideias de ponta a ponta.",
    projects: "Projetos",
    projectStories: "Histórias de projetos",
    readCaseStudy: "Ler estudo de caso",
    repository: "Repositório",
    selectLanguage: "Alterar idioma para",
    viewProject: "Ver projeto",
    viewProjects: "Ver projetos",
    trustCardBody: "Boas plataformas conquistam confiança com clareza, resiliência e cuidado.",
    trustCardTitle: "Projetar confiança",
    liveDemo: "Demo ao vivo",
  },
  it: {
    aboutMiguel: "Chi è Miguel",
    allProjects: "Tutti i progetti",
    buildWith: "Crea il tuo portfolio con",
    certifications: "Certificazioni",
    coreStack: "Stack principale",
    exploreMore: "Scopri di più",
    featuredBadge: "In evidenza",
    featuredProjects: "Progetti in evidenza",
    featuredProjectsDescription:
      "Lavori selezionati con note sullo stack tecnologico, case study e link alle demo live.",
    home: "Home",
    homeFeaturedLabel: "Oracle Cloud - Ruolo attuale",
    homeHeadline: "Architettura cloud, modernizzazione e consulenza tecnica",
    homeSubline:
      "Sono Miguel, Senior Cloud Engineer e Consultant ad Amsterdam. Aiuto le organizzazioni a trasformare esigenze di business complesse in strategia cloud, architetture scalabili e roadmap di modernizzazione.",
    impactCardBody:
      "L'architettura dovrebbe rendere il passo successivo più chiaro, rapido e sicuro.",
    impactCardTitle: "Creare impatto",
    personalBadge: "Personale",
    personalProjects: "Progetti personali",
    personalProjectsDescription:
      "Prodotti indipendenti ed esperimenti in cui posso testare idee end to end.",
    projects: "Progetti",
    projectStories: "Storie di progetto",
    readCaseStudy: "Leggi il case study",
    repository: "Repository",
    selectLanguage: "Cambia lingua in",
    viewProject: "Vedi progetto",
    viewProjects: "Vedi progetti",
    trustCardBody: "Le buone piattaforme conquistano fiducia con chiarezza, resilienza e cura.",
    trustCardTitle: "Progettare fiducia",
    liveDemo: "Demo live",
  },
  nl: {
    aboutMiguel: "Over Miguel",
    allProjects: "Alle projecten",
    buildWith: "Bouw je portfolio met",
    certifications: "Certificeringen",
    coreStack: "Kernstack",
    exploreMore: "Ontdek meer",
    featuredBadge: "Uitgelicht",
    featuredProjects: "Uitgelichte projecten",
    featuredProjectsDescription:
      "Geselecteerd werk met notities over de tech stack, casestudy's en links naar live demo's.",
    home: "Home",
    homeFeaturedLabel: "Oracle Cloud - Huidige rol",
    homeHeadline: "Cloudarchitectuur, modernisering en technisch advies",
    homeSubline:
      "Ik ben Miguel, Senior Cloud Engineer en Consultant in Amsterdam. Ik help organisaties om complexe bedrijfsbehoeften te vertalen naar cloudstrategie, schaalbare architectuur en moderniseringsroadmaps.",
    impactCardBody: "Architectuur moet de volgende stap duidelijker, sneller en veiliger maken.",
    impactCardTitle: "Bouwen voor impact",
    personalBadge: "Persoonlijk",
    personalProjects: "Persoonlijke projecten",
    personalProjectsDescription:
      "Onafhankelijke producten en experimenten waarin ik ideeën end-to-end kan testen.",
    projects: "Projecten",
    projectStories: "Projectverhalen",
    readCaseStudy: "Lees de casestudy",
    repository: "Repository",
    selectLanguage: "Wijzig taal naar",
    viewProject: "Bekijk project",
    viewProjects: "Bekijk projecten",
    trustCardBody: "Goede platforms winnen vertrouwen door duidelijkheid, veerkracht en zorg.",
    trustCardTitle: "Vertrouwen bouwen",
    liveDemo: "Live demo",
  },
};

export function getLanguageCode(language: string): LanguageCode {
  return languageCodes[language as LanguageName] ?? "en";
}
