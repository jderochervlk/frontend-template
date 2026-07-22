---
name: vitest-testing
description: Create and review strict Vitest unit, integration, and Browser Mode component tests with type-safe mocks, minimal test doubles, deterministic fixtures, precise assertions, and strong coverage. Use for Vitest tests, test configuration, coverage, component testing, browser-mode testing, mocking, spying, snapshots, or test-driven bug fixes.
---

# Vitest Testing

Test public behavior with the least test machinery needed. Refactor code that cannot be tested through explicit inputs, outputs, and boundaries.

## Test Categories

- Use Vitest unit tests for functions or components in isolation. Moderate mocking is acceptable only at the subject's direct dependency boundaries.
- Use Vitest integration tests for connected functions, templates, API handlers, and larger connected components. Prefer real collaborators with light mocking at external boundaries.
- Use Vitest Browser Mode for visual and interactive component tests in a real browser.

## Structure and Behavior

- Use top-level `test` blocks. Do not nest tests in `describe` blocks and do not use the `it` alias.
- Prefer `test.for` for parameterized cases because it preserves tuple arguments and exposes test context. Use `test.each` only to match an established repository convention.
- Name each test with its scenario and expected observable outcome.
- Keep each test focused on one behavior and organize it as arrange, act, then assert.
- Keep tests independent, deterministic, order-agnostic, and safe to run alone or in parallel.
- Never share mutable state between tests.
- Cover success, failure, boundary, and cancellation paths, including every meaningful tagged-union variant.
- Use property-based tests for parsers, serializers, numeric logic, and broad input spaces when a compatible generator is already installed. Ask before adding one.
- Await every promise, browser action, and asynchronous assertion.
- Never use arbitrary sleeps, manual polling, or callback completion when an awaited API exists.
- Use `expect.hasAssertions()` or `expect.assertions(n)` when assertions occur in callbacks, loops, or conditional branches.
- Control time, randomness, generated identifiers, environment state, and external services explicitly.
- Prefer explicit per-test setup or lazy typed fixtures built with `test.extend` over hooks and module-level mutable variables.
- Use hooks only for necessary resource setup or cleanup. Keep them local and trivial.
- Colocate cleanup with resource creation through fixture `onCleanup`, `onTestFinished`, or an explicit cleanup function.
- Reserve setup files for global infrastructure such as polyfills, environment configuration, and custom matchers.
- Never hide scenario data or behavior-specific setup in a global setup file.
- Do not commit `test.only`, `test.fails`, or unexplained `test.skip`. A committed skip or todo must reference a tracked reason and removal condition.
- Vitest transforms TypeScript but does not type-check it. Run the project's type checker or `vitest typecheck` for all tests and utilities.

## Assertions

- Assert public behavior and observable contracts, not private state, implementation details, or framework internals.
- Use the most precise matcher for the contract instead of broad truthy or falsy checks.
- Use `toBe` for primitives and identity. Prefer `toStrictEqual` when object type, explicit `undefined` keys, or sparse arrays matter.
- For `Result`, `Either`, `Option`, and other ADTs, assert the exact tag and relevant payload.
- Use `toThrow` or rejection assertions only at boundaries whose contract requires exceptions.
- Use partial or asymmetric matchers only for fields intentionally outside the contract.
- Use `expect.soft` only for independent assertions where collecting all failures materially improves diagnosis.
- Enable `expect.requireAssertions` where every test should make a runtime assertion.
- Never assert only that fixture data equals itself, a mock returns its configured value, or an unspecified value exists.

## Mocking and Spying

- Avoid mocking when a real deterministic collaborator, fake, fixture, or dependency injection is clearer.
- Mock only dependencies imported directly by the file under test. Never mock child imports or transitive implementation details.
- Do not mock when a spy is sufficient. Keep the real implementation when the test only needs to observe calls or override one behavior.
- Use type-safe dynamic module mocks such as `vi.mock(import("./some-file.js"))`; never pass a plain string path.
- In Browser Mode, where native ESM prevents replacement through `vi.spyOn`, use `vi.mock(import("./module.js"), { spy: true })` with `vi.mocked`.
- Restore or clear all mocks, spies, timers, and globals after each test.
- Prefer `restoreMocks: true` in configuration and always restore real timers after fake timers.
- Assert calls only when the interaction itself is part of the public contract.
- Remember that mock call arguments are stored by reference. Assert before mutation or capture an intentional immutable copy.

