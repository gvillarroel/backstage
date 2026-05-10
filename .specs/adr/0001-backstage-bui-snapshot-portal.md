# ADR 0001: Backstage BUI Snapshot Portal

## Status

Accepted

## Context

The AI Backstage proof of concept needs to run as a real Backstage app, use Backstage UI at the application root, keep the existing CSV-driven content model, and support both local backend-backed development and static GitHub Pages publishing.

## Decision

- Use the Backstage new frontend system with `createApp` from `@backstage/frontend-defaults`.
- Install `@backstage/ui` in the app package and import `@backstage/ui/css/styles.css` once from `packages/app/src/index.tsx`.
- Implement the AI product surface as a custom frontend plugin at `plugins/ai-backstage`.
- Implement a backend plugin at `plugins/ai-backstage-backend` that loads the repository-root CSV files and exposes a typed snapshot.
- Generate `packages/app/public/ai-backstage-snapshot.json` during static Pages builds so the frontend can fall back when no live backend exists.
- Keep `/docs` as the curated AI Backstage documentation hub and leave native TechDocs available at `/techdocs`.

## Consequences

- The same route components work locally with the backend API and on GitHub Pages with the static snapshot.
- The app can adopt more native Backstage catalog and TechDocs data later without replacing the current product routes.
- BUI global styles are centralized at the app root, avoiding plugin-level duplicate CSS imports.
- Playwright route coverage is the release gate for visible navigation and rendering errors.
