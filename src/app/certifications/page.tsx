import { baseURL, person } from "@/resources";
import { CREDLY_PROFILE_URL, getCertificationOverview } from "@/services/certifications.service";
import type { BadgeView } from "@/services/certifications.service";
import { formatDate } from "@/utils/formatDate";
import { Button, Column, Heading, Meta, Row, Tag, Text } from "@once-ui-system/core";
import styles from "./certifications.module.scss";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return Meta.generate({
    title: `Certifications - ${person.name}`,
    description: `Public certifications and badges earned by ${person.name}`,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(`${person.name} Certifications`)}`,
    path: "/certifications",
  });
}

function CertificationSummary({
  badgeCount,
  issuerCount,
  mostRecentDate,
}: {
  badgeCount: number;
  issuerCount: number;
  mostRecentDate?: string;
}) {
  return (
    <div className={styles.summary}>
      <div className={styles.summaryItem}>
        <Text variant="heading-strong-l">{badgeCount}</Text>
        <Text variant="body-default-s" onBackground="neutral-weak">
          Public badges
        </Text>
      </div>
      <div className={styles.summaryItem}>
        <Text variant="heading-strong-l">{issuerCount}</Text>
        <Text variant="body-default-s" onBackground="neutral-weak">
          Issuers
        </Text>
      </div>
      <div className={styles.summaryItem}>
        <Text variant="heading-strong-l">
          {mostRecentDate ? formatDate(mostRecentDate) : "N/A"}
        </Text>
        <Text variant="body-default-s" onBackground="neutral-weak">
          Most recent
        </Text>
      </div>
    </div>
  );
}

function BadgeCard({ badge }: { badge: BadgeView }) {
  return (
    <article className={styles.card}>
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
        <Text className={styles.description} variant="body-default-s" onBackground="neutral-weak">
          {badge.description}
        </Text>
      </Column>

      <Button href={badge.verifyUrl} prefixIcon="openLink" variant="secondary" size="s">
        Verify badge
      </Button>
    </article>
  );
}

export default async function Certifications() {
  const { badges, groupedBadges, issuerNames, error } = await getCertificationOverview();

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
          <CertificationSummary
            badgeCount={badges.length}
            issuerCount={issuerNames.length}
            mostRecentDate={badges[0]?.issuedAt}
          />

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
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
            </Column>
          ))}
        </>
      )}
    </Column>
  );
}
