#!/usr/bin/env python3
"""
build.py — Master build script for Equifax AI Backstage.

Reads CSV data files from data/ and:
  1. Regenerates data-driven sections in HTML pages (between markers)
  2. Generates Markdown (.md) files for every page (agent-friendly format)

Usage:
    python build.py              # Full build: HTML markers + Markdown
    python build.py --md-only    # Generate only Markdown files
    python build.py --html-only  # Update only HTML marker sections
    python build.py --dry-run    # Show what would be generated

Markdown files are placed alongside HTML files.  Links inside .md files
point to other .md files so agents can navigate the whole surface.
"""

import argparse
import csv
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).parent
DATA = ROOT / "data"

# ── Status → CSS class mapping ─────────────────────────────────────────

STATUS_CSS = {
    "Approved for build": "approved",
    "Review board": "review",
    "Cost-optimized": "optimized",
    "Preview only": "preview",
    "Open evaluation": "evaluation",
    "Research track": "research",
    "Monitoring": "monitoring",
    "Foundation": "foundation",
    "Production": "approved",
    "Controlled": "review",
    "Pilot": "evaluation",
    "Shared service": "foundation",
    "Discovery": "preview",
    "active": "approved",
}

# ── Language → CSS dot class ───────────────────────────────────────────

LANG_DOT = {
    "Python": "python",
    "TypeScript": "ts",
    "Go": "go",
    "Go Template": "go",
    "Rust": "rust",
    "Jupyter": "jupyter",
    "Jupyter Notebook": "jupyter",
    "Astro": "astro",
    "PowerShell": "ps",
    "C": "c",
    "Perl": "perl",
    "HTML": "default",
    "ADK": "default",
    "Adapter": "default",
}

# ── Helpers ─────────────────────────────────────────────────────────────


