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

## Files

- `AGENTS.md` — repository-level working rules
- `SPECS.md` — source of truth for specifications
- `styles.css` — EFX design system with 55+ CSS custom properties
- `diagrams.js` — shared Mermaid + PlantUML renderer (ESM module)

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
