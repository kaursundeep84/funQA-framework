/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_052
 */
describe('#TC_ConnApp_052 - Connect Application : E2E Help', () => {

  describe('Accessing "Help" page from sub-menu', () => {

    before(function() {
      browser.loginToConnApp();
    });

    it('Click on User avatar from the header and click "Help" button from sub-menu', () => {
      const s = '#root > div > div.TopBarContainer > div > div > div .links-section';
      browser.waitForVisible(s).should.be.true;
      browser.click(s);
      browser.waitForVisible(`${s} .dropdown-menu-list`).should.be.true;
      browser.click(`${s} .dropdown-menu-list > ul:nth-child(1) > li:nth-child(2) > a`);
      browser.getUrl().should.contain('https://help.topcoder.com');
    });

  });

});
