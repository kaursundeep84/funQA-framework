/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_021
 */
import {
  checkCurrentDate,
  saveSpecChanges,
  enterRelevantNotes,
  clickContinueBtn,
  clickSpecLinkInText,
  setValueAndCheck
} from './helpers/common';
const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_021 - Connect Application : E2E Create QA Project', () => {

  describe('Create a QA project with the specification', () => {

    before(function() {
      browser.loginToConnApp();
    });

    browser.createProject('QA', {
      selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(6)',
      buttonTxt: 'View All'
    });

    it('Click on Real World Testing section', () => {
      browser.getUrl().should.contain('/new-project/all-quality-assurance');
      const s = '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(1)';
      browser.click(s);
      const s2 = '#wrapper-main > div > div > div > div.FillProjectDetailsWrapper > div.FillProjectDetails > div > h1';
      browser.getUrl().should.contain('/new-project/real-world-testing');
      browser.getText(s2).should.be.equal('Let\'s setup your Real World Testing project');
      checkCurrentDate('div.ProjectOutline > div.project-card-header > div > div.project-header-details > div.project-date');
    });

    it(`Enter "${fillData.RealWorldTest.projectName}" in the "Project Name" text box`, () => {
      setValueAndCheck('#appDefinition-projectName > div.content-boxs > div > div.editable-project-name > div > input', fillData.RealWorldTest.projectName);
    });

    it('Select "Unstructured" from What kind of crowd testing are you interested in?', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(1)';
      browser.click(s);
      browser.waitForVisible(`${s} a.active`);
    });

    it('Select "No I do not have test cases." from Do you have test cases written?', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(2) > div.content-col > div > div > div > div:nth-child(2) > label';
      const s2 = '//*[@id="details.appDefinition.expectedHours-opt-1"]';
      browser.click(s);
      browser.getValue(s2).should.be.equal('false');
    });

    it(`Enter text in the Description text box`, () => {
      setValueAndCheck('#description', fillData.RealWorldTest.desc);
    });

    it(`Enter "${fillData.RealWorldTest.users}" in the "Please tell us about your users." text box`, () => {
      setValueAndCheck('//*[@id="details.appDefinition.userInfo"]', fillData.RealWorldTest.users);
    });

    it('Select "Desktop" from Which is your primary device target?', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(5) > div.content-col > div > div > span:nth-child(3)';
      browser.click(s);
      browser.waitForVisible(`${s} a.active`);
    });

    it(`Enter "${fillData.RealWorldTest.notes}" in the "Notes" text box`, () => {
      setValueAndCheck('//*[@id="details.appDefinition.notes"]', fillData.RealWorldTest.notes);
    });

    it('Click on the "Continue" button', () => {
      clickContinueBtn(fillData.RealWorldTest.projectName);
    });

    it('Click on the "Specification" link in the text paragraph', () => {
      const s3 = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(1)';
      clickSpecLinkInText(fillData.RealWorldTest.projectName, [
        ['#description', fillData.RealWorldTest.desc],
        ['//*[@id="details.appDefinition.userInfo"]', fillData.RealWorldTest.users],
        ['//*[@id="details.appDefinition.notes"]', fillData.RealWorldTest.notes]
      ]);
      browser.waitForVisible(`${s3} a.active`).should.be.true;
    });

    it('Enter relevant notes in all the fields in the "Testing Needs" section ', () => {
      enterRelevantNotes(fillData.RealWorldTest);
    });

    it('Click "Save Changes" button', () => {
      const s = '#wrapper-main > div > div > div:nth-child(2) > section > div > div.right-area > div:nth-child(1) > form > div:nth-child(2) > div.section-footer.section-footer-spec > button';
      saveSpecChanges(s, 'Project updated.');
      const dis = browser.getAttribute(s, 'disabled');
      assert.equal(dis, 'true');
    });

  });

});
