/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_042
 */
describe('#TC_ConnApp_042 - Connect Application : E2E Project Details Page', () => {

  require('./TC_ConnApp_041.js');

  describe('Remove Copilot from a Project', () => {

    it('Hover over the member name from the "PROJECT TEAM (x)" section', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      browser.moveToObject(`${s} > div:nth-child(4) .name`);
      browser.waitForVisible(`${s} > div:nth-child(4) button.btn-user-remove`).should.be.true;
    });

    it('Click on "Remove" button', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      browser.click(`${s} > div:nth-child(4) button.btn-user-remove`);
      browser.getText(`${s}.modal-active .modal .modal-title`).should.be.equal('You are about to remove a copilot');
      browser.getText(`${s}.modal-active .modal .modal-body .message`).should.be.equal('The copilot will lose all rights to the project and can’t see or interact with it anymore. Do you still want to remove the copilot');
    });

    it('Click "Cancel" button', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      browser.click(`${s}.modal-active .modal .modal-body .button-area > button:nth-child(1)`);
      browser.isVisible(`${s} .modal`).should.be.false;
    });

    it('Click on "Remove" button >> Click "Remove Copilot" button', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      browser.moveToObject(`${s} > div:nth-child(4) .name`);
      browser.waitForVisible(`${s} > div:nth-child(4) button.btn-user-remove`).should.be.true;
      browser.click(`${s}  > div:nth-child(4) button.btn-user-remove`);
      browser.isVisible(`${s} .modal`).should.be.true;
      browser.click(`${s}.modal-active .modal .modal-body .button-area > button:nth-child(2)`);
      browser.waitUntil(() => {
        return browser.elements(`${s} .panel-row`).value.length === 1;
      });
      browser.isVisible(`${s} > div:nth-child(4) .name`).should.be.false;
    });

  });

});
