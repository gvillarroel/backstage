# backstage

Proof of concept for defining the product's visual style, core pages, and how GitHub repositories are documented as part of a broader experience.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Gateway with summary, navigation cards, repos, diagrams, and all backstage capabilities |
| Models | `models.html` | Model inventory with providers, capabilities, cost, and portfolio state |
| Skills | `skills.html` | Internal skill finder with search, filters, and skill cards |
| Communities | `communities.html` | Community map with guilds, councils, and office hours |
| Agents | `agents.html` | Agent directory with ownership, channels, and lifecycle status |
| Foundations | `foundations.html` | Repository map, architecture diagrams, and governance controls |
| Other | `other.html` | Full component showcase using every backstage capability |
| Docs | `docs.html` | Auto-synced README documentation from GitHub repositories |

## Files

- `AGENTS.md` — repository-level working rules
- `SPECS.md` — source of truth for specifications
- `styles.css` — EFX design system with 55+ CSS custom properties
- `diagrams.js` — shared Mermaid + PlantUML renderer (ESM module)
- `sync-docs.py` — documentation sync script (GitHub → `docs.html`)
- `build.py` — master build script (CSV → HTML + Markdown)

## Data files (`data/`)

All page content is driven by CSV files. Edit these, then run `python build.py`.

| File | Records | Drives |
|------|---------|--------|
| `data/models.csv` | 8 models | `models.html`, `models.md` |
| `data/repositories.csv` | 15 repos | `index.html`, `foundations.html`, `docs.md` |
| `data/communities.csv` | 4 communities | `communities.html`, `communities.md` |
| `data/agents.csv` | 6 agents | `agents.html`, `agents.md` |
| `data/skills.csv` | 4 skills | `skills.html`, `skills.md` |
| `data/capabilities.csv` | 12 capabilities | `index.html`, `foundations.html`, `index.md` |

### Markdown output

Every page has a `.md` twin generated for agent consumption. Links in Markdown
files point to other `.md` files so agents can navigate the full surface.

| HTML | Markdown |
|------|----------|
| `index.html` | `index.md` |
| `models.html` | `models.md` |
| `skills.html` | `skills.md` |
| `communities.html` | `communities.md` |
| `agents.html` | `agents.md` |
| `foundations.html` | `foundations.md` |
| `other.html` | `other.md` |
| `docs.html` | `docs.md` |

## Build

```bash
python build.py              # Full: update HTML + generate Markdown
python build.py --md-only    # Only regenerate .md files
python build.py --html-only  # Only update HTML between markers
python build.py --dry-run    # Preview without writing
```

### Typical workflow

1. Edit a CSV in `data/` (e.g. add a model to `data/models.csv`)
2. Run `python build.py`
3. Open `http://localhost:8090/models.html` to verify HTML
4. Commit the CSV + generated files

## Run

Open via a local HTTP server (required for ESM module imports):

```bash
# Python
python -m http.server 8090

# Node.js
npx serve -p 8090
```

Then open `http://localhost:8090/index.html` in a browser.

> **Note:** Opening `file://` paths directly will not work because `diagrams.js` uses ES module imports which require HTTP.

## Dependencies (CDN)

No `npm install` or local packages are required. All dependencies are loaded from CDN at runtime:

| Dependency | Version | CDN URL | Purpose |
|------------|---------|---------|---------|
| **Open Sans** | Latest | `fonts.googleapis.com/css2?family=Open+Sans` | EFX official typeface (400, 600, 700, 800 weights) |
| **Material Symbols Rounded** | Latest | `fonts.googleapis.com/css2?family=Material+Symbols+Rounded` | Icon font for UI icons |
| **Mermaid.js** | 11.x | `cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs` | Client-side Mermaid diagram rendering |
| **Pako** | 2.1.0 | `cdn.jsdelivr.net/npm/pako@2.1.0/dist/pako.min.js` | Deflate compression for PlantUML encoding |
| **PlantUML Server** | — | `www.plantuml.com/plantuml/svg/` | Server-side PlantUML SVG rendering |

### How diagram rendering works

1. **Mermaid** — `diagrams.js` imports Mermaid as an ESM module and calls `mermaid.initialize()` with EFX brand colors. All `<div class="mermaid">` elements are rendered to SVG on page load.

2. **PlantUML** — `diagrams.js` dynamically loads pako, deflates the PlantUML source text, encodes it with the PlantUML base64 alphabet, and replaces each `.plantuml-code` element with an `<img>` tag pointing to `https://www.plantuml.com/plantuml/svg/{encoded}`.

### EFX design tokens

The CSS defines 55+ custom properties organized into palettes:

- **Brand** — `--efx-brand-red`, `--efx-brand-gray`
- **Primary** — red, orange, yellow, green, blue, purple
- **Gray scale** — 100 through 900
- **Shadow** — darker variants for text on tinted backgrounds
- **Highlight** — lighter variants for badge and status backgrounds
- **Status** — vivid colors for alerts and notifications
- **Semantic** — text, link, border, disabled, background aliases

## Docs sync (`sync-docs.py`)

Fetches README files from GitHub repositories and generates `docs.html`.

### Quick start

```bash
# Sync all configured repos (unauthenticated — 60 req/hr)
python sync-docs.py

# With GitHub token (5000 req/hr)
python sync-docs.py --token ghp_YOUR_TOKEN

# Or via environment variable
export GITHUB_TOKEN=ghp_YOUR_TOKEN
python sync-docs.py
```

### Options

| Flag | Default | Description |
|------|---------|-------------|
| `--owner` | `gvillarroel` | GitHub user/org to fetch repos from |
| `--repos` | 15 configured | Comma-separated repo names to sync |
| `--token` | `$GITHUB_TOKEN` | GitHub personal access token |
| `--output` | `docs.html` | Output HTML file |
| `--dry-run` | — | Print what would be fetched without API calls |

### Scheduling

Run periodically to keep docs fresh:

```bash
# cron (Linux/Mac) — daily at 6:00 AM UTC
0 6 * * * cd /path/to/backstage && python sync-docs.py

# Task Scheduler (Windows) — daily
schtasks /create /tn "SyncDocs" /tr "python C:\path\to\backstage\sync-docs.py" /sc daily /st 06:00

# GitHub Actions — on push or schedule
# See .github/workflows/ for CI example
```

### Adding repositories

Edit the `DEFAULT_REPOS` list in `sync-docs.py` or pass `--repos`:

```bash
python sync-docs.py --repos backstage,knowledge,codex_efx
python sync-docs.py --owner another-org --repos my-repo
```
