#!/usr/bin/env python3
"""
sync-docs.py — Fetch README files from GitHub repositories and generate docs.html.

Usage:
    python sync-docs.py                      # Sync all configured repos
    python sync-docs.py --owner gvillarroel  # Override owner
    python sync-docs.py --token ghp_xxx      # Use GitHub token for higher rate limits
    python sync-docs.py --repos backstage,knowledge,codex_efx  # Sync specific repos

Environment variables:
    GITHUB_TOKEN  — GitHub personal access token (optional, raises rate limit from 60 to 5000/hr)

Output:
    docs.html     — Static page with rendered README documentation for each repo.
"""

import argparse
import json
import os
import sys
import textwrap
from datetime import datetime, timezone

import requests

# ── Default configuration ──────────────────────────────────────────────────

DEFAULT_OWNER = "gvillarroel"

DEFAULT_REPOS = [
    "backstage",
    "codex_efx",
    "knowledge",
    "agent-news",
    "zx-harness",
    "github-utils",
    "hooks-adapter",
    "adk-conn",
    "pi-extensions",
    "astro-gcs",
    "television",
    "synthetic-data-for-text",
    "gender_bias",
    "feature-construction",
    "ellmtree",
]

GITHUB_API = "https://api.github.com"

# ── Language colors (same as styles.css) ───────────────────────────────────

LANG_CSS_CLASS = {
    "Python": "python",
    "TypeScript": "ts",
    "Go": "go",
    "Go Template": "go",
    "Rust": "rust",
    "Jupyter Notebook": "jupyter",
    "Astro": "astro",
    "PowerShell": "ps",
    "C": "c",
    "Perl": "perl",
}


