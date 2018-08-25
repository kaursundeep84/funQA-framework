/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_026
 */

import {
  checkLink
}
  from "./helpers/common"

describe('#TC_ConnApp_026 - Connect Application : GUI Verification of the Dashboard elements', () => {

  describe('Ensure that all the elements are available in the footer', () => {

    before(function () {
      browser.loginToConnApp('user');
      const s = '#root > div > div.TopBarContainer > div > div > div';
      browser.waitForVisible(s);
      browser.getUrl().should.contain('/projects');
    });

    it('Verify all elements', () => {
      checkLink('#root > div > div.Footer > div > ul > li:nth-child(1) > a', 'About', 'https://www.topcoder.com/about-topcoder/')
      checkLink('#root > div > div.Footer > div > ul > li:nth-child(2) > a', 'Contact us', 'https://www.topcoder.com/about-topcoder/contact/')
      checkLink('#root > div > div.Footer > div > ul > li:nth-child(3) > a', 'Privacy', 'https://www.topcoder.com/community/how-it-works/privacy-policy')
      checkLink('#root > div > div.Footer > div > ul > li:nth-child(4) > a', 'Terms', 'https://connect.topcoder.com/terms');
      const s = '#root > div > div.Footer > p';
      browser.getText(s).should.be.equal('© Topcoder 2018');
    });

  });


});
