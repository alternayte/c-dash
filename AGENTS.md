# Repository instructions

This is a Next.js dashboard written in TypeScript. Factoree reads this file and places it in
the prompt of every agent session.

## Layout

- `pages/` holds the routes. `pages/api/` holds the API routes.
- `components/` holds the React components.
- `lib/`, `utils/`, and `store/` hold the shared code.
- `interfaces/` holds the shared types.
- `tests/` holds the test files. Each one ends with `.test.mjs` and uses the Node test runner.

## Rules

- Write TypeScript. Do not add a new language or a new framework.
- Keep a change small and reversible. Change one thing at a time.
- Add a test in `tests/` for a change in behaviour.
- Do not edit `package-lock.json` by hand.
- Do not add a dependency unless the task names one.

## The checks

Two commands must pass before a change is complete:

    npm run type-check
    npm test

`npm run type-check` runs the TypeScript compiler. `npm test` runs the Node test runner over
`tests/`.
