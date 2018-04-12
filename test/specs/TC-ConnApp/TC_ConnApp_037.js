/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_037
 */
import {
  setValueAndCheck,
  projectInfo,
  projectTeam,
  projectMessageBox,
} from './helpers/common';
const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_037 - Connect Application : E2E Project Details Page', () => {

  require('./TC_ConnApp_036.js');

  describe('Add an Invalid Team Member', () => {

    it(`Open the project "${fillData.App.projectName}" from the Dashboard`, () => {
      projectInfo(fillData.App);
      projectTeam({
        avatar: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.AVATAR1,
        name: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.NAME1,
        handle: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN.USER1,
      },
      {
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

});
