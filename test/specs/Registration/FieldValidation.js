/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_001
 */

describe('#TC_ConnApp_001 - Connect Application : Registration page :', () => {

    //Run only when gui Navigation is passed. (global variable set by testrunner in before hook from the previous run)
    if (global.testHistory['Registration_GuiNavigation']) {

        describe.only('Field Validations', () => {

            before(function () {
                browser.url(TEST_SUITE_CONFIG.TC_CONN_APP.URL_REGISTER);
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


            describe('Country field Validations', () => {

                beforeEach(function () {
                    browser.refresh();
                });

                it('Enter some text on the Country field and then delete the text', () => {
                    const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="country"]';
                    const s2 = '.connect-accounts-content .connect-accounts-form input[type="text"][name="lastname"]';
                    const s3 = '.connect-accounts-content > form > div:nth-child(3) > div > div';
                    browser.setValue(s, 'India');
                    browser.getValue(s).should.be.equal('India');
                    browser.setValue(s, '');
                    browser.click(s2);
                    browser.isVisibleWithinViewport(s3).should.be.true;
                    browser.getText(s3).should.be.equal('Please choose a country from the list');
                });

                it('Enter some text on the field. eg. "Gr" The field should show a list with "Greece"', () => {
                    const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="country"]';
                    browser.setValue(s, 'Gr');
                    browser.waitForVisible('//*[@id="_dropdown"]/div[3]/div/span', 3000);
                    browser.getText('//*[@id="_dropdown"]/div[3]/div').should.be.equal('Greece');
                });


                it('Enter some text on the field. eg. "Gr" The field should show a list with "Greece" and User should be able to select', () => {
                    const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="country"]';
                    browser.setValue(s, 'Gr');
                    browser.waitForVisible('//*[@id="_dropdown"]/div[3]/div/span', 3000);
                    browser.click('//*[@id="_dropdown"]/div[3]/div/span');
                    browser.getValue(s).should.be.equal('Greece');
                });

                it('Country should only accept values from the list. If "InvalidCountry" entered, a error should be shown.', () => {
                    const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="country"]';
                    const s2 = '.connect-accounts-content .connect-accounts-form input[type="text"][name="lastname"]';
                    const s3 = '.connect-accounts-content > form > div:nth-child(3) > div > div';
                    browser.setValue(s, 'wrongcountry');
                    browser.getValue(s).should.be.equal('wrongcountry');
                    //browser.waitForVisible('//*[@id="_dropdown"]/div[2]', 3000);
                    //browser.getText('//*[@id="_dropdown"]/div[2]').should.be.equal('No results found');
                    browser.click(s2);
                    browser.isVisibleWithinViewport(s3).should.be.true;
                    browser.getText(s3).should.be.equal('Please choose a country from the list');
                });

                it('Select "United States" as "Country" name from the dropdown', () => {
                    const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="country"]';
                    browser.setValue(s, 'United States');
                    browser.waitForVisible('//*[@id="_dropdown"]/div[3]/div/span', 3000);
                    browser.click('//*[@id="_dropdown"]/div[3]/div/span');
                    browser.getValue(s).should.be.equal('United States');
                });

            });


            describe('Username field Validations', () => {

                beforeEach(function () {
                    browser.refresh();
                });

                it('Enter "ab_Jon" in the "Username" text box and delete the text', () => {
                    const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="username"]';
                    const s2 = '/html/body/ui-view/div/div[2]/form/div[4]/div[2]/span';
                    browser.setValue(s, 'ab_Jon');
                    browser.getValue(s).should.be.equal('ab_Jon');
                    browser.setValue(s, '');
                    browser.waitForVisible(s2, 3000);

                    browser.getText(s2).should.be.equal('Please enter a username.');

                });

                it('Username should have a help tooltip', () => {

                    const s2 = '.connect-accounts-content .connect-accounts-form input[type="text"][name="username"]';
                    browser.setValue(s2, 'A');
                    browser.isVisibleWithinViewport('.connect-accounts-content > form > div:nth-child(4) > div.tooltip').should.be.true;
                    browser.getText('.connect-accounts-content > form > div:nth-child(4) > div.tooltip > h4').should.be.equal('USERNAME TIPS:');
                    browser.getText('.connect-accounts-content > form > div:nth-child(4) > div.tooltip > p:nth-child(3)').should.be.equal('Your username will be public');
                    browser.getText('.connect-accounts-content > form > div:nth-child(4) > div.tooltip > p:nth-child(4)').should.be.equal('It must be 3-15 characters long');
                    browser.getText('.connect-accounts-content > form > div:nth-child(4) > div.tooltip > p:nth-child(5)').should.be.equal('It can contain numbers, letters, and only these special characters -_.{}[]');

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

                it('Username should only accept available usernames', () => {
                    const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="username"]';
                    const s2 = '.connect-accounts-content > form > div:nth-child(4) > div.error-block.ng-scope.ng-active > span';
                    browser.setValue(s, 'pat_monahan');
                    browser.getValue(s).should.be.equal('pat_monahan');
                    browser.waitForVisible(s2, 3000);
                    browser.getText(s2).should.be.equal('That username is already taken.');
                });

            });

            //Email field validations

            describe('Email field Validations', () => {

                beforeEach(function () {
                    browser.refresh();
                });

                it('Enter "jona_abr@mailinator.com" in the "Email" text box and delete the text', () => {
                    const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="email"]';
                    const s2 = '.connect-accounts-content > form > div:nth-child(5) > div.error-block.ng-active > span';
                    browser.setValue(s, 'jona_abr@mailinator.com');
                    browser.getValue(s).should.be.equal('jona_abr@mailinator.com');
                    browser.setValue(s, '');
                    browser.getValue(s).should.be.equal('');
                    browser.waitForVisible(s2, 3000);
                    browser.getText(s2).should.be.equal('Please enter an email address.');
                });

                it('Email should have a help tooltip', () => {

                    const s3 = '.connect-accounts-content .connect-accounts-form input[type="text"][name="email"]';
                    browser.setValue(s3, 'A');
                    browser.isVisibleWithinViewport('.connect-accounts-content > form > div:nth-child(5) > div:nth-child(3)').should.be.true;
                    browser.getText('.connect-accounts-content > form > div:nth-child(5) > div:nth-child(3) > h4').should.be.equal('EMAIL TIPS:');
                    browser.getText('.connect-accounts-content > form > div:nth-child(5) > div:nth-child(3) > p.text-mb').should.be.equal('Your email address will be private and not shared with anyone.');
                    browser.getText('.connect-accounts-content > form > div:nth-child(5) > div:nth-child(3) > p:nth-child(4)').should.be.equal('We\'ll send you messages related to your account and project activities.');

                });


                it('Email should only accept valid email addresses', () => {
                    const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="email"]';
                    const s2 = '.connect-accounts-content > form > div:nth-child(5) > div.error-block.ng-active > span';
                    browser.setValue(s, 'jona_abr@test');
                    browser.getValue(s).should.be.equal('jona_abr@test');
                    browser.waitForVisible(s2, 3000);
                    browser.getText(s2).should.be.equal('Please enter a valid email address.');
                });

                it('Email should only accept available email addresses', () => {
                    const s = '.connect-accounts-content .connect-accounts-form input[type="text"][name="email"]';
                    const s2 = '.connect-accounts-content > form > div:nth-child(5) > div.error-block.ng-active > span';
                    const s3 = '.connect-accounts-content .connect-accounts-form input[type="password"][name="password"]';
                    browser.setValue(s, 'support@topcoder.com');
                    browser.getValue(s).should.be.equal('support@topcoder.com');
                    browser.click(s3);
                    browser.waitForVisible(s2, 6000);
                    browser.getText(s2).should.be.equal('That email address is already taken.');
                });


            });

            //Passworld field validations
            describe('Password field Validations', () => {

                beforeEach(function () {
                    browser.refresh();
                });


                it('Password should have a help tooltip', () => {

                    const s4 = '.connect-accounts-content .connect-accounts-form input[type="password"][name="password"]';

                    browser.setValue(s4, 'A');
                    browser.isVisibleWithinViewport('.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div').should.be.true;
                    browser.getText('.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > h4').should.be.equal('YOUR PASSWORD MUST HAVE:');
                    browser.getText('.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > p:nth-child(3)').should.be.equal('At least 8 characters');
                    browser.getText('.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > p:nth-child(4)').should.be.equal('At least 1 letter');
                    browser.getText('.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > p:nth-child(5)').should.be.equal('At least 1 number or symbol');


                });

                it('Enter "abc" in the "Password" text box', () => {
                    const s = '.connect-accounts-content .connect-accounts-form input[type="password"][name="password"]';
                    //Atleast 8 characters
                    const s3 = '.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > p:nth-child(3) > img';
                    //Atleast 1 letter
                    const s4 = '.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > p:nth-child(4) > img';
                    //Atlease 1 number or symbol
                    const s5 = '.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > p:nth-child(5) > img';
                    browser.setValue(s, 'abc');
                    browser.getValue(s).should.be.equal('abc');
                    browser.isExisting(s3).should.be.false;
                    browser.isExisting(s4).should.be.true;
                    browser.isExisting(s5).should.be.false;
                });

                it('Enter "topcoder123" in the "Password" text box', () => {
                    const s = '.connect-accounts-content .connect-accounts-form input[type="password"][name="password"]';
                    const s3 = '.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > p:nth-child(3) > img';
                    const s4 = '.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > p:nth-child(4) > img';
                    const s5 = '.connect-accounts-content > form > div.wrapper.wrapper-tooltip.ng-scope > div > p:nth-child(5) > img';
                    browser.setValue(s, 'topcoder123');
                    browser.getValue(s).should.be.equal('topcoder123');
                    browser.isExisting(s3).should.be.true;
                    browser.isExisting(s4).should.be.true;
                    browser.isExisting(s5).should.be.true;
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

            //Register Button validation
            describe('Register button Validations', () => {

                before(function () {
                    browser.refresh();
                });


                it('Register button should be disabled if the form is invalid. Except password all fields filled', () => {

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

                    const ctry = '.connect-accounts-content .connect-accounts-form input[type="text"][name="country"]';
                    browser.setValue(ctry, 'United States');
                    browser.waitForVisible('//*[@id="_dropdown"]/div[3]/div/span', 3000);
                    browser.click('//*[@id="_dropdown"]/div[3]/div/span');


                    browser.isVisibleWithinViewport(registerDisabled).should.be.true;


                });

                it('Register button should be enabled if the form is valid. Fill password field', () => {

                    const registerDisabled = '.connect-accounts-content > form > button[type="submit"][disabled="disabled"]';
                    browser.isVisibleWithinViewport(registerDisabled).should.be.true;

                    const s10 = '.connect-accounts-content .connect-accounts-form input[type="password"][name="password"]';
                    const pass = '${chance.word({length: 7})}${chance.integer({min: 0})}';
                    browser.setValue(s10, pass);
                    browser.getValue(s10).should.be.equal(pass);


                    const registerEnabledBtn = '.connect-accounts-content > form > button.action.submit';
                    //Register button enabled
                    browser.waitForVisible(registerEnabledBtn, 3500);
                    //Disabled button should not be visible now.
                    browser.isVisibleWithinViewport(registerDisabled).should.be.false;


                });


            });




        });



    }



});
