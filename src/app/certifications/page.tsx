import { baseURL, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { Button, Column, Heading, Meta, Row, Tag, Text } from "@once-ui-system/core";
import styles from "./certifications.module.scss";

export const dynamic = "force-dynamic";

const CREDLY_BADGES_URL = "https://www.credly.com/users/miguel-angel-ramirez-pena/badges.json";
const CREDLY_PROFILE_URL = "https://www.credly.com/users/miguel-angel-ramirez-pena/badges#credly";
const ISSUER_ORDER = [
  ["The Linux Foundation"],
  ["Oracle", "Oracle University"],
  ["Amazon Web Services Training and Certification"],
  ["Google Cloud"],
  ["Microsoft"],
  ["O'Reilly Media"],
];

type CredlyBadge = {
  id: string;
  issued_at_date: string;
  expires_at_date: string | null;
  image_url: string;
  badge_template: {
    name: string;
    description: string;
    level?: string | null;
    type_category?: string | null;
  };
  issuer: {
    entities: Array<{
      primary?: boolean;
      entity: {
        name: string;
      };
    }>;
  };
};

type CredlyResponse = {
  data: CredlyBadge[];
  metadata: {
    current_page: number;
    total_count: number;
    total_pages: number;
  };
};

type BadgeView = {
  id: string;
  name: string;
  issuer: string;
  issuedAt: string;
  expiresAt: string | null;
  imageUrl: string;
  description: string;
  level: string | null;
  category: string | null;
  verifyUrl: string;
  skills?: string[];
};

const ORACLE_BADGES: BadgeView[] = [
  {
    id: "oracle-ai-autonomous-database-2025-certified-professional",
    name: "Oracle AI Autonomous Database 2025 Certified Professional",
    issuer: "Oracle University",
    issuedAt: "2025-06-27",
    expiresAt: "2027-06-27",
    imageUrl: "/images/oracle-certifications/OADBC25CP.png",
    description:
      "Demonstrates knowledge required to provision, manage, monitor, and migrate workloads to Oracle AI Autonomous Database.",
    level: "Professional",
    category: "Certification",
    verifyUrl:
      "https://catalog-education.oracle.com/pls/certview/sharebadge?id=12F869E82277CF4924A898289D7F310593BF8AC6AF24D6C3D14363502CBCB10E",
    skills: [
      "AI Autonomous Database",
      "Provisioning",
      "Migration",
      "Monitoring",
      "Database management",
    ],
  },
  {
    id: "oracle-cloud-infrastructure-2025-certified-security-professional",
    name: "Oracle Cloud Infrastructure 2025 Certified Security Professional",
    issuer: "Oracle University",
    issuedAt: "2025-06-19",
    expiresAt: "2027-06-19",
    imageUrl: "/images/oracle-certifications/OCIS2025CP.png",
    description:
      "Validates hands-on knowledge for implementing identity, infrastructure, workload, data protection, detection, remediation, and monitoring solutions in OCI.",
    level: "Professional",
    category: "Certification",
    verifyUrl:
      "https://catalog-education.oracle.com/pls/certview/sharebadge?id=ED72F351C09FB0161951C1D8A288A85536224E11C75CFAA2B06050B80090CFD2",
    skills: ["OCI security", "IAM", "Data protection", "Monitoring", "Remediation"],
  },
  {
    id: "oracle-ai-cloud-database-services-2025-certified-professional",
    name: "Oracle AI Cloud Database Services 2025 Certified Professional",
    issuer: "Oracle University",
    issuedAt: "2025-06-19",
    expiresAt: "2027-06-19",
    imageUrl: "/images/oracle-certifications/ODBCS25CP.png",
    description:
      "Demonstrates the skills required to implement Oracle AI Database Cloud Services on OCI, including Base Database, Exadata, MySQL HeatWave, NoSQL, and Database Management services.",
    level: "Professional",
    category: "Certification",
    verifyUrl:
      "https://catalog-education.oracle.com/pls/certview/sharebadge?id=123FA214200388358C72C1050FB0569EAE18B6FBAA0B61D29135A98B6407CA7C",
    skills: ["Oracle Database", "Exadata", "MySQL HeatWave", "NoSQL", "OCI"],
  },
  {
    id: "oracle-cloud-infrastructure-2025-certified-architect-professional",
    name: "Oracle Cloud Infrastructure 2025 Certified Architect Professional",
    issuer: "Oracle University",
    issuedAt: "2025-06-10",
    expiresAt: "2027-06-10",
    imageUrl: "/images/oracle-certifications/OCICAP2025OPN.png",
    description:
      "Validates hands-on experience to plan, design, implement, and operate OCI solutions across resilient architecture, cloud-native systems, IaC, database services, hybrid cloud, migration, and observability.",
    level: "Professional",
    category: "Certification",
    verifyUrl:
      "https://catalog-education.oracle.com/ords/certview/sharebadge?id=E29CFE3FCCFBF500DC753AD546A67E649D6A7EA8936B53712BD2DB90C35695AB",
    skills: ["OCI architecture", "High availability", "IaC", "Databases", "Observability"],
  },
  {
    id: "oracle-cloud-infrastructure-2025-certified-networking-professional",
    name: "Oracle Cloud Infrastructure 2025 Certified Networking Professional",
    issuer: "Oracle University",
    issuedAt: "2025-05-19",
    expiresAt: "2027-05-19",
    imageUrl: "/images/oracle-certifications/OCI25NWOCP.png",
    description:
      "Validates OCI networking expertise across virtual cloud networks, app services, hybrid architectures, secure connectivity, migration, troubleshooting, and best practices.",
    level: "Professional",
    category: "Certification",
    verifyUrl:
      "https://catalog-education.oracle.com/pls/certview/sharebadge?id=23643E82674EE571733263D810B619F4F538948E89A5D842273C3BE38A52EF24",
    skills: ["OCI networking", "VCN", "Hybrid networking", "Connectivity", "Troubleshooting"],
  },
  {
    id: "oracle-cloud-infrastructure-2025-migration-architect-certified-professional",
    name: "Oracle Cloud Infrastructure 2025 Migration Architect Certified Professional",
    issuer: "Oracle University",
    issuedAt: "2025-05-17",
    expiresAt: "2027-05-17",
    imageUrl: "/images/oracle-certifications/OCI25MAOCP.png",
    description:
      "Designed for migration architects working on OCI workload, network, container, VMware, cloud migration, and database migration scenarios.",
    level: "Professional",
    category: "Certification",
    verifyUrl:
      "https://catalog-education.oracle.com/pls/certview/sharebadge?id=59C3DA2F9C4B1B2382D5F3BDBFFE47A9B1882B550BDAB98398324EBD9578E30B",
    skills: ["OCI migration", "Networking", "OKE", "Oracle Cloud VMware", "Database migration"],
  },
  {
    id: "oracle-cloud-infrastructure-2025-certified-multicloud-architect-professional",
    name: "Oracle Cloud Infrastructure 2025 Certified Multicloud Architect Professional",
    issuer: "Oracle University",
    issuedAt: "2025-05-15",
    expiresAt: "2027-05-15",
    imageUrl: "/images/oracle-certifications/OCI2025MCAOCP.png",
    description:
      "Validates multicloud architecture skills on OCI, including OCI-Azure Interconnect, Oracle Database@Azure, Oracle Interconnect for Google Cloud, and Oracle Database@Google Cloud.",
    level: "Professional",
    category: "Certification",
    verifyUrl:
      "https://catalog-education.oracle.com/pls/certview/sharebadge?id=7F60BDE3D90687DBDE1FBC323D4BCD13C801984196D82CD0B96BE951C1891A87",
    skills: ["Multicloud", "OCI", "Azure Interconnect", "Google Cloud", "Oracle Database"],
  },
  {
    id: "oracle-cloud-infrastructure-2024-certified-ai-foundations-associate",
    name: "Oracle Cloud Infrastructure 2024 Certified AI Foundations Associate",
    issuer: "Oracle University",
    issuedAt: "2024-11-06",
    expiresAt: "2026-11-06",
    imageUrl: "/images/oracle-certifications/OCI24AICFA.png",
    description:
      "Introduces foundational AI and machine learning concepts, large language models, generative AI, and related OCI AI services.",
    level: "Associate",
    category: "Certification",
    verifyUrl:
      "https://catalog-education.oracle.com/pls/certview/sharebadge?id=100D2DDC357E7AD9FA9701DD6AB1844EF4E18AB3453C93C85AD8114BFA8E505C",
    skills: ["AI foundations", "Machine learning", "LLMs", "Generative AI", "OCI AI services"],
  },
];

export async function generateMetadata() {
  return Meta.generate({
    title: `Certifications - ${person.name}`,
    description: `Public certifications and badges earned by ${person.name}`,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(`${person.name} Certifications`)}`,
    path: "/certifications",
  });
}

async function fetchCredlyPage(page: number): Promise<CredlyResponse> {
  const response = await fetch(`${CREDLY_BADGES_URL}?page=${page}`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Credly request failed with ${response.status}`);
  }

  return response.json();
}

