# Master Configuration System

## Problem
All page data (models, repos, communities, agents, skills, capabilities) is hardcoded in HTML. User wants editable CSV files as a master config, with a build script that regenerates HTML sections.

## Approach
- Create `data/` directory with one CSV per entity
- Use `<!-- BEGIN:section -->` / `<!-- END:section -->` markers in HTML files
- `build.py` reads CSVs, generates HTML fragments, replaces content between markers
- User edits CSVs → runs `python build.py` → HTML pages updated

## CSV Files
1. `data/models.csv` — 8 models (provider, name, state, capabilities, cost…)
2. `data/repositories.csv` — 15 repos (name, url, description, language, type, pages…)
3. `data/communities.csv` — 4 communities (name, icon, description, cadence, type, link)
4. `data/agents.csv` — 6 agents (name, status, description, owner, channel)
5. `data/skills.csv` — 4 skills (name, description, category, tags)
6. `data/capabilities.csv` — 12 capability cards (icon, name, description, link)

## Todos
- create-csvs: Create all 6 CSV data files
- add-markers: Add BEGIN/END markers to HTML files
- build-script: Create build.py that reads CSVs and regenerates marked sections
- test-build: Run build.py, verify output matches current pages
- update-readme: Document the build workflow
