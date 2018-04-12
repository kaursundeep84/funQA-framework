/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_035
 */
describe('#TC_ConnApp_035 - Connect Application : E2E Project Details Page', () => {

  require('./TC_ConnApp_034.js');

  describe('Leave from Project', () => {

    it('Hover over the manager name from the "PROJECT TEAM (x)" section', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel > div:nth-child(4).panel-row';
      browser.waitForVisible(s);
      browser.moveToObject(`${s} .name`);
      browser.isVisibleWithinViewport(`${s} button.btn-leave > svg`).should.be.true;
      browser.getAttribute(`${s} button.btn-leave`, 'title').should.be.equal('Leave Project');
    });

    it('Click on "Leave Project" icon', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      browser.click(`${s} > div:nth-child(4).panel-row button`);
      browser.waitForVisible(`${s} .modal`).should.be.true;
      browser.getText(`${s} .modal .modal-title.danger`).should.be.equal('You are about to leave the project');
      browser.getText(`${s} .modal .modal-body .message`).should.be.equal('Once you leave, somebody on the team has to add you for you to be able to see the project. Do you still want to leave the project?');
      browser.getText(`${s} .modal .modal-body .button-area > button:nth-child(1)`).should.be.equal('Cancel');
    });

    it('Click "Cancel" button', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      browser.click(`${s} .modal .modal-body .button-area > button:nth-child(1)`);
      browser.isVisible(`${s} .modal`).should.be.false;
    });

    it('Click on "Leave Project" icon >> Click "Leave Project" button', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      const s1 = `#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel > div:nth-child(4).panel-row`;
      const s2 = '.s-alert-box-inner';
      browser.moveToObject(`${s1} .name`);
      browser.isVisibleWithinViewport(`${s1} button.btn-leave > svg`).should.be.true;
      browser.click(`${s1} button.btn-leave`);
      browser.waitForVisible(`${s} .modal`).should.be.true;
      browser.getText(`${s} .modal .modal-body .button-area > button:nth-child(2)`).should.be.equal('Leave Project');
      browser.click(`${s} .modal .modal-body .button-area > button:nth-child(2)`);
      browser.waitForVisible(s2).should.be.true;
      browser.getText(`${s2} > span`).should.be.equal(`You've successfully left the project.`);
      browser.waitUntil(() => {
        return $(s2).type === 'NoSuchElement';
      });

    });

  });

});
