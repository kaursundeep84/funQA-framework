/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_016
 */
import {
  checkCurrentDate,
  saveSpecChanges,
  clickContinueBtn,
  clickSpecLinkInText,
  selectScreenImportance,
  setValueAndCheck
} from './helpers/common';
const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_016 - Connect Application : E2E Create Visual Design Project', () => {

  describe('Create a Visual Design project with the specification by editing the options given in project details', () => {

    before(function() {
      browser.loginToConnApp();
    });

    browser.createProject('Design', {
      selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(4)',
      buttonTxt: 'View All'
    });

    it('Click on Visual Design section', () => {
      browser.getUrl().should.contain('/new-project/all-designs');
      const s = '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(2)';
      browser.click(s);
      const s2 = '#wrapper-main > div > div > div > div.FillProjectDetailsWrapper > div.FillProjectDetails > div > h1';
      browser.getUrl().should.contain('/new-project/visual-design');
      browser.getText(s2).should.be.equal('Let\'s setup your Visual Design project');
      checkCurrentDate('div.ProjectOutline > div.project-card-header > div > div.project-header-details > div.project-date');
    });

    it(`Enter "${fillData.Visual.projectName}" in the "Project Name" text box`, () => {
      setValueAndCheck('#appDefinition-projectName > div.content-boxs > div > div.editable-project-name > div > input', fillData.Visual.projectName);
    });

    it('Select "4-8 screens" in the "How many screens do you need designed?" section', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(2)';
      browser.click(s);
      browser.waitForVisible(`${s} a.active`);
    });

    it('Click "Desktop" from "Which is your primary device target?" section', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(2) > div.content-col > div > div > span:nth-child(3)';
      browser.click(s);
      browser.waitForVisible(`${s} a.active`);
    });

    it(`Enter text in the Description text box`, () => {
      setValueAndCheck('#description', fillData.Visual.desc);
    });

    it('Enter text in "What is the goal..." text box', () => {
      setValueAndCheck('//*[@id="details.appDefinition.goal.value"]', fillData.Visual.goal);
    });

    it('Enter text in "Who are the users..." text box', () => {
      const s2 = 'div.FillProjectDetails > section > div > div.left-area > div.left-area-content > div > form > div > div.section-footer.section-footer-spec > button';
      setValueAndCheck('//*[@id="details.appDefinition.users.value"]', fillData.Visual.users);
      const dis = browser.getAttribute(s2, 'disabled');
      assert.equal(dis, null);
    });

    it(`Enter "${fillData.Visual.notes}" in the "Notes" text box`, () => {
      setValueAndCheck('//*[@id="details.appDefinition.notes"]', fillData.Visual.notes);
    });

    it('Click on the "Continue" button', () => {
      clickContinueBtn(fillData.Visual.projectName);
    });

    it('Click on the "Specification" link in the text paragraph', () => {
      const s3 = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(2)';
      const s8 = '#appDefinition-questions > div > div > div:nth-child(2) > div.content-col > div > div > span:nth-child(3)';
      clickSpecLinkInText(fillData.Visual.projectName, [
        ['#description', fillData.Visual.desc],
        ['//*[@id="details.appDefinition.goal.value"]', fillData.Visual.goal],
        ['//*[@id="details.appDefinition.users.value"]', fillData.Visual.users],
        ['//*[@id="details.appDefinition.notes"]', fillData.Visual.notes]
      ]);
      browser.waitForVisible(`${s3} a.active`).should.be.true;
      browser.waitForVisible(`${s8} a.active`).should.be.true;
    });

    it('Select "1-3 screens" in the "How many screens do you need designed?" section', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(1)';
      browser.click(s);
      browser.waitForVisible(`${s} a.active`).should.be.true;
    });

    it('In the "App Screens" section, click "Define Screen" button', () => {
      const s = '#appScreens-screens > div > div > div > button';
      const s2 = '#appScreens-screens > div > div > div:nth-child(1)';
      browser.click(s);
      browser.waitForVisible(s2).should.be.true;
    });

    it(`Enter "${fillData.Visual.screenName}" for Screen name`, () => {
      setValueAndCheck('#appScreens-screens > div > div > div:nth-child(1) > form > div > div:nth-child(1) > div.content-col > div > div > input', fillData.Visual.screenName);
    });

    it(`Enter "${fillData.Visual.screenDesc}" under question What are the things the user can do on this screen? text box`, () => {
      setValueAndCheck('#appScreens-screens > div > div > div:nth-child(1) > form > div > div:nth-child(2) > div.content-col > div textarea', fillData.Visual.screenDesc);
    });

    it('Select 10 from Screen importance', () => {
      const s4 = '#wrapper-main > div > div > div:nth-child(2) > section > div > div.left-area > div > div > div.projectSpecSidebar > div:nth-child(4) > div > h3:nth-child(3)';
      const s5 = '#wrapper-main > div > div > div:nth-child(2) > section > div > div.left-area > div > div > div.projectSpecSidebar > div:nth-child(4) > div > h3:nth-child(5)';
      selectScreenImportance('#appScreens-screens > div > div > div:nth-child(1) > form > div > div:nth-child(3) > div.content-col > div > div > div', 10);
      browser.getText(s4).should.be.equal('7-10 days');
      browser.getText(s5).should.be.equal('$ 5,000');
    });

    it('Click "Define Another Screen" button', () => {
      const s = '#appScreens-screens > div > div > div.edit-screen-footer > button';
      const s2 = '#appScreens-screens > div > div > div:nth-child(2)';
      browser.click(s);
      browser.waitForVisible(s2).should.be.true;
    });

    it(`Enter "${fillData.Visual.screenName2}" for Screen name`, () => {
      setValueAndCheck('#appScreens-screens > div > div > div:nth-child(2) > form > div > div:nth-child(1) > div.content-col > div > div > input', fillData.Visual.screenName2);
    });

    it(`Enter "${fillData.Visual.screenDesc2}" under question What are the things the user can do on this screen? text box`, () => {
      setValueAndCheck('#appScreens-screens > div > div > div:nth-child(2) > form > div > div:nth-child(2) > div.content-col > div textarea', fillData.Visual.screenDesc2);
    });

    it('Select 1 from Screen importance', () => {
      selectScreenImportance('#appScreens-screens > div > div > div:nth-child(2) > form > div > div:nth-child(3) > div.content-col > div > div > div' ,1);
    });

    it('Click "Define Another Screen" button', () => {
      const s = '#appScreens-screens > div > div > div.edit-screen-footer > button';
      const s2 = '#appScreens-screens > div > div > div:nth-child(2)';
      browser.click(s);
      browser.waitForVisible(s2).should.be.true;
    });

    it(`Enter "${fillData.Visual.screenName3}" for Screen name`, () => {
      setValueAndCheck('#appScreens-screens > div > div > div:nth-child(3) > form > div > div:nth-child(1) > div.content-col > div > div > input', fillData.Visual.screenName3);
    });

    it(`Enter "${fillData.Visual.screenDesc3}" under question What are the things the user can do on this screen? text box`, () => {
      setValueAndCheck('#appScreens-screens > div > div > div:nth-child(3) > form > div > div:nth-child(2) > div.content-col > div textarea', fillData.Visual.screenDesc3);
    });

    it('Select 6 from Screen importance', () => {
      selectScreenImportance('#appScreens-screens > div > div > div:nth-child(3) > form > div > div:nth-child(3) > div.content-col > div > div > div', 6);
    });

    it(`In the Design Guidelines section enter "${fillData.Visual.designGuide}" in Guidelines textbox`, () => {
      setValueAndCheck('//*[@id="details.designSpecification.guidelines"]', fillData.Visual.designGuide);
    });

    it(`In the Design Guidelines section enter "${fillData.Visual.designGuide2}" in Examples textbox`, () => {
      setValueAndCheck('//*[@id="details.designSpecification.examples"]', fillData.Visual.designGuide2);
    });

    it(`In the Design Guidelines section enter "${fillData.Visual.designGuide3}" in Exclude Examples textbox`, () => {
      setValueAndCheck('//*[@id="details.designSpecification.excludeExamples"]', fillData.Visual.designGuide3);
    });

    it('Click "Save Changes" button', () => {
      const s = '#wrapper-main > div > div > div:nth-child(2) > section > div > div.right-area > div:nth-child(1) > form > div:nth-child(2) > div.section-footer.section-footer-spec > button';
      saveSpecChanges(s, 'Project updated.');
      const dis = browser.getAttribute(s, 'disabled');
      assert.equal(dis, 'true');
    });

  });

});
