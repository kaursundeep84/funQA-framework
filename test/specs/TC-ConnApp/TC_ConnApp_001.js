/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_001
 */

describe('#TC_ConnApp_001 - Connect Application : GUI Verification of the registration page elements', () => {

  it('Connect application landing page should be displayed', () => {
    browser.url(TEST_SUITE_CONFIG.TC_CONN_APP.URL);
    browser.getUrl().should.contain(TEST_SUITE_CONFIG.TC_CONN_APP.URL);
  });

  describe('Check registration page', () => {

    before(function() {
      browser.goToConnAppLogin();
      browser.click('.connect-accounts-header .login > a');
    });

    it('Verify registration page', () => {
      browser.getUrl().should.have.path('/connect/registration');

      browser.isVisibleWithinViewport('.connect-accounts-header > img').should.be.true;

      const location = browser.getLocation('.connect-accounts-header > img');
      location.x.should.be.below(50);
      location.y.should.be.below(50);
      browser.isVisibleWithinViewport('.connect-accounts-header .login').should.be.true;
      browser.getText('.connect-accounts-header .login > span').should.be.equal('Already have an account?');
      browser.isVisibleWithinViewport('.connect-accounts-header .login > a').should.be.true;
      browser.getText('.connect-accounts-header .login > a').should.be.equal('Log in');

      const location2 = browser.getLocation('.connect-accounts-header .login');
      location2.y.should.be.below(50);
      browser.getText('.connect-accounts-content > h3').should.be.equal('Register for Topcoder');
      browser.isVisibleWithinViewport('.connect-accounts-content .connect-accounts-form input[type="text"][name="firstname"]').should.be.true;
      browser.isVisibleWithinViewport('.connect-accounts-content .connect-accounts-form input[type="text"][name="lastname"]').should.be.true;

      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="country"]';
      browser.isVisibleWithinViewport(s).should.be.true;
      browser.setValue(s, 'A');
      browser.waitForVisible('.country-dropdown .angucomplete-dropdown', 3000);
      browser.isVisibleWithinViewport('.country-dropdown .angucomplete-dropdown').should.be.true;

      const s2 = '.connect-accounts-content .connect-accounts-form input[type="text"][name="username"]';
      browser.isVisibleWithinViewport(s2).should.be.true;
      browser.setValue(s2, 'A');
      browser.isVisibleWithinViewport('.connect-accounts-content > form > div:nth-child(4) > div.tooltip').should.be.true;
      browser.getText('.connect-accounts-content > form > div:nth-child(4) > div.tooltip > h4').should.be.equal('USERNAME TIPS:');
      browser.getText('.connect-accounts-content > form > div:nth-child(4) > div.tooltip > p:nth-child(3)').should.be.equal('Your username will be public');
      browser.getText('.connect-accounts-content > form > div:nth-child(4) > div.tooltip > p:nth-child(4)').should.be.equal('It must be 3-15 characters long');
      browser.getText('.connect-accounts-content > form > div:nth-child(4) > div.tooltip > p:nth-child(5)').should.be.equal('It can contain numbers, letters, and only these special characters -_.{}[]');

      const s3 = '.connect-accounts-content .connect-accounts-form input[type="text"][name="email"]';
      browser.isVisibleWithinViewport(s3).should.be.true;
      browser.setValue(s3, 'A');
      browser.isVisibleWithinViewport('.connect-accounts-content > form > div:nth-child(5) > div:nth-child(3)').should.be.true;
      browser.getText('.connect-accounts-content > form > div:nth-child(5) > div:nth-child(3) > h4').should.be.equal('EMAIL TIPS:');
      browser.getText('.connect-accounts-content > form > div:nth-child(5) > div:nth-child(3) > p.text-mb').should.be.equal('Your email address will be private and not shared with anyone.');
      browser.getText('.connect-accounts-content > form > div:nth-child(5) > div:nth-child(3) > p:nth-child(4)').should.be.equal('We\'ll send you messages related to your account and project activities.');

      const s4 = '.connect-accounts-content .connect-accounts-form input[type="password"][name="password"]';
      browser.isVisibleWithinViewport(s4).should.be.true;
      browser.isVisibleWithinViewport('#toggleInputTypeBtn').should.be.true;
      browser.getText('#toggleInputTypeBtn').should.be.equal('Show');
      browser.setValue(s4, 'A');
      browser.isVisibleWithinViewport('.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div').should.be.true;
      browser.getText('.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > h4').should.be.equal('YOUR PASSWORD MUST HAVE:');
      browser.getText('.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > p:nth-child(3)').should.be.equal('At least 8 characters');
      browser.getText('.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > p:nth-child(4)').should.be.equal('At least 1 letter');
      browser.getText('.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > p:nth-child(5)').should.be.equal('At least 1 number or symbol');
      browser.getAttribute('.connect-accounts-content > form > p > a:nth-child(1)', 'href').should.be.equal('https://connect.topcoder-dev.com/terms');
      browser.getAttribute('.connect-accounts-content > form > p > a:nth-child(2)', 'href').should.be.equal('https://www.topcoder-dev.com/community/how-it-works/privacy-policy/');

      const s5 = '.connect-accounts-content > form > button[type="submit"][disabled="disabled"]';
      browser.isVisibleWithinViewport(s5).should.be.true;

      browser.getText('body > ui-view > div > p').should.be.equal('© Topcoder 2018');

      const s6 = '.connect-accounts-content .connect-accounts-form input[type="text"][name="firstname"]';
      const fname = chance.first();
      browser.setValue(s6, fname);
      browser.getValue(s6).should.be.equal(fname);

      const s7 = '.connect-accounts-content .connect-accounts-form input[type="text"][name="lastname"]';
      const lname = chance.last();
      browser.setValue(s7, lname);
      browser.getValue(s7).should.be.equal(lname);

      const s8 = '.connect-accounts-content .connect-accounts-form input[type="text"][name="username"]';
      const uname = chance.word({length: 5});
      browser.setValue(s8, uname);
      browser.getValue(s8).should.be.equal(uname);

      const s9 = '.connect-accounts-content .connect-accounts-form input[type="text"][name="email"]';
      const email = chance.email();
      browser.setValue(s9, email);
      browser.getValue(s9).should.be.equal(email);

      const s10 = '.connect-accounts-content .connect-accounts-form input[type="password"][name="password"]';
      const pass = '${chance.word({length: 7})}${chance.integer({min: 0})}';
      browser.setValue(s10, pass);
      browser.getValue(s10).should.be.equal(pass);

      const s11 = '.connect-accounts-content > form > button.action.submit';
      const s12 = '.connect-accounts-content > form > div.security-pin.ng-scope > input';
      browser.waitForVisible(s11, 3500);
      browser.click(s11);
      browser.waitForVisible(s12, 3500);
      browser.getUrl().should.have.path('/connect/pin-verification');

    });

    it('Select "United States" as "Country" name from the dropdown', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="country"]';
      browser.setValue(s, 'United States');
      browser.waitForVisible('//*[@id="_dropdown"]/div[3]/div/span', 3000);
      browser.click('//*[@id="_dropdown"]/div[3]/div/span');
      browser.getValue(s).should.be.equal('United States');
    });

    it('In the "Verify your email address" page click on "Edit" button to change email', () => {
      const s = '.connect-accounts-content > form > div.verify-email.ng-binding > a';
      const s2 = '.connect-accounts-content > form > div > input';
      const s3 = '.connect-accounts-content > form > div > button.tc-btn.tc-btn-primary.tc-btn-md';
      const email = chance.email();
      browser.click(s);
      browser.isVisibleWithinViewport(s2).should.be.true;
      browser.setValue(s2, email);
      browser.waitForVisible(s3, 5000);
    });

    it('Click button "Update email and send a new PIN"', () => {
      const s = '.connect-accounts-content > form > div > button.tc-btn.tc-btn-primary.tc-btn-md';
      const s2 = '.connect-accounts-content > form > div.confirmation-block.confirmation-block-md.ng-scope > span';
      browser.click(s);
      browser.isExisting(s2).should.be.false;
    });

    it('Select "United States" as "Country" name from the dropdown', () => {
      const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="country"]';
      browser.setValue(s, 'United States');
      browser.waitForVisible('//*[@id="_dropdown"]/div[3]/div/span', 3000);
      browser.click('//*[@id="_dropdown"]/div[3]/div/span');
      browser.getValue(s).should.be.equal('United States');
    });

    it('Click on the "Register" button', () => {
      const s = '.connect-accounts-content > form > button.action.submit';
      const s2 = '.connect-accounts-content > form > div.security-pin.ng-scope > input'
      browser.waitForVisible(s, 5000);
      browser.click(s);
      browser.waitForVisible(s2, 5000);
      browser.getUrl().should.have.path('/connect/pin-verification');
    });

    it('Enter "abc123" for PIN in "Security PIN" text box and click on the "Verify" button', () => {
      const s = '.connect-accounts-content > form > div.security-pin.ng-scope > input';
      const s2 = '.connect-accounts-content > form > div.security-pin.ng-scope > button';
      const s3 = '.connect-accounts-content > form > div.error-block.error-block-md.ng-binding.ng-scope';
      browser.setValue(s, 'abc123');
      browser.getValue(s).should.be.equal('abc123');
      browser.click(s2);
      browser.waitForVisible(s3, 3500);
      browser.getText(s3).should.be.equal('That PIN is incorrect. Please check that you entered the one you received.');
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

  describe('Verification of the Login page elements', () => {

    before(function() {
      browser.goToConnAppLogin();
    });

    it('Verify login page elements', () => {
      browser.isVisibleWithinViewport('.connect-accounts-header > img').should.be.true;
      const location = browser.getLocation('.connect-accounts-header > img');
      location.x.should.be.below(50);
      location.y.should.be.below(50);

      browser.isVisibleWithinViewport('.connect-accounts-header .login').should.be.true;
      browser.getText('.connect-accounts-header > div > span').should.be.equal('Don’t have an account?');
      browser.isVisibleWithinViewport('.connect-accounts-header > div > a').should.be.true;
      browser.getText('.connect-accounts-header > div > a').should.be.equal('Register for free');
      const location2 = browser.getLocation('.connect-accounts-header .login');
      location2.y.should.be.below(50);
      browser.getText('.connect-accounts-content > h2').should.be.equal('Log in to Topcoder');
      browser.isVisibleWithinViewport('.connect-accounts-content > form > div:nth-child(1) > input').should.be.true;
      const s = '#password-input';
      browser.isVisibleWithinViewport(s).should.be.true;
      browser.isVisibleWithinViewport('#toggleInputTypeBtn').should.be.true;
      browser.getText('#toggleInputTypeBtn').should.be.equal('Show');
      browser.getAttribute('.connect-accounts-content > form > div.forgot.small-text > a', 'href').should.be.equal('https://accounts.topcoder-dev.com/connect/forgot-password');
      const s2 = '.connect-accounts-content > form > button.action.tc-btn.tc-btn-primary.tc-btn-sm.disabled';
      browser.isVisibleWithinViewport(s2);
      browser.getCssProperty(s2, 'background').parsed.hex.should.be.equal('#1a85ff');
      browser.getText('body > ui-view > div > p').should.be.equal('© Topcoder 2018');
    });

    it(`Enter "invalid" in "Username or email" text box and "1Invaliduser" in "Password" field > Click Log in button"`, () => {
      const s1 = '.connect-accounts-content > form > div:nth-child(1) > input';
      const s2 = '#password-input';
      const s3 = '.connect-accounts-content > form > div:nth-child(2) > div';
      browser.setValue(s1, 'invalid');
      browser.setValue(s2, '1Invaliduser');
      browser.click('.connect-accounts-content > form > button:nth-child(5)');
      browser.waitForVisible(s3, 3500);
      browser.getText(s3).should.be.equal('That password is incorrect. Please check that you entered the right one.');
    });

    it('User should successfully login into the application with correct username and password', () => {
      const s = '.connect-accounts-content > form > div:nth-child(1) > input';
      const s2 = '#password-input';
      const s3 = '.connect-accounts-content > form > button:nth-child(5)';
      const s4 = '#root > div > div.TopBarContainer > div > div > div';
      browser.setValue(s, TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.USER);
      browser.setValue(s2, TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.PASS);
      browser.getValue(s).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.USER);
      browser.getValue(s2).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.PASS);
      browser.click(s3);
      browser.waitForVisible(s4, 5000);
      browser.getUrl().should.contain('/projects');
    });

  });

});
