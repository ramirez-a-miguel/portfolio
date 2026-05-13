"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Icon, IconButton, Line, Row, Text, ToggleButton } from "@once-ui-system/core";

import { display, person, routes, social } from "@/resources";
import styles from "./Header.module.scss";
import { useLanguage } from "./LanguageProvider";
import { ThemeToggle } from "./ThemeToggle";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = new Intl.DateTimeFormat(locale, {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);
      const date = new Intl.DateTimeFormat(locale, {
        timeZone,
        weekday: "short",
        day: "2-digit",
        month: "short",
      }).format(now);

      setDateTime({ date, time });
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000 * 30);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  const city = timeZone.split("/").at(-1)?.replaceAll("_", " ") ?? timeZone;

  return (
    <div className={styles.timePill} suppressHydrationWarning>
      <span className={styles.flag} aria-label="Netherlands">
        🇳🇱
      </span>
      <span className={styles.locationName}>{city}</span>
      <span className={styles.timeDivider} aria-hidden="true" />
      <span className={styles.dateGroup}>
        <Icon name="calendar" size="xs" onBackground="neutral-weak" />
        <Text variant="body-default-xs" onBackground="neutral-weak">
          {dateTime.date || "Today"}
        </Text>
      </span>
      <span className={styles.timeGroup}>
        <Icon name="clock" size="xs" onBackground="brand-weak" />
        <Text variant="label-strong-s">{dateTime.time || "--:--"}</Text>
      </span>
    </div>
  );
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  const navbarSocial = social.filter((item) => item.name === "LinkedIn");
  const { t } = useLanguage();

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{
          position: "fixed",
        }}
      >
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Row s={{ hide: true }} />}
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="person"
                      href="/about"
                      label={t("aboutMiguel")}
                      selected={pathname === "/about"}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="person"
                      href="/about"
                      selected={pathname === "/about"}
                    />
                  </Row>
                </>
              )}
              {routes["/work"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      label={t("projects")}
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      selected={pathname.startsWith("/work")}
                    />
                  </Row>
                </>
              )}
              {routes["/certifications"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="document"
                      href="/certifications"
                      label={t("certifications")}
                      selected={pathname.startsWith("/certifications")}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="document"
                      href="/certifications"
                      selected={pathname.startsWith("/certifications")}
                    />
                  </Row>
                </>
              )}
              {navbarSocial.length > 0 && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  {navbarSocial.map(
                    (item) =>
                      item.link && (
                        <IconButton
                          key={item.name}
                          href={item.link}
                          icon={item.icon}
                          tooltip={item.name}
                          size="s"
                          variant="ghost"
                        />
                      ),
                  )}
                </>
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex s={{ hide: true }}>
              {display.time && <TimeDisplay timeZone={person.location} />}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