def github_headers(token=None):
    headers = {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return headers


def github_html_headers(token=None):
    headers = github_headers(token)
    headers["Accept"] = "application/vnd.github.html+json"
    return headers


def fetch_repo_meta(owner, repo, token=None):
    """Fetch repository metadata (description, language, stars, updated_at)."""
    url = f"{GITHUB_API}/repos/{owner}/{repo}"
    resp = requests.get(url, headers=github_headers(token), timeout=15)
    if resp.status_code == 404:
        return None
    resp.raise_for_status()
    data = resp.json()
    return {
        "name": data.get("name", repo),
        "full_name": data.get("full_name", f"{owner}/{repo}"),
        "description": data.get("description", ""),
        "language": data.get("language", ""),
        "html_url": data.get("html_url", f"https://github.com/{owner}/{repo}"),
        "stargazers_count": data.get("stargazers_count", 0),
        "forks_count": data.get("forks_count", 0),
        "updated_at": data.get("updated_at", ""),
        "default_branch": data.get("default_branch", "main"),
        "private": data.get("private", False),
    }


def fetch_readme_html(owner, repo, token=None):
    """Fetch the README rendered as HTML via GitHub API."""
    url = f"{GITHUB_API}/repos/{owner}/{repo}/readme"
    resp = requests.get(url, headers=github_html_headers(token), timeout=15)
    if resp.status_code == 404:
        return None
    resp.raise_for_status()
    return resp.text


def check_rate_limit(token=None):
    """Check remaining API rate limit."""
    url = f"{GITHUB_API}/rate_limit"
    resp = requests.get(url, headers=github_headers(token), timeout=10)
    resp.raise_for_status()
    data = resp.json()
    core = data.get("rate", {})
    return core.get("remaining", 0), core.get("limit", 0)


def format_date(iso_str):
    """Format ISO date to readable short form."""
    if not iso_str:
        return ""
    try:
        dt = datetime.fromisoformat(iso_str.replace("Z", "+00:00"))
        return dt.strftime("%b %d, %Y")
    except (ValueError, TypeError):
        return iso_str[:10]


def lang_dot_class(language):
    return LANG_CSS_CLASS.get(language, "default")


def build_repo_section(meta, readme_html):
    """Build HTML section for a single repository."""
    lang = meta["language"] or "—"
    lang_class = lang_dot_class(lang)
    desc = meta["description"] or "No description provided."
    updated = format_date(meta["updated_at"])
    private_badge = ""
    if meta.get("private"):
        private_badge = ' <span class="table-status evaluation">Private</span>'

    readme_block = ""
    if readme_html:
        readme_block = f"""
          <details open>
            <summary style="cursor:pointer;font-weight:700;margin:12px 0 8px;color:var(--efx-gray-900);">
              README.md
            </summary>
            <div class="readme-content">
              {readme_html}
            </div>
          </details>"""
    else:
        readme_block = """
          <p class="meta" style="margin-top:12px;">No README available.</p>"""

    return f"""
        <article class="card repo-doc-card" id="repo-{meta['name']}">
          <div class="agent-head">
            <div>
              <p class="label">Repository</p>
              <h3><a href="{meta['html_url']}" target="_blank" rel="noreferrer">{meta['full_name']}</a>{private_badge}</h3>
              <p>{desc}</p>
            </div>
          </div>
          <div class="repo-meta" style="margin-top:8px;">
            <span class="lang-badge"><span class="lang-dot {lang_class}"></span> {lang}</span>
            <span class="repo-date">Updated {updated}</span>
          </div>
          {readme_block}
        </article>"""


def build_docs_html(sections, owner, sync_time, stats):
    """Build the complete docs.html page."""
    repo_sections = "\n".join(sections)
    nav_links = ""
    for s in stats:
        nav_links += f'<a href="#repo-{s["name"]}" style="font-size:0.9rem;">{s["name"]}</a> '

    return f"""<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Docs | Equifax AI Backstage</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,300..700,0..1,-50..200"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="styles.css" />
    <style>
      /* ── README content styling ── */
      .readme-content {{
        padding: 16px 20px;
        margin-top: 8px;
        border: 1px solid var(--line);
        border-radius: var(--radius);
        background: var(--surface-strong);
        overflow-x: auto;
        font-size: 0.94rem;
        line-height: 1.7;
      }}
      .readme-content h1,
      .readme-content h2,
      .readme-content h3,
      .readme-content h4 {{
        max-width: none;
        margin-top: 20px;
        margin-bottom: 8px;
      }}
      .readme-content h1 {{ font-size: 1.4rem; }}
      .readme-content h2 {{ font-size: 1.2rem; }}
      .readme-content h3 {{ font-size: 1.05rem; }}
      .readme-content p {{ margin: 8px 0; }}
      .readme-content ul,
      .readme-content ol {{
        padding-left: 24px;
        margin: 8px 0;
      }}
      .readme-content pre {{
        padding: 14px 16px;
        background: var(--efx-gray-900);
        color: var(--efx-gray-100);
        border-radius: var(--radius);
        overflow-x: auto;
        font-family: "Consolas", "Monaco", monospace;
        font-size: 0.85rem;
        line-height: 1.6;
      }}
      .readme-content code {{
        font-family: "Consolas", "Monaco", monospace;
        font-size: 0.88em;
      }}
      .readme-content pre code {{
        padding: 0;
        background: none;
        color: inherit;
      }}
      .readme-content img {{
        max-width: 100%;
        border-radius: var(--radius);
      }}
      .readme-content table {{
        width: 100%;
        border-collapse: collapse;
        margin: 12px 0;
      }}
      .readme-content th,
      .readme-content td {{
        padding: 8px 12px;
        border: 1px solid var(--line);
        text-align: left;
      }}
      .readme-content th {{
        background: var(--efx-gray-100);
        font-weight: 700;
      }}
      .readme-content blockquote {{
        margin: 12px 0;
        padding: 10px 16px;
        border-left: 3px solid var(--efx-primary-blue);
        background: var(--efx-highlights-blue);
        color: var(--efx-gray-800);
      }}
      .readme-content a {{
        color: var(--efx-link-color);
      }}
      .repo-doc-card {{
        border-top: 2px solid rgba(0, 114, 152, 0.64);
      }}
      .repo-toc {{
        display: flex;
        flex-wrap: wrap;
        gap: 8px 16px;
        padding: 12px 0;
      }}
    </style>
  </head>
  <body>
    <div class="page-shell">
      <header class="page-hero">
        <nav class="topbar">
          <a class="brand" href="index.html">
            <span class="material-symbols-rounded brand-icon" aria-hidden="true">rocket_launch</span>
            Equifax AI Backstage
          </a>
          <div class="nav-links">
            <a href="index.html">Home</a>
            <a href="models.html">Models</a>
            <a href="skills.html">Skills</a>
            <a href="communities.html">AI Communities</a>
            <a href="agents.html">Agents</a>
            <a href="foundations.html">Foundations</a>
            <a href="other.html">Other</a>
          </div>
        </nav>

        <div class="page-intro">
          <p class="eyebrow">Auto-synced documentation</p>
          <h1>Repository documentation pulled directly from GitHub.</h1>
          <p class="lede">
            This page is generated by <code>sync-docs.py</code>. Run it to
            refresh README content from the configured repositories.
          </p>
          <p class="meta-note">
            Last synced: {sync_time} · Owner: <a href="https://github.com/{owner}" target="_blank" rel="noreferrer">{owner}</a> · Repos: {len(stats)} synced
          </p>
        </div>
      </header>

      <main>
        <section class="section section-tight">
          <div class="summary-strip">
            <article class="summary-card">
              <p class="label">Repositories</p>
              <strong>{len(stats)}</strong>
              <span>Documentation synced from GitHub</span>
            </article>
            <article class="summary-card">
              <p class="label">With README</p>
              <strong>{sum(1 for s in stats if s['has_readme'])}</strong>
              <span>Repos with README.md rendered below</span>
            </article>
            <article class="summary-card">
              <p class="label">Languages</p>
              <strong>{len(set(s['language'] for s in stats if s['language']))}</strong>
              <span>Unique programming languages across repos</span>
            </article>
            <article class="summary-card">
              <p class="label">Last sync</p>
              <strong>Today</strong>
              <span>{sync_time}</span>
            </article>
          </div>
        </section>

        <section class="section">
          <div class="section-heading">
            <p class="eyebrow">Table of contents</p>
            <h2>Jump to a repository.</h2>
            <div class="repo-toc">
              {nav_links}
            </div>
          </div>

          <div class="grid" style="gap:24px;">
            {repo_sections}
          </div>
        </section>
      </main>
    </div>
  </body>
</html>
"""


def main():
    parser = argparse.ArgumentParser(
        description="Sync GitHub READMEs into docs.html"
    )
    parser.add_argument(
        "--owner",
        default=DEFAULT_OWNER,
        help=f"GitHub owner/org (default: {DEFAULT_OWNER})",
    )
    parser.add_argument(
        "--repos",
        default=None,
        help="Comma-separated repo names to sync (default: all configured)",
    )
    parser.add_argument(
        "--token",
        default=os.environ.get("GITHUB_TOKEN", ""),
        help="GitHub token (or set GITHUB_TOKEN env var)",
    )
    parser.add_argument(
        "--output",
        default="docs.html",
        help="Output HTML file (default: docs.html)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be fetched without making API calls",
    )
    args = parser.parse_args()

    owner = args.owner
    token = args.token or None
    repos = args.repos.split(",") if args.repos else DEFAULT_REPOS
    output = args.output

    # Check rate limit
    if not args.dry_run:
        try:
            remaining, limit = check_rate_limit(token)
            print(f"GitHub API rate limit: {remaining}/{limit} remaining")
            if remaining < len(repos) * 2:
                print(
                    f"WARNING: Need ~{len(repos) * 2} requests but only {remaining} remaining."
                )
                print("Set GITHUB_TOKEN for 5000 req/hr instead of 60.")
                if remaining < 5:
                    print("ERROR: Rate limit too low. Aborting.")
                    sys.exit(1)
        except Exception as e:
            print(f"Warning: Could not check rate limit: {e}")

    if args.dry_run:
        print(f"Would sync {len(repos)} repos from {owner}:")
        for r in repos:
            print(f"  - {owner}/{r}")
        print(f"Output: {output}")
        return

    # Fetch all repos
    sections = []
    stats = []
    for i, repo in enumerate(repos, 1):
        print(f"[{i}/{len(repos)}] Fetching {owner}/{repo}...", end=" ", flush=True)

        meta = fetch_repo_meta(owner, repo, token)
        if meta is None:
            print("NOT FOUND (skipped)")
            continue

        if meta.get("private"):
            if not token:
                print("PRIVATE (skipped, no token)")
                continue
            print("PRIVATE", end=" ", flush=True)

        readme_html = fetch_readme_html(owner, repo, token)
        has_readme = readme_html is not None
        print(f"{'README ✓' if has_readme else 'no README'}")

        sections.append(build_repo_section(meta, readme_html))
        stats.append(
            {
                "name": meta["name"],
                "language": meta["language"],
                "has_readme": has_readme,
            }
        )

    if not sections:
        print("No repos found. Nothing to write.")
        sys.exit(1)

    # Generate HTML
    sync_time = datetime.now(timezone.utc).strftime("%B %d, %Y at %H:%M UTC")
    html = build_docs_html(sections, owner, sync_time, stats)

    with open(output, "w", encoding="utf-8") as f:
        f.write(html)

    print(f"\n✓ Generated {output} with {len(sections)} repositories.")
    print(f"  Open http://localhost:8090/{output} to view.")


if __name__ == "__main__":
    main()
