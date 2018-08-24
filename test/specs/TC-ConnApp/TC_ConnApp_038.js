/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_038
 */
import {
  setValueAndCheck,
  projectInfo,
  projectTeam,
  projectMessageBox
} from './helpers/common';
const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_038 - Connect Application : E2E Project Details Page', () => {

  before(function() {
    browser.loginToConnApp('user');
  });

  describe('Add an Existing Team Member', () => {

    it(`Open the project "${fillData.App.projectName}" from the Dashboard`, () => {
      projectInfo(fillData.App);
      projectTeam({
          avatar: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.AVATAR,
          name: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.NAME,
          handle: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.USER,
        },
        {
          avatar: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.AVATAR,
          name: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.NAME,
          handle: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.USER,
        });
      projectMessageBox();
    });

    it('Click "+" button from "Project Team" section', () => {
      browser.isVisible('#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel > a').should.be.true;
      browser.click('#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel > a');
      browser.isVisibleWithinViewport('#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-title');
      browser.getText('#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-title').should.be.equal('ADD A TEAM MEMBER');
    });

    it(`Enter "${TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.USER}" to the field`, () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-body .modal-inline-form';
      setValueAndCheck(`${s} input[type=text]`, TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.USER);
      browser.waitForVisible(`${s} .member-dropdown .handle`).should.be.true;
      browser.getText(`${s} .member-dropdown .handle`).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.USER);
    });

    it(`Select "${TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.USER}" from the drop down`, () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-body .modal-inline-form';
      browser.moveToObject(`${s} .member-dropdown .handle`);
      browser.click(`${s} .member-dropdown .handle`);
      const dis = browser.getAttribute(`${s} > button`, 'disabled');
      assert.equal(dis, 'true');
      const s1 = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-body .error-message';
      browser.waitForVisible(s1).should.be.true;
      browser.getText(s1, `${TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.USER} is already part of your team.`);
    });

  });

  describe('Remove Team member from a Project', () => {

    it('Hover over the member name from the "PROJECT TEAM (x)" section', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      browser.moveToObject(`${s} > div:nth-child(4) .name`);
      browser.waitForVisible(`${s} > div:nth-child(4) button.btn-user-remove`).should.be.true;
      browser.waitForVisible(`${s} > div:nth-child(4) button.btn-promote`).should.be.true;
    });

    it('Click on "Remove" button', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      browser.click(`${s} > div:nth-child(4) button.btn-user-remove`);
      browser.getText(`${s}.modal-active .modal .modal-title`).should.be.equal('You are about to remove a member');
      browser.getText(`${s}.modal-active .modal .modal-body .message`).should.be.equal('The customer will lose all rights to the project and can’t see or interact with it anymore. Do you still want to remove the customer');
    });

    it('Click "Cancel" button', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      browser.click(`${s}.modal-active .modal .modal-body .button-area > button:nth-child(1)`);
      browser.isVisible(`${s} .modal`).should.be.false;
    });

    it('Click on "Remove" button >> Click "Remove Member" button', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      browser.moveToObject(`${s} > div:nth-child(4) .name`);
      browser.waitForVisible(`${s} > div:nth-child(4) button.btn-user-remove`).should.be.true;
      browser.click(`${s} > div:nth-child(4) button.btn-user-remove`);
      browser.isVisible(`${s} .modal`).should.be.true;
      browser.click(`${s}.modal-active .modal .modal-body .button-area > button:nth-child(2)`);
      browser.waitUntil(() => {
        return browser.elements(`${s} .panel-row`).value.length === 1;
      });
      browser.isVisible(`${s} > div:nth-child(4) .name`).should.be.false;
    });

  });

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

  describe('Ensure that all the elements are available in the header for Normal user', () => {

    it('Topcoder Log is visible', () => {
      browser.isVisible('#root .primary-toolbar .logo-wrapper .logo svg').should.be.true;
      browser.isVisible('#root .primary-toolbar .actions a.new-project-link').should.be.true;
      browser.isVisible('#root .primary-toolbar .actions .welcome-info .sb-avatar').should.be.true;
      browser.isVisible('#root .primary-toolbar .actions .notifications-dropdown').should.be.true;
      const s = '#root .primary-toolbar .logo-wrapper .MenuBar a';
      const items = browser.getText(s);
      const links = ['MY PROJECTS', 'GETTING STARTED', 'HELP'];
      links.forEach((link, index) => {
        items[index].should.be.equal(link);
      });
    });
  });

});
