/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_001
 * 
 * Gui Navigation Test for Login Page
 */

describe('#TC_ConnApp_001 - Connect Application : Login page :', () => {


  describe('GUI Navigation Tests', () => {

    before(function () {
      browser.goToConnAppLogin();
    });

    it.only('Test the loading of Connect Login page', () => {
      browser.getUrl().should.contain('/connect');
      browser.getText('div.connect-accounts-content > h2').should.be.equal('Log in to Topcoder');
    });


    it.only('Logo should be displayed on upper left corner', () => {
      browser.isVisibleWithinViewport('.connect-accounts-header > img').should.be.true;
      const location = browser.getLocation('.connect-accounts-header > img');
      location.x.should.be.below(50);
      location.y.should.be.below(50);
    });


    it.only('Register button should be visible on the upper right corner and the link should take you to the registration page', () => {
      browser.isVisibleWithinViewport('.connect-accounts-header .login').should.be.true;
      browser.getText('.connect-accounts-header > div > span').should.be.equal('Don’t have an account?');
      browser.isVisibleWithinViewport('.connect-accounts-header > div > a').should.be.true;
      browser.getText('.connect-accounts-header > div > a').should.be.equal('Register for free');
      const location2 = browser.getLocation('.connect-accounts-header .login');
      location2.y.should.be.below(50);
      browser.getAttribute('.connect-accounts-header > div > a', 'href').should.be.equal('https://accounts.topcoder-dev.com/connect/registration');

    });


    it.only('The login form should be visible', () => {

      browser.isVisibleWithinViewport('.connect-accounts-container .connect-accounts-content .connect-accounts-form').should.be.true;
      browser.isVisibleWithinViewport('.connect-accounts-container > div.connect-accounts-content > form').should.be.true;
      browser.getText('.connect-accounts-content > h2').should.be.equal('Log in to Topcoder');

    });

    it.only('The "Username or email" field should be visible', () => {

      browser.isVisibleWithinViewport('.connect-accounts-content > form > div:nth-child(1) > input').should.be.true;

    });

    it.only('The "Password" field should be visible', () => {

      const s = '#password-input';
      browser.isVisibleWithinViewport(s).should.be.true;
      browser.isVisibleWithinViewport('#toggleInputTypeBtn').should.be.true;
      browser.getText('#toggleInputTypeBtn').should.be.equal('Show');
    });

    it.only('The "Show" Toggle button should be visible', () => {

      browser.isVisibleWithinViewport('#toggleInputTypeBtn').should.be.true;
      browser.getText('#toggleInputTypeBtn').should.be.equal('Show');
    });

    it.only('The "Forgot your password" link should be visible in the login form and should take you to the forgot password page url', () => {

      browser.getAttribute('.connect-accounts-content > form > div.forgot.small-text > a', 'href').should.be.equal('https://accounts.topcoder-dev.com/connect/forgot-password');


    });

    it.only('The login button should be visible in the login form with .disabled class at first', () => {

      const s2 = '.connect-accounts-content > form > button.action.tc-btn.tc-btn-primary.tc-btn-sm.disabled';
      browser.isVisibleWithinViewport(s2);
      browser.getCssProperty(s2, 'background').parsed.hex.should.be.equal('#1a85ff');

    });


    it.only('The copyright text should be visible in the bottom of the page', () => {

      browser.getText('body > ui-view > div > p').should.be.equal('© Topcoder 2018');
    });



  });

});
