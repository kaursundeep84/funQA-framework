/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_017
 */
import {
  checkCurrentDate,
  saveSpecChanges,
  clickContinueBtn,
  clickSpecLinkInText,
  selectAnyColor,
  setValueAndCheck
} from './helpers/common';
const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_017 - Connect Application : E2E Create Other Design Project', () => {

  describe('Create a Other Design project with the specification by editing the options given in project details', () => {

    before(function() {
      browser.loginToConnApp();
    });

    browser.createProject('Design', {
      selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(4)',
      buttonTxt: 'View All'
    });

    it('Click on Other Design section', () => {
      browser.getUrl().should.contain('/new-project/all-designs');
      const s = '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(3)';
      browser.click(s);
      const s2 = '#wrapper-main > div > div > div > div.FillProjectDetailsWrapper > div.FillProjectDetails > div > h1';
      browser.getUrl().should.contain('/new-project/generic-design');
      browser.getText(s2).should.be.equal('Let\'s setup your Other Design project');
      checkCurrentDate('div.ProjectOutline > div.project-card-header > div > div.project-header-details > div.project-date');
    });

    it(`Enter "${fillData.Other.projectName}" in the "Project Name" text box`, () => {
      setValueAndCheck('#appDefinition-projectName > div.content-boxs > div > div.editable-project-name > div > input', fillData.Other.projectName);
    });

    it(`Enter text in the Description text box`, () => {
      setValueAndCheck('#description', fillData.Other.desc);
    });

    it('Enter text in "What is the goal..." text box', () => {
      setValueAndCheck('//*[@id="details.appDefinition.goal.value"]', fillData.Other.goal);
    });

    it('Enter text in "Who are the users..." text box', () => {
      const s2 = 'div.FillProjectDetails > section > div > div.left-area > div.left-area-content > div > form > div > div.section-footer.section-footer-spec > button';
      setValueAndCheck('//*[@id="details.appDefinition.users.value"]', fillData.Other.users);
      const dis = browser.getAttribute(s2, 'disabled');
      assert.equal(dis, null);
    });

    it(`Enter "${fillData.Other.notes}" in the "Notes" text box`, () => {
      setValueAndCheck('//*[@id="details.appDefinition.notes"]', fillData.Other.notes);
    });

    it('Click on the "Continue" button', () => {
      clickContinueBtn(fillData.Other.projectName);
    });

    it('Click on the "Specification" link in the text paragraph', () => {
      clickSpecLinkInText(fillData.Other.projectName, [
        ['#description', fillData.Other.desc],
        ['//*[@id="details.appDefinition.goal.value"]', fillData.Other.goal],
        ['//*[@id="details.appDefinition.users.value"]', fillData.Other.users],
        ['//*[@id="details.appDefinition.notes"]', fillData.Other.notes]
      ]);
    });

    it('In the Design Specification section select "Serif" under Question \'What font style do you prefer?\'', () => {
      const s = '#designSpecification-questions > div.content-boxs > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(1) > a';
      const s2 = '#designSpecification-questions > div.content-boxs > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(1) > a > input[type="radio"]';
      browser.click(s);
      browser.getValue(s2).should.be.equal('on');
    });

    it('Select any color under question \'What colors do you like?\' by clicking on \'+\' button', selectAnyColor);

    it('Select "Solid Line" under question \'What icon style do you prefer?\'', () => {
      const s = '#designSpecification-questions > div.content-boxs > div > div:nth-child(3) > div.content-col > div > div > span:nth-child(3) > a';
      const s2 = '#designSpecification-questions > div.content-boxs > div > div:nth-child(3) > div.content-col > div > div > span:nth-child(3) > a > input[type="radio"]';
      browser.click(s);
      browser.getValue(s2).should.be.equal('on');
    });

    it(`Enter "${fillData.Other.sampleNote}" in the Notes section`, () => {
      setValueAndCheck('//*[@id="details.designSpecification.notes"]', fillData.Other.sampleNote);
    });

    it('In the "Development Specification" section select Web option under question \'How should your application be built?\'', () => {
      const s3 = '#devSpecification-questions > div.content-boxs > div > div:nth-child(1) > div.content-col > div > div > div > div:nth-child(3)';
      const s6 = '//*[@id="details.devSpecification.platform-opt-2"]';
      browser.click(s3);
      browser.getValue(s6).should.be.equal('on');
    });

    it('Select "Yes" for the question \'Is offline access required for your application?\'', () => {
      const s = '#devSpecification-questions > div.content-boxs > div > div:nth-child(2) > div.content-col > div > div > div > div:nth-child(1)';
      const s2 = '//*[@id="details.devSpecification.offlineAccess-opt-0"]';
      browser.click(s);
      browser.getValue(s2).should.be.equal('true');
    });

    it('Select "Standard - Nothing to do here" for the question \'What level of security is needed for your application?\'', () => {
      const s = '#devSpecification-questions > div.content-boxs > div > div:nth-child(3) > div.content-col > div > div > div > div:nth-child(1)';
      const s2 = '//*[@id="details.devSpecification.securityLevel-opt-0"]';
      browser.click(s);
      browser.getValue(s2).should.be.equal('standard');
    });

    it('Click "Save Changes" button', () => {
      const s = '#wrapper-main > div > div > div:nth-child(2) > section > div > div.right-area > div:nth-child(1) > form > div:nth-child(3) > div.section-footer.section-footer-spec > button';
      saveSpecChanges(s, 'Project updated.');
      const dis = browser.getAttribute(s, 'disabled');
      assert.equal(dis, 'true');
    });

  });

});
