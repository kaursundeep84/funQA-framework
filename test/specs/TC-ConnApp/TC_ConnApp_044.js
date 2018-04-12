/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_044
 */
import {
  setValueAndCheck,
  projectInfo,
  projectTeam,
  projectMessageBox
} from './helpers/common';
const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_044 - Connect Application : E2E Project Details Page', () => {

  require('./TC_ConnApp_012.js');

  describe('Add Invalid URL as a Link to the project', () => {

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

});
