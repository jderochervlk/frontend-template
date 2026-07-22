---
name: functional-code-style
description: Enforce strict functional code design with small composable functions, immutable data, explicit dependencies, total behavior, and typed errors as values. Use when creating, editing, reviewing, or refactoring application logic, domain logic, services, utilities, or functions in any language.
---

# Functional Code Style

Apply these rules together with the repository's established conventions. Preserve behavior unless the requested change requires otherwise.

## Design

- Prefer a functional core with side effects isolated at explicit boundaries.
- Build behavior from small, focused, composable functions with one clear purpose.
- Prefer immutable data and value transformations over shared mutable state or in-place mutation.
- Never mutate function parameters. Treat inputs as immutable and return new values.
- Make dependencies and effects explicit. Avoid hidden global state and ambient capabilities.
- Inject clocks, randomness, identifier generation, configuration, and external capabilities.
- Model domain concepts with precise types that make invalid states difficult or impossible to represent.
- Validate and decode untrusted input at system boundaries before it enters domain code.
- Keep transport, persistence, framework, and domain concerns separated by narrow adapters.
- Prefer total functions, exhaustive pattern matching, and explicit handling of absence and edge cases.
- Compose data-in/data-out transformations directly or through the project's established pipeline utilities.
- Keep parameter lists small. Introduce a cohesive typed input when several values form one concept.
- Use localized mutation only when a framework requires it or a measured benefit clearly outweighs the loss of clarity, and never let mutable state cross the boundary.
- Prefer `const`. Use `let` only for a tightly localized algorithm where immutable composition would be less clear. Never use `var`.

## Errors as Values

- Never throw errors in application or domain code unless a framework or library contract requires an exception.
- Return expected failures as an explicit `Result`, `Either`, typed Effect error, or the equivalent ADT already used by the project.
- Give each expected failure a specific tagged type with actionable context. Do not collapse distinct failures into strings, `unknown`, or a generic `Error`.
- At exception-based boundaries, catch exceptions and translate them into typed error values immediately.
- Convert error values back into exceptions only at the outer boundary whose contract requires throwing.
- Reserve defects or panics for genuinely impossible invariant violations, not validation failures or expected operational failures.

## Size and Complexity

- Keep non-component functions below 40 lines.
- Keep cyclomatic complexity at or below 5 and control-flow nesting no deeper than three blocks.
- Refactor larger logic into named functions, tagged data, and exhaustive state transitions.
- Add an abstraction only when it removes meaningful duplication, isolates an effect, or names a real domain concept.

## Verification

- Verify both successful and failing paths at the public boundary.
- Treat code that requires extensive mocking as a design signal to make dependencies explicit and logic more functional.
- Never weaken types, lint rules, tests, or coverage thresholds to make an implementation pass.
