/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_047
 */
import {
  projectInfo,
  projectTeam,
  projectMessageBox
} from './helpers/common';
const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_047 - Connect Application : E2E Project Details Page', () => {

  require('./TC_ConnApp_034.js');

  describe('Test "Salesforce Lead" Link', () => {

    it(`Open the project "${fillData.App.projectName}" from the Dashboard`, () => {
      projectInfo(fillData.App);
      projectTeam({
        avatar: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.AVATAR1,
        name: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.NAME1,
        handle: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.USER1,
      });
      projectMessageBox();
    });

    it('Click on "Salesforce Lead" Link', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .project-direct-links';
      const current = browser.windowHandle();
      browser.waitForVisible(`${s} ul > li:nth-child(2) a`).should.be.true;
      let link = browser.getAttribute(`${s} ul > li:nth-child(2) a`, 'href').replace('https://c.cs18.visual.force.com/apex/ConnectLead?connectProjectId=', '');
      link = `https://test.salesforce.com/?ec=302&startURL=%2Fvisualforce%2Fsession%3Furl%3Dhttps%253A%252F%252Fc.cs18.visual.force.com%252Fapex%252FConnectLead%253FconnectProjectId%253D${link}`;
      browser.click(`${s} ul > li:nth-child(2) a`).pause(1000);
      browser.switchTab(browser.windowHandles().value[1]);
      browser.waitUntil(() => {
        return browser.getUrl() == link;
      });
      browser.getUrl().should.contain(link);
      browser.switchTab(current);
    });
  });
});
