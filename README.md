# Miguel Ramirez Portfolio

Personal portfolio for Miguel Ramirez, Senior Cloud Engineer / Consultant based in Amsterdam.
The app is intentionally focused on the core portfolio surface: home, about, certifications, and work.

## Development

```bash
npm install
npm run dev
```

Build before pushing:

```bash
npm run build
```

## Architecture

This is a Next.js App Router application with Once UI components.

- `src/app/page.tsx` renders the home page and featured work.
- `src/app/admin/page.tsx` renders the authenticated portfolio editor.
- `src/app/about/page.tsx` renders the CV-style profile from structured content.
- `src/app/certifications/page.tsx` renders certifications from Miguel's Credly badges.
- `src/app/work/page.tsx` lists work case studies.
- `src/app/work/[slug]/page.tsx` renders individual project case studies with tech stack and demo links.
- `src/app/api/admin/*` handles admin login, signed sessions, and content saves.
- `src/app/api/og/*` supports generated Open Graph images and image proxying.
- `src/data/portfolio.json` is the editable content source for Miguel's profile, homepage copy, about intro, and projects.
- `src/lib/portfolio-data.ts` isolates content loading/saving so the storage layer can be swapped later.
- `src/resources/content.tsx` keeps static defaults used by shared configuration and navigation.
- `src/resources/once-ui.config.ts` controls enabled routes, SEO defaults, theme, fonts, and visual effects.
- `src/components` contains shared UI, navigation, MDX rendering, project cards, and about-page helpers.
- `src/utils/utils.ts` loads MDX project entries from `src/app/work/projects`.
- `src/types` defines the content and config shapes used by the app.

## Extending The App

Set these variables in `.env.local` before using the admin editor:

```bash
ADMIN_USERNAME=miguel
ADMIN_PASSWORD=<your-password>
ADMIN_AUTH_SECRET=<long-random-secret>
```

Then open `/admin` while the app is running. The editor can update profile basics, homepage copy, about intro text, project summaries, tech stack tags, repository links, and Vercel demo URLs. Use the advanced JSON editor on that page for fields that do not have a dedicated form control yet.

Projects are stored in `src/data/portfolio.json`. Each project has a `slug`, `techStack`, `demoUrl`, optional `demoEmbedUrl`, `repositoryUrl`, and Markdown `content`.

Local admin saves write back to `src/data/portfolio.json`. On Vercel, serverless file writes are not durable across deployments, so use the isolated `src/lib/portfolio-data.ts` storage boundary to move this to Neon, Upstash Redis, or another persistent store before relying on production editing.

To add a top-level page, create `src/app/<route>/page.tsx`, add the route to `routes` in `src/resources/once-ui.config.ts`, and add a navigation item in `src/components/Header.tsx` if it should appear in the navbar.

The certifications page fetches badge data from Credly in `src/app/certifications/page.tsx`. Update the Credly constants there if the profile or issuer ordering changes.

Set `NEXT_PUBLIC_BASE_URL` for production SEO URLs. Without it, the app falls back to `http://localhost:3000`.

## Source

The portfolio content was updated from `src/assets/cv_ramirez_miguel.pdf`.
