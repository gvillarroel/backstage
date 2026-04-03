# Specs

## Purpose

This repository is a proof of concept for defining an Equifax AI backstage that:

- documents the visual direction for an AI-focused internal surface
- defines the core AI pages that should exist in the experience
- frames repositories, skills, communities, and agents as connected operating assets

For terminology, "backstage" in this spec refers to the open source Backstage platform project at [github.com/backstage/backstage](https://github.com/backstage/backstage), not a generic use of the word.

## Product Framing

The product should feel like an internal operating surface for AI work at Equifax:

- part AI catalog
- part enablement hub
- part governance entry point
- part directory of reusable assets

The experience should not look like a generic admin panel. It should feel structured, minimal, and intentional.

## Visual Direction

### Tone

- Minimal, structured, and trustworthy
- Branded with Equifax visual cues without feeling promotional
- Clear enough for operational use, not just presentation

### Style Principles

- Open Sans as the primary typeface for both headings and body copy
- Equifax red and blue used as controlled accents over calm neutral surfaces
- Square or rectilinear components with restrained elevation
- Strong section separation with light borders and precise spacing
- Good readability on both desktop and mobile

## Content Priorities

- Explain what AI assets exist inside the ecosystem
- Help teams discover models, skills, communities, and agents quickly
- Show ownership, readiness, and reuse opportunities
- Leave room for future governance, metrics, and workflow details

## External Seed Data

- The model inventory may be seeded with publicly available data from [models.dev](https://models.dev/)
- External model data should be clearly labeled as a snapshot, with the access date shown
- Internal portfolio states should be distinguishable from external source data

## Pages

### Home (`index.html`)

Purpose:
Present the Equifax AI backstage vision, main entry points, and key platform signals.

Must include:

- a clear AI product statement
- a summary of the main AI operating pages
- visible metrics or counts that orient the user quickly
- navigation cards linking to each dedicated page
- featured repository cards from the connected repo surface
- a platform capabilities grid showing all available options

### Model Inventory (`models.html`)

Purpose:
Show available models with capability, cost, and readiness signals that teams can use for selection.

Must include:

- provider name
- model name
- capability indicators such as tool calling and reasoning
- context or limit information
- an internal portfolio state
- clear source labeling when using external data

### Community Map (`communities.html`)

Purpose:
Help teams find the right internal AI community, enablement loop, or governance forum.

Must include:

- community name
- purpose
- target audience
- cadence or participation format

### Internal Skill Finder (`skills.html`)

Purpose:
Make reusable internal AI skills discoverable by outcome, domain, and workflow.

Must include:

- search entry point
- category or filter examples
- sample skill entries
- tags or descriptors that explain reuse value

### Agent Directory (`agents.html`)

Purpose:
List AI agents as managed assets with ownership, scope, and readiness.

Must include:

- agent name
- owner
- channel or interface
- short purpose statement
- lifecycle or operating status

### Foundations (`foundations.html`)

Purpose:
Connect the visible pages to repositories, governance artifacts, and decision records.

Must include:

- repository or system references
- decision or approval visibility
- control or escalation framing for higher-risk use cases
- architecture diagrams rendered from Mermaid and PlantUML code

### Documentation Hub (`docs.html`)

Purpose:
Provide auto-synced README documentation from connected GitHub repositories.

Must include:

- a card per repository with collapsible README content
- table of contents linking to each repo section
- sync instructions for refreshing content via `sync-docs.py`
- clear labeling of the source owner and repository language

### Component Showcase (`other.html`)

Purpose:
Demonstrate every available component, layout, status variant, diagram type, and interaction pattern in the design system. Serves as a living reference.

Must include:

- every UI component the backstage supports
- status badge variants with their CSS class names
- full color palette reference
- typography and icon samples
- all supported Mermaid and PlantUML diagram types

## Data Architecture

All page content is driven by CSV files in `data/`. Edit a CSV, then run `python build.py` to regenerate HTML sections and Markdown files.

### CSV Files

| File | Records | Drives |
|------|---------|--------|
| `data/models.csv` | 8 models | `models.html`, `models.md` |
| `data/repositories.csv` | 15 repos | `index.html`, `foundations.html`, `docs.md` |
| `data/communities.csv` | 4 communities | `communities.html`, `communities.md` |
| `data/agents.csv` | 6 agents | `agents.html`, `agents.md` |
| `data/skills.csv` | 4 skills | `skills.html`, `skills.md` |
| `data/capabilities.csv` | 12 capabilities | `index.html`, `index.md` |

### HTML Markers

`build.py` uses `<!-- BEGIN:section -->` / `<!-- END:section -->` comment markers in HTML files to identify regenerable sections. Only content between markers is replaced; surrounding layout is preserved.

### Markdown Output

Every HTML page has a `.md` twin generated for agent consumption. Links in Markdown files point to other `.md` files so agents can navigate the full surface without a browser.

## POC Deliverable

The first implementation should provide:

- a multipage web experience
- a home page that routes into the initial AI pages
- dedicated pages representing the initial AI topics
- a visible Equifax-aligned visual direction
- sample model, community, skill, and agent data to demonstrate the intended structure
- CSV-driven data with a build script to regenerate content
- Markdown twins for every page, suitable for agent navigation

## Notes

- Expand this file as the source of truth for future specifications.
- Keep all specifications in English.
