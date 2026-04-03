# Example Website

`example-website` is the sample `Component` used to demonstrate local TechDocs inside this Backstage environment.

## What This Page Proves

- TechDocs can resolve documentation from a catalog entity annotation.
- Local generation works without Docker when `mkdocs-techdocs-core` is available.
- Published docs are served back through the TechDocs backend, not from a static hand-wired page.

## Entity Summary

| Field | Value |
| --- | --- |
| Kind | `Component` |
| Name | `example-website` |
| Namespace | `default` |
| Owner | `guests` |
| Lifecycle | `experimental` |

## Source Layout

The documentation source for this example lives in `examples/example-docs`.

```text
examples/
  entities.yaml
  example-docs/
    mkdocs.yml
    docs/
      index.md
```

The catalog entity is declared in `examples/entities.yaml` and points to this folder through the `backstage.io/techdocs-ref` annotation.

## Local Development Notes

If this page stops rendering in local development, check these items first:

1. `app-config.yaml` must keep `techdocs.builder` as `local`.
2. `techdocs.generator.runIn` must be `local` unless Docker is intentionally available.
3. Python needs `mkdocs-techdocs-core` installed.

## Why This Matters

This route is a useful smoke test for the platform because it exercises:

- catalog entity lookup
- TechDocs generation
- TechDocs publishing
- frontend rendering of entity documentation

When this page renders correctly, the local documentation pipeline is healthy end to end.
