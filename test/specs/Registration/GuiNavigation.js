/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_001
 */

describe('#TC_ConnApp_001 - Connect Application : Registration page :', () => {

  describe('Gui Navigation Test', () => {

    before(function () {
      browser.url(TEST_SUITE_CONFIG.TC_CONN_APP.URL_REGISTER);
    });


    it('Connect registration page should be displayed', () => {
      browser.getUrl().should.have.path('/connect/registration');
    });

    it('Logo should be displayed on upper left corner', () => {
      browser.isVisibleWithinViewport('.connect-accounts-header > img').should.be.true;
      const location = browser.getLocation('.connect-accounts-header > img');
      location.x.should.be.below(50);
      location.y.should.be.below(50);
    });

    it('Login button should be visible on the upper right corner and the link should take you to the login page', () => {
      browser.isVisibleWithinViewport('.connect-accounts-header .login > a').should.be.true;
      browser.getText('.connect-accounts-header .login > a').should.be.equal('Log in');
      const location2 = browser.getLocation('.connect-accounts-header .login');
      location2.y.should.be.below(50);
    });

    it('Already have an account? Link visible in top', () => {
      browser.isVisibleWithinViewport('.connect-accounts-header .login').should.be.true;
      browser.getText('.connect-accounts-header .login > span').should.be.equal('Already have an account?');
    });

    it('Registration form should be visible', () => {
      browser.getText('.connect-accounts-content > h3').should.be.equal('Register for Topcoder');
    });

    it('First name field should be visible', () => {
      browser.isVisibleWithinViewport('.connect-accounts-content .connect-accounts-form input[type="text"][name="firstname"]').should.be.true;
    });

    it('Last name field should be visible', () => {

      browser.isVisibleWithinViewport('.connect-accounts-content .connect-accounts-form input[type="text"][name="firstname"]').should.be.true;
    });

    it('Country field should be visible', () => {

      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="country"]';
      browser.isVisibleWithinViewport(s).should.be.true;
      browser.setValue(s, 'A');
      browser.waitForVisible('.country-dropdown .angucomplete-dropdown', 3000);
      browser.isVisibleWithinViewport('.country-dropdown .angucomplete-dropdown').should.be.true;

    });


    it('Username field should be visible', () => {

      const s2 = '.connect-accounts-content .connect-accounts-form input[type="text"][name="username"]';
      browser.isVisibleWithinViewport(s2).should.be.true;

    });

    it('Email address field should be visible', () => {

      const s3 = '.connect-accounts-content .connect-accounts-form input[type="text"][name="email"]';
      browser.isVisibleWithinViewport(s3).should.be.true;

    });

    it('Create password field should be visible', () => {

      const s4 = '.connect-accounts-content .connect-accounts-form input[type="password"][name="password"]';
      browser.isVisibleWithinViewport(s4).should.be.true;
     


    });

    it('Password show toggle field should be visible', () => {
  
      browser.isVisibleWithinViewport('#toggleInputTypeBtn').should.be.true;
      browser.getText('#toggleInputTypeBtn').should.be.equal('Show');


    });


    it('Copyright text should be visible', () => {

      browser.getText('body > ui-view > div > p').should.be.equal('© Topcoder 2018');

    });

    it('The Register button should be visible', () => {

      const s5 = '.connect-accounts-content > form > button[type="submit"][disabled="disabled"]';
      browser.isVisibleWithinViewport(s5).should.be.true;

    });

    it('The terms text should be visible', () => {

      browser.getAttribute('.connect-accounts-content > form > p > a:nth-child(1)', 'href').should.be.equal('https://connect.topcoder-dev.com/terms');

    });

    it('Privacy Policy text should be visible', () => {

      browser.getAttribute('.connect-accounts-content > form > p > a:nth-child(2)', 'href').should.be.equal('https://www.topcoder-dev.com/community/how-it-works/privacy-policy/');

    });



  });


});