async function getBadges(): Promise<BadgeView[]> {
  const firstPage = await fetchCredlyPage(1);
  const remainingPages = await Promise.all(
    Array.from({ length: firstPage.metadata.total_pages - 1 }, (_, index) =>
      fetchCredlyPage(index + 2),
    ),
  );

  return [firstPage, ...remainingPages]
    .flatMap((page) => page.data)
    .map((badge) => {
      const primaryIssuer =
        badge.issuer.entities.find((entity) => entity.primary) ?? badge.issuer.entities[0];

      return {
        id: badge.id,
        name: badge.badge_template.name,
        issuer: primaryIssuer?.entity.name ?? "Credly",
        issuedAt: badge.issued_at_date,
        expiresAt: badge.expires_at_date,
        imageUrl: badge.image_url,
        description: badge.badge_template.description,
        level: badge.badge_template.level ?? null,
        category: badge.badge_template.type_category ?? null,
        verifyUrl: `https://www.credly.com/badges/${badge.id}`,
      };
    })
    .sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime());
}

function groupByIssuer(badges: BadgeView[]) {
  return badges.reduce<Record<string, BadgeView[]>>((groups, badge) => {
    groups[badge.issuer] = groups[badge.issuer] ?? [];
    groups[badge.issuer].push(badge);
    return groups;
  }, {});
}

