/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_001
 */

describe('#TC_ConnApp_001 - Connect Application : Login page :', () => {

    //Run only when Field validation step is passed. (global variable set by testrunner in before hook from the previous run)
    if (global.testHistory['Login_FieldValidation']) {
        describe('Positive E2E Scenario Tests', () => {

            before(function () {
                browser.goToConnAppLogin();
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
    }
});