def read_csv(name):
    """Read a CSV file from data/ and return list of dicts."""
    path = DATA / name
    if not path.exists():
        print(f"  WARNING: {path} not found, skipping")
        return []
    with open(path, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def lang_dot(lang):
    return LANG_DOT.get(lang, "default")


def status_class(status):
    return STATUS_CSS.get(status, "evaluation")


def shows_on(row, page):
    """Check if a row's show_on field includes the given page."""
    return page in [s.strip() for s in row.get("show_on", "").split(",")]


_UPPER_WORDS = {"ui", "api", "ml", "ai", "adk", "ci", "cd", "sdk", "llm", "id"}


def smart_title(text):
    """Title-case that preserves abbreviations like UI, API, ML."""
    words = text.replace("_", " ").split()
    return " ".join(w.upper() if w.lower() in _UPPER_WORDS else w.capitalize() for w in words)


def esc(text):
    """HTML-escape text."""
    return (
        str(text)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def marker_replace(html, section_name, new_content):
    """Replace content between <!-- BEGIN:name --> and <!-- END:name --> markers."""
    pattern = re.compile(
        rf"(<!-- BEGIN:{re.escape(section_name)} -->)\n.*?\n(\s*<!-- END:{re.escape(section_name)} -->)",
        re.DOTALL,
    )
    replacement = rf"\1\n{new_content}\n\2"
    result, count = pattern.subn(replacement, html)
    return result, count


# ══════════════════════════════════════════════════════════════════════════
#  HTML GENERATORS — produce HTML fragments for marker replacement
# ══════════════════════════════════════════════════════════════════════════


def html_models_table(models):
    """Generate <table> content for models.html."""
    rows = []
    for m in models:
        tool = "✔" if m.get("tool_call", "").lower() == "yes" else "—"
        reason = "✔" if m.get("reasoning", "").lower() == "yes" else "—"
        ctx = f'{int(m.get("context_window", 0)):,}'
        cost = f'${m.get("input_cost_per_1m", "—")}'
        css = status_class(m["portfolio_state"])
        rows.append(
            f"""                <tr>
                  <td>{esc(m['provider'])}</td>
                  <td>{esc(m['model_name'])}</td>
                  <td><span class="table-status {css}">{esc(m['portfolio_state'])}</span></td>
                  <td>{tool}</td>
                  <td>{reason}</td>
                  <td>{esc(m.get('input_types', ''))}</td>
                  <td>{ctx}</td>
                  <td>{cost}</td>
                </tr>"""
        )
    return f"""            <table class="models-table">
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Model</th>
                  <th>Portfolio state</th>
                  <th>Tool call</th>
                  <th>Reasoning</th>
                  <th>Input types</th>
                  <th>Context window</th>
                  <th>Cost / 1 M input</th>
                </tr>
              </thead>
              <tbody>
{chr(10).join(rows)}
              </tbody>
            </table>"""


def html_repo_card(r, label=None):
    """Generate a single repo card article."""
    lbl = label or smart_title(r.get("type", "Repository"))
    dot = lang_dot(r.get("language", ""))
    lang = esc(r.get("language", "—"))
    date_part = ""
    if r.get("date"):
        date_part = f'\n                <span class="repo-date">{esc(r["date"])}</span>'
    return f"""            <article class="card repo-card">
              <p class="label">{esc(lbl)}</p>
              <h3><a href="{esc(r['github_url'])}" target="_blank" rel="noreferrer">{esc(r['name'])}</a></h3>
              <p>{esc(r['description'])}</p>
              <div class="repo-meta">
                <span class="lang-badge"><span class="lang-dot {dot}"></span> {lang}</span>{date_part}
              </div>
            </article>"""


def html_repos_grid(repos, page, css_class="grid cards-3"):
    """Generate repos grid for a page."""
    cards = [html_repo_card(r) for r in repos if shows_on(r, page)]
    return f'          <div class="{css_class}">\n' + "\n".join(cards) + "\n          </div>"


def html_capabilities_grid(caps, page):
    """Generate capabilities/options grid."""
    cards = []
    for c in caps:
        if not shows_on(c, page):
            continue
        link_open = link_close = ""
        if c.get("link"):
            link_open = f'<a href="{esc(c["link"])}">'
            link_close = "</a>"
        cards.append(
            f"""            <article class="card option-card">
              <span class="material-symbols-rounded" aria-hidden="true">{esc(c['icon'])}</span>
              <div>
                <h3>{link_open}{esc(c['name'])}{link_close}</h3>
                <p>{esc(c['description'])}</p>
              </div>
            </article>"""
        )
    return '          <div class="options-grid">\n' + "\n".join(cards) + "\n          </div>"


def html_community_cards(communities):
    """Generate community cards grid."""
    cards = []
    for c in communities:
        icon = c.get("icon", "groups")
        link = c.get("link", "")
        link_label = c.get("link_label", "Join")
        link_html = ""
        if link:
            link_html = f'\n              <p class="meta"><a href="{esc(link)}" target="_blank" rel="noreferrer">{esc(link_label)}</a></p>'
        cards.append(
            f"""            <article class="card community-card">
              <p class="label"><span class="material-symbols-rounded" aria-hidden="true" style="font-size:1.1rem;vertical-align:-2px;margin-right:4px;">{esc(icon)}</span> {esc(smart_title(c.get('type', 'Community')))}</p>
              <h3>{esc(c['name'])}</h3>
              <p>{esc(c['description'])}</p>
              <p class="meta">Cadence: {esc(c.get('cadence', ''))}</p>{link_html}
            </article>"""
        )
    return '          <div class="grid cards-4">\n' + "\n".join(cards) + "\n          </div>"


def html_agent_cards(agents):
    """Generate agent cards grid."""
    cards = []
    for a in agents:
        css = status_class(a["status"])
        cards.append(
            f"""            <article class="card agent-card">
              <div class="agent-head">
                <h3>{esc(a['name'])}</h3>
                <span class="table-status {css}">{esc(a['status'])}</span>
              </div>
              <p>{esc(a['description'])}</p>
              <p class="meta">Owner: {esc(a.get('owner', ''))}</p>
              <p class="meta">Channel: {esc(a.get('channel', ''))}</p>
            </article>"""
        )
    return '          <div class="grid cards-3">\n' + "\n".join(cards) + "\n          </div>"


def html_skill_cards(skills):
    """Generate skill cards container."""
    cards = []
    for s in skills:
        tags = s.get("tags", "")
        cards.append(
            f"""              <article class="skill-card">
                <p class="label">Internal skill</p>
                <h3>{esc(s['name'])}</h3>
                <p>{esc(s['description'])}</p>
                <p class="meta">Tags: {esc(tags)}</p>
              </article>"""
        )
    return '            <div class="skill-results">\n' + "\n".join(cards) + "\n            </div>"


# ══════════════════════════════════════════════════════════════════════════
#  HTML MARKER INSERTION + REPLACEMENT
# ══════════════════════════════════════════════════════════════════════════


def add_markers_if_missing(filepath, sections):
    """Add BEGIN/END markers around sections if they are not yet present.

    sections: list of (marker_name, start_pattern, end_pattern) tuples.
    start_pattern/end_pattern are regex that match the container open/close lines.
    """
    text = filepath.read_text(encoding="utf-8")
    modified = False

    for name, start_pat, end_pat in sections:
        if f"<!-- BEGIN:{name} -->" in text:
            continue

        # Find the start line
        start_match = re.search(start_pat, text)
        if not start_match:
            print(f"    WARNING: Could not find start pattern for {name} in {filepath.name}")
            continue

        # Find the corresponding end after start
        end_match = re.search(end_pat, text[start_match.start() :])
        if not end_match:
            print(f"    WARNING: Could not find end pattern for {name} in {filepath.name}")
            continue

        abs_start = start_match.start()
        abs_end = start_match.start() + end_match.end()

        old_block = text[abs_start:abs_end]
        new_block = f"<!-- BEGIN:{name} -->\n{old_block}\n<!-- END:{name} -->"
        text = text[:abs_start] + new_block + text[abs_end:]
        modified = True

    if modified:
        filepath.write_text(text, encoding="utf-8")
    return modified


def update_html_markers(filepath, section_name, new_content):
    """Replace content between markers in an HTML file."""
    text = filepath.read_text(encoding="utf-8")
    result, count = marker_replace(text, section_name, new_content)
    if count > 0:
        filepath.write_text(result, encoding="utf-8")
    return count


# ══════════════════════════════════════════════════════════════════════════
#  MARKDOWN GENERATORS
# ══════════════════════════════════════════════════════════════════════════

PAGE_MAP = {
    "index": ("Home", "index"),
    "models": ("Models", "models"),
    "skills": ("Skills", "skills"),
    "communities": ("AI Communities", "communities"),
    "agents": ("Agents", "agents"),
    "foundations": ("Foundations", "foundations"),
    "other": ("Other", "other"),
    "docs": ("Docs", "docs"),
}


def md_nav():
    """Generate navigation links bar for Markdown pages."""
    links = [f"[{title}]({slug}.md)" for slug, (title, _) in PAGE_MAP.items()]
    return " · ".join(links)


def md_index(models, repos, caps, communities, agents, skills):
    """Generate index.md — the home page."""
    lines = [
        "# Equifax AI Backstage",
        "",
        f"> Navigation: {md_nav()}",
        "",
        "Internal hub for AI model governance, skill sharing, community coordination, and agent lifecycle management.",
        "",
        "## Summary",
        "",
        f"| Models | Skills | Communities | Agents | Repositories |",
        f"|--------|--------|-------------|--------|--------------|",
        f"| {len(models)} | {len(skills)} | {len(communities)} | {len(agents)} | {len(repos)} |",
        "",
        "---",
        "",
        "## Featured Repositories",
        "",
        "| Name | Language | Description | Updated |",
        "|------|----------|-------------|---------|",
    ]
    for r in repos:
        if shows_on(r, "index"):
            lines.append(
                f"| [{r['name']}]({r['github_url']}) | {r.get('language', '—')} "
                f"| {r['description']} | {r.get('date', '')} |"
            )
    lines += [
        "",
        "---",
        "",
        "## Platform Capabilities",
        "",
        "| Icon | Capability | Description | Link |",
        "|------|------------|-------------|------|",
    ]
    for c in caps:
        if shows_on(c, "index"):
            link = f"[Open]({c['link'].replace('.html', '.md')})" if c.get("link") else "—"
            lines.append(f"| {c['icon']} | **{c['name']}** | {c['description']} | {link} |")
    lines += [
        "",
        "---",
        "",
        f"*See also: [Models](models.md) · [Skills](skills.md) · [Communities](communities.md) · [Agents](agents.md) · [Foundations](foundations.md) · [Docs](docs.md)*",
    ]
    return "\n".join(lines) + "\n"


def md_models(models):
    """Generate models.md — model inventory."""
    lines = [
        "# Model Inventory",
        "",
        f"> Navigation: {md_nav()}",
        "",
        "Browse, compare, and select AI models by provider, cost, capability, and internal approval state.",
        "",
        f"**{len(models)} models** across {len(set(m['provider'] for m in models))} providers.",
        "",
        "## Models",
        "",
        "| Provider | Model | Portfolio State | Tool Call | Reasoning | Input Types | Context Window | Cost/1M Input |",
        "|----------|-------|-----------------|-----------|-----------|-------------|----------------|---------------|",
    ]
    for m in models:
        tool = "✔" if m.get("tool_call", "").lower() == "yes" else "—"
        reason = "✔" if m.get("reasoning", "").lower() == "yes" else "—"
        ctx = f'{int(m.get("context_window", 0)):,}'
        cost = f'${m.get("input_cost_per_1m", "—")}'
        lines.append(
            f"| {m['provider']} | {m['model_name']} | {m['portfolio_state']} "
            f"| {tool} | {reason} | {m.get('input_types', '')} | {ctx} | {cost} |"
        )
    if any(m.get("notes") for m in models):
        lines += ["", "### Notes", ""]
        for m in models:
            if m.get("notes"):
                lines.append(f"- **{m['model_name']}**: {m['notes']}")
    lines += [
        "",
        "---",
        "",
        "## Portfolio States",
        "",
        "| State | Meaning |",
        "|-------|---------|",
        "| Approved for build | Cleared for production use |",
        "| Review board | Under governance review |",
        "| Cost-optimized | Selected for cost efficiency |",
        "| Preview only | Available for testing, not production |",
        "| Open evaluation | Community evaluation in progress |",
        "| Research track | Research use only |",
        "| Monitoring | Being monitored for suitability |",
        "| Foundation | Infrastructure/embedding model |",
    ]
    return "\n".join(lines) + "\n"


def md_skills(skills):
    """Generate skills.md — skill finder."""
    lines = [
        "# Skill Finder",
        "",
        f"> Navigation: {md_nav()}",
        "",
        "Discover reusable prompts, workflow templates, guardrails, and orchestration patterns by domain.",
        "",
        f"**{len(skills)} internal skills** available.",
        "",
        "## Skills",
        "",
        "| Skill | Category | Description | Tags |",
        "|-------|----------|-------------|------|",
    ]
    for s in skills:
        tags = ", ".join(f"`{t.strip()}`" for t in s.get("tags", "").split(",") if t.strip())
        lines.append(f"| **{s['name']}** | {s.get('category', '')} | {s['description']} | {tags} |")
    lines += [
        "",
        "---",
        "",
        "### Categories",
        "",
    ]
    cats = sorted(set(s.get("category", "") for s in skills if s.get("category")))
    for cat in cats:
        count = sum(1 for s in skills if s.get("category") == cat)
        lines.append(f"- **{cat}** — {count} skill(s)")
    return "\n".join(lines) + "\n"


def md_communities(communities):
    """Generate communities.md — AI communities."""
    lines = [
        "# AI Communities",
        "",
        f"> Navigation: {md_nav()}",
        "",
        "Find guilds, office hours, review councils, and enablement channels for AI work.",
        "",
        f"**{len(communities)} active communities.**",
        "",
        "## Communities",
        "",
    ]
    for c in communities:
        ctype = smart_title(c.get("type", "community"))
        lines += [
            f"### {c['name']}",
            "",
            f"- **Type:** {ctype}",
            f"- **Cadence:** {c.get('cadence', '—')}",
            f"- **Description:** {c['description']}",
        ]
        if c.get("link"):
            lines.append(f"- **Link:** [{c.get('link_label', 'Join')}]({c['link']})")
        lines.append("")
    lines += [
        "---",
        "",
        "## Summary",
        "",
        "| Community | Type | Cadence |",
        "|-----------|------|---------|",
    ]
    for c in communities:
        ctype = smart_title(c.get("type", "community"))
        lines.append(f"| {c['name']} | {ctype} | {c.get('cadence', '')} |")
    return "\n".join(lines) + "\n"


def md_agents(agents):
    """Generate agents.md — agent directory."""
    lines = [
        "# Agent Directory",
        "",
        f"> Navigation: {md_nav()}",
        "",
        "Track agents as managed products with owners, channels, risk posture, and production status.",
        "",
        f"**{len(agents)} agents** in the directory.",
        "",
        "## Agents",
        "",
        "| Agent | Status | Owner | Channel | Description |",
        "|-------|--------|-------|---------|-------------|",
    ]
    for a in agents:
        lines.append(
            f"| **{a['name']}** | {a['status']} | {a.get('owner', '')} "
            f"| {a.get('channel', '')} | {a['description']} |"
        )
    lines += ["", "---", "", "## Agent Details", ""]
    for a in agents:
        lines += [
            f"### {a['name']}",
            "",
            f"- **Status:** {a['status']}",
            f"- **Owner:** {a.get('owner', '—')}",
            f"- **Channel:** {a.get('channel', '—')}",
            f"- **Description:** {a['description']}",
            "",
        ]
    return "\n".join(lines) + "\n"


def md_foundations(repos, caps):
    """Generate foundations.md — repository map and governance."""
    lines = [
        "# Foundations",
        "",
        f"> Navigation: {md_nav()}",
        "",
        "Repository map, architecture diagrams, and governance controls.",
        "",
        "## Repository Map",
        "",
        "| Name | Type | Language | Description |",
        "|------|------|----------|-------------|",
    ]
    for r in repos:
        if shows_on(r, "foundations"):
            rtype = smart_title(r.get("type", ""))
            lines.append(
                f"| [{r['name']}]({r['github_url']}) | {rtype} | {r.get('language', '—')} | {r['description']} |"
            )
    lines += [
        "",
        "---",
        "",
        "## Governance Capabilities",
        "",
        "| Capability | Description |",
        "|------------|-------------|",
    ]
    for c in caps:
        if shows_on(c, "foundations"):
            lines.append(f"| **{c['name']}** | {c['description']} |")
    return "\n".join(lines) + "\n"


def md_docs(repos):
    """Generate docs.md — documentation index."""
    lines = [
        "# Documentation Hub",
        "",
        f"> Navigation: {md_nav()}",
        "",
        "Auto-synced documentation from GitHub repositories.",
        "Run `python sync-docs.py` to refresh README content.",
        "",
        "## Repositories",
        "",
        "| Name | Owner | Language | Description |",
        "|------|-------|----------|-------------|",
    ]
    for r in repos:
        lines.append(
            f"| [{r['name']}]({r['github_url']}) | {r.get('owner', '')} "
            f"| {r.get('language', '—')} | {r['description']} |"
        )
    lines += [
        "",
        "---",
        "",
        "### Sync Instructions",
        "",
        "```bash",
        "# Fetch all READMEs and generate docs.html",
        "python sync-docs.py",
        "",
        "# With GitHub token for higher rate limits",
        "python sync-docs.py --token ghp_YOUR_TOKEN",
        "",
        "# Specific repos only",
        "python sync-docs.py --repos backstage,knowledge,codex_efx",
        "```",
    ]
    return "\n".join(lines) + "\n"


def md_other():
    """Generate other.md — component reference."""
    lines = [
        "# Other — Component Reference",
        "",
        f"> Navigation: {md_nav()}",
        "",
        "Full component showcase demonstrating every backstage capability.",
        "",
        "## Available Components",
        "",
        "| Component | Description |",
        "|-----------|-------------|",
        "| Summary Strip | Key metrics in a horizontal card row |",
        "| Feature Cards | Accent and default card variants with icons |",
        "| Status Badges | 9 lifecycle states with color coding |",
        "| Page Link Cards | Navigation cards to major sections |",
        "| Split Layout | Two-column content with heading + detail |",
        "| Data Table | Sortable tables with status columns |",
        "| Search Panel | Search input with filter chips |",
        "| Agent Cards | Agent cards with status, owner, channel |",
        "| Community Cards | Community cards with cadence and type |",
        "| Repo Cards | Repository cards with language dots and dates |",
        "| Options Grid | Icon + text cards for capabilities |",
        "| Mermaid Diagrams | Flowchart, sequence, class, pie, journey, gantt, gitgraph, mindmap |",
        "| PlantUML Diagrams | Use case, activity, component diagrams |",
        "| Color Palette | Full EFX brand color reference |",
        "| Typography | Font scale and weight reference |",
        "| Icons | Material Symbols Rounded icon set |",
        "",
        "---",
        "",
        "## Status Badge Reference",
        "",
        "| Badge | CSS Class | Usage |",
        "|-------|-----------|-------|",
        "| Approved for build | `approved` | Production-ready |",
        "| Review board | `review` | Under review |",
        "| Cost-optimized | `optimized` | Cost-efficient choice |",
        "| Preview only | `preview` | Testing only |",
        "| Open evaluation | `evaluation` | Being evaluated |",
        "| Research track | `research` | Research use |",
        "| Monitoring | `monitoring` | Under monitoring |",
        "| Foundation | `foundation` | Infrastructure |",
        "| Deprecated | `deprecated` | End of life |",
        "",
        "## Diagram Support",
        "",
        "| Engine | Format | Rendering |",
        "|--------|--------|-----------|",
        "| Mermaid | Flowchart, Sequence, Class, State, ER, Pie, Journey, Gantt, Git Graph, Mindmap, Timeline, Quadrant | Client-side (CDN) |",
        "| PlantUML | Use Case, Activity, Sequence, Class, Component, State, Object, Deployment, Timing | Server-side (plantuml.com) |",
    ]
    return "\n".join(lines) + "\n"


# ══════════════════════════════════════════════════════════════════════════
#  MAIN BUILD PIPELINE
# ══════════════════════════════════════════════════════════════════════════


def add_all_markers():
    """Insert markers into HTML files where missing."""
    print("Adding HTML markers...")

    marker_defs = {
        "models.html": [
            ("models", r'<table class="models-table">', r"</table>"),
        ],
        "index.html": [
            ("index-repos", r'<div class="grid cards-3">\s*\n\s*<article class="card repo-card">', r"</article>\s*\n\s*</div>"),
            ("index-capabilities", r'<div class="options-grid">', r"</article>\s*\n\s*</div>"),
        ],
        "communities.html": [
            ("communities", r'<div class="grid cards-4">', r"</article>\s*\n\s*</div>"),
        ],
        "agents.html": [
            ("agents", r'<div class="grid cards-3">\s*\n\s*<article class="card agent-card">', r"</article>\s*\n\s*</div>"),
        ],
        "skills.html": [
            ("skills", r'<div class="skill-results">', r"</article>\s*\n\s*</div>"),
        ],
        "foundations.html": [
            ("foundations-repos", r'<div class="grid cards-4">\s*\n\s*<article class="card repo-card">', r"</article>\s*\n\s*</div>"),
        ],
    }

    for filename, sections in marker_defs.items():
        filepath = ROOT / filename
        if not filepath.exists():
            print(f"  SKIP: {filename} not found")
            continue
        modified = add_markers_if_missing(filepath, sections)
        print(f"  {filename}: {'markers added' if modified else 'already has markers'}")


def build_html(models, repos, caps, communities, agents, skills):
    """Update HTML files between markers."""
    print("\nUpdating HTML sections...")

    updates = [
        ("models.html", "models", html_models_table(models)),
        ("index.html", "index-repos", html_repos_grid(repos, "index", "grid cards-3")),
        ("index.html", "index-capabilities", html_capabilities_grid(caps, "index")),
        ("communities.html", "communities", html_community_cards(communities)),
        ("agents.html", "agents", html_agent_cards(agents)),
        ("skills.html", "skills", html_skill_cards(skills)),
        ("foundations.html", "foundations-repos", html_repos_grid(repos, "foundations", "grid cards-4")),
    ]

    for filename, section, content in updates:
        filepath = ROOT / filename
        if not filepath.exists():
            print(f"  SKIP: {filename} not found")
            continue
        count = update_html_markers(filepath, section, content)
        if count:
            print(f"  {filename} [{section}]: updated")
        else:
            print(f"  {filename} [{section}]: no markers found (run with --add-markers first)")


def build_markdown(models, repos, caps, communities, agents, skills):
    """Generate Markdown files for all pages."""
    print("\nGenerating Markdown files...")

    md_files = {
        "index.md": md_index(models, repos, caps, communities, agents, skills),
        "models.md": md_models(models),
        "skills.md": md_skills(skills),
        "communities.md": md_communities(communities),
        "agents.md": md_agents(agents),
        "foundations.md": md_foundations(repos, caps),
        "docs.md": md_docs(repos),
        "other.md": md_other(),
    }

    for filename, content in md_files.items():
        filepath = ROOT / filename
        filepath.write_text(content, encoding="utf-8")
        print(f"  {filename}: {len(content):,} chars")

    print(f"\n  ✓ {len(md_files)} Markdown files generated.")


def main():
    parser = argparse.ArgumentParser(description="Build Equifax AI Backstage pages from CSV data")
    parser.add_argument("--md-only", action="store_true", help="Generate only Markdown files")
    parser.add_argument("--html-only", action="store_true", help="Update only HTML marker sections")
    parser.add_argument("--add-markers", action="store_true", help="Insert markers into HTML files")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be generated")
    args = parser.parse_args()

    # Read all CSVs
    print("Reading CSV data...")
    models = read_csv("models.csv")
    repos = read_csv("repositories.csv")
    caps = read_csv("capabilities.csv")
    communities = read_csv("communities.csv")
    agents = read_csv("agents.csv")
    skills = read_csv("skills.csv")

    print(f"  models: {len(models)}, repos: {len(repos)}, capabilities: {len(caps)}")
    print(f"  communities: {len(communities)}, agents: {len(agents)}, skills: {len(skills)}")

    if args.dry_run:
        print("\n[DRY RUN] Would generate:")
        print("  HTML updates: models.html, index.html (2), communities.html, agents.html, skills.html, foundations.html")
        print("  Markdown files: index.md, models.md, skills.md, communities.md, agents.md, foundations.md, docs.md, other.md")
        return

    if args.add_markers:
        add_all_markers()
        return

    if args.md_only:
        build_markdown(models, repos, caps, communities, agents, skills)
    elif args.html_only:
        build_html(models, repos, caps, communities, agents, skills)
    else:
        add_all_markers()
        build_html(models, repos, caps, communities, agents, skills)
        build_markdown(models, repos, caps, communities, agents, skills)

    print("\n✓ Build complete.")


if __name__ == "__main__":
    main()
