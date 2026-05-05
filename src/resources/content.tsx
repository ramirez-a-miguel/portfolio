import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Miguel",
  lastName: "Ramirez",
  name: `Miguel Ramirez`,
  role: "Senior Cloud Engineer / Consultant",
  avatar: "/images/avatar.jpg",
  email: "miguel.ramirez@gmx.de",
  location: "Europe/Amsterdam",
  languages: ["Spanish", "German", "English", "Portuguese"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <></>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/miguelangelramirezpena/?locale=en_US",
    essential: true,
  },
  {
    name: "Credly",
    icon: "document",
    link: "/certifications",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Cloud architecture, modernization, and technical advisory</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Oracle Cloud</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Current role
        </Text>
      </Row>
    ),
    href: "/work/oracle-cloud-advisory",
  },
  subline: (
    <>
      I'm Miguel, a Senior Cloud Engineer and Consultant in Amsterdam. I help organizations
      translate complex business needs into cloud strategy, scalable architecture, and
      modernization roadmaps.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} based in Amsterdam, Netherlands`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Miguel is an IT expert with over a decade of experience across the DACH region,
        specializing in technical consulting, cloud strategy, and infrastructure modernization.
        His work bridges business requirements and technical architecture, with a strong focus on
        Oracle Cloud Infrastructure, Kubernetes, enterprise database platforms, and secure
        multi-cloud environments.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Oracle",
        timeframe: "06.2024 - Current",
        role: "Senior Account Cloud Engineer / Senior Technical Solutions Engineer",
        achievements: [
          <>
            Acts as a trusted advisor for customers, working with pre-sales managers, cloud
            architects, and subject matter experts to understand customer objectives and shape
            cloud-native enterprise solutions on Oracle Cloud Infrastructure.
          </>,
          <>
            Designs technical architectures and supports adoption, optimization, and governance for
            OCI, Oracle Database Services, Oracle Autonomous AI Database, and Kubernetes Engine.
          </>,
          <>
            Previously served as Technical Solutions Engineer for database platforms in the DACH
            region, providing on-premises, hybrid, and cloud technology solutions.
          </>,
        ],
        images: [],
      },
      {
        company: "Deloitte Consulting GmbH",
        timeframe: "04.2022 - 05.2024",
        role: "Technical Consultant / Business Analyst",
        achievements: [
          <>
            Delivered enterprise cloud solutions and secure landing zones aligned with BSI
            IT-Grundschutz and BSI C5 standards, including work with AWS Landing Zone Accelerator.
          </>,
          <>
            Built architectural documentation, runbooks, playbooks, CI/CD pipelines, and Cloud
            FinOps reporting with Txture to support cloud operations and cost transparency.
          </>,
          <>
            Collaborated in international agile environments on cloud-native applications and
            infrastructure modernization for automotive sector clients.
          </>,
        ],
        images: [],
      },
       {
        company: "Data Center for the Humanities DCH, University of Cologne, Germany",
        timeframe: "10.2015 - 10.2021",
        role: "Research Assistant and Fullstack Developer",
        achievements: [
          <>
            Scientific Researcher for the BMBF-funded project KA3 at the Cologne Center for Analysis and Archiving of AV Data.
          </>,
          <>
            As part of the project, build a frontend for curating and archiving AV data at the Cologne. The Language Archive Cologne (LAC) was designed for long-term and more intensive use. 
          </>,
          <>
            The project is also testing the use of methods from the field of machine learning to recognize specific phenomena that can facilitate or even replace the process of manual annotation of large amounts of data. The results of the project are the current technical basis of the LAC and the KA3 services for audio analysis.
          </>,
        ],
        images: [],
      }
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "DCI Digital Career Institute",
        description: (
          <>
            AWS re/Start Program in Cloud Computing, Cologne, Germany — completed hands-on
            training across AWS compute, storage, networking, CLI, CDK, SDK, Bash, and Python.
          </>
        ),
      },
      {
        name: "University of Bonn",
        description: (
          <>
            Magister Artium in Communication Sciences and Phonetics with emphasis on Computational
            Linguistics; subsidiary studies in Romance philology and Ethnology.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Cloud Architecture & Advisory",
        description: (
          <>
            Translating customer objectives and business requirements into scalable technical
            architectures, cloud strategy, assessments, and governance models.
          </>
        ),
        tags: [
          { name: "OCI" },
          { name: "AWS" },
          { name: "Hybrid Cloud" },
          { name: "Multi-Cloud" },
        ],
        images: [],
      },
      {
        title: "Cloud Native Engineering",
        description: (
          <>
            Certified Kubernetes and cloud engineer working across Kubernetes, OKE, container
            technologies, CI/CD, automation, and infrastructure modernization.
          </>
        ),
        tags: [
          { name: "CKA" },
          { name: "CKAD" },
          { name: "KCNA" },
          { name: "OKE" },
          { name: "Terraform" },
          { name: "Python" },
        ],
        images: [],
      },
      {
        title: "Enterprise Data Platforms",
        description: (
          <>
            Advising on Oracle database platforms, including Oracle Database, RAC, GoldenGate,
            Autonomous AI Database, database services, and migration architecture.
          </>
        ),
        tags: [
          { name: "Oracle Database" },
          { name: "Oracle RAC" },
          { name: "GoldenGate" },
          { name: "Autonomous Database" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: `${person.name}'s Writing`,
  description: `Writing by ${person.name}`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Work – ${person.name}`,
  description: `Cloud engineering and consulting work by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
