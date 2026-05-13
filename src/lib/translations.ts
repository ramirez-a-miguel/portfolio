export const languageCodes = {
  English: "en",
  Spanish: "es",
  German: "de",
  Portuguese: "pt",
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
  | "yearsExperience"
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
    yearsExperience: "Years experience",
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
    yearsExperience: "Años de experiencia",
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
    yearsExperience: "Jahre Erfahrung",
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
    yearsExperience: "Anos de experiência",
    liveDemo: "Demo ao vivo",
  },
};

export function getLanguageCode(language: string): LanguageCode {
  return languageCodes[language as LanguageName] ?? "en";
}
