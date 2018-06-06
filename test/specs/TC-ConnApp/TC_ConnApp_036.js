/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_036
 */
import {
  setValueAndCheck,
  projectInfo,
  projectTeam,
  projectMessageBox
} from './helpers/common';
const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_036 - Connect Application : E2E Project Details Page', () => {

  before(function() {
    browser.loginToConnApp(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.USER, TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.PASS);
  });

  require('./TC_ConnApp_012.js');

  describe('Add a Team Member', () => {
    before(function() {
      const link = browser.getAttribute('#root > div > div.TopBarContainer > div > div > div nav >ul > li:nth-child(1) > a', 'href');
      browser.click('#root > div > div.TopBarContainer > div > div > div nav >ul > li:nth-child(1) > a');
      browser.getUrl().should.contain(link);
    });

    it(`Open the project "${fillData.App.projectName}" from the Dashboard`, () => {
      projectInfo(fillData.App);
      projectTeam({
        avatar: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.AVATAR,
        name: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.NAME,
        handle: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.USER,
      });
      projectMessageBox();
    });

    it('Click "+" button from "Project Team" section', () => {
      browser.waitForVisible('#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel > a').should.be.true;
      browser.click('#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel > a');
      browser.isVisibleWithinViewport('#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-title');
      browser.getText('#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-title').should.be.equal('ADD A TEAM MEMBER');
    });

    it(`Enter "${TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.USER}" to the field`, () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-body .modal-inline-form';
      setValueAndCheck(`${s} input[type=text]`,  TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.USER);
      browser.waitForVisible(`${s} .member-dropdown .handle`);
      browser.getText(`${s} .member-dropdown .handle`).should.be.equal( TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.USER);
    });

    it(`Select "${TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.USER}" from the drop down`, () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-body .modal-inline-form';
      browser.moveToObject(`${s} .member-dropdown .handle`);
      browser.click(`${s} .member-dropdown .handle`);
      browser.waitForEnabled(`${s} > button`);
    });

    it('Click "Add" button', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-body .modal-inline-form';
      const s1 = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      const addOwnerButton = `${s1} > .modal .modal-body > div > button:nth-child(2)`;
      browser.saveScreenshot('./before_add_button.png');
      browser.click(`${s} > button`);
      browser.waitForEnabled(addOwnerButton);
      browser.click(addOwnerButton);
      browser.saveScreenshot('./add_button.png');
      browser.waitUntil(() => {
        return browser.elements(`${s1} .panel-row`).value.length === 2;
      });
      browser.waitForVisible(`${s1} > div:nth-child(4) .stack-avatar-1 .sb-avatar > div`).should.be.true;
      browser.saveScreenshot('./after_add_button.png');
      browser.getText(`${s1} > div:nth-child(3) .sb-avatar > div`).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.AVATAR);
      browser.getText(`${s1} > div:nth-child(3) .name`).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.NAME);
      browser.getText(`${s1} > div:nth-child(3) .handle`).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.USER);
    });

  });

});
