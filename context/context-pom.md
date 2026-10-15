Act as a Senior Test Automation Architect specializing in Playwright and TypeScript. 

I need you to refactor my existing Playwright automation codebase to align with modern enterprise standards and best practices. 

### Instructions:
1. First, analyze the code I provide below.
2. Refactor the implementation step-by-step according to the requirements listed below.
3. Highlight the specific anti-patterns or inefficiencies in my existing code and explain why the changes improve maintainability, reliability, and execution speed.

### Refactoring Requirements:

1. Page Object Model (POM) & Custom Fixtures:
   - Extract raw `page` actions and hardcoded locators into strongly typed Page Object classes.
   - Replace brittle CSS/XPath selectors with user-first Playwright locators (`getByRole`, `getByLabel`, `getByTestId`, `getByText`).
   - Eliminate manual Page Object instantiation inside tests (e.g., `const loginPage = new LoginPage(page)`) by creating a custom fixture (`fixtures.ts`) using `test.extend` to automatically inject Page Objects.

2. Configuration & Test Data Management (JSON):
   - Externalize hardcoded URLs, timeouts, and environment-specific settings into a structured JSON configuration file or standard `playwright.config.ts` environment switcher.
   - Decouple static and dynamic test data from test scripts into dedicated JSON files (e.g., `test-data/*.json`).
   - Create TypeScript interfaces/types matching the JSON schemas to ensure full type safety when importing test data.

3. Reliability & Best Practices:
   - Replace explicit waits (`page.waitForTimeout`, hardcoded sleep delays) with web-first auto-retrying assertions (`expect(locator).toBeVisible()`, etc.).
   - Ensure all tests are atomic and completely isolated so they can run concurrently in parallel workers without sharing state.
   - Update `playwright.config.ts` to configure HTML reporting, trace zip generation on failure, screenshots, and videos.

---