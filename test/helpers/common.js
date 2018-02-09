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
