/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_010
 */

describe('#TC_ConnApp_010 - Connect Application : E2E Invalid Log In', () => {

  it('Connect application landing page should be displayed', () => {
    browser.url(TEST_SUITE_CONFIG.TC_CONN_APP.URL);
    browser.getUrl().should.contain(TEST_SUITE_CONFIG.TC_CONN_APP.URL);
  });

  it('Log in to Topcoder page should be displayed', () => {
    browser.goToConnAppLogin();
  });

  describe('Invalid login attempts with invalid credentials', () => {

    before(function() {
      browser.goToConnAppLogin();
    });

    it(`Enter "invalid" in "Username or email" text box and "1Invaliduser" in "Password" field > Click Log in button"`, () => {
      const s1 = '.connect-accounts-content > form > div:nth-child(1) > input';
      const s2 = '#password-input';
      const s3 = '.connect-accounts-content > form > div:nth-child(2) > div';
      browser.setValue(s1, 'invalid');
      browser.setValue(s2, '1Invaliduser');
      browser.click('.connect-accounts-content > form > button:nth-child(5)');
      browser.waitForVisible(s3, 5000);
      browser.getText(s3).should.be.equal('That password is incorrect. Please check that you entered the right one.');
    });

    it(`Enter "invalid@invalid.com" in "Username or email" text box and "1Invaliduser" in "Password" field > Click Log in button"`, () => {
      const s1 = '.connect-accounts-content > form > div:nth-child(1) > input';
      const s2 = '#password-input';
      const s3 = '.connect-accounts-content > form > div:nth-child(1) > div';
      browser.setValue(s1, 'invalid@invalid.com');
      browser.setValue(s2, '1Invaliduser');
      browser.click('.connect-accounts-content > form > button:nth-child(5)');
      browser.waitForVisible(s3, 5000);
      browser.getText(s3).should.be.equal('We couldn\'t find a member with that username. Please check that you entered it correctly.');
    });

  });

});
