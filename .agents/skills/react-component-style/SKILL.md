---
name: react-component-style
description: Enforce stateless composable React components, reducer-based state machines, minimal effects, server-first data flow, precise props, and flat component organization. Use whenever creating, editing, reviewing, refactoring, or testing React components, hooks, reducers, routes, or React data-loading boundaries.
---

# React Component Style

Prefer server-rendered, data-in/view-out components and keep client state limited to essential interaction state.

## Component Design

- Prefer stateless, composable components that receive validated data and behavior through explicit props.
- Keep state at the narrowest appropriate ownership boundary.
- Define every component with a named `function` declaration, never an arrow or anonymous function.
- Keep exactly one component per file, including small supporting components.
- Keep component implementations under 150 lines. Extract cohesive components, custom hooks, reducers, and pure helpers before exceeding the limit.
- Define hooks, helpers, constants, and reducers at module scope. Never define nested components during render.
- Invoke hooks only at the top level of a component or custom hook.
- Keep props precise, readonly, and focused on the public contract.
- Prefer composition and explicit variants over boolean-heavy configuration.
- Model mutually exclusive props as exhaustive `_tag` unions.
- Make asynchronous custom hooks return an explicit tagged state, not an object with loosely related optional `data`, `error`, and `loading` fields.
- Use React Context only for stable cross-cutting values that genuinely span a subtree. Do not use it as a default state store or to hide changing dependencies.
- Store only irreducible state. Derive computable display values during render.

## Effects and State

- Avoid `useEffect` at all costs. Use it only to synchronize with an external system when render-time, event-driven, server-side, or framework mechanisms cannot express the behavior.
- Never use `useEffect` for derived state, data transformation, user-event handling, lazily computable initialization, or chained internal state changes.
- Any remaining effect must identify its external synchronization target, include complete dependencies and symmetric cleanup, and carry a short justification.
- Prefer `useReducer` when fields change together, transitions depend on prior state, or multiple `useState` calls form one state machine.
- Model reducer state and actions as exhaustive tagged unions.
- Keep reducer transitions pure, total, and independently testable outside React.

## Server and Data Boundaries

- In React Server Component repositories, use Server Components by default.
- Add `"use client"` only at the smallest interactive leaf. Keep fetching, validation, authorization, and business logic on the server.
- In SSR applications, fetch, validate, parse, authorize, and shape data on the server. Pass only validated, serializable, minimal props to the client.
- In client-only SPAs, fetch at route, layout, or application edges and pass prepared data downward. Avoid requests in presentation components.
- With TanStack Query, prefetch at the routing or application edge, dehydrate the cache, and hydrate at the client boundary.
- Keep secrets, privileged decisions, raw external payloads, and server-only types out of client bundles and props.

## Text and Files

- Avoid inline user-visible text in markup. Define named top-level constants such as `const TITLE = "Title text" as const`, or use the project's localization system.
- Keep component files flat; do not create a directory per component.
- Group related files with clear prefixes such as `Nav.tsx`, `NavButton.tsx`, `NavDropdown.tsx`, `NavUtils.ts`, and `NavHooks.ts`.
- Keep component tests in a flat `__tests__` directory and name each test file after its subject.

## Verification

- Test pure reducers and helpers independently.
- Test visible component behavior in Vitest Browser Mode with real user interactions.
- Verify loading, empty, error, success, validation, keyboard, and focus behavior when the component supports those states.