## Coverage

- Aim for 100% coverage and enforce at least 90% for statements, branches, functions, and lines.
- Prefer per-file thresholds so weakly tested modules cannot hide behind aggregate coverage.
- Include all production files in coverage, not only files imported by tests.
- Exclude only generated code or genuinely unreachable platform glue, and document each exclusion.
- Never add meaningless assertions or implementation-coupled tests to increase coverage.

## Regression and Debugging

- For a bug, first add a focused test that reproduces the failure and confirm it fails for the expected reason.
- Fix production code, then confirm the regression test passes. Never make the test conform to the bug.
- Diagnose failures from assertion diffs, stack locations, and test names before adding logs.
- Run the smallest relevant test through CLI filters rather than editing in `test.only`.
- If a test passes alone but fails in the suite, investigate leaked mocks, timers, globals, module caches, environment variables, database state, and other shared state before changing timeouts.
- After an isolated fix passes, run the containing file, relevant suite, type checking, linting, and coverage as appropriate.

## Snapshots

- Prefer explicit semantic assertions over snapshots.
- Use snapshots only for stable structured output where reviewing the complete serialized value is useful.
- Use inline snapshots for small values and external snapshots only when the output's size or format improves reviewability.
- Commit and review snapshots as assertions. Never update them blindly.
- Normalize timestamps, random identifiers, paths, and other nondeterministic values before snapshotting.

## Browser Mode

- Run visual and interactive component tests in Vitest Browser Mode with a real browser provider, preferably Playwright, locally and in CI.
- Do not use Testing Library, JSDOM, happy-dom, or another simulated DOM when Browser Mode can cover the component.
- Render with the framework's official Vitest Browser Mode package and query through its returned `screen` or `page` from `vitest/browser`.
- Prefer accessible locators such as `getByRole`, `getByLabelText`, and visible text.
- Avoid CSS selectors, XPath, DOM traversal, and test IDs unless semantic locators cannot express the contract.
- Interact through locator methods or `userEvent` from `vitest/browser`, awaiting every action.
- Do not use `@testing-library/user-event` or manually dispatch synthetic events.
- Use retryable assertions such as `await expect.element(locator).toBeVisible()`.
- Do not extract raw elements or manually poll browser state when locator assertions are available.
- Use Browser Mode UI and real browser developer tools to inspect DOM, CSS, console output, and network traffic.

## Component Testing

- Treat props, slots or children, rendered content, callbacks, events, navigation, and accessibility as the component's public contract.
- Never test private state, private methods, implementation-specific CSS classes, or framework internals.
- Prioritize critical user behavior, error handling, boundary and empty states, accessibility, then performance-sensitive behavior.
- For an isolated component unit test, mock only direct external dependencies or directly imported child components required for isolation.
- For a component integration test, render real child components and verify their data flow and communication together.
- Exercise initial state, prop changes, loading, success, validation failure, service failure, recovery, and repeated interaction where relevant.
- Verify observable communication on both sides: the emitted callback or event payload and the resulting rendered behavior.
- Mock HTTP through MSW at the network boundary, not by mocking the request client or service internals.
- Define a realistic default MSW handler, override it per test for exceptional states, and reset handlers after every test.
- Test forms through labels and real interactions. Cover required fields, invalid formats, partial input, submission progress, success, and server failure.
- Test keyboard navigation, focus entry and restoration, focus traps, semantic roles, accessible names, and required ARIA state where relevant.
- If no official framework renderer exists, use a Testing Library renderer only to mount in Browser Mode, bridge `baseElement` with `page.elementLocator()`, and perform queries, interactions, and assertions through Vitest Browser Mode.

## AI-Written Tests

- Before writing tests, inspect the complete subject, its direct imports and types, Vitest configuration, setup files, and nearby tests.
- Use Vitest APIs only; never emit Jest APIs.
- Run generated tests immediately in non-watch mode with the project's command, `vitest run`, or `vitest --no-watch`.
- Review every assertion for behavioral value, every mock for necessity, and every scenario for realistic failure and boundary coverage.
- Reject tests that only prove mock configuration, assert a vague value exists, duplicate implementation logic, or fail after a behavior-preserving refactor.
