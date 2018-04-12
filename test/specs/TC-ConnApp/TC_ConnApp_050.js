/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_050
 */
describe('#TC_ConnApp_050 - Connect Application : E2E Verification of My Project toggle', () => {

  describe('Verification of My Project toggle', () => {

    before(function() {
      browser.loginToConnApp();
    });

    it('Enable the toggle "My Project" from the header', () => {
      const s = 'div.main-wrapper .list-nav-container div.primary-filter > div > div';
      browser.click(s);
      browser.getValue(`${s} > label > input[type="checkbox"]`).should.be.equal('on');
    });

    it('Check the Project listing', () => {
      browser.elements('#wrapper-main .content-pane .container .gridview-content .flex-data > div:nth-child(2) > div .flex-row').value.length.should.be.above(0);
    });
  });
});
