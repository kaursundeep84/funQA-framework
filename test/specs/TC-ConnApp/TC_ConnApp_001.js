/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_001
 */

describe('#TC_ConnApp_001 - Connect Application : GUI Verification of the registration page elements', () => {

  it('Connect application landing page should be displayed', () => {
    browser.url(TEST_SUITE_CONFIG.TC_CONN_APP.URL);
    browser.getUrl().should.contain(TEST_SUITE_CONFIG.TC_CONN_APP.URL);
  });

  it('Log in to Topcoder page should be displayed', () => {
    browser.goToConnAppLogin();
  });

  describe('Check registration page', () => {

    before(function() {
      browser.goToConnAppLogin();
      browser.click('.connect-accounts-header .login > a');
    });

    it('Should be displayed', () => {
      browser.getUrl().should.have.path('/connect/registration');
    });

    it('Logo should be displayed on upper left hand corner', () => {
      browser.isVisibleWithinViewport('.connect-accounts-header > img').should.be.true;
      const location = browser.getLocation('.connect-accounts-header > img');
      location.x.should.be.below(50);
      location.y.should.be.below(50);
    });

    it('"Already have an account?" text with "Log in" button in top right corner', () => {
      browser.isVisibleWithinViewport('.connect-accounts-header .login').should.be.true;
      browser.getText('.connect-accounts-header .login > span').should.be.equal('Already have an account?');
      browser.isVisibleWithinViewport('.connect-accounts-header .login > a').should.be.true;
      browser.getText('.connect-accounts-header .login > a').should.be.equal('Log in');
      const location = browser.getLocation('.connect-accounts-header .login');
      location.y.should.be.below(50);
    });

    it('Check the form "Title" as "Register for Topcoder"', () => {
      browser.getText('.connect-accounts-content > h3').should.be.equal('Register for Topcoder');
    });

    it('Check the "First Name" as Text box', () => {
      browser.isVisibleWithinViewport('.connect-accounts-content .connect-accounts-form input[type="text"][name="firstname"]').should.be.true;
    });

    it('Check the "Last Name" as Text box', () => {
      browser.isVisibleWithinViewport('.connect-accounts-content .connect-accounts-form input[type="text"][name="lastname"]').should.be.true;
    });

    it('Check the "Country"', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="country"]';
      browser.isVisibleWithinViewport(s).should.be.true;
      browser.setValue(s, 'A');
      browser.waitForVisible('.country-dropdown .angucomplete-dropdown', 3000);
      browser.isVisibleWithinViewport('.country-dropdown .angucomplete-dropdown').should.be.true;
    });

    it('Check the "Username"', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="username"]';
      browser.isVisibleWithinViewport(s).should.be.true;
      browser.setValue(s, 'A');
      browser.isVisibleWithinViewport('.connect-accounts-content > form > div:nth-child(4) > div.tooltip').should.be.true;
      browser.getText('.connect-accounts-content > form > div:nth-child(4) > div.tooltip > h4').should.be.equal('USERNAME TIPS:');
      browser.getText('.connect-accounts-content > form > div:nth-child(4) > div.tooltip > p:nth-child(3)').should.be.equal('Your username will be public');
      browser.getText('.connect-accounts-content > form > div:nth-child(4) > div.tooltip > p:nth-child(4)').should.be.equal('It must be 3-15 characters long');
      browser.getText('.connect-accounts-content > form > div:nth-child(4) > div.tooltip > p:nth-child(5)').should.be.equal('It can contain numbers, letters, and only these special characters -_.{}[]');
    });

    it('Check the "Email"', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="email"]';
      browser.isVisibleWithinViewport(s).should.be.true;
      browser.setValue(s, 'A');
      browser.isVisibleWithinViewport('.connect-accounts-content > form > div:nth-child(5) > div:nth-child(3)').should.be.true;
      browser.getText('.connect-accounts-content > form > div:nth-child(5) > div:nth-child(3) > h4').should.be.equal('EMAIL TIPS:');
      browser.getText('.connect-accounts-content > form > div:nth-child(5) > div:nth-child(3) > p.text-mb').should.be.equal('Your email address will be private and not shared with anyone.');
      browser.getText('.connect-accounts-content > form > div:nth-child(5) > div:nth-child(3) > p:nth-child(4)').should.be.equal('We\'ll send you messages related to your account and project activities.');
    });

    it('Check the "Create Password"', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="password"][name="password"]';
      browser.isVisibleWithinViewport(s).should.be.true;
      browser.isVisibleWithinViewport('#toggleInputTypeBtn').should.be.true;
      browser.getText('#toggleInputTypeBtn').should.be.equal('Show');
      browser.setValue(s, 'A');
      browser.isVisibleWithinViewport('.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div').should.be.true;
      browser.getText('.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > h4').should.be.equal('YOUR PASSWORD MUST HAVE:');
      browser.getText('.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > p:nth-child(3)').should.be.equal('At least 8 characters');
      browser.getText('.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > p:nth-child(4)').should.be.equal('At least 1 letter');
      browser.getText('.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > p:nth-child(5)').should.be.equal('At least 1 number or symbol');
    });

    it('Check hyperlinks "Terms" and "Privacy Policy"', () => {
      browser.getAttribute('.connect-accounts-content > form > p > a:nth-child(1)', 'href').should.be.equal('https://connect.topcoder-dev.com/terms');
      browser.getAttribute('.connect-accounts-content > form > p > a:nth-child(2)', 'href').should.be.equal('https://www.topcoder-dev.com/community/how-it-works/privacy-policy/');
    });

    it('Check the "Register" button', () => {
      const s = '.connect-accounts-content > form > button[type="submit"][disabled="disabled"]';
      browser.isVisibleWithinViewport(s).should.be.true;
    });

    it('Check the topcoder credit text', () => {
      browser.getText('body > ui-view > div > p').should.be.equal('© Topcoder 2017');
    });

  });

});
