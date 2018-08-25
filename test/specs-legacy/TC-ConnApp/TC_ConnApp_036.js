/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_036
 */
import {
  setValueAndCheck,
  projectInfo,
  projectTeam,
  projectMessageBox,
} from './helpers/common';
const fillData = require('./helpers/fillData.json');
const teamData = require('./helpers/teamData.json');

describe('#TC_ConnApp_036 - Connect Application : E2E Project Details Page', () => {

  before(function() {
    browser.loginToConnApp('user');
  });

  describe('Add a Team Member', () => {

    before(function() {
      const link = browser.getAttribute('#root > div > div.TopBarContainer > div > div > div nav >ul > li:nth-child(1) > a', 'href');
      browser.click('#root > div > div.TopBarContainer > div > div > div nav >ul > li:nth-child(1) > a');
      browser.getUrl().should.contain(link);
    });

    it(`Open the project "${fillData.App.projectName}" from the Dashboard`, () => {
      projectInfo(fillData.App);
      projectTeam({
        avatar: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.AVATAR,
        name: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.NAME,
        handle: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.USER,
      });
      projectMessageBox();
    });

    it('Click "+" button from "Project Team" section', () => {
      browser.waitForVisible('#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel > a').should.be.true;
      browser.click('#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel > a');
      browser.isVisibleWithinViewport('#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-title');
      browser.getText('#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-title').should.be.equal('ADD A TEAM MEMBER');
    });

    it(`Enter "${TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.USER}" to the field`, () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-body .modal-inline-form';
      setValueAndCheck(`${s} input[type=text]`,  TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.USER);
      browser.waitForVisible(`${s} .member-dropdown .handle`);
      browser.getText(`${s} .member-dropdown .handle`).should.be.equal( TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.USER);
    });

    it(`Select "${TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.USER}" from the drop down`, () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-body .modal-inline-form';
      browser.moveToObject(`${s} .member-dropdown .handle`);
      browser.click(`${s} .member-dropdown .handle`);
      browser.waitForEnabled(`${s} > button`);
    });

    it('Click "Add" button', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-body .modal-inline-form';
      const s1 = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      browser.click(`${s} > button`);
      browser.waitUntil(() => {
        return browser.elements(`${s1} .panel-row`).value.length === 2;
      });
      browser.waitForVisible(`${s1} > div:nth-child(4) .stack-avatar-1 .sb-avatar > div`).should.be.true;
      browser.getText(`${s1} > div:nth-child(3) .sb-avatar > div`).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.AVATAR);
      browser.getText(`${s1} > div:nth-child(3) .name`).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.NAME);
      browser.getText(`${s1} > div:nth-child(3) .handle`).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.USER);
    });

  });

  describe('Add an Invalid Team Member', () => {

    it(`Open the project "${fillData.App.projectName}" from the Dashboard`, () => {
      projectInfo(fillData.App);
      projectTeam(
        {
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

    it('Enter "invalid_user" to the field', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-body .modal-inline-form';
      setValueAndCheck(`${s} input[type=text]`, 'invalid_user');
      const dis = browser.getAttribute(`${s} > button`, 'disabled');
      assert.equal(dis, 'true');
    });

    it('Click "Add" button', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-body .error-message';
      browser.waitForVisible(s).should.be.true;
      browser.getText(s).should.equal('This username doesn’t exist on Topcoder.');
    });

  });

  describe('Add a Copilot', () => {

    before(function() {
      const link = browser.getAttribute('#root > div > div.TopBarContainer > div > div > div nav > ul > li:nth-child(1) > a', 'href');
      browser.click('#root > div > div.TopBarContainer > div > div > div nav >ul > li:nth-child(1) > a');
      browser.getUrl().should.contain(link);
    });

    it('Click "+" button from "Project Team" section', () => {
      browser.isVisible('#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel > a').should.be.true;
      browser.click('#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel > a');
      browser.isVisibleWithinViewport('#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-title');
      browser.getText('#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-title').should.be.equal('ADD A TEAM MEMBER');
    });

    it(`Enter "${teamData.Copilot.handle}" to the field`, () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-body .modal-inline-form';
      setValueAndCheck(`${s} input[type=text]`, teamData.Copilot.handle);
      browser.waitForVisible(`${s} .member-dropdown .handle`).should.be.true;
      browser.getText(`${s} .member-dropdown .handle`).should.be.equal(teamData.Copilot.handle);
    });

    it(`Select "${teamData.Copilot.handle}" from the drop down`, () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .modal.add-team-member .modal-body .modal-inline-form';
      browser.moveToObject(`${s} .member-dropdown .handle`);
      browser.click(`${s} .member-dropdown .handle`);
      browser.getValue(`${s} input[type=text]`).should.be.equal(teamData.Copilot.handle);
      browser.waitForEnabled(`${s} > button`).should.be.true;
    });

    it('Select "Copilot" button below the text field', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .modal';
      browser.click(`${s} .tab-group > ul > li:nth-child(2)`);
      browser.getText(`${s} .tab-group > ul > li.active`).should.equal('Copilot');
      browser.getText(`${s} .tab-group > ul > li.active`).should.equal('Copilot');
      browser.getCssProperty(`${s} .tab-group li.active`, 'background-color').parsed.hex.should.be.equal('#0681ff');
    });

    it('Click "Add" button', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel .modal.add-team-member .modal-body .modal-inline-form';
      const s1 = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      browser.click(`${s} > button`);
      browser.waitUntil(() => {
        return browser.elements(`${s1} .panel-row`).value.length === 2;
      });
      browser.waitForVisible(`${s1} > div:nth-child(4) .stack-avatar-1 .sb-avatar > div`).should.be.true;
      browser.getText(`${s1} > div:nth-child(4) .sb-avatar > div`).should.be.equal(teamData.Copilot.avatar);
      browser.getText(`${s1} > div:nth-child(4) .name`).should.be.equal(teamData.Copilot.name);
      browser.getText(`${s1} > div:nth-child(4) .handle`).should.be.equal(teamData.Copilot.handle);
    });

  });

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

  describe('Verify Adding a Link to the project', () => {

    before(function() {
      const link = browser.getAttribute('#root > div > div.TopBarContainer > div > div > div nav >ul > li:nth-child(1) > a', 'href');
      browser.click('#root > div > div.TopBarContainer > div > div > div nav >ul > li:nth-child(1) > a');
      browser.getUrl().should.contain(link);
    });

    it('Click "+" button from "Links" section', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .panel.panel-links-container';
      browser.isVisible(`${s} > a`).should.be.true;
      browser.click(`${s} > a`);
      browser.isVisibleWithinViewport(`${s} .modal`);
      browser.getText(`${s} .modal .modal-title`).should.be.equal('ADD A LINK');
      browser.getText(`${s} .modal .modal-body > form > div:nth-child(1) > label`).should.be.equal('Name');
      browser.getText(`${s} .modal .modal-body > form > div:nth-child(2) > label`).should.be.equal('URL');
    });

    it('Enter "Name" as \'Project Specification Link\' and "URL" as \'https://connect.topcoder-dev.com/projects/2299\'', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .panel.panel-links-container';
      setValueAndCheck(`${s} .modal .modal-body > form > div:nth-child(1) > input[type=text]`, 'Project Specification Link');
      setValueAndCheck(`${s} .modal .modal-body > form > div:nth-child(2) > input[type=text]`, 'https://connect.topcoder-dev.com/projects/2299');
    });

    it('Click "Add Link" button', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .panel.panel-links-container';
      browser.waitForEnabled(`${s} .modal .modal-body > form button`);
      browser.click(`${s} .modal .modal-body > form button`);

      browser.waitUntil(() => {
        return browser.getText(`${s} .panel-title`) === 'LINKS (1)';
      });

      browser.getText(`${s} .panel-links ul > li:nth-child(1) > a`).should.equal('Project Specification Link');
      browser.getAttribute(`${s} .panel-links ul > li:nth-child(1) > a`, 'href').should.equal('https://connect.topcoder-dev.com/projects/2299');

      const s1 = '.s-alert-box-inner';
      browser.waitForVisible(s1).should.be.true;
      browser.getText(`${s1} > span`).should.be.equal(`Project updated.`);
    });

  });

  describe('Add Invalid URL as a Link to the project', () => {

    before(function() {
      const link = browser.getAttribute('#root > div > div.TopBarContainer > div > div > div nav >ul > li:nth-child(1) > a', 'href');
      browser.click('#root > div > div.TopBarContainer > div > div > div nav >ul > li:nth-child(1) > a');
      browser.getUrl().should.contain(link);
    });

    it('Click "+" button from "Links" section', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .panel.panel-links-container';
      browser.isVisible(`${s} > a`).should.be.true;
      browser.click(`${s} > a`);
      browser.isVisibleWithinViewport(`${s} .modal`);
      browser.getText(`${s} .modal .modal-title`).should.be.equal('ADD A LINK');
      browser.getText(`${s} .modal .modal-body > form > div:nth-child(1) > label`).should.be.equal('Name');
      browser.getText(`${s} .modal .modal-body > form > div:nth-child(2) > label`).should.be.equal('URL');
    });

    it('Enter "Name" as \'Project Specification Link\' and "URL" as \'Test\'', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .panel.panel-links-container';
      setValueAndCheck(`${s} .modal .modal-body > form > div:nth-child(1) > input[type=text]`, 'Project Specification Link');
      setValueAndCheck(`${s} .modal .modal-body > form > div:nth-child(2) > input[type=text]`, 'Test');
      browser.waitForVisible(`${s} .modal .modal-body > form .error-message`).should.be.true;
      browser.getText(`${s} .modal .modal-body > form .error-message`, 'Please enter a valid URL');
    });

  });

  describe('Verify adding only Spaces to the Name field', () => {

    before(function() {
      const link = browser.getAttribute('#root > div > div.TopBarContainer > div > div > div nav >ul > li:nth-child(1) > a', 'href');
      browser.click('#root > div > div.TopBarContainer > div > div > div nav >ul > li:nth-child(1) > a');
      browser.getUrl().should.contain(link);
    });

    it('Click "+" button from "Links" section', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .panel.panel-links-container';
      browser.isVisible(`${s} > a`).should.be.true;
      browser.click(`${s} > a`);
      browser.isVisibleWithinViewport(`${s} .modal`);
      browser.getText(`${s} .modal .modal-title`).should.be.equal('ADD A LINK');
      browser.getText(`${s} .modal .modal-body > form > div:nth-child(1) > label`).should.be.equal('Name');
      browser.getText(`${s} .modal .modal-body > form > div:nth-child(2) > label`).should.be.equal('URL');
    });

    it('Enter "Name" as \'  \'', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .panel.panel-links-container';
      browser.setValue(`${s} .modal .modal-body > form > div:nth-child(1) > input[type=text]`, '  ');
      browser.waitForVisible(`${s} .modal .modal-body > form .error-message`).should.be.true;
      browser.getText(`${s} .modal .modal-body > form .error-message`, 'Name is required');
    });
  });

  describe('Test "Salesforce Lead" Link', () => {

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

  describe('Verification of the Project status', () => {

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

  describe('Test "Project in Topcoder Direct" Link', () => {

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

  describe('Check the elements of Project details page', () => {

    before(function() {
      const path = browser.getUrl().replace('specification', '');
      browser.loginToConnApp(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.USER, TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.PASS);
      browser.url(path);
      browser.waitUntil(() => {
        return browser.getUrl() == path;
      });
    });

  });

});
