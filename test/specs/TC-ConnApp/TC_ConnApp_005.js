/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_005
 */

describe('#TC_ConnApp_005 - Connect Application : E2E registration validation', () => {

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

    it('Enter "Testuser" in the "First name" text box and delete the text', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="firstname"]';
      const s2 = '.connect-accounts-content > form > div:nth-child(1) > div';
      browser.setValue(s, 'Testuser');
      browser.getValue(s).should.be.equal('Testuser');
      browser.setValue(s, '');
      browser.isVisibleWithinViewport(s2).should.be.true;
      browser.getText(s2).should.be.equal('Please enter first name');
    });

    it('Enter "Testln" in the "Last name" text box and delete the text', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="lastname"]';
      const s2 = '.connect-accounts-content > form > div:nth-child(2) > div';
      browser.setValue(s, 'Testln');
      browser.getValue(s).should.be.equal('Testln');
      browser.setValue(s, '');
      browser.isVisibleWithinViewport(s2).should.be.true;
      browser.getText(s2).should.be.equal('Please enter last name');
    });

    it('Enter "wrongcountry" in the "Country" text box or else delete the existing country name', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="country"]';
      const s2 = '.connect-accounts-content .connect-accounts-form input[type="text"][name="lastname"]';
      const s3 = '.connect-accounts-content > form > div:nth-child(3) > div > div';
      browser.setValue(s, 'wrongcountry');
      browser.getValue(s).should.be.equal('wrongcountry');
      browser.click(s2);
      browser.isVisibleWithinViewport(s3).should.be.true;
      browser.getText(s3).should.be.equal('Please choose a country from the list');
    });

    it('Enter "#1" in the "Username" text box', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="username"]';
      const s2 = '.connect-accounts-content > form > div:nth-child(4) > div.error-block.ng-scope.ng-active > span';
      browser.setValue(s, '#1');
      browser.getValue(s).should.be.equal('#1');
      browser.waitForVisible(s2, 3000);
      browser.getText(s2).should.be.equal('That username is not the correct length or format.');
    });

    it('Enter "longusername1234" in the "Username" text box', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="username"]';
      const s2 = '.connect-accounts-content > form > div:nth-child(4) > div.error-block.ng-scope.ng-active > span';
      browser.setValue(s, 'longusername1234');
      browser.getValue(s).should.be.equal('longusername1234');
      browser.waitForVisible(s2, 3000);
      browser.getText(s2).should.be.equal('That username is not the correct length or format.');
    });

    it('Enter "user@#$%" in the "Username" text box', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="username"]';
      const s2 = '.connect-accounts-content > form > div:nth-child(4) > div.error-block.ng-scope.ng-active > span';
      browser.setValue(s, 'user@#$%');
      browser.getValue(s).should.be.equal('user@#$%');
      browser.waitForVisible(s2, 3000);
      browser.getText(s2).should.be.equal('That username is not the correct length or format.');
    });

    it('Enter "ab_Jon" in the "Username" text box and delete the text', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="username"]';
      const s2 = '/html/body/ui-view/div/div[2]/form/div[4]/div[2]/span';
      browser.setValue(s, 'ab_Jon');
      browser.getValue(s).should.be.equal('ab_Jon');
      browser.setValue(s, '');
      browser.waitForVisible(s2, 3000);
    });

    it('Enter "jona_abr@test" in the "Email" text box', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="email"]';
      const s2 = '.connect-accounts-content > form > div:nth-child(5) > div.error-block.ng-active > span';
      browser.setValue(s, 'jona_abr@test');
      browser.getValue(s).should.be.equal('jona_abr@test');
      browser.waitForVisible(s2, 3000);
      browser.getText(s2).should.be.equal('Please enter a valid email address.');
    });

    it('Enter "jona_abr@mailinator.com" in the "Email" text box and delete the text', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="email"]';
      const s2 = '.connect-accounts-content > form > div:nth-child(5) > div.error-block.ng-active > span';
      browser.setValue(s, 'jona_abr@mailinator.com');
      browser.getValue(s).should.be.equal('jona_abr@mailinator.com');
      browser.setValue(s, '');
      browser.getValue(s).should.be.equal('');
      browser.waitForVisible(s2, 3000);
    });

    it('Enter "test123" in the "Password" text box', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="password"][name="password"]';
      const s2 = '.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > p:nth-child(3) > img';
      browser.setValue(s, 'test123');
      browser.getValue(s).should.be.equal('test123');
      browser.isExisting(s2).should.be.false;
    });

    it('Enter "testpassword" in the "Password" text box', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="password"][name="password"]';
      const s2 = '.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > p:nth-child(5) > img';
      browser.setValue(s, 'testpassword');
      browser.getValue(s).should.be.equal('testpassword');
      browser.isExisting(s2).should.be.false;
    });

    it('Enter "12345678" in the "Password" text box', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="password"][name="password"]';
      const s2 = '.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > p:nth-child(4) > img';
      browser.setValue(s, '12345678');
      browser.getValue(s).should.be.equal('12345678');
      browser.isExisting(s2).should.be.false;
    });

  });

});
