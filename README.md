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
- `src/app/about/page.tsx` renders the CV-style profile from structured content.
- `src/app/certifications/page.tsx` renders certifications from Miguel's Credly badges.
- `src/app/work/page.tsx` lists work case studies.
- `src/app/work/[slug]/page.tsx` renders individual MDX case studies.
- `src/app/api/og/*` supports generated Open Graph images and image proxying.
- `src/resources/content.tsx` is the main content source for Miguel's profile, social links, home text, about sections, and work metadata.
- `src/resources/once-ui.config.ts` controls enabled routes, SEO defaults, theme, fonts, and visual effects.
- `src/components` contains shared UI, navigation, MDX rendering, project cards, and about-page helpers.
- `src/utils/utils.ts` loads MDX project entries from `src/app/work/projects`.
- `src/types` defines the content and config shapes used by the app.

## Extending The App

Update Miguel's profile, social links, role, work history, studies, and skills in `src/resources/content.tsx`.

Add a work case study by creating a new `.mdx` file in `src/app/work/projects`. The filename becomes the route slug, for example `src/app/work/projects/cloud-migration.mdx` becomes `/work/cloud-migration`.

To add a top-level page, create `src/app/<route>/page.tsx`, add the route to `routes` in `src/resources/once-ui.config.ts`, and add a navigation item in `src/components/Header.tsx` if it should appear in the navbar.

The certifications page fetches badge data from Credly in `src/app/certifications/page.tsx`. Update the Credly constants there if the profile or issuer ordering changes.

Set `NEXT_PUBLIC_BASE_URL` for production SEO URLs. Without it, the app falls back to `http://localhost:3000`.

## Source

The portfolio content was updated from `src/assets/cv_ramirez_miguel.pdf`.
