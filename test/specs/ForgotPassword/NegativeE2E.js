/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_001
 */

describe('#TC_ConnApp_001 - Connect Application : Forgot Password page :', () => {

    //Run only when PositiveE2E is passed. (global variable set by testrunner in before hook from the previous run)
    if (global.testHistory['ForgotPassword_PositiveE2E']) {
        describe('Negative E2E Test', () => {

            //Load page
            before(function () {
                browser.url(TEST_SUITE_CONFIG.TC_CONN_APP.URL_FORGOT_PWD);
            });

            it('A user should not be able to submit the form with not existing email', () => {
                const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="email"]';
                const s3 = '.connect-accounts-content > form > button[type="submit"]';
                const s4 = 'body > ui-view > div > div.connect-accounts-content > div.error-block';
                browser.setValue(s, 'invalidemailaddress@topcoder.com');

                browser.waitForVisible(s3, 3500);
                browser.click(s3);
                //Error message visible
                browser.waitForVisible(s4, 5000);
                browser.getText(s4).should.contain('Please try again or contact support');

            });

        });
    }
});
