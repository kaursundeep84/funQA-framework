/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_008
 */

describe('#TC_ConnApp_008 - Connect Application : E2E Log In', () => {

  it('Connect application landing page should be displayed', () => {
    browser.url(TEST_SUITE_CONFIG.TC_CONN_APP.URL);
    browser.getUrl().should.contain(TEST_SUITE_CONFIG.TC_CONN_APP.URL);
  });

  it('Log in to Topcoder page should be displayed', () => {
    browser.goToConnAppLogin();
  });

  it('User should successfully login into the application with correct username and password', () => {
    const s = '.connect-accounts-content > form > div:nth-child(1) > input';
    const s2 = '#password-input';
    const s3 = '.connect-accounts-content > form > button:nth-child(5)';
    const s4 = '#root > div > div.TopBarContainer > div > div > div';
    browser.setValue(s, TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.USER);
    browser.setValue(s2, TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.PASS);
    browser.getValue(s).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.USER);
    browser.getValue(s2).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.PASS);
    browser.click(s3);
    browser.waitForVisible(s4, 30000);
    browser.getUrl().should.contain('/projects');
  });


});
