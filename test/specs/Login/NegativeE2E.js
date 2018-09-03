/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_001
 */

describe('#TC_ConnApp_001 - Connect Application : Login page :', () => {

    //Run only when positive E2E scenario is passed. (global variable set by testrunner in before hook from the previous run)
    if (global.testHistory['Login_PositiveE2E']) {

        describe('Negative E2E Scenario Tests', () => {

            beforeEach(function () {
                browser.goToConnAppLogin();
            });


            it(`A user should not be able to login with invalid username`, () => {
                const s1 = '.connect-accounts-content > form > div:nth-child(1) > input';
                const s2 = '#password-input';
                const s3 = '.connect-accounts-content > form > div:nth-child(1) > div.error-block';
                browser.setValue(s1, 'not_a_valid_user');
                browser.setValue(s2, 'wrong_password');
                browser.click('.connect-accounts-content > form > button:nth-child(5)');
                browser.waitForVisible(s3, 3500);
                browser.getText(s3).should.contain('Please check that you entered it correctly');
            });

            it(`A user should not be able to login with invalid password`, () => {
                const s1 = '.connect-accounts-content > form > div:nth-child(1) > input';
                const s2 = '#password-input';
                const s3 = '.connect-accounts-content > form > div:nth-child(2) > div.error-block';
                browser.setValue(s1, 'pat_monahan');
                browser.setValue(s2, 'wrong_password');
                browser.click('.connect-accounts-content > form > button:nth-child(5)');
                browser.waitForVisible(s3, 3500);
                browser.getText(s3).should.contain('That password is incorrect. Please check that you entered the right one.');
            });


        });
    }
});