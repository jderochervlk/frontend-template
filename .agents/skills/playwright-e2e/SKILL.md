---
name: playwright-e2e
description: Create and review reliable Playwright end-to-end tests for critical user journeys against a live application, with accessible locators, web-first assertions, isolated state, and realistic network boundaries. Use for E2E specifications, browser user-flow regressions, Playwright fixtures or configuration, and live-app verification.
---

# Playwright E2E

Exercise public user workflows through the live application. Keep exhaustive domain permutations in unit or integration tests.

## Scope and Boundaries

- Test critical user journeys and cross-boundary behavior through the deployed or locally running application.
- Prefer real application, database, and service calls.
- Mock only network calls, using MSW when practical, to create states that are unsafe, destructive, prohibitively slow, or impractical to reproduce with real services.
- Never mock application modules, components, stores, or other internals in an E2E test.
- Assert user-observable results such as navigation, rendered state, persisted changes, downloaded files, or accessible feedback.

## Locators and Waiting

- Prefer locators that reflect user perception: roles, accessible names, labels, visible text, and placeholders.
- Avoid CSS selectors, XPath, DOM traversal, and test IDs unless no stable semantic locator can express the contract.
- Use Playwright's web-first locator assertions and automatic waiting.
- Never replace retryable assertions with immediate boolean checks, arbitrary sleeps, manual polling, or inflated timeouts.
- Await every browser action and assertion.

## Isolation and Fixtures

- Give every test isolated browser, authentication, application, and persisted state.
- Create required data explicitly and clean it up without depending on another test's flow.
- Keep tests order-independent and safe to run alone, in parallel, or under retries.
- Do not use serial mode to hide shared-state coupling.
- Put reusable environment setup in typed Playwright fixtures. Keep scenario-specific state in the test.
- Store authenticated browser state only in ignored temporary output and never commit credentials, cookies, tokens, or generated secrets.

## Reliability and Diagnostics

- Configure `webServer` or equivalent startup so the test runner verifies the live app is ready.
- Use deterministic test data and explicit clock or network control where required.
- Enable traces on the first retry and retain screenshots or videos for failures when supported by CI.
- Diagnose failures from traces, action logs, console errors, and network activity before changing timeouts.
- Use page objects or helper functions only when they remove real duplication and preserve readable user intent.

## Verification

- Run the smallest relevant test while iterating, then the affected E2E project before completion.
- Verify each new test fails for the expected reason before relying on it as a regression test.
- Do not commit focused, skipped, or outcome-altering tests without a tracked reason and explicit removal condition.
