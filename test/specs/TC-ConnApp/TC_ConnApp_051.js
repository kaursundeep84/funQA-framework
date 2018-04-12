/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_051
 */
describe('#TC_ConnApp_051 - Connect Application : E2E Log out', () => {

  describe('User successfully logs out from the application', () => {
    
    before(function() {
      browser.loginToConnApp();
    });

    it('Click on User avatar from the header and click "Log out" button from sub-menu', () => {
      browser.logoutConnApp();
    });

  });

});
