# Install
#### 1. Installing Nodejs
  - Install Nodejs from [here](https://nodejs.org/en/download/)

#### 2. Installing Playwright
  > `npm init playwright@latest`

	Run the install command and select the following to get started:
		• Choose between TypeScript or JavaScript (default is TypeScript)?
		• Name of your Tests folder (default is tests or e2e if you already have a tests folder in your project)?
		• Add a GitHub Actions workflow to easily run tests on CI?

# Running the tests
#### Run all the tests in headless browsers:
  > `npx playwright test`

#### Run tests in headed browsers:
  > `npx playwright test --headed`

#### Run tests grouped by tag:
  > ` npx playwright test --grep @smoke`

# Test Reports
#### Generate HTML report:
  > `npx playwright show-report`


