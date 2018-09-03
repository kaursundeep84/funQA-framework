/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_001
 */

describe('#TC_ConnApp_001 - Connect Application : Forgot Password page :', () => {


    describe('GUI Navigation Verification', () => {

        //Load page
        before(function () {
            browser.url(TEST_SUITE_CONFIG.TC_CONN_APP.URL_FORGOT_PWD);
            
        });

        //Page load test
        it('Test the loading of Connect Login page', () => {
            browser.getUrl().should.contain('/connect/forgot-password');
            
        });

        it('Logo should be displayed on upper left corner', () => {
            browser.isVisibleWithinViewport('.connect-accounts-header > img').should.be.true;
            const location = browser.getLocation('.connect-accounts-header > img');
            location.x.should.be.below(50);
            location.y.should.be.below(50);
        });

        it('Login button should be visible on the upper right corner and the link should take you to the login page', () => {
            browser.isVisibleWithinViewport('.connect-accounts-header .login > a').should.be.true;
            browser.getText('.connect-accounts-header .login > a').should.be.equal('Log in');
            const location2 = browser.getLocation('.connect-accounts-header .login');
            location2.y.should.be.below(50);
        });

        it('The Forgot Password form should be visible', () => {

            browser.isVisibleWithinViewport('.connect-accounts-container .connect-accounts-content .connect-accounts-form').should.be.true;
            browser.isVisibleWithinViewport('.connect-accounts-container > div.connect-accounts-content > form').should.be.true;
            browser.getText('div.connect-accounts-content > h2').should.be.equal('Reset your password');

        });

        it('The "Email" field should be visible', () => {

            browser.isVisibleWithinViewport('.connect-accounts-content > form > div:nth-child(1) > input').should.be.true;

        });

        it('The "Get reset link" button should be visible but disabled', () => {

            const s5 = '.connect-accounts-content > form > button[type="submit"][disabled="disabled"]';
            browser.isVisibleWithinViewport(s5).should.be.true;
      
        });

        it('The help text should be visible and contain support mail address', () => {

            browser.getText('.connect-accounts-content > form > p').should.contain('Enter your email address');
            browser.getAttribute('.connect-accounts-content > form > p > a', 'href').should.be.equal('mailto:support@topcoder.com');

      
        });

        it('The copyright text should be visible in the bottom of the page', () => {
           
            browser.getText('body > ui-view > div > footer > p').should.be.equal('© Topcoder 2018');
        });

    });

});
