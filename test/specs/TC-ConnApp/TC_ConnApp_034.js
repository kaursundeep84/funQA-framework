/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_034
 */
const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_034 - Connect Application : E2E Project Details Page', () => {

  require('./TC_ConnApp_012.js');

  describe('Joining to the Project as a Manager', () => {

    before(function() {
      const path = browser.getUrl().replace('specification', '')
      browser.logoutConnApp();
      browser.loginToConnApp('admin');
      browser.url(path);
      browser.waitUntil(() => {
        return browser.getUrl() == path;
      });
    });

    it(`Open the project "${fillData.App.projectName}" from the Dashboard`, () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      browser.waitForVisible(`${s} .join-project button.tc-btn-primary`).should.be.true;
      browser.getText(`${s} .join-project button.tc-btn-primary`).should.be.equal('Join Project');
      browser.getCssProperty(`${s} .join-project button.tc-btn-primary`, 'background-color').parsed.hex.should.be.equal('#0681ff');
    });

    it('Click on "Join Project" button', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      browser.click(`${s}  .join-project button.tc-btn-primary`);
      browser.getText(`${s}.modal-active .modal .modal-title`).should.be.equal('You\'re about to join the project');
      browser.getText(`${s}.modal-active .modal .modal-body .message`).should.be.equal(`Once you join the project you’ll be responsible for carrying over all orders from ${TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.NAME}. Are you sure you want to join?`);
      browser.getText(`${s}.modal-active .modal .modal-body .button-area > button:nth-child(1)`).should.be.equal('Cancel');
      browser.getText(`${s}.modal-active .modal .modal-body .button-area > button:nth-child(2)`).should.be.equal('Join');
    });

    it('Click "Cancel" button', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      browser.click(`${s}.modal-active .modal .modal-body .button-area > button:nth-child(1)`);
      browser.getText(`${s} .join-project button.tc-btn-primary`).should.be.equal('Join Project');
      browser.isVisibleWithinViewport(`${s} .join-project button.tc-btn-primary`);
      browser.getCssProperty(`${s} .join-project button.tc-btn-primary`, 'background-color').parsed.hex.should.be.equal('#0681ff');
    });

    it('Click on "Join Project" button >> Click "Join" button', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .team-management .panel';
      const s1 = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .project-info .project-direct-links';
      browser.waitForVisible(`${s}  .join-project button.tc-btn-primary`).should.be.true;
      browser.click(`${s}  .join-project button.tc-btn-primary`);
      browser.waitForVisible(`${s}.modal-active .modal .modal-body .button-area > button:nth-child(2)`).should.be.true;
      browser.click(`${s}.modal-active .modal .modal-body .button-area > button:nth-child(2)`);
      browser.waitUntil(() => {
        return browser.elements(`${s} .panel-row`).value.length === 2;
      });
      browser.waitForVisible(`${s} > div:nth-child(4) .stack-avatar-1 .sb-avatar > div`).should.be.true;
      browser.waitUntil(() => {
        return browser.getText(`${s} > div:nth-child(4) .sb-avatar > div`) === TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.AVATAR;
      });
      browser.getText(`${s} > div:nth-child(4) .sb-avatar > div`).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.AVATAR);
      browser.getText(`${s} > div:nth-child(4) .name`).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.NAME);
      browser.getText(`${s} > div:nth-child(4) .handle`).should.be.equal(TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.USER);
      browser.getText(`${s} > div:nth-child(4) .title`).should.be.equal('Manager');
      browser.waitForVisible(s1).should.be.true;
      browser.getText(`${s1} > ul > li:nth-child(1) > a`).should.be.equal('Project in Topcoder Direct');
      browser.getText(`${s1} > ul > li:nth-child(2) > a`).should.be.equal('Salesforce Lead');
    });

  });

});
