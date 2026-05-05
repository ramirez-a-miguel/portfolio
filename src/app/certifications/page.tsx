import { Button, Column, Heading, Meta, Row, Tag, Text } from "@once-ui-system/core";
import { baseURL, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import styles from "./certifications.module.scss";

export const dynamic = "force-dynamic";

const CREDLY_BADGES_URL = "https://www.credly.com/users/miguel-angel-ramirez-pena/badges.json";
const CREDLY_PROFILE_URL = "https://www.credly.com/users/miguel-angel-ramirez-pena/badges#credly";
const ISSUER_ORDER = ["The Linux Foundation", "O'Reilly Media"];

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
};

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

export default async function Certifications() {
  let badges: BadgeView[] = [];
  let error = false;

  try {
    badges = await getBadges();
  } catch {
    error = true;
  }

  const groupedBadges = groupByIssuer(badges);
  const issuerNames = Object.keys(groupedBadges).sort((a, b) => {
    const priorityA = ISSUER_ORDER.indexOf(a);
    const priorityB = ISSUER_ORDER.indexOf(b);

    if (priorityA !== -1 || priorityB !== -1) {
      return (priorityA === -1 ? ISSUER_ORDER.length : priorityA) -
        (priorityB === -1 ? ISSUER_ORDER.length : priorityB);
    }

    return groupedBadges[b].length - groupedBadges[a].length || a.localeCompare(b);
  });

  return (
    <Column maxWidth="l" fillWidth gap="40" paddingTop="24">
      <Column maxWidth="m" gap="16" paddingX="l">
        <Heading variant="display-strong-m">Certifications</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">
          Public Credly badges earned by {person.name}, pulled directly from Credly and grouped by
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
            Credly is not reachable right now. The profile link above still opens the public badge
            collection.
          </Text>
        </Column>
      )}

      {!error && (
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

                    <Button href={badge.verifyUrl} prefixIcon="openLink" variant="secondary" size="s">
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
