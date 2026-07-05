# Abdalla Nadir — Portfolio

Personal portfolio of Abdalla Nadir, Data Analyst & AI student at Multimedia University, Melaka.

**Live site:** https://abdulla-cc.github.io/abdalla-nadir-portfolio/

## Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — build tool & dev server
- [Tailwind CSS v4](https://tailwindcss.com/) — styling (custom black & gold theme, dark/light mode)
- [Framer Motion](https://motion.dev/) — scroll reveals & modal animations
- [lucide-react](https://lucide.dev/) — icons

## Development

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## Structure

- `src/components/` — one component per section (Hero, About, Skills, Projects, …)
- `src/data/` — typed content: projects, case studies, certifications, skills. **To add a project, edit `src/data/projects.ts` (and `caseStudies.ts`) — no markup changes needed.**
- `src/context/ThemeContext.tsx` — dark/light theme, persisted to localStorage
- `public/` — images, CV, and the database project report

Deployed automatically to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.
