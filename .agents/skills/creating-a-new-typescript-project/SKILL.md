---
name: creating-a-new-typescript-project
description: Guidelines on how to create a new project
disable-model-invocation: false
---

## Package manager

- Use pnpm as a package manager, it is already installed

## Typescript

- Install the latest version of TypeScript 7
- Copy this for the tsconfig.json file: https://gist.githubusercontent.com/jderochervlk/105c83f1bdb09308a6de4dac25c6e6c2/raw/tsconfig.json
- Only create one top level tsconfig.json, do not use a tsconfig.app.json, tsconfig.build.json, etc...
- file extensions must be used for local imports
- add a tsc command to the package.json file

## Formatting

- install the latest version of oxfmt
- copy this to a root level .oxfmtrc.json file: https://gist.githubusercontent.com/jderochervlk/4a1f6f7c9b85873b9d00ca90f518c0e2/raw/.oxfmtrc.json
- add a format command to package.json

## Linting

- install the latest version of oxlint
-

## React

Install the latest version of React and use Vite to create an SSR app

## Unit Testing

- Configure Vitest for unit testing
