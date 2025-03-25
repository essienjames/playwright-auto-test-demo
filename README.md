# Demo - Playwright API/UI Test Suite Project

This repository contains automated tests for both API and UI using [Playwright](https://playwright.dev/).

- **API Tests**: Run without a browser, testing REST API endpoints.
- **UI Tests**: Run in Chromium, Firefox, and WebKit, testing web applications.

## 📌 Prerequisites

Before running the tests, ensure you have the following installed:

- **Node.js** (v16 or later) - [Download](https://nodejs.org/)
- **Playwright** (installed via npm)

## 🚀 Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/essienjames/playwright-auto-test-demo.git

2. Install dependencies
    ```sh
   npm ci
   
3. Install Playwright
    ```sh
   npx playwright install

## 🎯 Running Tests

Run All Tests
```sh
  npx playwright test
```

Run API Tests Only (API tests run without launching a browser.)
```sh
  # Runs only API tests defined under the "api" project in playwright.config.ts
  npx playwright test --project=api
```

Run UI Tests Only
```sh
  npx playwright test --project=chromium
  npx playwright test --project=firefox
  npx playwright test --project=webkit
```

Run all tests in a Specific Test File
```sh
  npx playwright test tests/api/users-api.spec.ts
```

Run a Specific Test Case
```sh
  npx playwright test tests/api/users-api.spec.ts -g "should create a new user"
```

## 📊 View Test Reports
```sh
  npx playwright show-report
```

## 🔧 Troubleshooting
Test failures? Try running in debug mode:
```sh
  npx playwright test --debug
```

## 📁 Project Structure
```sh
   /tests
   ├── api/
   │   ├── user-api.spec.ts    # API tests
   ├── ui/
   │   ├── example.spec.ts       # UI tests
   /utils                      # Utility functions for the tests (e.g., API helpers)
   /fixtures                   # JSON Schema files and test data for validation
   /playwright.config.ts       # Configuration file defining projects and settings for different test runs (API, UI, browsers)
   /README.md                  # This file
   /package.json               # Project dependencies
   /.gitignore                 # Specifies files to exclude from version control
```

## 📝 GitHub Actions Workflow
### Automated Test Runs
This project includes a Github Actions workflow to automatically execute tests:
- Runs tests on push requests to main or develop branches.
- Executes tests at a scheduled time daily.
- Allows manual triggering for specific test types (api, ui, or all).
- Caches dependencies to speed up execution.
- Uploads test artifacts (screenshots, videos, and HTML reports) for debugging.


### How to Trigger Manually?
```sh
   Go to GitHub → Actions → Playwright Tests
   Click Run workflow
   Select api, ui, or all
   Click Run workflow
```
After the workflow runs, you can download:
- Screenshots
- Videos
- Playwright HTML Reports (playwright-report)

### Happy Testing! 👍
