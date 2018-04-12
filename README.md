# Topcoder - Frontend E2E Testing Suite
E2E testing suite using selenium that will test different applications in TopCoder platform.

## Prerequisites
- Nodejs >= 6
- Java >= 1.8
- Chrome browser installed
- Dropbox account

## Installation
To install dependencies just:
```
npm i
```
**Note on Chrome usage/dependency**: This test suite is designed to be used under CD/CI environment. Therefore headless browser is required to run the tests. The most popular one `phantomjs` can't be set to use because currently it does not support `CSS Flexbox` [see](https://github.com/ariya/phantomjs/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+flexbox) but the the TC Connect App is using it. Some recourses how to setup and use Chrome headless with webdriver.io:
- https://support.google.com/chrome/answer/95346?co=GENIE.Platform%3DDesktop&hl=en-GB
- https://medium.com/@mannyluvstacos/using-headless-chrome-for-your-selenium-tests-with-webdriverio-ce99b09d564
- https://github.com/SeleniumHQ/selenium/wiki/ChromeDriver#requirements

## Configuration
It is handled in two places.
1. `wdio.config.json` - this is the base webdriver.io config file. [See](http://webdriver.io/guide/getstarted/configuration.html) for details what is inside and how to use it.
2. `test/config/config.js` - this is the test suites main configuration file. It is used by all test suites and cases. It is suggested to split by test suite name when more tests are added. This will ensure clear configurations. It supports also environment variables as those will be available in the CD/CI environment. If not fails back to some defaults. Edit them as needed.

To send test results to list of emails we need some email service. As this is left free to chose the easy way is to use nodemailer with Gmail. [See here](https://medium.com/@manojsinghnegi/sending-an-email-using-nodemailer-gmail-7cfa0712a799) for tutorial how it is done. Most important to send emails is to configure email credentials in `test/config/config.js`:
```
SEND_RESULTS_TO: [],
EMAIL_SERVICE: {
  SENDER: process.env.EMAIL_SERVICE_SENDER || '',
  USER: process.env.EMAIL_SERVICE_USER || '',
  PASS: process.env.EMAIL_SERVICE_PASS || ''
},
```
and `SEND_RESULTS_TO` list with recipients.

Generated test reports are uploaded to Dropbox. Therefore account and properly configured application is needed.
1. Create Dropbox application: https://www.dropbox.com/developers
2. Get Access Token: https://blogs.dropbox.com/developers/2014/05/generate-an-access-token-for-your-own-account/
3. Set it in as `DROPBOX_ACCESS_TOKEN` in `test/config/config.js`.

Some test cases require valid login credentials. Those are set per suite level. For instance `TC_CONN_APP_VALID_LOGIN`.

## Run Tests
To run all tests:
```
npm test
```
To run specific test suite use:
```
npm run test:TC-ConnApp
```
This will run the all tests in the `TC-ConnApp` folder.

## Test results
By default `spec` reporter is used. It log progress in console(std). ALso `allure` reporter is used to create HTML UI with results of the test run. It is placed in `allure-report` folder. It should  be hosted and opened in some browser. **Note** artifacts from previous test runs are deleted on the next run! Therefore if needed copy them before running new tests.

To serve the test results locally, run `npm run serve` and navigate to [http://localhost:8080](http://localhost:8080)

## Naming conventions and folder structure
The used folder structure is:
```
test
|- specsphantomjs
|-- TC-XXX-NAME
|--- TC_XXX_NAME_CASE_ID.js
```
following this pattern will ensure maintainability when test code-base grow.

## Lint
Code lint via eslint and `npm run lint`.

## Adding new tests suites
To add new test suite:
1. Create folder `<XXX_SUITE>` inside the `test/spec` folder.
2. Create its configuration (if needed) inside `test/config/config.js`.
3. Update `package.json` with new script to execute the suite. See `test:TC-ConnApp` for example. Important is `--spec` to match folder/files names of the new suite.
4. Write tests in `<XXX_SUITE>` following naming convention.
5. Done. Tests will be picked and executed automatically by the test runner.

## Troubleshooting
- If you get `cant connect to selenium` error try running `npm run kill-selenium`
- If some error is throw during the test automatic screenshots are created in `errorShots` those could be useful to get error details. Note this works only when using `phantomjs` browser.
