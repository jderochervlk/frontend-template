---
name: opening-pull-requests
description: Open or draft GitHub pull requests with repository-aware conventional titles and concise, natural descriptions. Use when Codex is asked to create, open, submit, or prepare a pull request.
---

# Opening Pull Requests

Inspect the final diff, commit history, repository conventions, and any linked issue before writing the pull request. Apply the repository's Git and stack workflow, including the `gh-stacked-prs` skill when available; this skill governs the PR title and description, not branch or publication mechanics.

## Title

Use this exact shape:

```text
type(scope): concise imperative summary [Codex]
```

- Follow Conventional Commits for the type. Prefer the repository's configured types; otherwise use the conventional type that best describes the primary change, such as `feat`, `fix`, `refactor`, `docs`, `chore`, `test`, `perf`, `build`, or `ci`.
- Use the affected monorepo project as the scope. When the change is centered on a page, use that page's name instead.
- For changes spanning multiple projects or pages, choose the narrowest scope that describes the primary impact. Use an established shared or repository-wide scope only when there is no honest single-project or single-page scope.
- Keep the summary specific, concise, and imperative. Do not end it with punctuation.
- Always append `[Codex]` as the final text in the title.

Example:

```text
feat(homepage): add new section for marketing blurb [Codex]
```

## Description

Write for a maintainer who needs to understand why the change exists and what it does. Include:

- the issue or user-facing problem being addressed, including relevant context or constraints;
- the solution and why it addresses that problem;
- a concise but reasonably detailed summary of the meaningful changes.

Use short paragraphs and small, descriptive sections only when they improve readability. Mention specific components, behavior, data flow, migrations, or compatibility implications when relevant. Link the issue when one exists and the link is known.

Do not add a tests, verification, checklist, or CI section; successful CI checks are the verification record. Do not invent issue links, motivations, results, or implementation details that are not supported by the diff or task context.

Keep the prose direct and natural. Avoid AI self-reference, canned framing, inflated claims, excessive headings, repetitive restatement of the title, and phrases such as "This PR aims to," "comprehensive," or "robust solution."

Before opening the PR, verify that the title describes the actual primary change, the scope follows the project-or-page rule, `[Codex]` is last, and the description matches the final diff. Opening or updating the PR is a remote mutation; do it only when the user's request authorizes that action.
