/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_025
 */

describe('#TC_ConnApp_025 - Connect Application : GUI Verification of the Dashboard elements', () => {


  describe('Ensure that all the elements are available in the header for Normal user', () => {

    before(function () {
      browser.loginToConnApp('user');
    });


    it('Topcoder Log is visiable', () => {
      browser.isVisible('#root .primary-toolbar .logo-wrapper .logo svg').should.be.true;
    });

    it('My Project Link, Getting Started Link, Help Link are visiable', () => {
      const s = '#root .primary-toolbar .logo-wrapper .MenuBar a';
      const items = browser.getText(s);
      const links = ['MY PROJECTS', 'GETTING STARTED', 'HELP'];
      links.forEach((link, index) => {
        items[index].should.be.equal(link);
      });
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
  });

});
