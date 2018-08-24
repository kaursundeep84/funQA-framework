/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_024
 */

describe('#TC_ConnApp_024 - Connect Application : GUI Verification of the Dashboard elements', () => {

  describe('Ensure that all the elements are available in the header for Manager user', () => {

    before(function () {
      browser.loginToConnApp('admin');
      browser.waitForVisible('#wrapper-main .content-pane section > div > div > section > div > div.container > div > div > div:nth-child(2)');
    });

    it('Assert admin login visible elements', () => {
      browser.isVisible('#root .primary-toolbar .logo-wrapper a.logo').should.be.true;
      browser.isVisible('#root .primary-toolbar .search-widget .SearchBar input').should.be.true;
      browser.isVisible('#root .primary-toolbar .search-widget .search-filter a:nth-child(2)').should.be.true;
      browser.isVisible('#root .primary-toolbar .actions a.new-project-link').should.be.true;
      browser.isVisible('#root .primary-toolbar .actions .welcome-info .sb-avatar').should.be.true;
      browser.isVisible('#root .primary-toolbar .actions .notifications-dropdown').should.be.true;
      browser.isVisibleWithinViewport('#root #wrapper-main section .right-wrapper .SwitchButton').should.be.true;
      const s = '#wrapper-main .list-nav-container .left-wrapper > div > :nth-child(2) > ul > li';
      const items = browser.getText(s);
      assert.equal(items.length, 8);
      const filters = ['All Projects', 'Active', 'Draft', 'In review', 'Reviewed', 'Completed', 'Cancelled', 'Paused'];
      for (var i = 0; i < items.length; i++) {
        items[i].should.be.equal(filters[i]);
      }
    });

    it('Grid view button & List view button is visible', () => {
      const s = '#root #wrapper-main section .grid-view-ico';
      browser.isVisibleWithinViewport(s).should.be.true;
      browser.click(s);
      const gradView = '#wrapper-main .container section.gridview-content';
      browser.isVisibleWithinViewport(gradView).should.be.true;
      const cardView = '#wrapper-main .container .card-view';
      browser.isVisibleWithinViewport(cardView).should.be.true;
    });
  });

});
