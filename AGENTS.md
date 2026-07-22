# Global Codex Instructions

## Working Principles

- Prefer focused changes over broad refactors.
- Ask before adding production dependencies.
- Never commit secrets, credentials, tokens, cookies, or generated authentication state.
- Follow the repository's established architecture, naming, formatting, and tooling unless they conflict with a stricter rule in this file.
- Inspect the relevant implementation, types, configuration, direct dependencies, and nearby tests before editing.
- Keep the user informed with concise progress updates, including important assumptions and constraints.

## Skill Use

Personal skills under `.agents/skills` contain the detailed rules for specialized work.

- Use every skill that materially applies to the task. Skills add detail to these global rules and never weaken them.
- Before applying a skill, explicitly tell the user which skill is being used and why in one concise sentence. If several skills apply, name all of them together. Never silently apply a skill.
- Use `$functional-code-style` when creating, modifying, reviewing, or refactoring application logic, domain logic, services, utilities, or functions.
- Use `$strict-typescript` for every TypeScript or TSX implementation, review, refactor, configuration change, or test.
- Use `$effect-code-style` whenever Effect is present or the work involves Effect programs, services, Layers, Schema, typed errors, concurrency, or resources.
- Use `$react-component-style` for React components, hooks, reducers, routes, client boundaries, server rendering, and React data flow.
- Use `$vitest-testing` for Vitest unit tests, integration tests, Browser Mode component tests, mocking, coverage, and Vitest configuration.
- Use `$playwright-e2e` for Playwright end-to-end tests, browser user flows, E2E fixtures, and live-application verification.
- Apply multiple matching skills together. For example, React TSX component work normally uses `$functional-code-style`, `$strict-typescript`, and `$react-component-style`; adding Browser Mode tests also uses `$vitest-testing`.
- If a named skill is unavailable, say so and continue with the applicable broad rules in this file rather than blocking unnecessarily.

## Strict Functional Style

- Prefer a functional core with side effects isolated at explicit system boundaries.
- Build behavior from small, focused, composable functions with one clear purpose.
- Prefer immutable data and value transformations over shared mutable state or in-place mutation.
- Never mutate function parameters. Prefer `const`; use localized mutation only when a framework requires it or evidence shows a clear benefit.
- Make dependencies and effects explicit. Inject external capabilities such as clocks, randomness, identifiers, configuration, storage, and network access.
- Model business concepts with strong types and tagged states so invalid combinations are unrepresentable.
- Validate and decode untrusted data at the boundary before using it as domain data.
- Prefer total functions, exhaustive pattern matching, explicit absence, and explicit edge-case handling.
- Keep domain logic independent from UI, HTTP, persistence, filesystem, and framework code.
- Keep functions and modules cohesive. Split code when size, nesting, or branching obscures the contract.

## Errors as Values

- Never throw errors in application or domain code unless a framework or library contract requires exceptions.
- Represent expected failures with `Result`, `Either`, a typed Effect error channel, or the equivalent functional ADT already used by the project.
- Give expected failures specific tagged types and preserve actionable context.
- Catch exceptions at exception-based boundaries and convert them into typed error values immediately.
- Convert an error value back into an exception only at the outermost boundary whose contract requires throwing.
- Reserve defects, panics, and thrown exceptions for genuinely unexpected invariant violations.

## Type Safety

- Use the strictest practical types and compiler settings. If code cannot be typed strictly, redesign it instead of adding an escape hatch.
- In TypeScript, never use `any`, unchecked assertions, non-null assertions, or suppression comments. The only permitted assertion is `as const`.
- Use `as const` for values without another explicit type when literal inference and readonly structure are intended.
- Include emitted runtime extensions in relative TypeScript imports, such as `"./foo.js"`; never use extensionless relative imports.
- Prefer discriminated unions with a `_tag` field over large objects with optional keys or boolean-heavy state.
- Assume TypeScript projects use Effect or `@jvlk/fp-tsm` for functional ADTs and use the library already present.
- Use Oxlint, not ESLint. Never disable lint rules inline or in configuration; fix the code and recommend stricter rules when existing enforcement is lax.

## Testing and Verification

- Treat code that is difficult to test as a design problem. Refactor toward pure logic, explicit dependencies, and narrow effect boundaries.
- Test public behavior and observable contracts, including successful, failing, boundary, and cancellation paths where relevant.
- Avoid over-mocking. Mock only direct dependency boundaries, and prefer a spy when the real implementation should remain active.
- Keep tests deterministic, independent, order-agnostic, and safe to run alone or in parallel.
- Aim for 100% coverage and never accept less than 90% for statements, branches, functions, or lines.
- Run the smallest relevant checks while iterating, then the complete affected type-check, Oxlint, test, and coverage gates before completion.
- Never weaken a compiler option, lint rule, test, assertion, or coverage threshold to make a change pass.

--- project-doc ---

## TypeScript Style
- Always use `const` to declare values and functions
- Never use the function keyword, only use `const` along with an arror function
- Never throw errors, return errors as data such as a Result type or a custom tagged union
- Never cast types, no usage of `as string` etc.
- NEVER use the `any` type, always find the correct type
- Treat TS as a strongly typed language like Rust or ReScript
- Always treat values as read only and use readonly type signatures
- Prefer a functional programming style
- Functions should always be small and single purpose
- Functions should take in just 1 or 2 arguments
- Functions should be composable using a pipe function
- Never disable a linting rule, either inline or in the config file


## Project structure
- React components should always have CamelCase names
- Tests should all live in src/__tests__ folder
- 