function getIssuerPriority(issuer: string) {
  const normalizedIssuer = issuer.toLowerCase();
  return ISSUER_ORDER.findIndex((issuerNames) =>
    issuerNames.some((issuerName) => normalizedIssuer.includes(issuerName.toLowerCase())),
  );
}

function getLinuxFoundationBadgePriority(badge: BadgeView) {
  const normalizedName = badge.name.toLowerCase();

  if (normalizedName.includes("advanced cloud engineer")) return 0;
  if (normalizedName.includes("cloud engineer")) return 1;
  if (normalizedName.includes("kubernetes")) return 2;

  return 3;
}

function sortBadgesForIssuer(issuer: string, badges: BadgeView[]) {
  const normalizedIssuer = issuer.toLowerCase();

  return [...badges].sort((a, b) => {
    if (normalizedIssuer.includes("linux foundation")) {
      const priorityDifference =
        getLinuxFoundationBadgePriority(a) - getLinuxFoundationBadgePriority(b);

      if (priorityDifference !== 0) return priorityDifference;
    }

    return new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime();
  });
}

export default async function Certifications() {
  let badges: BadgeView[] = ORACLE_BADGES;
  let error = false;

  try {
    const credlyBadges = await getBadges();
    badges = [
      ...ORACLE_BADGES,
      ...credlyBadges.filter((badge) => !badge.issuer.toLowerCase().includes("oracle")),
    ];
  } catch {
    error = true;
  }

  badges.sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime());

  const groupedBadges = groupByIssuer(badges);
  for (const issuer of Object.keys(groupedBadges)) {
    groupedBadges[issuer] = sortBadgesForIssuer(issuer, groupedBadges[issuer]);
  }

  const issuerNames = Object.keys(groupedBadges).sort((a, b) => {
    const priorityA = getIssuerPriority(a);
    const priorityB = getIssuerPriority(b);

    if (priorityA !== -1 || priorityB !== -1) {
      return (
        (priorityA === -1 ? ISSUER_ORDER.length : priorityA) -
        (priorityB === -1 ? ISSUER_ORDER.length : priorityB)
      );
    }

    return groupedBadges[b].length - groupedBadges[a].length || a.localeCompare(b);
  });

  return (
    <Column maxWidth="l" fillWidth gap="40" paddingTop="24">
      <Column maxWidth="m" gap="16" paddingX="l">
        <Heading variant="display-strong-m">Certifications</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">
          Oracle CertView credentials and public Credly badges earned by {person.name}, grouped by
          issuing organization.
        </Text>
        <Row gap="12" wrap>
          <Button href={CREDLY_PROFILE_URL} prefixIcon="openLink" variant="secondary" size="s">
            View Credly profile
          </Button>
        </Row>
      </Column>

      {error && (
        <Column maxWidth="m" gap="12" paddingX="l">
          <Text variant="body-default-m" onBackground="neutral-weak">
            Credly is not reachable right now. Oracle certifications are still shown from verified
            Oracle CertView links.
          </Text>
        </Column>
      )}

      {badges.length > 0 && (
        <>
          <div className={styles.summary}>
            <div className={styles.summaryItem}>
              <Text variant="heading-strong-l">{badges.length}</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Public badges
              </Text>
            </div>
            <div className={styles.summaryItem}>
              <Text variant="heading-strong-l">{issuerNames.length}</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Issuers
              </Text>
            </div>
            <div className={styles.summaryItem}>
              <Text variant="heading-strong-l">
                {badges[0] ? formatDate(badges[0].issuedAt) : "N/A"}
              </Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Most recent
              </Text>
            </div>
          </div>

          {issuerNames.map((issuer) => (
            <Column key={issuer} className={styles.issuerSection} gap="20" paddingX="l">
              <Row fillWidth horizontal="between" vertical="end" gap="16" wrap>
                <Heading as="h2" variant="display-strong-xs">
                  {issuer}
                </Heading>
                <Tag size="l">{groupedBadges[issuer].length} badges</Tag>
              </Row>

              <div className={styles.grid}>
                {groupedBadges[issuer].map((badge) => (
                  <article className={styles.card} key={badge.id}>
                    <div className={styles.imageWrap}>
                      <img className={styles.badgeImage} src={badge.imageUrl} alt={badge.name} />
                    </div>

                    <Column gap="8">
                      <Text variant="heading-strong-s">{badge.name}</Text>
                      <Row gap="8" wrap>
                        {badge.category && <Tag size="s">{badge.category}</Tag>}
                        {badge.level && <Tag size="s">{badge.level}</Tag>}
                      </Row>
                      {badge.skills && badge.skills.length > 0 && (
                        <Row gap="8" wrap>
                          {badge.skills.slice(0, 4).map((skill) => (
                            <Tag key={`${badge.id}-${skill}`} size="s">
                              {skill}
                            </Tag>
                          ))}
                        </Row>
                      )}
                      <Text variant="body-default-s" onBackground="neutral-weak">
                        Issued {formatDate(badge.issuedAt)}
                        {badge.expiresAt ? ` · Expires ${formatDate(badge.expiresAt)}` : ""}
                      </Text>
                      <Text
                        className={styles.description}
                        variant="body-default-s"
                        onBackground="neutral-weak"
                      >
                        {badge.description}
                      </Text>
                    </Column>

                    <Button
                      href={badge.verifyUrl}
                      prefixIcon="openLink"
                      variant="secondary"
                      size="s"
                    >
                      Verify badge
                    </Button>
                  </article>
                ))}
              </div>
            </Column>
          ))}
        </>
      )}
    </Column>
  );
}
