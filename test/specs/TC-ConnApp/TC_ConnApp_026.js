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

    it('Click on "About" link, should open about-topcoder page', () => {
      checkLink('#root > div > div.Footer > div > ul > li:nth-child(1) > a', 'About', 'https://www.topcoder.com/about-topcoder/')
    });

    it('Click on "Contact Us" link, should open Contact us page', () => {
      checkLink('#root > div > div.Footer > div > ul > li:nth-child(2) > a', 'Contact us', 'https://www.topcoder.com/about-topcoder/contact/')
    });

    it('Click on "Privacy" link, should open privacy page', () => {
      checkLink('#root > div > div.Footer > div > ul > li:nth-child(3) > a', 'Privacy', 'https://www.topcoder.com/community/how-it-works/privacy-policy')

    });

    it('Click on "Terms" link, should open about-topcoder page', () => {
      checkLink('#root > div > div.Footer > div > ul > li:nth-child(4) > a', 'Terms', 'https://connect.topcoder.com/terms');
    });

    it('Check the bottom left corner in the footer and verify the credit text', () => {
      const s = '#root > div > div.Footer > p';
      browser.getText(s).should.be.equal('© Topcoder 2018');
    });
  });


});
