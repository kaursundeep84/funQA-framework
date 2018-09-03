exports.config = {
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //
  specs: [
    './test/specs/**/*.js'
  ],
  // Patterns to exclude.
  exclude: [
    './test/specs/helpers/*.js'
  ],

  suites: {
    Projects: [
      './test/specs/Projects/GuiNavigation.js',
      './test/specs/Projects/FieldValidation.js',
      './test/specs/Projects/PositiveE2E.js'
    ],
    Landing: [
      './test/specs/Landing/GuiNavigation.js',

    ],
    Login: [
      './test/specs/Login/GuiNavigation.js',
      './test/specs/Login/FieldValidation.js',
      './test/specs/Login/PositiveE2E.js',
      './test/specs/Login/NegativeE2E.js'
    ],
    Registration: [
      './test/specs/Registration/GuiNavigation.js',
      './test/specs/Registration/FieldValidation.js',
      './test/specs/Registration/PositiveE2E.js',

    ],
    ForgotPassword: [
      './test/specs/ForgotPassword/GuiNavigation.js',
      './test/specs/ForgotPassword/FieldValidation.js',
      './test/specs/ForgotPassword/PositiveE2E.js',
      './test/specs/ForgotPassword/NegativeE2E.js'
    ],
  },
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 1,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://docs.saucelabs.com/reference/platforms-configurator
  //
  capabilities: [{
    // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    // grid with only 5 firefox instance available you can make sure that not more than
    // 5 instance gets started at a time.
    maxInstances: 5,
    //
    browserName: 'chrome', // options: chrome || firefox || phantomjs
    chromeOptions: {
      args: ['--headless', '--disable-gpu', '--window-size=1024,768']
    }
  }],
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // By default WebdriverIO commands are executed in a synchronous way using
  // the wdio-sync package. If you still want to run your tests in an async way
  // e.g. using promises you can set the sync option to false.
  sync: true,
  //
  // Level of logging verbosity: silent | verbose | command | data | result | error
  logLevel: 'verbose',
  //
  // Enables colors for log output.
  coloredLogs: true,
  //
  // Saves a screenshot to a given path if a command fails.
  screenshotPath: './errorShots/',
  //
  // Set a base URL in order to shorten url command calls. If your url parameter starts
  // with "/", then the base url gets prepended.
  // baseUrl: 'http://localhost',
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 30000,
  //
  // Default timeout in milliseconds for request
  // if Selenium Grid doesn't send response
  connectionRetryTimeout: 45000,
  //
  // Default request retries count
  connectionRetryCount: 2,
  //
  // Initialize the browser instance with a WebdriverIO plugin. The object should have the
  // plugin name as key and the desired plugin options as properties. Make sure you have
  // the plugin installed before running any tests. The following plugins are currently
  // available:
  // WebdriverCSS: https://github.com/webdriverio/webdrivercss
  // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
  // Browserevent: https://github.com/webdriverio/browserevent
  // plugins: {
  //     webdrivercss: {
  //         screenshotRoot: 'my-shots',
  //         failedComparisonsRoot: 'diffs',
  //         misMatchTolerance: 0.05,
  //         screenWidth: [320,480,640,1024]
  //     },
  //     webdriverrtc: {},
  //     browserevent: {}
  // },
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: ['selenium-standalone'], //
  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: http://webdriver.io/guide/testrunner/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'mocha',
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: http://webdriver.io/guide/testrunner/reporters.html
  reporters: ['mochawesome'],
  reporterOptions: {
    outputDir: './mochawesome-data',
    mochawesome_filename: 'index.json'
  },
  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: 'bdd',
    compilers: ['js:babel-register'],
    require: [
      './test/config/config.js',
      './test/helpers/common.js',
      './test/specs/helpers/createProject.js',
      './test/specs/helpers/common.js'
    ],
    timeout: 50000
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  //



  // Gets executed once before all workers get launched.
	//Clear the history of execution from json file everytime before whole testing begins
	//This method just clear the old content fro testHistory.json file and
	//put the content  empty  object   {} 
	onPrepare: function (config, capabilities) {

		let fs = require('fs');
		var history = {};
		let data = JSON.stringify(history);
		fs.writeFileSync('./test/specs/helpers/testHistory.json', data);
		
	},

  // After each test is run, the result is collected here 
  // and stored in local json file, which is used in 'before' function to set 
  // the global variable, which becomes precondition for next scenario to run
  // The Scenario execution has to happen like below
  // GuiNavigation  -> FieldValidation -> PositiveE2E -> NegativeE2E
  afterTest: function (test) {

    var jsonHistoryFile = './test/specs/helpers/testHistory.json';
    var fileSplit = test.file.split("/");
    var Suite = (fileSplit[fileSplit.length - 2]);
    var Test = (fileSplit[fileSplit.length - 1]).split(".");
    var spec = Suite + "_" + Test[0];
    var result = test.passed;
    let fs = require('fs');
    let rawdata = fs.readFileSync(jsonHistoryFile);
    let history = JSON.parse(rawdata);

    if (typeof history[spec] === 'undefined') {

      history[spec] = result;

    } else {

      //Value already present in the history json.. Skip if the test is already failed.
      if (history[spec] !== false) {
        history[spec] = result;
      }

    }
    //Write the detail to file.
    let data = JSON.stringify(history);
    fs.writeFileSync(jsonHistoryFile, data);

  },

  //
  // Gets executed before test execution begins. At this point you can access all global
  // variables, such as `browser`. It is the perfect place to define custom commands.
  before: function() {
    require('sinon');
    // http://sinonjs.org/
    var chai = require('chai');
    chai.use(require('chai-url'));
    chai.use(require('chai-datetime'));
    chai.use(require('chai-match'));
    // http://chaijs.com/
    global.fetch = require('node-fetch');
    var Chance = require('chance');
    global.chance = new Chance();

    chai.config.includeStack = true;
    global.expect = chai.expect;
    global.AssertionError = chai.AssertionError;
    global.Assertion = chai.Assertion;
    global.assert = chai.assert;
    chai.Should();

    //Set the global hasmap from teamHistory.json file before each test run.
    //Here is the only place where global variables can be passed or set
    //for the test functions.
    global.testHistory = {};
 
    try {
      let fs = require('fs');
      let rawdata = fs.readFileSync('./test/specs/helpers/testHistory.json');
      let history = JSON.parse(rawdata);
      for (var key in history) {
        if (history.hasOwnProperty(key)) {
          global.testHistory[key] = history[key];
        }
      }
       
    } catch (err) {
      console.error("Error in reading testHistory.json file: " + err);
    }
  },
  //
  // Hook that gets executed before the suite starts
  // beforeSuite: function (suite) {
  // },
  //
  // Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
  // beforeEach in Mocha)
  // beforeHook: function () {
  // },
  //
  // Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
  // afterEach in Mocha)
  // afterHook: function () {
  // },
  //
  // Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
  // beforeTest: function (test) {
  // },
  //
  // Runs before a WebdriverIO command gets executed.
  // beforeCommand: function (commandName, args) {
  // },
  //
  // Runs after a WebdriverIO command gets executed
  // afterCommand: function (commandName, args, result, error) {
  // },
  //
  // Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
  // afterTest: function (test) {
  // },
  //
  // Hook that gets executed after the suite has ended
  // afterSuite: function (suite) {
  // },
  //
  // Gets executed after all tests are done. You still have access to all global variables from
  // the test.
  // after: function (result, capabilities, specs) {
  // },
  //
  // Gets executed after all workers got shut down and the process is about to exit. It is not
  // possible to defer the end of the process using a promise.
  // onComplete: function(exitCode) {
  // }
  seleniumInstallArgs: { version: '3.4.0' },
  seleniumArgs: { version: '3.4.0' },
}
