/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_001
 */

describe('#TC_ConnApp_001 - Connect Application : Forgot Password page :', () => {

    //Run only when gui Navigation is passed. (global variable set by testrunner in before hook from the previous run)
    if (global.testHistory['ForgotPassword_GuiNavigation']) {

        describe('Field Validation Verification', () => {

            //Load page
            before(function () {
                browser.url(TEST_SUITE_CONFIG.TC_CONN_APP.URL_FORGOT_PWD);
            });

            //Page load test
            it('Test the loading of Connect Login page', () => {
                browser.getUrl().should.contain('/connect/forgot-password');

            });

            it('Enter "SomeText" in the "email" field  and delete the input', () => {
                const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="email"]';
                const s2 = '.connect-accounts-content > form > div > div.error-block.ng-active > span';
                browser.setValue(s, 'jona_abr@mailinator.com');
                browser.getValue(s).should.be.equal('jona_abr@mailinator.com');
                browser.setValue(s, '');
                browser.getValue(s).should.be.equal('');
                browser.waitForVisible(s2, 3000);
                browser.getText(s2).should.be.equal('Please enter an email address.');
            });

            it('Email field should not accept an invalid email address', () => {
                const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="email"]';
                const s2 = '.connect-accounts-content > form > div > div.error-block.ng-active > span';
                browser.setValue(s, 'abc');
                browser.getValue(s).should.be.equal('abc');
                browser.waitForVisible(s2, 3000);
                browser.isExisting(s2).should.be.true;
                browser.getText(s2).should.be.equal('Please enter a valid email address.');
            });

            it('Email field should accept a valid email address', () => {
                const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="email"]';
                const s2 = '.connect-accounts-content > form > div > div.error-block.ng-active > span';

                browser.setValue(s, 'abc@topcoder.com');
                browser.getValue(s).should.be.equal('abc@topcoder.com');

                //No error message
                browser.isExisting(s2).should.be.false;

            });

            it('Get reset link button should be disabled if the form is invalid', () => {
                const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="email"]';
                const s3 = '.connect-accounts-content > form > button[type="submit"][disabled="disabled"]';

                //Empty the email field
                browser.setValue(s, '');

                //Disabled button is existing
                browser.isVisibleWithinViewport(s3).should.be.true;

            });

            it('Get reset link button should be enabled if the form is valid', () => {
                const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="email"]';

                const s3 = '.connect-accounts-content > form > button[type="submit"][disabled="disabled"]';
                browser.isExisting(s3).should.be.true;

                browser.setValue(s, 'abc@topcoder.com');
                browser.getValue(s).should.be.equal('abc@topcoder.com');


                //Disabled button is not existing
                browser.isExisting(s3).should.be.false;
            });




        });

    }
});
