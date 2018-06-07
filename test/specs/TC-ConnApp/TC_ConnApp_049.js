/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_049
 */
import {
  projectInfo,
  projectTeam,
  projectMessageBox
} from './helpers/common';
const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_049 - Connect Application : E2E Verification of the Project status change', () => {

  require('./TC_ConnApp_034.js');

  describe('Verification of the Project status', () => {

    it(`Open the project "${fillData.App.projectName}" from the Dashboard`, () => {
      projectInfo(fillData.App);
      projectTeam({
        avatar: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.AVATAR,
        name: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.NAME,
        handle: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.USER,
      });
      projectMessageBox();
    });

    it('Click on "Project Status" drop down and select "In-Review" from the list', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .project-info';
      browser.waitForVisible(`${s} .project-status .dropdown-wrap`).should.be.true;
      browser.click(`${s} .project-status .dropdown-wrap`);
      browser.waitForVisible(`${s} .status-dropdown`).should.be.true;
      browser.click(`${s} .status-dropdown > ul > li:nth-child(2) .status-label`);
      browser.waitUntil(() => {
        return browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`) == 'PROJECT IS IN REVIEW';
      });
      browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`).should.be.equal('PROJECT IS IN REVIEW');
      const s1 = '.s-alert-box-inner';
      browser.waitForVisible(s1).should.be.true;
      browser.getText(`${s1} > span`).should.be.equal(`Project submitted.`);
      browser.waitUntil(() => {
        return $(s1).type === 'NoSuchElement';
      });
    });

    it('Click on "Notification" icon', () => {
      const s = '.notifications-dropdown .dropdown-wrap .dropdown-menu-list';
      browser.click('.notifications-dropdown .dropdown-wrap > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)');
      browser.waitForVisible(s).should.be.true;
      browser.getText(`${s} .notifications-dropdown-header > h3`).should.be.equal('NOTIFICATIONS');
      browser.getText(`${s} .notifications-dropdown-header > button`).should.be.equal('Mark all as read');
    });

  });

});
