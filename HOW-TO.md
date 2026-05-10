# How To Recreate The f(dx) AI Backstage

This guide recreates the Backstage app in this repository from a clean checkout. It covers the Backstage install, BUI setup, custom AI Backstage pages, data bridge, local run, build, and Playwright validation.

## Prerequisites

- Windows PowerShell, Git, and Node.js 24. The current verified local version is `v24.14.0`.
- Corepack enabled so the committed Yarn release is used.
- Network access for dependency install.

```powershell
corepack enable
node --version
corepack yarn --version
```

Expected Yarn version: `4.4.1`.

## 1. Start From A Clean Checkout

```powershell
git clone <repo-url> backstage
cd backstage
```

The important source folders are:

- `data/` for the CSV seed data that drives the AI pages.
- `backstage-app/` for the Backstage application.
- `backstage-app/plugins/ai-backstage` for the custom frontend plugin.
- `backstage-app/plugins/ai-backstage-backend` for the backend snapshot API.
- `backstage-app/packages/app/src/modules` for app-level auth, navigation, theme, and TechDocs modules.

Do not copy `node_modules`, `dist`, or Playwright report output between machines.

## 2. Install Dependencies

```powershell
cd backstage-app
corepack yarn install --immutable
```

The lockfile installs Backstage `1.49.1` with the new frontend system. Peer dependency warnings are currently expected from the Backstage and Material UI dependency graph; the install must still exit with code `0`.

## 3. Confirm BUI Setup

Backstage UI is configured at the app root, matching the BUI installation guide:

- `backstage-app/packages/app/package.json` includes `@backstage/ui`.
- `backstage-app/packages/app/src/index.tsx` imports `@backstage/ui/css/styles.css` exactly once.
- `backstage-app/packages/app/src/modules/ai-theme/global.css` maps f(dx) visual tokens onto Backstage shell and BUI class surfaces.

Official references used:

- https://ui.backstage.io/
- https://ui.backstage.io/get-started/installation
- https://ui.backstage.io/tokens

## 4. Confirm App Composition

`backstage-app/packages/app/src/App.tsx` creates the Backstage app with:

- `@backstage/frontend-defaults`
- the native catalog plugin
- the custom `ai-backstage` frontend plugin
- app modules for auth, navigation, theme CSS, and TechDocs routing

The custom AI product routes are:

- `/`
- `/models`
- `/skills`
- `/communities`
- `/agents`
- `/foundations`
- `/docs`
- `/platform`
- `/showcase`

The sidebar AI Backstage group must include all of those routes.

## 5. Confirm Data Bridge

The app reads repository-root CSV files through two paths:

- Local Backstage backend API: `plugins/ai-backstage-backend/src/index.ts`
- Static GitHub Pages fallback: `scripts/generate-pages-snapshot.mjs`

The frontend hook is `plugins/ai-backstage/src/hooks/useAiBackstageSnapshot.ts`. It tries the backend API first, then falls back to `/ai-backstage-snapshot.json`.

## 6. Run Locally

```powershell
corepack yarn start
```

Open:

- Frontend: http://localhost:3000
- Backend: http://localhost:7007

## 7. Validate

Run the full validation stack from `backstage-app/`:

```powershell
corepack yarn tsc --pretty false
corepack yarn test --watch=false
corepack yarn build:all
corepack yarn test:e2e
```

The Playwright suite starts the local app/backend, navigates every AI Backstage product route through the sidebar, verifies page-specific content, and fails on visible data or diagram rendering errors.

## 8. Build The Static Pages Bundle

For GitHub Pages or any frontend-only static host:

```powershell
corepack yarn build:pages
Copy-Item packages/app/dist/index.html packages/app/dist/404.html
New-Item packages/app/dist/.nojekyll -ItemType File -Force
```

The GitHub Actions workflow in `.github/workflows/pages.yml` runs the same flow automatically for `main`.

## 9. Replicate In A New Backstage App

If you need to recreate this in a brand-new Backstage scaffold instead of a clean checkout of this repo:

1. Scaffold a Backstage app and enter `backstage-app` when the wizard asks for the app folder name:
   ```powershell
   npx @backstage/create-app@latest
   ```
2. Add `@backstage/ui` and import `@backstage/ui/css/styles.css` once in `packages/app/src/index.tsx`.
3. Copy the committed `data/` directory.
4. Copy `plugins/ai-backstage` and `plugins/ai-backstage-backend`.
5. Copy `packages/app/src/modules`.
6. Replace `packages/app/src/App.tsx` with the committed app composition.
7. Copy `scripts/generate-pages-snapshot.mjs`, `scripts/prepare-pages-dist.mjs`, and `playwright.config.ts`.
8. Merge the scripts and dependencies from the committed `backstage-app/package.json`, `packages/app/package.json`, `packages/backend/package.json`, and both plugin `package.json` files.
9. Merge the app title, organization, auth, catalog, TechDocs, and Pages base URL settings from the committed app config files.
10. Run every command in the validation section before considering the setup complete.

## 10. Done Criteria

The setup is complete only when:

- `corepack yarn tsc --pretty false` exits `0`.
- `corepack yarn test --watch=false` exits `0`.
- `corepack yarn build:all` exits `0`.
- `corepack yarn test:e2e` exits `0`.
- Playwright verifies `/`, `/models`, `/skills`, `/communities`, `/agents`, `/foundations`, `/docs`, `/platform`, and `/showcase` without visible error states.
