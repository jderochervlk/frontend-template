---
name: writing-functions
description: Guidelines for writing good functions
disable-model-invocation: false
---

- Use a functional programming approach to writing functions
- Functions should always have a single use
- Use as few parameters as possible
- Functions should be small and composable
- In ReScript use the -> Pipe operator to compose functions
- In TypeScript look for a pipe function from Effect of @jvlk/fp-tsm, if they are not available ask to install one of them
- Functions MUST NEVER throw errors. If a function can fail it MUST return a Result type
