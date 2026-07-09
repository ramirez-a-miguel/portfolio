export type CoreStackTechnology = {
  name: string;
  label: string;
  logo: string;
  docsUrl: string;
};

export const coreStack: CoreStackTechnology[] = [
  {
    name: "K8s",
    label: "Kubernetes",
    logo: "/logos/kubernetes.svg",
    docsUrl: "https://kubernetes.io/docs/",
  },
  {
    name: "AWS",
    label: "Amazon Web Services",
    logo: "/logos/aws.svg",
    docsUrl: "https://docs.aws.amazon.com/",
  },
  {
    name: "OCI",
    label: "Oracle Cloud Infrastructure",
    logo: "/logos/oracle.svg",
    docsUrl: "https://docs.oracle.com/iaas/Content/",
  },
  {
    name: "DevSecOps",
    label: "Security-first delivery",
    logo: "/logos/devsecops.svg",
    docsUrl: "https://owasp.org/www-project-devsecops-guideline/",
  },
  {
    name: "Azure DevOps",
    label: "Azure DevOps",
    logo: "/logos/azure-devops.svg",
    docsUrl: "https://learn.microsoft.com/en-us/azure/devops/?view=azure-devops",
  },
  {
    name: "GCP",
    label: "Google Cloud Platform",
    logo: "/logos/gcp.svg",
    docsUrl: "https://cloud.google.com/docs/",
  },
  {
    name: "Angular",
    label: "Angular",
    logo: "/logos/angular.svg",
    docsUrl: "https://angular.dev/overview",
  },
  {
    name: "Python",
    label: "Python",
    logo: "/logos/python.svg",
    docsUrl: "https://docs.python.org/3/",
  },
];
