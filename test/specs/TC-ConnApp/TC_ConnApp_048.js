/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_048
 */
import {
  projectInfo,
  projectTeam,
  projectMessageBox
} from './helpers/common';
const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_048 - Connect Application : E2E Verification of the Project status change', () => {

  require('./TC_ConnApp_034.js');

  describe('Verification of the Project status', () => {

    before(function() {
      browser.loginToConnApp();
    });

    it(`Open the project "${fillData.App.projectName}" from the Dashboard`, () => {
      projectInfo(fillData.App);
      projectTeam({
        avatar: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.AVATAR,
        name: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.NAME,
        handle: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.USER,
      }, {
        avatar: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.AVATAR,
        name: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.NAME,
        handle: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.USER,
      });
      projectMessageBox();
    });

    it('Click on "Project Status" drop down', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .project-info';
      browser.waitForVisible(`${s} .project-status .dropdown-wrap`).should.be.true;
      browser.click(`${s} .project-status .dropdown-wrap`);
      browser.waitForVisible(`${s} .status-dropdown`).should.be.true;
      browser.getText(`${s} .status-dropdown > ul > li:nth-child(1) .status-label`).should.equal('Draft');
      browser.getText(`${s} .status-dropdown > ul > li:nth-child(2) .status-label`).should.equal('In review');
      browser.getText(`${s} .status-dropdown > ul > li:nth-child(3) .status-label`).should.equal('Reviewed');
      browser.getText(`${s} .status-dropdown > ul > li:nth-child(4) .status-label`).should.equal('Active');
      browser.getText(`${s} .status-dropdown > ul > li:nth-child(5) .status-label`).should.equal('Completed');
      browser.getText(`${s} .status-dropdown > ul > li:nth-child(6) .status-label`).should.equal('Cancelled');
      browser.getText(`${s} .status-dropdown > ul > li:nth-child(7) .status-label`).should.equal('Paused');
    });

    it('Select "In Review" from the list', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .project-info';
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

    it('Click on "Project Status" drop down and select "Reviewed" from the list', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .project-info';
      browser.click(`${s} .project-status .dropdown-wrap`);
      browser.waitForVisible(`${s} .status-dropdown`).should.be.true;
      browser.click(`${s} .status-dropdown > ul > li:nth-child(3) .status-label`);
      browser.waitUntil(() => {
        return browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`) == 'PROJECT IS REVIEWED';
      });
      browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`).should.be.equal('PROJECT IS REVIEWED');
      const s1 = '.s-alert-box-inner';
      browser.waitForVisible(s1).should.be.true;
      browser.getText(`${s1} > span`).should.be.equal(`Project updated.`);
      browser.waitUntil(() => {
        return $(s1).type === 'NoSuchElement';
      });
    });

    it('Click on "Project Status" drop down and select "Active" from the list', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .project-info';
      browser.click(`${s} .project-status .dropdown-wrap`);
      browser.waitForVisible(`${s} .status-dropdown`).should.be.true;
      browser.click(`${s} .status-dropdown > ul > li:nth-child(4) .status-label`);
      browser.waitUntil(() => {
        return browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`) == 'PROJECT IS ACTIVE';
      });
      browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`).should.be.equal('PROJECT IS ACTIVE');

      const s1 = '.s-alert-box-inner';
      browser.waitForVisible(s1).should.be.true;
      browser.getText(`${s1} > span`).should.be.equal(`Project updated.`);
      browser.waitUntil(() => {
        return $(s1).type === 'NoSuchElement';
      });
    });

    it('Click on "Project Status" drop down and select "Paused" from the list', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .project-info';
      browser.click(`${s} .project-status .dropdown-wrap`);
      browser.waitForVisible(`${s} .status-dropdown`).should.be.true;
      browser.click(`${s} .status-dropdown > ul > li:nth-child(7) .status-label`);
      browser.waitUntil(() => {
        return browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`) == 'PROJECT IS PAUSED';
      });
      browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`).should.be.equal('PROJECT IS PAUSED');
      const s1 = '.s-alert-box-inner';
      browser.waitForVisible(s1).should.be.true;
      browser.getText(`${s1} > span`).should.be.equal(`Project updated.`);
      browser.waitUntil(() => {
        return $(s1).type === 'NoSuchElement';
      });
    });

    it('Click on "Project Status" drop down and select "Completed" from the list', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .project-info';
      const s1 = '.s-alert-box-inner';
      browser.click(`${s} .project-status .dropdown-wrap`);
      browser.waitForVisible(`${s} .status-dropdown`).should.be.true;
      browser.click(`${s} .status-dropdown > ul > li:nth-child(5) .status-label`);
      browser.getText(`${s} .modal .modal-title`).should.be.equal('You are about to close the project');
      browser.getText(`${s} .modal .modal-body .message`).should.be.equal('This action will permanently change the status of your project and cannot be undone.');
      browser.getText(`${s} .modal .modal-body .button-area > button:nth-child(1)`).should.be.equal('Cancel');
      browser.getText(`${s} .modal .modal-body .button-area > button:nth-child(2)`).should.be.equal('Close Project');
      browser.click(`${s} .modal .modal-body .button-area > button:nth-child(2)`);
      browser.waitUntil(() => {
        return browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`) == 'PROJECT IS COMPLETED';
      });
      browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`).should.be.equal('PROJECT IS COMPLETED');
      browser.waitForVisible(s1).should.be.true;
      browser.getText(`${s1} > span`).should.be.equal(`Project updated.`);
      browser.waitUntil(() => {
        return $(s1).type === 'NoSuchElement';
      });
    });

  });

});
