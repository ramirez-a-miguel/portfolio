"use client";

import {
  createEmptyProject,
  csvToArray,
  formatPortfolioDraft,
  hasAdminSession,
  linesToArray,
  loadPortfolioContent,
  loginAdmin,
  logoutAdmin,
  parsePortfolioDraft,
  savePortfolioContent,
} from "@/services/admin-portfolio.service";
import type { SaveState } from "@/services/admin-portfolio.service";
import type { PortfolioData, PortfolioProject } from "@/types/portfolio-data";
import { Button, Column, Heading, Row, Text } from "@once-ui-system/core";
import { useEffect, useMemo, useState } from "react";
import styles from "./admin.module.scss";

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <textarea rows={rows} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

export function AdminPortfolioEditor() {
  const [username, setUsername] = useState("miguel");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [content, setContent] = useState<PortfolioData | null>(null);
  const [jsonDraft, setJsonDraft] = useState("");
  const [message, setMessage] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [loading, setLoading] = useState(true);

  const canSave = useMemo(() => Boolean(content && saveState !== "saving"), [content, saveState]);

  useEffect(() => {
    const boot = async () => {
      if (await hasAdminSession()) {
        setIsAuthenticated(true);
        await loadContent();
      }

      setLoading(false);
    };

    boot();
  }, []);

  const syncContent = (nextContent: PortfolioData) => {
    setContent(nextContent);
    setJsonDraft(formatPortfolioDraft(nextContent));
  };

  const loadContent = async () => {
    try {
      syncContent(await loadPortfolioContent());
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load portfolio content.");
    }
  };

  const login = async () => {
    setMessage("");

    try {
      await loginAdmin(username, password);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Login failed. Check ADMIN_USERNAME and ADMIN_PASSWORD.",
      );
      return;
    }

    setIsAuthenticated(true);
    setPassword("");
    await loadContent();
  };

  const logout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
    setContent(null);
    setJsonDraft("");
  };

  const updateContent = (updater: (current: PortfolioData) => PortfolioData) => {
    if (!content) return;

    syncContent(updater(content));
    setSaveState("idle");
  };

  const updateProject = (index: number, project: PortfolioProject) => {
    updateContent((current) => ({
      ...current,
      projects: current.projects.map((item, itemIndex) => (itemIndex === index ? project : item)),
    }));
  };

  const addProject = () => {
    updateContent((current) => ({
      ...current,
      projects: [...current.projects, createEmptyProject(current.projects.length + 1)],
    }));
  };

  const removeProject = (index: number) => {
    updateContent((current) => ({
      ...current,
      projects: current.projects.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const applyJson = () => {
    try {
      syncContent(parsePortfolioDraft(jsonDraft));
      setMessage("JSON applied. Save to publish the changes.");
    } catch {
      setMessage("The JSON is not valid yet.");
    }
  };

  const save = async () => {
    if (!content) return;

    setSaveState("saving");
    setMessage("");

    try {
      syncContent(await savePortfolioContent(content));
    } catch (error) {
      setSaveState("error");
      setMessage(error instanceof Error ? error.message : "Unable to save content.");
      return;
    }

    setSaveState("saved");
    setMessage("Saved. Public pages will use the updated content.");
  };

  if (loading) {
    return (
      <Column maxWidth="s" paddingY="80" gap="16">
        <Heading variant="heading-strong-xl">Portfolio Admin</Heading>
        <Text onBackground="neutral-weak">Checking your session...</Text>
      </Column>
    );
  }

  if (!isAuthenticated) {
    return (
      <Column maxWidth="s" paddingY="80" gap="24" className={styles.shell}>
        <Column gap="8">
          <Heading variant="heading-strong-xl">Portfolio Admin</Heading>
          <Text onBackground="neutral-weak">
            Sign in to edit portfolio copy, project stack notes, and demo links.
          </Text>
        </Column>
        <Column gap="16" className={styles.panel}>
          <Field label="Username" value={username} onChange={setUsername} />
          <Field label="Password" type="password" value={password} onChange={setPassword} />
          {message && <p className={styles.message}>{message}</p>}
          <Button onClick={login}>Log in</Button>
        </Column>
      </Column>
    );
  }

  if (!content) {
    return (
      <Column maxWidth="s" paddingY="80" gap="16">
        <Heading variant="heading-strong-xl">Portfolio Admin</Heading>
        <Button onClick={loadContent}>Reload content</Button>
      </Column>
    );
  }

  return (
    <Column maxWidth="m" paddingY="40" gap="24" className={styles.shell}>
      <Row fillWidth horizontal="between" vertical="center" s={{ direction: "column" }} gap="16">
        <Column gap="8">
          <Heading variant="heading-strong-xl">Portfolio Admin</Heading>
          <Text onBackground="neutral-weak">
            Edit public portfolio information without touching application code.
          </Text>
        </Column>
        <Row gap="8">
          <Button variant="secondary" onClick={logout}>
            Log out
          </Button>
          <Button disabled={!canSave} onClick={save}>
            {saveState === "saving" ? "Saving..." : "Save changes"}
          </Button>
        </Row>
      </Row>

      {message && <p className={styles.message}>{message}</p>}

      <section className={styles.panel}>
        <h2>Profile</h2>
        <div className={styles.grid}>
          <Field
            label="Name"
            value={content.person.name}
            onChange={(value) =>
              updateContent((current) => ({
                ...current,
                person: { ...current.person, name: value },
              }))
            }
          />
          <Field
            label="Role"
            value={content.person.role}
            onChange={(value) =>
              updateContent((current) => ({
                ...current,
                person: { ...current.person, role: value },
              }))
            }
          />
          <Field
            label="Email"
            value={content.person.email}
            onChange={(value) =>
              updateContent((current) => ({
                ...current,
                person: { ...current.person, email: value },
                social: current.social.map((item) =>
                  item.name === "Email" ? { ...item, link: `mailto:${value}` } : item,
                ),
              }))
            }
          />
          <Field
            label="Location"
            value={content.person.location}
            onChange={(value) =>
              updateContent((current) => ({
                ...current,
                person: { ...current.person, location: value },
              }))
            }
          />
        </div>
        <Field
          label="Languages, comma separated"
          value={content.person.languages.join(", ")}
          onChange={(value) =>
            updateContent((current) => ({
              ...current,
              person: { ...current.person, languages: csvToArray(value) },
            }))
          }
        />
      </section>

      <section className={styles.panel}>
        <h2>Homepage</h2>
        <Field
          label="Headline"
          value={content.home.headline}
          onChange={(value) =>
            updateContent((current) => ({ ...current, home: { ...current.home, headline: value } }))
          }
        />
        <TextArea
          label="Subline"
          value={content.home.subline}
          onChange={(value) =>
            updateContent((current) => ({ ...current, home: { ...current.home, subline: value } }))
          }
        />
        <div className={styles.grid}>
          <Field
            label="Featured label"
            value={content.home.featured.label}
            onChange={(value) =>
              updateContent((current) => ({
                ...current,
                home: { ...current.home, featured: { ...current.home.featured, label: value } },
              }))
            }
          />
          <Field
            label="Featured href"
            value={content.home.featured.href}
            onChange={(value) =>
              updateContent((current) => ({
                ...current,
                home: { ...current.home, featured: { ...current.home.featured, href: value } },
              }))
            }
          />
        </div>
      </section>

      <section className={styles.panel}>
        <h2>About Intro</h2>
        <TextArea
          label="Introduction"
          rows={6}
          value={content.about.intro.description}
          onChange={(value) =>
            updateContent((current) => ({
              ...current,
              about: {
                ...current.about,
                intro: { ...current.about.intro, description: value },
              },
            }))
          }
        />
      </section>

      <section className={styles.panel}>
        <Row fillWidth horizontal="between" vertical="center">
          <h2>Projects</h2>
          <Button variant="secondary" onClick={addProject}>
            Add project
          </Button>
        </Row>
        <Column gap="24">
          {content.projects.map((project, index) => (
            <article key={`${project.slug}-${index}`} className={styles.project}>
              <Row fillWidth horizontal="between" vertical="center" gap="16">
                <h3>{project.title || "Untitled project"}</h3>
                <Button variant="secondary" onClick={() => removeProject(index)}>
                  Remove
                </Button>
              </Row>
              <div className={styles.grid}>
                <Field
                  label="Project type: professional or personal"
                  value={project.category ?? "professional"}
                  onChange={(value) =>
                    updateProject(index, {
                      ...project,
                      category: value === "personal" ? "personal" : "professional",
                    })
                  }
                />
                <Field
                  label="Slug"
                  value={project.slug}
                  onChange={(value) => updateProject(index, { ...project, slug: value })}
                />
                <Field
                  label="Published date"
                  type="date"
                  value={project.publishedAt}
                  onChange={(value) => updateProject(index, { ...project, publishedAt: value })}
                />
              </div>
              <Field
                label="Title"
                value={project.title}
                onChange={(value) => updateProject(index, { ...project, title: value })}
              />
              <TextArea
                label="Summary"
                value={project.summary}
                onChange={(value) => updateProject(index, { ...project, summary: value })}
              />
              <Field
                label="Project logo path"
                value={project.logo ?? ""}
                onChange={(value) => updateProject(index, { ...project, logo: value })}
              />
              <Field
                label="Tech stack, comma separated"
                value={project.techStack.join(", ")}
                onChange={(value) =>
                  updateProject(index, { ...project, techStack: csvToArray(value) })
                }
              />
              <div className={styles.grid}>
                <Field
                  label="Vercel demo URL"
                  value={project.demoUrl}
                  onChange={(value) => updateProject(index, { ...project, demoUrl: value })}
                />
                <Field
                  label="Embeddable demo URL"
                  value={project.demoEmbedUrl}
                  onChange={(value) => updateProject(index, { ...project, demoEmbedUrl: value })}
                />
                <Field
                  label="Repository URL"
                  value={project.repositoryUrl}
                  onChange={(value) => updateProject(index, { ...project, repositoryUrl: value })}
                />
                <Field
                  label="Project link"
                  value={project.link}
                  onChange={(value) => updateProject(index, { ...project, link: value })}
                />
              </div>
              <TextArea
                label="Image paths, one per line"
                value={project.images.join("\n")}
                onChange={(value) =>
                  updateProject(index, { ...project, images: linesToArray(value) })
                }
              />
              <TextArea
                label="Case study markdown"
                rows={10}
                value={project.content}
                onChange={(value) => updateProject(index, { ...project, content: value })}
              />
            </article>
          ))}
        </Column>
      </section>

      <section className={styles.panel}>
        <h2>Advanced JSON</h2>
        <Text onBackground="neutral-weak" variant="body-default-s">
          Use this when you want to edit fields that do not have a dedicated control yet.
        </Text>
        <textarea
          className={styles.json}
          rows={18}
          value={jsonDraft}
          onChange={(event) => setJsonDraft(event.target.value)}
        />
        <Row gap="8">
          <Button variant="secondary" onClick={applyJson}>
            Apply JSON
          </Button>
          <Button disabled={!canSave} onClick={save}>
            Save changes
          </Button>
        </Row>
      </section>
    </Column>
  );
}
