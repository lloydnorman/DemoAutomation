playwright-framework/
├── .github/
│   └── workflows/
│       └── playwright.yml         # CI/CD pipeline configuration (GitHub Actions)
├── config/
│   ├── env.dev.json               # Environment settings (Dev)
│   ├── env.staging.json           # Environment settings (Staging)
│   └── env.prod.json              # Environment settings (Production)
├── src/
│   ├── fixtures/
│   │   └── base.fixture.ts        # Custom Playwright fixtures (injects Page Objects)
│   ├── pages/
│   │   ├── base.page.ts           # Shared page methods (nav, wait, utility methods)
│   │   ├── login.page.ts          # Page Object for Login screen
│   │   └── dashboard.page.ts      # Page Object for Dashboard screen
│   ├── types/
│   │   ├── config.types.ts        # TypeScript interfaces for environment configs
│   │   └── test-data.types.ts     # TypeScript interfaces for test data models
│   └── utils/
│       ├── api-client.ts          # Helper for API setup/teardown requests
│       ├── logger.ts              # Custom logging utility
│       └── json-reader.ts         # Utility to load and parse JSON files dynamically
├── test-data/
│   ├── dev/
│   │   └── users.json             # Dev environment test data
│   ├── staging/
│   │   └── users.json             # Staging environment test data
│   └── common/
│       └── products.json          # Shared static test data across environments
├── tests/
│   ├── e2e/
│   │   ├── auth.spec.ts           # End-to-end authentication tests
│   │   └── checkout.spec.ts       # End-to-end checkout flow tests
│   └── api/
│       └── user-api.spec.ts       # API level integration tests
├── .gitignore
├── .eslintrc.js                   # Linting rules for clean TypeScript code
├── tsconfig.json                  # TypeScript compiler options & path aliases
├── package.json
└── playwright.config.ts           # Main Playwright configuration (runners, reporters, base options)