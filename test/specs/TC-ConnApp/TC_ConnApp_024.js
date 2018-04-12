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
    it('Topcoder Log is visiable', () => {
      browser.isVisible('#root .primary-toolbar .logo-wrapper a.logo').should.be.true;
    });

    it('Search text box is visiable', () => {
      browser.isVisible('#root .primary-toolbar .search-widget .SearchBar input').should.be.true;
    });

    it('Filter button is visiable', () => {
      browser.isVisible('#root .primary-toolbar .search-widget .search-filter a').should.be.true;
    });

    it('Create Project Button is visiable', () => {
      browser.isVisible('#root .primary-toolbar .actions a.new-project-link').should.be.true;
    });

    it('Profile Picture Avatar is visiable', () => {
      browser.isVisible('#root .primary-toolbar .actions .welcome-info .sb-avatar').should.be.true;
    });

    it('Notification Icon is visiable', () => {
      browser.isVisible('#root .primary-toolbar .actions .notifications-dropdown').should.be.true;
    });

    it('My Projects toggle Button is visiable', () => {
      browser.isVisibleWithinViewport('#root #wrapper-main section .SwitchButton').should.be.true;
    });

    it('List view button is visiable', () => {
      const s = '#root #wrapper-main section .grid-view-ico';
      browser.isVisibleWithinViewport(s).should.be.true;
      browser.click(s);
      const gradView = '#wrapper-main .container section.gridview-content';
      browser.isVisibleWithinViewport(gradView).should.be.true;
    });

    it('Grid view button is visiable', () => {
      const s = '#root #wrapper-main section .card-view-ico';
      browser.isVisibleWithinViewport(s).should.be.true;
      browser.click(s);
      const cardView = '#wrapper-main .container .card-view';
      browser.isVisibleWithinViewport(cardView).should.be.true;
    });

    it('Status Filter is visiable', () => {
      const s = '#wrapper-main .list-nav-container .left-wrapper > li a';
      const items = browser.getText(s);
      assert.equal(items.length, 8);
      const filters = ['All projects', 'Active', 'Draft', 'In review', 'Reviewed', 'Completed', 'Cancelled', 'Paused'];
      for (var i = 0; i < items.length; i++) {
        items[i].should.be.equal(filters[i]);
      }
    });
  });

});
