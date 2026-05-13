export type PortfolioSocialLink = {
  name: string;
  icon: string;
  link: string;
  essential?: boolean;
};

export type PortfolioPerson = {
  firstName: string;
  lastName: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  location: string;
  languages: string[];
};

export type PortfolioHome = {
  path: string;
  image: string;
  label: string;
  title: string;
  description: string;
  headline: string;
  subline: string;
  featured: {
    display: boolean;
    label: string;
    href: string;
  };
};

export type PortfolioExperience = {
  company: string;
  timeframe: string;
  role: string;
  achievements: string[];
};

export type PortfolioStudy = {
  name: string;
  description: string;
};

export type PortfolioSkill = {
  title: string;
  description: string;
  tags: string[];
};

export type PortfolioAbout = {
  path: string;
  label: string;
  title: string;
  description: string;
  tableOfContent: {
    display: boolean;
    subItems: boolean;
  };
  avatar: {
    display: boolean;
  };
  calendar: {
    display: boolean;
    link: string;
  };
  intro: {
    display: boolean;
    title: string;
    description: string;
  };
  work: {
    display: boolean;
    title: string;
    experiences: PortfolioExperience[];
  };
  studies: {
    display: boolean;
    title: string;
    institutions: PortfolioStudy[];
  };
  technical: {
    display: boolean;
    title: string;
    skills: PortfolioSkill[];
  };
};

export type PortfolioProjectTeamMember = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

export type PortfolioProject = {
  category?: "professional" | "personal";
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  content: string;
  logo?: string;
  images: string[];
  link: string;
  demoUrl: string;
  demoEmbedUrl: string;
  repositoryUrl: string;
  techStack: string[];
  team: PortfolioProjectTeamMember[];
};

export type PortfolioWork = {
  path: string;
  label: string;
  title: string;
  description: string;
};

export type PortfolioData = {
  person: PortfolioPerson;
  social: PortfolioSocialLink[];
  home: PortfolioHome;
  about: PortfolioAbout;
  work: PortfolioWork;
  projects: PortfolioProject[];
};
