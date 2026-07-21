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