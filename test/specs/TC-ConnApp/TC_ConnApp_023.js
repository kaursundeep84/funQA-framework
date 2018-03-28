/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_023
 */
import {
  checkCurrentDate,
  clickAddNewCheckIncomplete,
  setValueAndCheck
} from './helpers/common';
const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_023 - Connect Application : E2E Continue an app from where the user left off', () => {

  describe('Verify continuing an app from where the user left off', () => {

    before(function() {
      browser.loginToConnApp();
    });

    browser.createProject('App', {
      selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(1)',
      buttonTxt: 'Select Project'
    });

    it('Click anywhere on the "App" section', () => {
      // Already clicked by the factory function
      const s = '#wrapper-main > div > div > div > div.FillProjectDetailsWrapper > div.FillProjectDetails > div > h1';
      browser.getUrl().should.contain('/new-project/app');
      browser.getText(s).should.be.equal('Let\'s setup your App project');
      checkCurrentDate('div.ProjectOutline > div.project-card-header > div > div.project-header-details > div.project-date');
    });

    it(`Enter "${fillData.App2.projectName}" in the "Project Name" text box`, () => {
      setValueAndCheck('#appDefinition-projectName > div.content-boxs > div > div.editable-project-name > div > input', fillData.App2.projectName);
    });

    it(`Enter "${fillData.App2.refCode}" in the "REF code" text box`, () => {
      setValueAndCheck('#appDefinition-projectName > div.content-boxs > div > div.textinput-refcode > div.project-refcode.paper-form-dotted > input', fillData.App2.refCode);
    });

    it('Click "Desktop"', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(3)';
      browser.click(s);
      browser.waitForVisible(`${s} a.active`);
    });

    it('Enter text in description text box', () => {
      setValueAndCheck('#description', fillData.App2.desc);
    });

    it('Enter text in "What is the goal..." text box', () => {
      setValueAndCheck('//*[@id="details.appDefinition.goal.value"]', fillData.App2.goal);
    });

    it('Click on Esc button on the top right corner', () => {
      const s = '.escape-button';
      browser.click(s);
      browser.getUrl().should.contain('/projects');
    });

    it('Click + (Add new record) button', clickAddNewCheckIncomplete);

    it('Select Continue where I left off button', () => {
      const s = '#wrapper-main > div > div > div > div.IncompleteProjectConfirmation > div.actions > button.tc-btn.tc-btn-primary.tc-btn-md';
      browser.click(s);
      const s2 = '#appDefinition-projectName > div.content-boxs > div > div.editable-project-name > div > input';
      browser.waitForVisible(s2);
      browser.getValue(s2).should.be.equal(fillData.App2.projectName);
      const s3 = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(3)';
      browser.waitForVisible(`${s3} a.active`);
      const s4 = '#description';
      browser.getValue(s4).should.be.equal(fillData.App2.desc);
      const s5 = '//*[@id="details.appDefinition.goal.value"]';
      browser.getValue(s5).should.be.equal(fillData.App2.goal);
    });

    it('Fill some more data >> Click on Esc button on the top right corner', () => {
      setValueAndCheck('//*[@id="details.appDefinition.notes"]', fillData.App2.notes);
      const s2 = '.escape-button';
      browser.click(s2);
      browser.getUrl().should.contain('/projects');
    });

    it('Click + (Add new record) button', clickAddNewCheckIncomplete);

    it('Select Create a new project', () => {
      const s5 = '#wrapper-main > div > div > div > div.IncompleteProjectConfirmation > div.actions > button.tc-btn.tc-btn-default.tc-btn-md';
      browser.click(s5);
      browser.getUrl().should.contain('/new-project');
    });

  });

});
