# backstage

Backstage-based internal portal for the AI Backstage experience.

## Repo layout

- `backstage-app/` — the actual Backstage application
- `backstage-app/plugins/ai-backstage` — custom frontend plugin and pages
- `backstage-app/plugins/ai-backstage-backend` — backend plugin serving the snapshot
- `data/` — CSV seed data still used by the backend snapshot loader
- `.github/workflows/` — CI and GitHub Pages deployment
- `EFX_BRAND_REFERENCE.md` — Equifax design and palette reference used for the UI

## Current product pages

- `/` — AI Backstage home
- `/models` — model inventory
- `/skills` — skill directory
- `/communities` — community map
- `/agents` — agent directory
- `/foundations` — platform foundations
- `/docs` — documentation hub
- `/platform` — Backstage platform overview, diagrams, and search showcase
- `/showcase` — design and token showcase

## Run locally

```bash
cd backstage-app
corepack yarn install
corepack yarn start
```

## Validate

```bash
cd backstage-app
corepack yarn tsc --pretty false
corepack yarn build:all
```

## GitHub Pages

Pages deploys from `main` using `.github/workflows/pages.yml`.

Expected URL:

`https://gvillarroel.github.io/backstage/`

## Notes

- The repository is now Backstage-only. The old static HTML proof of concept has been removed.
- The backend snapshot loader still reads `data/*.csv` from the repository root.
