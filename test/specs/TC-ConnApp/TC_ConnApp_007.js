/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_007
 */

describe('#TC_ConnApp_007 - Connect Application : GUI Verification of the Login page elements', () => {

  it('Connect application landing page should be displayed', () => {
    browser.url(TEST_SUITE_CONFIG.TC_CONN_APP.URL);
    browser.getUrl().should.contain(TEST_SUITE_CONFIG.TC_CONN_APP.URL);
  });

  it('Log in to Topcoder page should be displayed', () => {
    browser.goToConnAppLogin();
  });

  describe('Verification of the Login page elements', () => {

    before(function() {
      browser.goToConnAppLogin();
    });

    it('Logo should be displayed on upper left hand corner', () => {
      browser.isVisibleWithinViewport('.connect-accounts-header > img').should.be.true;
      const location = browser.getLocation('.connect-accounts-header > img');
      location.x.should.be.below(50);
      location.y.should.be.below(50);
    });

    it('"Don’t have an account?" text with "Register for free" button in top right corner', () => {
      browser.isVisibleWithinViewport('.connect-accounts-header .login').should.be.true;
      browser.getText('.connect-accounts-header > div > span').should.be.equal('Don’t have an account?');
      browser.isVisibleWithinViewport('.connect-accounts-header > div > a').should.be.true;
      browser.getText('.connect-accounts-header > div > a').should.be.equal('Register for free');
      const location = browser.getLocation('.connect-accounts-header .login');
      location.y.should.be.below(50);
    });

    it('Check the form "Title" as "Log in to Topcoder"', () => {
      browser.getText('.connect-accounts-content > h2').should.be.equal('Log in to Topcoder');
    });

    it('Check the "Username or email"', () => {
      browser.isVisibleWithinViewport('.connect-accounts-content > form > div:nth-child(1) > input').should.be.true;
    });

    it('Check the "Password""', () => {
      const s = '#password-input';
      browser.isVisibleWithinViewport(s).should.be.true;
      browser.isVisibleWithinViewport('#toggleInputTypeBtn').should.be.true;
      browser.getText('#toggleInputTypeBtn').should.be.equal('Show');
    });

    it('Check the "Forgot your password?" Link', () => {
      browser.getAttribute('.connect-accounts-content > form > div.forgot.small-text > a', 'href').should.be.equal('https://accounts.topcoder-dev.com/connect/forgot-password');
    });

    it('Check the "Login" button', () => {
      const s = '.connect-accounts-content > form > button.action.tc-btn.tc-btn-primary.tc-btn-sm.disabled';
      browser.isVisibleWithinViewport(s);
      browser.getCssProperty(s, 'background').parsed.hex.should.be.equal('#1a85ff');
    });

    it('Check the topcoder credit text', () => {
      browser.getText('body > ui-view > div > p').should.be.equal('© Topcoder 2017');
    });

  });

});
