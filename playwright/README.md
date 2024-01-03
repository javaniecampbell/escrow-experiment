### Playwright Test project 

> @ /workspaces/escrow-experiment/playwright

Inside that directory, you can run several commands:

```bash
# Runs the end-to-end tests.
  npx playwright test

# Starts the interactive UI mode.
  npx playwright test --ui

# Runs the tests only on Desktop Chrome.
  npx playwright test --project=chromium

# Runs the tests in a specific file.
  npx playwright test example

# Runs the tests in debug mode.
npx playwright test --debug

# Auto generate tests with Codegen.
npx playwright codegen
```

We suggest that you begin by typing:

```bash
npx playwright test
```

And check out the following files:
  - ./tests/example.spec.ts - Example end-to-end test
  - ./tests-examples/demo-todo-app.spec.ts - Demo Todo App end-to-end tests
  - ./playwright.config.ts - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨

Happy hacking! 🎭
