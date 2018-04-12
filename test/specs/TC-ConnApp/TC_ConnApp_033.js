/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_033
 */
import {
  projectInfo,
  projectTeam,
  joinProject,
  projectMessageBox,
} from './helpers/common';
const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_033 - Connect Application : UI Project Page Elements', () => {

  before(function() {
    browser.loginToConnApp(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.USER1, TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.PASS1);
  });

  require('./TC_ConnApp_012.js');

  describe('Check the elements of Project details page', () => {

    before(function() {
      const path = browser.getUrl().replace('specification', '')
      browser.logoutConnApp();
      browser.loginToConnApp(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.USER, TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.PASS);
      browser.url(path);
      browser.waitUntil(() => {
        return browser.getUrl() == path;
      });
    });

    it(`Open the project "${fillData.App.projectName}" from the Dashboard and check the elements on the page`, () => {
      projectInfo(fillData.App);
      projectTeam({
        avatar: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.AVATAR1,
        name: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.NAME1,
        handle: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.USER1,
      });
      joinProject();
      projectMessageBox();
    });

  });

});
