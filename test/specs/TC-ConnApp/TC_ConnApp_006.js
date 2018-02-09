/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_006
 */

describe('#TC_ConnApp_006 - Connect Application : E2E registration 2', () => {

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

    it('Check "First name" text box', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="firstname"]';
      const fname = chance.first();
      browser.setValue(s, fname);
      browser.getValue(s).should.be.equal(fname);
    });

    it('Check "Last name" text box', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="lastname"]';
      const lname = chance.last();
      browser.setValue(s, lname);
      browser.getValue(s).should.be.equal(lname);
    });

    it('Select "United States" as "Country" name from the dropdown', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="country"]';
      browser.setValue(s, 'United States');
      browser.waitForVisible('//*[@id="_dropdown"]/div[3]/div/span', 3000);
      browser.click('//*[@id="_dropdown"]/div[3]/div/span');
      browser.getValue(s).should.be.equal('United States');
    });

    it('Check "Username" textbox', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="username"]';
      const uname = chance.word({length: 5});
      browser.setValue(s, uname);
      browser.getValue(s).should.be.equal(uname);
    });

    it('Check Email address text box', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="email"]';
      const email = chance.email();
      browser.setValue(s, email);
      browser.getValue(s).should.be.equal(email);
    });

    it('Check "Create password" text box', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="password"][name="password"]';
      const pass = '${chance.word({length: 7})}${chance.integer({min: 0})}';
      browser.setValue(s, pass);
      browser.getValue(s).should.be.equal(pass);
    });

    it('Click on the "Register" button', () => {
      const s = '.connect-accounts-content > form > button.action.submit';
      const s2 = '.connect-accounts-content > form > div.security-pin.ng-scope > input'
      browser.waitForVisible(s, 10000);
      browser.click(s);
      browser.waitForVisible(s2, 10000);
      browser.getUrl().should.have.path('/connect/pin-verification');
    });

    it('Enter "sam_simp@test" in the "Email" text box', () => {
      const s = '.connect-accounts-content > form > div.verify-email.ng-binding > a';
      const s2 = '.connect-accounts-content > form > div > input';
      const s3 = '.connect-accounts-content > form > div > div > span';
      browser.click(s);
      browser.isVisibleWithinViewport(s2).should.be.true;
      browser.setValue(s2, 'sam_simp@test');
      browser.isVisibleWithinViewport(s3).should.be.true;
      browser.getText(s3).should.be.equal('Please enter a valid email address.');
    });

    it('Remove "sam_simp@test" from the "Email" text box ', () => {
      const s2 = '.connect-accounts-content > form > div > input';
      const s3 = '.connect-accounts-content > form > div > div > span';
      browser.setValue(s2, '');
      browser.isVisibleWithinViewport(s3).should.be.true;
      browser.getText(s3).should.be.equal('Please enter an email address.');
    });

  });

});
