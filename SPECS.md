# Specs

## Purpose

This repository is a proof of concept for defining an Equifax AI backstage that:

- documents the visual direction for an AI-focused internal surface
- defines the core AI pages that should exist in the experience
- frames repositories, skills, communities, and agents as connected operating assets

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

## Initial Pages To Document

### Home

Purpose:
Present the Equifax AI backstage vision, main entry points, and key platform signals.

Must include:

- a clear AI product statement
- a summary of the main AI operating pages
- visible metrics or counts that orient the user quickly

### Model Inventory

Purpose:
Show available models with capability, cost, and readiness signals that teams can use for selection.

Must include:

- provider name
- model name
- capability indicators such as tool calling and reasoning
- context or limit information
- an internal portfolio state
- clear source labeling when using external data

### Community Map

Purpose:
Help teams find the right internal AI community, enablement loop, or governance forum.

Must include:

- community name
- purpose
- target audience
- cadence or participation format

### Internal Skill Finder

Purpose:
Make reusable internal AI skills discoverable by outcome, domain, and workflow.

Must include:

- search entry point
- category or filter examples
- sample skill entries
- tags or descriptors that explain reuse value

### Agent Directory

Purpose:
List AI agents as managed assets with ownership, scope, and readiness.

Must include:

- agent name
- owner
- channel or interface
- short purpose statement
- lifecycle or operating status

### Foundations

Purpose:
Connect the visible pages to repositories, governance artifacts, and decision records.

Must include:

- repository or system references
- decision or approval visibility
- control or escalation framing for higher-risk use cases

## POC Deliverable

The first implementation should provide:

- a multipage web experience
- a home page that routes into the initial AI pages
- dedicated pages representing the initial AI topics
- a visible Equifax-aligned visual direction
- sample model, community, skill, and agent data to demonstrate the intended structure

## Notes

- Expand this file as the source of truth for future specifications.
- Keep all specifications in English.
