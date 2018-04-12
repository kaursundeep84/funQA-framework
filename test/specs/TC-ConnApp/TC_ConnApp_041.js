/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_041
 */
 import {
   setValueAndCheck,
   projectInfo,
   projectTeam,
   projectMessageBox
 } from './helpers/common';
 const fillData = require('./helpers/fillData.json');
 const teamData = require('./helpers/teamData.json');

describe('#TC_ConnApp_041 - Connect Application : E2E Project Details Page', () => {

  require('./TC_ConnApp_012.js');

  describe('Add a Copilot', () => {

    before(function() {
      const link = browser.getAttribute('#root > div > div.TopBarContainer > div > div > div nav > ul > li:nth-child(1) > a', 'href');
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

});
