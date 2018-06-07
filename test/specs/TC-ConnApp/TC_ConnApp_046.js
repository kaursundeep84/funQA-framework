/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_046
 */
import {
  projectInfo,
  projectTeam,
  projectMessageBox
} from './helpers/common';
const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_046 - Connect Application : E2E Project Details Page', () => {

  require('./TC_ConnApp_034.js');

  describe('Test "Project in Topcoder Direct" Link', () => {

    it(`Open the project "${fillData.App.projectName}" from the Dashboard`, () => {
      projectInfo(fillData.App);
      projectTeam({
        avatar: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.AVATAR,
        name: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.NAME,
        handle: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.USER,
      });
      projectMessageBox();
    });

    it('Click on "Project in Topcoder Direct" Link', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .project-direct-links';
      const current = browser.windowHandle();
      browser.waitForVisible(`${s} ul > li:nth-child(1) a`).should.be.true;
      const link = browser.getAttribute(`${s} ul > li:nth-child(1) a`, 'href');
      browser.click(`${s} ul > li:nth-child(1) a`).pause(1000);
      browser.switchTab(browser.windowHandles().value[1]);
      browser.waitUntil(() => {
        return browser.getUrl() == link;
      });
      browser.getUrl().should.contain(link);
      browser.switchTab(current);
    });
  });
});
