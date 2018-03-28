/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_015
 */
import {
  checkSection,
  checkCurrentDate,
  saveSpecChanges,
  clickContinueBtn,
  clickSpecLinkInText,
  setValueAndCheck,
  selectScreenImportance
} from './helpers/common';
const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_015 - Connect Application : E2E Create Wireframe Project', () => {

  describe('Create a Wireframe project with the specification', () => {

    before(function() {
      browser.loginToConnApp();
    });

    browser.createProject('Design', {
      selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(4)',
      buttonTxt: 'View All'
    });

    it('Click anywhere on the "Design" section', () => {
      // Already clicked by the factory function
      browser.getUrl().should.contain('/new-project/all-designs');
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(1)',
        title: 'Wireframes',
        desc: 'Plan and explore the navigation and structure of your app'
      });
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(2)',
        title: 'Visual Design',
        desc: 'Create development-ready designs'
      });
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(3)',
        title: 'Other Design',
        desc: 'Get help with other types of design'
      });
    });

    it('Click on Wireframes section', () => {
      const s = '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(1)';
      browser.click(s);
      const s2 = '#wrapper-main > div > div > div > div.FillProjectDetailsWrapper > div.FillProjectDetails > div > h1';
      browser.getUrl().should.contain('/new-project/wireframes');
      browser.getText(s2).should.be.equal('Let\'s setup your Wireframes project');
      checkCurrentDate('div.ProjectOutline > div.project-card-header > div > div.project-header-details > div.project-date');
    });

    it(`Enter "${fillData.Wireframes.projectName}" in the "Project Name" text box`, () => {
      setValueAndCheck('#appDefinition-projectName > div.content-boxs > div > div.editable-project-name > div > input', fillData.Wireframes.projectName);
    });

    it('Select "10 screens" in the "How many screens do you need designed?" section', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(1)';
      browser.click(s);
      browser.waitForVisible(`${s} a.active`);
    });

    it('Click "Tablet" from "Which is your primary device target?" section', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(2) > div.content-col > div > div > span:nth-child(2)';
      browser.click(s);
      browser.waitForVisible(`${s} a.active`);
    });

    it(`Enter text in the Description text box`, () => {
      setValueAndCheck('#description', fillData.Wireframes.desc);
    });

    it('Enter text in "What is the goal..." text box', () => {
      const s = '//*[@id="details.appDefinition.goal.value"]';
      browser.setValue(s, fillData.Wireframes.goal);
      browser.getValue(s).should.be.equal(fillData.Wireframes.goal);
    });

    it('Enter text in "Who are the users..." text box', () => {
      const s2 = 'div.FillProjectDetails > section > div > div.left-area > div.left-area-content > div > form > div > div.section-footer.section-footer-spec > button';
      setValueAndCheck('//*[@id="details.appDefinition.users.value"]', fillData.Wireframes.users);
      const dis = browser.getAttribute(s2, 'disabled');
      assert.equal(dis, null);
    });

    it(`Enter "${fillData.Wireframes.notes}" in the "Notes" text box`, () => {
      setValueAndCheck('//*[@id="details.appDefinition.notes"]', fillData.Wireframes.notes);
    });

    it('Click on the "Continue" button', () => {
      clickContinueBtn(fillData.Wireframes.projectName);
    });

    it('Click on the "Specification" link in the text paragraph', () => {
      const s3 = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(1)';
      const s8 = '#appDefinition-questions > div > div > div:nth-child(2) > div.content-col > div > div > span:nth-child(2)';
      clickSpecLinkInText(fillData.Wireframes.projectName, [
        ['#description', fillData.Wireframes.desc],
        ['//*[@id="details.appDefinition.goal.value"]', fillData.Wireframes.goal],
        ['//*[@id="details.appDefinition.users.value"]', fillData.Wireframes.users],
        ['//*[@id="details.appDefinition.notes"]', fillData.Wireframes.notes]
      ]);
      browser.waitForVisible(`${s3} a.active`).should.be.true;
      browser.waitForVisible(`${s8} a.active`).should.be.true;
    });

    it('In the "App Screens" section, click "Define Screen" button', () => {
      const s = '#appScreens-screens > div > div > div > button';
      const s2 = '#appScreens-screens > div > div > div:nth-child(1)';
      browser.click(s);
      browser.waitForVisible(s2).should.be.true;
    });

    it(`Enter "${fillData.Wireframes.screenName}" for Screen name`, () => {
      setValueAndCheck('#appScreens-screens > div > div > div:nth-child(1) > form > div > div:nth-child(1) > div.content-col > div > div > input', fillData.Wireframes.screenName);
    });

    it(`Enter "${fillData.Wireframes.screenDesc}" under question What are the things the user can do on this screen? text box`, () => {
      setValueAndCheck('#appScreens-screens > div > div > div:nth-child(1) > form > div > div:nth-child(2) > div.content-col > div textarea', fillData.Wireframes.screenDesc);
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

    it(`Enter "${fillData.Wireframes.screenName2}" for Screen name`, () => {
      setValueAndCheck('#appScreens-screens > div > div > div:nth-child(2) > form > div > div:nth-child(1) > div.content-col > div > div > input', fillData.Wireframes.screenName2);
    });

    it(`Enter "${fillData.Wireframes.screenDesc2}" under question What are the things the user can do on this screen? text box`, () => {
      setValueAndCheck('#appScreens-screens > div > div > div:nth-child(2) > form > div > div:nth-child(2) > div.content-col > div textarea', fillData.Wireframes.screenDesc2);
    });

    it('Select 1 from Screen importance', () => {
      selectScreenImportance('#appScreens-screens > div > div > div:nth-child(2) > form > div > div:nth-child(3) > div.content-col > div > div > div', 1);
    });

    it('Click on Delete button in the Screen 1 section', () => {
      const s = '#appScreens-screens > div > div > div:nth-child(1) > div > button';
      const s2 = '#appScreens-screens > div > div > div:nth-child(1) > div > h5';
      browser.scroll(s, 0, -200);
      browser.click(s);
      browser.getText(s2).should.be.equal('Screen 1');
    });

    it(`In the Design Guidelines section enter "${fillData.Wireframes.designGuide}" in Guidelines textbox`, () => {
      setValueAndCheck('//*[@id="details.designSpecification.guidelines"]', fillData.Wireframes.designGuide);
    });

    it(`In the Design Guidelines section enter "${fillData.Wireframes.designGuide2}" in Examples textbox`, () => {
      setValueAndCheck('//*[@id="details.designSpecification.examples"]', fillData.Wireframes.designGuide2);
    });

    it('Click "Save Changes" button', () => {
      const s = '#wrapper-main > div > div > div:nth-child(2) > section > div > div.right-area > div:nth-child(1) > form > div:nth-child(3) > div.section-footer.section-footer-spec > button';
      saveSpecChanges(s, 'Project updated.');
      const dis = browser.getAttribute(s, 'disabled');
      assert.equal(dis, 'true');
    });

  });

});
