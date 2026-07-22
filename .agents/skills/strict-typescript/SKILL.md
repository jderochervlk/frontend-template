---
name: strict-typescript
description: Enforce strict functional TypeScript and TSX design, compiler settings, Oxlint rules, module boundaries, imports, domain modeling, and file organization. Use for any TypeScript or TSX implementation, refactor, review, configuration, API design, or test code, including new TypeScript projects.
---

# Strict TypeScript

Apply the strongest types the codebase and toolchain support. If code cannot be typed strictly, redesign it instead of weakening the type system.

## Type Safety

- Enable `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noPropertyAccessFromIndexSignature`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noImplicitOverride`, `noUncheckedSideEffectImports`, `useUnknownInCatchVariables`, `verbatimModuleSyntax`, and `isolatedModules`. Keep `skipLibCheck` disabled.
- Prefer precise inference, literal types, exhaustive unions, and constrained generics over broad annotations.
- Never use explicit or implicit `any`. Accept uncertain data as `unknown`, then decode it at the boundary.
- Never use `as`, angle-bracket assertions, double assertions, or non-null assertions. The only permitted assertion is `as const`.
- Prefer `satisfies`, type guards, schema decoding, and stronger type design over assertions.
- Use `as const` for declared values that do not already have an explicit type so literal values and readonly structure are preserved.
- Never use `@ts-ignore` or `@ts-nocheck`. Use `@ts-expect-error` only in a dedicated negative type test that describes the exact compiler error under test.
- Public functions must declare explicit return types and accept and return readonly data.
- Do not let mutable collections or objects cross module boundaries.
- Prefer dedicated, explicitly named functions over function overloads.

## Domain Modeling

- Treat large object types with many optional keys as a code smell.
- Model business states as discriminated unions with a `_tag` key, where each variant contains exactly the valid data for that state.
- Use branded or refined types for identifiers, validated strings, money, dates, URLs, and other domain primitives. Construct them through validating decoders or smart constructors.
- Do not expose `null` or `undefined` in domain APIs. Normalize absence into `Option` or an explicit tagged state at the boundary.
- Keep transport, persistence, and external API schemas separate from domain models. Decode and transform wire data before use.
- Do not use TypeScript `enum`. Use `as const` values, literal unions, or tagged unions.
- Avoid boolean parameters and boolean-heavy objects or props. Use dedicated functions or tagged modes.
- Assume the project uses Effect or `@jvlk/fp-tsm` for functional ADTs. Use the library already present for `Result`, `Either`, `Option`, and composition; do not invent a competing representation.

## Modules and Files

- Include explicit extensions in every relative import. Import TypeScript source using the emitted runtime extension, such as `import { foo } from "./foo.js"`; never write `"./foo"`.
- Prefer named exports. Use a default export only when a framework contract requires it.
- Do not create barrel files. Import concrete modules directly and keep the dependency graph acyclic.
- Domain modules must not import UI, HTTP, database, filesystem, or framework modules. Put external behavior behind narrow typed adapters or services.
- Prefer a flat file structure with production code in `src/` and tests in one flat `src/__tests__/` directory.
- Avoid nested source and test folders. Use descriptive filename prefixes to group related modules.

## Oxlint

- Use Oxlint exclusively. Never add ESLint, ESLint configuration, or ESLint-only plugins.
- Never disable a lint rule inline, for a file, or in project configuration. Fix the underlying code.
- Enable type-aware linting with `oxlint-tsgolint` and `options.typeAware: true`.
- Keep TypeScript compiler checking as a separate CI gate unless the project explicitly adopts Oxlint's experimental `options.typeCheck: true`.
- Enable all applicable Oxlint `correctness`, `suspicious`, `pedantic`, `style`, and `restriction` rules as errors.
- Enable the TypeScript, import, React, Vitest, and JSX accessibility plugins where relevant.
- Enforce `typescript/no-explicit-any`, the `no-unsafe-*` family, `no-floating-promises`, `no-misused-promises`, `strict-boolean-expressions`, `no-unnecessary-condition`, and `switch-exhaustiveness-check`.
- Configure `denyWarnings: true`, report unused disable directives as errors, and reject `oxlint-disable` and `eslint-disable` directives.
- When an existing rule is lax, recommend a stricter setting and explain the migration impact.

## Verification

- Run the TypeScript compiler with `--noEmit` unless the project has explicitly replaced that gate with Oxlint type checking.
- Type-check production code, tests, scripts, and configuration modules.
- Run Oxlint with type-aware rules and warning denial enabled.
- Never weaken a compiler option, lint rule, suppression policy, or public type to make code pass.
