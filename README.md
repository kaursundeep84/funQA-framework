# Topcoder - Frontend E2E Testing Suite
E2E testing suite using selenium that will test different applications in TopCoder platform..

## Prerequisites
- Nodejs >= 6
- Java >= 1.8
- Chrome browser installed
- AWS Account

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
It is handled in three places.
1. `wdio.conf.js` - this is the base webdriver.io config file. [See](http://webdriver.io/guide/getstarted/configuration.html) for details what is inside and how to use it.
2. `test/config/config.js` - this is the test suites main configuration file. It is used by all test suites and cases. It is suggested to split by test suite name when more tests are added. This will ensure clear configurations. It supports also environment variables as those will be available in the CD/CI environment. If not fails back to some defaults. Edit them as needed.

Generated test reports are uploaded to S3 and served as static website. Therefore account and properly configured application is needed.
1. Create AWS account: https://aws.amazon.com/
2. Added IAM User with `Programmatic access`: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console
3. Configure AWS_S3_SERVICE section in `test/config/config.js` providing aws crednetials and bucket name. If bucket does not exists, it will be created.

Some test cases require valid login credentials. Those are set per suite level. For instance `TC_CONN_APP_VALID_LOGIN_AS_MANAGER`.

## Run Tests
To run all tests:
```
npm test
```

## Send report via email

To send the test report to the configured list (`SEND_RESULTS_TO`) of email addresses run `npm run send-report`

## Test results
The framework uses `spec` to log progress in console(std) and `allure` reporter to create HTML UI with results of the test run. Allure reports are created in `allure-report` folder. It should  be hosted and opened in some browser.

**Note** Artifacts from previous test runs are deleted on the next run! Therefore if needed copy them before running new tests.

To serve the `allure-report` test results locally, run `npm run serve` and navigate to [http://localhost:8080](http://localhost:8080)

## Naming conventions and folder structure
The used folder structure is:
```
test
|- specs
|-- SuiteName
|--- TestingType.js
```
following this pattern will ensure maintainability when test code-base grow.

## Lint
Code lint via eslint and `npm run lint`.

## Troubleshooting
- If you get `cant connect to selenium` error try running `npm run kill-selenium`
- If some error is throw during the test automatic screenshots are created in `errorShots` those could be useful to get error details. Note this works only when using `phantomjs` browser.

## Circle CI Integration

#### Prerequisite

1. Admin rights for the repository for which Circle CI Integration need to be set up

#### Steps

1. Login to [Circle CI](https://circleci.com/vcs-authorize/) using Github OAuth which prompt for few permissions necessary to set up building process

2. After login, Navigate to [Add Projects](https://circleci.com/add-projects/gh/appirio-tech) for `appirio-tech` organization

3. If you have Admin rights for qa-framework-js [repository](https://github.com/appirio-tech/qa-framework-js), You will be able to see a button `Setup Project` near the repository name. Click on `Setup Project` to proceed

4. Choose the Operating System under which the CI should take place (`Linux`) and the Language of the project (`Node`)

5. You will see the instructions that need to be followed under the section `Next Steps`

6. Sample config.yml files are available [here](https://circleci.com/docs/2.0/sample-config/). Complete configuration reference for config.yml file is available [here](https://circleci.com/docs/2.0/configuration-reference/)

7. Once you complete all steps under `Next Steps`, Click on `Start Building`

8. That's all. You will be able to see the Build status [here](https://circleci.com/gh/appirio-tech/qa-framework-js)

#### Adding Status Badge in Github Repository

- In Circle CI, Navigate to the [project repository](https://circleci.com/gh/appirio-tech/qa-framework-js) and Click on `Settings` icon

- Navigated URL will be https://circleci.com/gh/appirio-tech/qa-framework-js/edit

- In the left hand side, Click on `NOTIFICATIONS -> Status Badge` to get Markdown code for publishing the status

- Add the above Markdown in your Readme file below the Main title.

- **Note: Status badge URL will be different for each branch**

#### Testing Circle CI build locally

- If the project is already building in Cirlce CI, It could be build and tested locally as well

- Follow the instructions [here](https://circleci.com/docs/2.0/local-cli/#installing-the-circleci-local-cli-on-macos-and-linux-distros) to install Circle CI Commandline locally

- Validation of config.yml file - [Reference](https://circleci.com/docs/2.0/local-cli/#validating-20-yaml-syntax)

- Steps to build locally - [Reference](https://circleci.com/docs/2.0/local-cli/#running-a-build)

## Testing Connect App with QA-FRAMEWORK-JS

Currently tests in `qa-framework-js` runs against the hosted website `https://connect.topcoder-dev.com`.

#### Possible solutions to run the tests

1. `connect-app` has its own Circle CI setup. It's possible to checkout other repository in the current build and run the tests from that repository. But it requires changes in `qa-framework-js` code since the tests in the repo will run only against the hosted website `https://connect.topcoder-dev.com`

2. Once the deployment is complete for `connect-app`, Trigger an API request to start building of repository `qa-framework-js` in Circle CI. Please refer https://circleci.com/docs/2.0/api-job-trigger/

3. Trigger the Circle CI build manually in `qa-framework-js` repository once the build is complete in Topcoder Connect App.
