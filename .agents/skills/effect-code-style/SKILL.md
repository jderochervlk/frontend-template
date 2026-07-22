---
name: effect-code-style
description: Enforce functional Effect architecture with typed error channels, Context services, Layers, Schema decoding, scoped resources, and structured concurrency. Use whenever a TypeScript project contains Effect or when implementing or reviewing Effect programs, services, schemas, adapters, retries, concurrency, or resource management.
---

# Effect Code Style

Use Effect for application effects while keeping pure domain transformations independent and composable.

## Programs and Boundaries

- Represent application I/O, asynchronous work, concurrency, retries, and resource management as `Effect` values instead of raw `Promise` workflows.
- Keep raw promises inside adapters and convert them with the appropriate Effect constructor. Never let a rejecting promise escape into domain or application code.
- Run effects only at application entry points or framework boundaries.
- Do not call `Effect.runPromise`, `Effect.runSync`, or another runner inside domain, service, or reusable library functions.
- Keep pure calculations outside Effect when they do not require capabilities or typed failures.

## Services and Layers

- Define external capabilities as narrow Effect services whose requirements remain visible in the `Effect` type.
- Provide implementations through `Layer`; do not use ambient singletons or ad hoc global service containers.
- Keep service interfaces, live implementations, test implementations, layers, schemas, and programs independently composable.
- Provide the complete layer graph once at the application edge rather than repeatedly inside reusable programs.

## Data and Errors

- Decode configuration, requests, persistence records, and external responses with Effect Schema before use.
- Transform decoded transport values into branded domain types.
- Represent every expected failure as a specific tagged error in the typed error channel.
- Handle errors by tag and preserve actionable detail. Do not collapse failures into `Error`, `unknown`, strings, defects, or an untyped catch-all.
- Reserve defects for unexpected invariant violations. Never use `Effect.orDie` or an equivalent operator to erase an expected error.
- Keep recovery policies explicit and local. Retry only failures that are known to be transient and use a bounded `Schedule`.

## Resources and Concurrency

- Acquire and release files, connections, subscriptions, locks, and other resources with `Scope`, `Effect.acquireRelease`, or an equivalent scoped API.
- Do not manage resource lifetimes through scattered manual cleanup.
- Use Effect's structured concurrency, interruption, timeout, retry, and scheduling primitives instead of unmanaged `Promise.all`, detached promises, or custom retry loops.
- Preserve interruption and finalization behavior when mapping or recovering from errors.

## Verification

- Test pure logic without an Effect runtime.
- Test Effect programs with explicit test layers and deterministic services for time, randomness, configuration, and external systems.
- Cover every meaningful tagged error and verify resource finalization and interruption when relevant.
