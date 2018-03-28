/**
 * Common commands available to all test cases
 */

const { context } = module.parent.context;
const browser = context.browser;

/**
 * Go to TC Connect App login page
 */
browser.addCommand("goToConnAppLogin", () => {
  browser.url(TEST_SUITE_CONFIG.TC_CONN_APP.URL);
  browser.getUrl().should.contain(TEST_SUITE_CONFIG.TC_CONN_APP.URL);
  browser.click('.primary-toolbar .links-section .non-logged-in > a');
  browser.getUrl().should.contain('/connect');
  browser.getText('div.connect-accounts-content > h2').should.be.equal('Log in to Topcoder');
});

/**
 * Login to TC Connect App
 */
browser.addCommand("loginToConnApp", () => {
  const s = '.connect-accounts-content > form > div:nth-child(1) > input';
  const s2 = '#password-input';
  const s3 = '.connect-accounts-content > form > button:nth-child(5)';
  const s4 = '#root > div > div.TopBarContainer > div > div > div';
  browser.goToConnAppLogin();
  browser.setValue(s, TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.USER);
  browser.setValue(s2, TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.PASS);
  browser.getValue(s).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.USER);
  browser.getValue(s2).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.PASS);
  browser.click(s3);
  browser.waitForVisible(s4);
  browser.getUrl().should.contain('/projects');
});
