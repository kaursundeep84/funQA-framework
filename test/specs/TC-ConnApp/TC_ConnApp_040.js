/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_040
 */
describe('#TC_ConnApp_040 - Connect Application : E2E Project Details Page', () => {

  require('./TC_ConnApp_036.js');

  describe('Assign member as Owner', () => {

    it('Hover over the member name from the "PROJECT TEAM (x)" section', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      browser.moveToObject(`${s} > div:nth-child(4) .name`);
      browser.waitForVisible(`${s} > div:nth-child(4) button.btn-user-remove`).should.be.true;
      browser.waitForVisible(`${s} > div:nth-child(4) button.btn-promote`).should.be.true;
    });

    it('Click on "Assign" button', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      browser.click(`${s} > div:nth-child(4) button.btn-promote`);
      browser.getText(`${s} .modal .modal-title`).should.be.equal('You are about to assign a new project owner');
      browser.getText(`${s} .modal .modal-body .message`).should.be.equal(`${TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.NAME} will become responsible for the project and be able to add and remove team members. Are you sure you want to proceed?`);
    });

    it('Click "Cancel" button', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      browser.click(`${s} .modal .modal-body .button-area > button:nth-child(1)`);
      browser.isVisible(`${s} .modal`).should.be.false;
    });

    it('Click on "Assign" button >> Click "Assign as Owner" button', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      browser.moveToObject(`${s} > div:nth-child(4) .name`);
      browser.waitForVisible(`${s} > div:nth-child(4) button.btn-promote`).should.be.true;
      browser.click(`${s} > div:nth-child(4) button.btn-promote`);
      browser.isVisible(`${s} .modal`).should.be.true;
      browser.click(`${s} .modal .modal-body .button-area > button:nth-child(2)`);
      browser.waitUntil(() => {
        return browser.getText(`${s} > div:nth-child(3) .handle`) === TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.USER;
      });

      // New owner
      browser.waitForVisible(`${s} > div:nth-child(3) .stack-avatar-1 .sb-avatar > div`).should.be.true;
      browser.getText(`${s} > div:nth-child(3) .sb-avatar > div`).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.AVATAR);
      browser.getText(`${s} > div:nth-child(3) .name`).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.NAME);
      browser.getText(`${s} > div:nth-child(3) .handle`).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.USER);

      // Owner changed to member
      browser.waitForVisible(`${s} > div:nth-child(4) .stack-avatar-1 .sb-avatar > div`).should.be.true;
      browser.getText(`${s} > div:nth-child(4) .sb-avatar > div`).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.AVATAR);
      browser.getText(`${s} > div:nth-child(4) .name`).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.NAME);
      browser.getText(`${s} > div:nth-child(4) .handle`).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.USER);
    });

  });

});
