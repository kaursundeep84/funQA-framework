/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_001
 * 
 * Login Page Field Validation checks
 */

describe('#TC_ConnApp_001 - Connect Application : Login page :', () => {

    //Run only when gui Navigation is passed. (global variable set by testrunner in before hook from the previous run)
    if (global.testHistory['Login_GuiNavigation']) {

        describe('Verify Field Validation ', () => {

            before(function () {
                browser.goToConnAppLogin();
              });

            //Need a refresh before each test as we key in multiple inputs in form fields and test.
            beforeEach(function () {
                browser.refresh();
            });

            it('Submit the form without filling the username field by either clicking the submit button or hitting Enter', () => {
                const s = '.connect-accounts-content > form > div:nth-child(1) > input';
                const s2 = '.connect-accounts-content > form > div:nth-child(1) > div.error-block';
                browser.hasFocus(s);
                //Send 'Enter' Key
                browser.keys("\uE007");
                browser.waitForVisible(s2, 5000);
                browser.isVisibleWithinViewport(s2).should.be.true;
                browser.getText(s2).should.contain('Please check that you entered it correctly.');


            });

            it('Submit the form without filling the password field by either clicking the submit button or hitting Enter', () => {
                const s1 = '.connect-accounts-content > form > div:nth-child(1) > input';
                const s2 = '#password-input';
                const s3 = '.connect-accounts-content > form > div:nth-child(2) > div.error-block';

                browser.setValue(s1, TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.USER);
                browser.setValue(s2, '');

                browser.keys("\uE007");
                browser.waitForVisible(s3, 5000);
                browser.isVisibleWithinViewport(s3).should.be.true;
                browser.getText(s3).should.contain('Please check that you entered the right one');


            });

            it('Login button should be disabled if the form is invalid', () => {

                const s1 = '.connect-accounts-content > form > div:nth-child(1) > input';
                const s2 = '#password-input';
                const s3 = '.connect-accounts-content > form > button[type=submit]';


                //Make form invalide by setting empty in both username and password fields
                browser.setValue(s1, '');
                browser.setValue(s2, '');

                browser.isVisibleWithinViewport(s3).should.be.false;


            });

            it('Login button should be enabled if the form is valid', () => {
                const s1 = '.connect-accounts-content > form > div:nth-child(1) > input';
                const s2 = '#password-input';
                const s3 = '.connect-accounts-content > form > button[type=submit]';


                //Make form valid by setting some text in both username and password fields
                browser.setValue(s1, 'sometext');
                browser.setValue(s2, 'sometext');

                browser.isVisibleWithinViewport(s3).should.be.true;
            });


        });


    }


});
