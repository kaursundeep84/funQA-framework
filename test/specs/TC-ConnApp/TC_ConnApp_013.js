/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_013
 */
import {
  checkCurrentDate,
  checkFeatureNote,
  clickFeatureCheck,
  saveSpecChanges,
  clickContinueBtn,
  clickSpecLinkInText,
  clickAddEditFeatures,
  clickAddFile,
  selectAnyColor,
  setValueAndCheck
} from './helpers/common';
const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_013 - Connect Application : E2E Create Website Project', () => {

  describe('Create a Website project with the specification', () => {

    before(function() {
      browser.loginToConnApp();
    });

    browser.createProject('Website', {
      selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(2)',
      buttonTxt: 'Select Project'
    });

    it('Click anywhere on the "Website" section', () => {
      // Already clicked by the factory function
      const s = '#wrapper-main > div > div > div > div.FillProjectDetailsWrapper > div.FillProjectDetails > div > h1';
      browser.getUrl().should.contain('/new-project/website');
      browser.getText(s).should.be.equal('Let\'s setup your Website project');
      checkCurrentDate('div.ProjectOutline > div.project-card-header > div > div.project-header-details > div.project-date');
    });

    it(`Enter "${fillData.Website.projectName}" in the "Project Name" text box`, () => {
      setValueAndCheck('#appDefinition-projectName > div.content-boxs > div > div.editable-project-name > div > input', fillData.Website.projectName);
    });

    it(`Enter "${fillData.Website.refCode}" in the "REF code" text box`, () => {
      setValueAndCheck('#appDefinition-projectName > div.content-boxs > div > div.textinput-refcode > div.project-refcode.paper-form-dotted > input', fillData.Website.refCode);
    });

    it('Click "Phone"', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(1)';
      browser.click(s);
      browser.waitForVisible(`${s} a.active`);
    });

    it('Enter text in description text box', () => {
      const s2 = '#wrapper-main > div > div > div > div.FillProjectDetailsWrapper > div.FillProjectDetails > section > div > div.right-area > div > div > div.ProjectOutline > ul > div';
      setValueAndCheck('#description', fillData.Website.desc);
      browser.waitForVisible(s2);
    });

    it('Enter text in "What is the goal..." text box', () => {
      setValueAndCheck('//*[@id="details.appDefinition.goal.value"]', fillData.Website.goal);
    });

    it('Enter text in "Who are the users..." text box', () => {
      const s2 = 'div.FillProjectDetails > section > div > div.left-area > div.left-area-content > div > form > div > div.section-footer.section-footer-spec > button';
      setValueAndCheck('//*[@id="details.appDefinition.users.value"]', fillData.Website.users);
      const dis = browser.getAttribute(s2, 'disabled');
      assert.equal(dis, null);
    });

    it(`Enter "${fillData.Website.notes}" in the "Notes" text box`, () => {
      setValueAndCheck('//*[@id="details.appDefinition.notes"]', fillData.Website.notes);
    });

    it('Click on the "Continue" button', () => {
      clickContinueBtn(fillData.Website.projectName);
    });

    it('Click on the "Specification" link in the text paragraph', () => {
      const s3 = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(1)';
      clickSpecLinkInText(fillData.Website.projectName, [
        ['#description', fillData.Website.desc],
        ['//*[@id="details.appDefinition.goal.value"]', fillData.Website.goal],
        ['//*[@id="details.appDefinition.users.value"]', fillData.Website.users],
        ['//*[@id="details.appDefinition.notes"]', fillData.Website.notes]
      ]);
      browser.waitForVisible(`${s3} a.active`).should.be.true;
    });

    it('Click "Add/Edit Features" button in Feature requirements section', clickAddEditFeatures);

    it('Click on "Social Login" in the \'Login & Registration\' section >> Switch on the "Enable feature" toggle', () => {
      clickFeatureCheck(
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.features.flex.column > ul > li:nth-child(1) > div > ul > li:nth-child(2) > a > div > span.feature-title',
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div',
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div > label > input[type="checkbox"]'
      );
    });

    it(`Enter the note "${fillData.Website.socialNote}"` , () => {
      checkFeatureNote(fillData.Website.socialNote);
    });

    it('Click on "Notifications" in the \'General Building Blocks\' section >> Switch on the "Enable feature" toggle', () => {
      clickFeatureCheck(
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.features.flex.column > ul > li:nth-child(2) > div > ul > li:nth-child(5) > a > div > span.feature-title',
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div',
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div > label > input[type="checkbox"]'
      );
    });

    it(`Enter the note "${fillData.Website.noteNote}"` , () => {
      checkFeatureNote(fillData.Website.noteNote);
    });

    it('Click on "Payments" in the \'Ecommerce\' section >> Switch on the "Enable feature" toggle', () => {
      clickFeatureCheck(
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.features.flex.column > ul > li:nth-child(3) > div > ul > li:nth-child(3) > a > div > span.feature-title',
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div',
        'div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div > label > input[type="checkbox"]'
      );
    });

    it(`Enter the note "${fillData.Website.paymentsNote}"` , () => {
      checkFeatureNote(fillData.Website.paymentsNote);
    });

    it('Click on "Messaging" in the \'Social\' section >> Switch on the "Enable feature" toggle', () => {
      clickFeatureCheck(
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.features.flex.column > ul > li:nth-child(4) > div > ul > li:nth-child(3) > a > div > span.feature-title',
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div',
        'div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div > label > input[type="checkbox"]'
      );
    });

    it(`Enter the note "${fillData.Website.messagingNote}"` , () => {
      checkFeatureNote(fillData.Website.messagingNote);
    });

    it('Click "Save and Close" button', () => {
      const s = 'body > div.ReactModalPortal > div > div > div.feature-selection-dialog-close';
      browser.click(s);
      browser.getUrl().should.contain('/specification');
      $$('.flattened-feature-list > .flattened-feature-list-item').map((result, indx) => {
        let check = '';
        switch (indx) {
          case 0:
            check = 'Social Login';
            break;
          case 1:
            check = 'Notifications';
            break;
          case 2:
            check = 'Payments';
            break;
          case 3:
            check = 'Messaging';
            break;
        }
        result.getText('.content-col h4').should.be.equal(check);
      });
    });

    it('Click "Add File" button from \'Project Files\' section', clickAddFile);

    it('In the Design Specification section select "Serif" under Question \'What font style do you prefer?\'', () => {
      const s = '#designSpecification-questions > div.content-boxs > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(1) > a';
      const s2 = '#designSpecification-questions > div.content-boxs > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(1) > a > input[type="radio"]';
      browser.click(s);
      browser.getValue(s2).should.be.equal('on');
    });

    it('Select any color under question \'What colors do you like?\' by clicking on \'+\' button', selectAnyColor);

    it('Select "Thin Line" under question \'What icon style do you prefer?\'', () => {
      const s = '#designSpecification-questions > div.content-boxs > div > div:nth-child(3) > div.content-col > div > div > span:nth-child(2) > a';
      const s2 = '#designSpecification-questions > div.content-boxs > div > div:nth-child(3) > div.content-col > div > div > span:nth-child(2) > a > input[type="radio"]';
      browser.click(s);
      browser.getValue(s2).should.be.equal('on');
    });

    it(`Enter "${fillData.Website.sampleNote}" in the Notes section`, () => {
      setValueAndCheck('//*[@id="details.designSpecification.notes"]', fillData.Website.sampleNote);
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

    it('Select "Maximum" for the question \'What level of security is needed for your application?\'', () => {
      const s = '#devSpecification-questions > div.content-boxs > div > div:nth-child(3) > div.content-col > div > div > div > div:nth-child(2)';
      const s2 = '//*[@id="details.devSpecification.securityLevel-opt-1"]';
      browser.click(s);
      browser.getValue(s2).should.be.equal('enhanced');
    });

    it('Click "Save Changes" button', () => {
      const s = '#wrapper-main > div > div > div:nth-child(2) > section > div > div.right-area > div:nth-child(1) > form > div:nth-child(3) > div.section-footer.section-footer-spec > button';
      saveSpecChanges(s, 'Project updated.');
      const dis = browser.getAttribute(s, 'disabled');
      assert.equal(dis, 'true');
    });

  });

});
