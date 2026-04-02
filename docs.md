# Documentation Hub

> Navigation: [Home](index.md) · [Models](models.md) · [Skills](skills.md) · [AI Communities](communities.md) · [Agents](agents.md) · [Foundations](foundations.md) · [Other](other.md) · [Docs](docs.md)

Auto-synced documentation from GitHub repositories.
Run `python sync-docs.py` to refresh README content.

## Repositories

| Name | Owner | Language | Description |
|------|-------|----------|-------------|
| [codex_efx](https://github.com/gvillarroel/codex_efx) | gvillarroel | Python | Codex example using chatbox with Equifax colors. Reference implementation for branded AI interfaces. |
| [knowledge](https://github.com/gvillarroel/knowledge) | gvillarroel | Python | Scripts and skills to help with knowledge bases in markdown. Supports internal knowledge sync. |
| [agent-news](https://github.com/gvillarroel/agent-news) | gvillarroel | ADK | List of agents using Google ADK. Reference for multi-agent patterns and orchestration. |
| [zx-harness](https://github.com/gvillarroel/zx-harness) | gvillarroel | Go Template | Define scripts to orchestrate harness. Evaluation and testing infrastructure for AI workflows. |
| [github-utils](https://github.com/gvillarroel/github-utils) | gvillarroel | Python | GitHub metrics and utilities. Tracks repository health, contributor activity, and AI adoption signals. |
| [hooks-adapter](https://github.com/gvillarroel/hooks-adapter) | gvillarroel | Adapter | Hooks adapter for event-driven integrations. Connects AI pipelines to external triggers. |
| [adk-conn](https://github.com/gvillarroel/adk-conn) | gvillarroel | Python | ADK connections layer. Manages authentication and routing for agent-to-service communication. |
| [pi-extensions](https://github.com/gvillarroel/pi-extensions) | gvillarroel | TypeScript | TypeScript extensions for platform integrations. Reusable modules for backstage plugins. |
| [synthetic-data-for-text](https://github.com/gvillarroel/synthetic-data-for-text) | gvillarroel | Jupyter | Synthetic data generation for text models. Supports evaluation dataset creation and bias testing. |
| [backstage](https://github.com/gvillarroel/backstage) | gvillarroel | HTML | Equifax AI Backstage proof of concept. Defines styling direction and page structure. |
| [television](https://github.com/gvillarroel/television) | gvillarroel | Rust | Terminal UI for fast file preview. Rust-based fuzzy finder for codebases. |
| [astro-gcs](https://github.com/gvillarroel/astro-gcs) | gvillarroel | Astro | Astro site deployed to Google Cloud Storage. Static site hosting reference. |
| [gender_bias](https://github.com/gvillarroel/gender_bias) | gvillarroel | Python | Gender bias analysis in NLP models. Fairness evaluation and mitigation patterns. |
| [feature-construction](https://github.com/gvillarroel/feature-construction) | gvillarroel | Python | Feature engineering pipelines. Automated feature construction for ML models. |
| [ellmtree](https://github.com/gvillarroel/ellmtree) | gvillarroel | Python | LLM tree exploration tool. Visualizes decision paths in language model outputs. |

---

### Sync Instructions

```bash
# Fetch all READMEs and generate docs.html
python sync-docs.py

# With GitHub token for higher rate limits
python sync-docs.py --token ghp_YOUR_TOKEN

# Specific repos only
python sync-docs.py --repos backstage,knowledge,codex_efx
```
