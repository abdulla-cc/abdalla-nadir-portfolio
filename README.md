# Abdalla Nadir — Portfolio

Personal portfolio of Abdalla Nadir, a Computer Science (AI) student passionate about machine learning, software engineering, data analysis, and AI engineering.

**Live site:** https://abdulla-cc.github.io/abdalla-nadir-portfolio/

## Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — build tool & dev server
- [Tailwind CSS v4](https://tailwindcss.com/) — styling (custom black & gold theme, dark/light mode)
- [Framer Motion](https://motion.dev/) — scroll reveals & modal animations
- [lucide-react](https://lucide.dev/) — icons

## Development

```bash
npm ci
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

## Verification

Use Node.js 22 or newer (CI uses Node 22). From the repository folder in Git Bash:

```bash
npx playwright install chromium
npm run build
npm test
```

The tests start their own production preview at `http://127.0.0.1:4173/abdalla-nadir-portfolio/`.
Close another preview on port 4173 before testing. Tests cover contact success/failure handling,
keyboard navigation, dialogs, narrow screens, themes, shipped assets, and accessibility.
Every contact request is intercepted locally: tests never email the owner.
Failed tests save screenshots, traces, and an HTML report in `playwright-report/`.

Pull requests run the same build and browser checks. Only a passing build on `main` can deploy;
pull requests have no Pages deployment permissions. Run `npm audit` to check current dependency advisories.

## Content and service boundaries

- `src/data/profile.ts` contains the CGPA and derives project/credential counts from the displayed data.
- Keep case-study claims tied to repository evidence. Test counts are recorded project snapshots,
  not proof of production reliability. ML metrics need dataset, split, baseline, and evaluation artifacts.
- The contact form uses FormSubmit. The recipient must complete its one-time activation email.
  A successful API acknowledgement means acceptance by the service, not guaranteed inbox delivery.
  Real delivery must be checked by the owner; the mailto links work independently of this service.
- Render/Streamlit demos depend on external services and may sleep or be unavailable.
- `public/db-project/` is a separate Job Application System demo, not the Student Management System.
  Its SQL export includes five tables and one trigger, with no interviewer table or stored routines.
  Import it only into a new disposable database: the dump drops its named tables on re-import.
