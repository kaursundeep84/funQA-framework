/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_022
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

describe('#TC_ConnApp_022 - Connect Application : E2E Create QA Mobility Project', () => {

  describe('Create a QA Mobility project with the specification', () => {

    before(function() {
      browser.loginToConnApp();
    });

    browser.createProject('QA', {
      selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(6)',
      buttonTxt: 'View All'
    });

    it('Click on Mobility Testing section', () => {
      browser.getUrl().should.contain('/new-project/all-quality-assurance');
      const s = '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(2)';
      browser.click(s);
      const s2 = '#wrapper-main > div > div > div > div.FillProjectDetailsWrapper > div.FillProjectDetails > div > h1';
      browser.getUrl().should.contain('/new-project/mobility-testing');
      browser.getText(s2).should.be.equal('Let\'s setup your Mobility Testing project');
      checkCurrentDate('div.ProjectOutline > div.project-card-header > div > div.project-header-details > div.project-date');
    });

    it(`Enter "${fillData.MobilityTest.projectName}" in the "Project Name" text box`, () => {
      setValueAndCheck('#appDefinition-projectName > div.content-boxs > div > div.editable-project-name > div > input', fillData.MobilityTest.projectName);
    });

    it('Click on What kind of application would you like to test? >> Select "Travel / Transportation"', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > div';
      const s2 = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > div > div.Dropdown.pointer-hide > ul > li:nth-child(9) > a';
      const s3 = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > div > div.dropdown-menu-header > span';
      browser.click(s);
      const valuesShould = [
        'Select', 'Banking or Financial Services', 'eCommerce', 'Media / Entertainment', 'Gaming', 'Health and Fitness', 'Manufacturing',
        'Retail', 'Travel / Transportation', 'Other'
      ];
      const valuesList = $$('.dropdown-menu-list > .dropdown-menu-list-item').map((result) => {
        return result.getText();
      });
      assert.deepEqual(valuesShould, valuesList);
      browser.click(s2);
      browser.getText(s3).should.be.equal('Travel / Transportation');
    });

    it('Select "Yes I have test cases." from Do you have test cases written?', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(2) > div.content-col > div > div > div > div:nth-child(1) > label';
      const s2 = '//*[@id="details.appDefinition.testCases-opt-0"]';
      browser.click(s);
      browser.getValue(s2).should.be.equal('true');
    });

    it(`Enter text in the Description text box`, () => {
      setValueAndCheck('#description', fillData.MobilityTest.desc);
    });

    it(`Enter "${fillData.MobilityTest.users}" in the "Please tell us about your users." text box`, () => {
      setValueAndCheck('//*[@id="details.appDefinition.userInfo"]', fillData.MobilityTest.users);
    });

    it('Select "Phone" from Which is your primary device target?', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(5) > div.content-col > div > div > span:nth-child(1)';
      browser.click(s);
      browser.waitForVisible(`${s} a.active`);
    });

    it('Click on the "Continue" button', () => {
      clickContinueBtn(fillData.MobilityTest.projectName);
    });

    it('Click on the "Specification" link in the text paragraph', () => {
      const s3 = '#appDefinition-questions > div > div > div:nth-child(5) > div.content-col > div > div > span:nth-child(1)';
      clickSpecLinkInText(fillData.MobilityTest.projectName, [
        ['#description', fillData.MobilityTest.desc],
        ['//*[@id="details.appDefinition.userInfo"]', fillData.MobilityTest.users]
      ]);
      browser.waitForVisible(`${s3} a.active`).should.be.true;
    });

    it('Enter relevant notes in all the fields in the "Testing Needs" section ', () => {
      enterRelevantNotes(fillData.MobilityTest);
    });

    it('Click "Save Changes" button', () => {
      const s = '#wrapper-main > div > div > div:nth-child(2) > section > div > div.right-area > div:nth-child(1) > form > div:nth-child(2) > div.section-footer.section-footer-spec > button';
      saveSpecChanges(s, 'Project updated.');
      const dis = browser.getAttribute(s, 'disabled');
      assert.equal(dis, 'true');
    });

  });

});
