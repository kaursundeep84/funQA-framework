/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_001
 * 
 * 
 * In this E2E Positive Test we do the following.
 * 
 * 1. We fill up the entire form fields of Register Form and Click Register
 * 2. In the new page we just enter a pin "abc123" just to see we get a message as incorrect PIN. (Ideally we can not test with the correct pin sent to actual email)
 * 3. Then, We click the 'edit' link in the  page and update an invalid address in the input to verify the error message displayed for invalid email address.
 * 4. Then, We update the input with valid email address and click "Update email and send a new PIN" button to check if the confirmation block gets cleared.
 */

describe('#TC_ConnApp_001 - Connect Application : Registration page :', () => {

    //Run only when FieldValidation is passed. (global variable set by testrunner in before hook from the previous run)
    if (global.testHistory['Registration_FieldValidation']) {

        describe('Positive E2E Scenario Tests', () => {

            before(function () {
                browser.url(TEST_SUITE_CONFIG.TC_CONN_APP.URL_REGISTER);
            });


            it('Fill all fields and proceed to register', () => {

                const registerDisabled = '.connect-accounts-content > form > button[type="submit"][disabled="disabled"]';
                browser.isVisibleWithinViewport(registerDisabled).should.be.true;

                const s6 = '.connect-accounts-content .connect-accounts-form input[type="text"][name="firstname"]';
                const fname = chance.first();
                browser.setValue(s6, fname);
                browser.getValue(s6).should.be.equal(fname);

                const s7 = '.connect-accounts-content .connect-accounts-form input[type="text"][name="lastname"]';
                const lname = chance.last();
                browser.setValue(s7, lname);
                browser.getValue(s7).should.be.equal(lname);

                const s8 = '.connect-accounts-content .connect-accounts-form input[type="text"][name="username"]';
                const uname = chance.word({ length: 5 });
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

                const ctry = '.connect-accounts-content .connect-accounts-form input[type="text"][name="country"]';
                browser.setValue(ctry, 'United States');
                browser.waitForVisible('//*[@id="_dropdown"]/div[3]/div/span', 3000);
                browser.click('//*[@id="_dropdown"]/div[3]/div/span');

                const s11 = '.connect-accounts-content > form > button.action.submit';
                const s12 = '.connect-accounts-content > form > div.security-pin.ng-scope > input';
                browser.waitForVisible(s11, 10000);
                browser.click(s11);
                browser.waitForVisible(s12, 10000);
                browser.getUrl().should.have.path('/connect/pin-verification');

            });

            it('Enter "abc123" for PIN in "Security PIN" text box and click on the "Verify" button. Expected PIN is incorrect', () => {
                const s = '.connect-accounts-content > form > div.security-pin.ng-scope > input';
                const s2 = '.connect-accounts-content > form > div.security-pin.ng-scope > button';
                const s3 = '.connect-accounts-content > form > div.error-block.error-block-md.ng-binding.ng-scope';
                browser.setValue(s, 'abc123');
                browser.getValue(s).should.be.equal('abc123');
                browser.click(s2);
                browser.waitForVisible(s3, 3500);
                browser.getText(s3).should.be.equal('That PIN is incorrect. Please check that you entered the one you received.');
            });


            it('Click edit link to update new email address and give invalid email address', () => {
                const s = '.connect-accounts-content > form > div.verify-email.ng-binding > a';
                const s2 = '.connect-accounts-content > form > div > input';
                const s3 = '.connect-accounts-content > form > div > div > span';
                browser.click(s);
                browser.isVisibleWithinViewport(s2).should.be.true;
                browser.setValue(s2, 'sam_simp@test');
                browser.isVisibleWithinViewport(s3).should.be.true;
                browser.getText(s3).should.be.equal('Please enter a valid email address.');
            });


            it('In the email update page, give valid email address', () => {

                const s2 = '.connect-accounts-content > form > div > input';
                const s3 = '.connect-accounts-content > form > div > button.tc-btn.tc-btn-primary.tc-btn-md';
                const email = chance.email();

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


        });

    }

});
