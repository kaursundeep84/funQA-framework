/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_012
 */
import {
  checkCurrentDate,
  checkFeatureNote,
  clickFeatureCheck,
  saveSpecChanges,
  setValueAndCheck,
  clickContinueBtn,
  clickSpecLinkInText,
  clickAddEditFeatures,
  clickAddFile,
  selectAnyColor,
  selectiOSAndroidWebBuild
} from './helpers/common';
const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_012 - Connect Application : E2E Create App Project', () => {

  describe('Create an App project with the specification', () => {

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

    it(`Enter "${fillData.App.projectName}" in the "Project Name" text box`, () => {
      setValueAndCheck('#appDefinition-projectName > div.content-boxs > div > div.editable-project-name > div > input', fillData.App.projectName);
    });

    it(`Enter "${fillData.App.refCode}" in the "REF code" text box`, () => {
      setValueAndCheck('#appDefinition-projectName > div.content-boxs > div > div.textinput-refcode > div.project-refcode.paper-form-dotted > input', fillData.App.refCode);
    });

    it('Click "Desktop"', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(3)';
      browser.click(s);
      browser.waitForVisible(`${s} a.active`);
    });

    it('Enter text in description text box', () => {
      setValueAndCheck('#description', fillData.App.desc);
    });

    it('Enter text in "What is the goal..." text box', () => {
      setValueAndCheck('//*[@id="details.appDefinition.goal.value"]', fillData.App.goal);
    });

    it('Scroll down to the bottom of the page and check the \'PROJECT OUTLINE\' section', () => {
      const s = '#wrapper-main > div > div > div > div.FillProjectDetailsWrapper > div.FillProjectDetails > section > div > div.right-area > div > div';
      browser.scroll('.section-footer.section-footer-spec');
      browser.getCssProperty(s, 'position').value.should.be.equal('fixed');
    });

    it('Enter text in "Who are the users..." text box', () => {
      const s2 = 'div.FillProjectDetails > section > div > div.left-area > div.left-area-content > div > form > div > div.section-footer.section-footer-spec > button';
      setValueAndCheck('//*[@id="details.appDefinition.users.value"]', fillData.App.users);
      const dis = browser.getAttribute(s2, 'disabled');
      assert.equal(dis, null);
    });

    it(`Enter "${fillData.App.notes}" in the "Notes" text box`, () => {
      setValueAndCheck('//*[@id="details.appDefinition.notes"]', fillData.App.notes);
    });

    it('Click on the "Continue" button', () => {
      clickContinueBtn(fillData.App.projectName);
    });

    it('Click on the "Specification" link in the text paragraph', () => {
      const s3 = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(3)';
      clickSpecLinkInText(fillData.App.projectName, [
        ['#description', fillData.App.desc],
        ['//*[@id="details.appDefinition.goal.value"]', fillData.App.goal],
        ['//*[@id="details.appDefinition.users.value"]', fillData.App.users],
        ['//*[@id="details.appDefinition.notes"]', fillData.App.notes]
      ]);
      browser.waitForVisible(`${s3} a.active`).should.be.true;
    });

    it(`Enter "${fillData.App.budget}" in What is your project budget? field`, () => {
      setValueAndCheck('#appDefinition-questions > div > div > div:nth-child(5) > div.content-col > div > div > input', fillData.App.budget);
    });

    it('Select "I have a rough idea" in How precise is your budget?', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(6) > div.content-col > div > div > div > div.rc-slider-step > span:nth-child(2)';
      const s2 = '#appDefinition-questions > div > div > div:nth-child(6) > div.content-col > div > div > div > div.rc-slider-step > span.rc-slider-dot.rc-slider-dot-active';
      browser.click(s);
      browser.waitForVisible(s2).should.be.true;
    });

    it('Select "1-2 months" in When do you want to get started?', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(7) > div.content-col > div > div > div > div.rc-slider-step > span:nth-child(2)';
      const s2 = '#appDefinition-questions > div > div > div:nth-child(7) > div.content-col > div > div > div > div.rc-slider-step > span.rc-slider-dot.rc-slider-dot-active';
      browser.click(s);
      browser.waitForVisible(s2).should.be.true;
    });

    it('Select "2+ months" in Deadline', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(8) > div.content-col > div > div > div > div.rc-slider-step > span:nth-child(3)';
      const s2 = '#appDefinition-questions > div > div > div:nth-child(8) > div.content-col > div > div > div > div.rc-slider-step > span.rc-slider-dot.rc-slider-dot-active';
      browser.click(s);
      browser.waitForVisible(s2).should.be.true;
    });

    it('Click "Add/Edit Features" button in Feature requirements section', clickAddEditFeatures);

    it('Click on "Email Login" in the \'Login & Registration\' section >> Switch on the "Enable feature" toggle', () => {
      clickFeatureCheck(
        'div.define-features > main > div.features.flex.column > ul > li:nth-child(1) > div > ul > li:nth-child(1) > a > div > span.feature-title',
        'div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div',
        'div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div > label > input[type="checkbox"]'
      );
    });

    it(`Enter the note "${fillData.App.emailNote}"`, () => {
      checkFeatureNote(fillData.App.emailNote);
    });

    it('Click on "Search" in the \'General Building Blocks\' section >> Switch on the "Enable feature" toggle', () => {
      clickFeatureCheck(
        'div.define-features > main > div.features.flex.column > ul > li:nth-child(2) > div > ul > li:nth-child(1) > a > div > span.feature-title',
        'div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div',
        'div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div > label > input[type="checkbox"]'
      );
    });

    it(`Enter the note "${fillData.App.searchNote}"`, () => {
      checkFeatureNote(fillData.App.searchNote);
    });

    it('Click on "Marketplace" in the \'Ecommerce\' section >> Switch on the "Enable feature" toggle', () => {
      clickFeatureCheck(
        'div.define-features > main > div.features.flex.column > ul > li:nth-child(3) > div > ul > li:nth-child(1) > a > div > span.feature-title',
        'div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div',
        'div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div > label > input[type="checkbox"]'
      );
    });

    it(`Enter the note "${fillData.App.marketplaceNote}"` , () => {
      checkFeatureNote(fillData.App.marketplaceNote);
    });

    it('Click on "Activity Feed" in the \'Social\' section >> Switch on the "Enable feature" toggle', () => {
      clickFeatureCheck(
        'div.define-features > main > div.features.flex.column > ul > li:nth-child(4) > div > ul > li:nth-child(1) > a > div > span.feature-title',
        'div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div',
        'div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div > label > input[type="checkbox"]'
      );
    });

    it(`Enter the note "${fillData.App.activityFeedNote}"` , () => {
      checkFeatureNote(fillData.App.activityFeedNote);
    });

    it('Click on "Add a custom feature"...empty check', () => {
      const s = 'div.define-features > main > div.features.flex.column > ul > li.add-custom-feature > button > span';
      const s2 = 'div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-form-content > form > div.feature-form-actions > button.tc-btn.tc-btn-primary.tc-btn-md';
      const s3 = 'div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-form-content > form > div.row > p';
      browser.click(s);
      browser.click(s2);
      browser.waitForVisible(s3).should.be.true;
      browser.getText(s3).should.be.equal('Feature name is required');
    });

    it('Click "Cancel" button', () => {
      const s = 'div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-form-content > form > div.feature-form-actions > button.tc-btn.tc-btn-default.tc-btn-md';
      const s2 = 'body > div.ReactModalPortal > div > div > div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > h3';
      browser.click(s);
      browser.waitForVisible(s2).should.be.true;
    });

    it('Click on "Add a custom feature"...value set check', () => {
      const s = 'div.define-features > main > div.features.flex.column > ul > li.add-custom-feature > button > span';
      const s2 = 'div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-form-content > form > div.feature-form-actions > button.tc-btn.tc-btn-primary.tc-btn-md';
      const s3 = 'div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-form-content > form > div.row > input';
      const s4 = 'div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row > div > div.SwitchButton.clearfix > label > input[type="checkbox"]';
      const s5 = '#notes';
      browser.click(s);
      browser.setValue(s3, fillData.App.customFeature);
      browser.click(s2);
      browser.getValue(s4).should.be.equal('on');
      browser.waitForVisible(s5).should.be.true;
    });

    it(`Enter the note "${fillData.App.customFeatureNote}"`, () => {
      checkFeatureNote(fillData.App.customFeatureNote);
    });

    it('Check the "Custom Features" section in the Left hand side panel', () => {
      const s = 'div.define-features > main > div.features.flex.column > ul > li:nth-child(5) > div > ul > li > a > div > span.feature-title';
      browser.waitForVisible(s).should.be.true;
      browser.getText(s).should.be.equal(fillData.App.customFeature);
    });

    it('Click "Save and Close" button', () => {
      const s = 'body > div.ReactModalPortal > div > div > div.feature-selection-dialog-close';
      browser.click(s);
      browser.getUrl().should.contain('/specification');
      $$('.flattened-feature-list > .flattened-feature-list-item').map((result, indx) => {
        let check = '';
        switch (indx) {
          case 0:
            check = 'Email Login';
            break;
          case 1:
            check = 'Search';
            break;
          case 2:
            check = 'Marketplace';
            break;
          case 3:
            check = 'Activity Feed';
            break;
          case 4:
            check = 'Custom Feature 01';
            break;
        }
        result.getText('.content-col h4').should.be.equal(check);
      });
    });

    it('Click "Add File" button from \'Project Files\' section', clickAddFile);

    it('Click "Save Changes" button', () => {
      saveSpecChanges(
        '#wrapper-main > div > div > div:nth-child(2) > section > div > div.right-area > div:nth-child(1) > form > div:nth-child(1) > div.section-footer.section-footer-spec > button',
        'Project updated.'
      );
    });

    it('In the Design Specification section select "Serif" under Question \'What font style do you prefer?\'', () => {
      const s = '#designSpecification-questions > div.content-boxs > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(1) > a';
      const s2 = '#designSpecification-questions > div.content-boxs > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(1) > a > input[type="radio"]';
      browser.click(s);
      browser.getValue(s2).should.be.equal('on');
    });

    it('Select any color under question \'What colors do you like?\' by clicking on \'+\' button', selectAnyColor);

    it('Select "Flat Color" under question \'What icon style do you prefer?\'', () => {
      const s = '#designSpecification-questions > div.content-boxs > div > div:nth-child(3) > div.content-col > div > div > span:nth-child(1) > a';
      const s2 = '#designSpecification-questions > div.content-boxs > div > div:nth-child(3) > div.content-col > div > div > span:nth-child(1) > a > input[type="radio"]';
      browser.click(s);
      browser.getValue(s2).should.be.equal('on');
    });

    it('Enter "Sample Note" in the Notes section', () => {
      setValueAndCheck('//*[@id="details.designSpecification.notes"]', fillData.App.sampleNote);
    });

    it('Click "Save Changes" button', () => {
      saveSpecChanges(
        '#wrapper-main > div > div > div:nth-child(2) > section > div > div.right-area > div:nth-child(1) > form > div:nth-child(2) > div.section-footer.section-footer-spec > button',
        'Project updated.'
      );
    });

    it('In the "Development Specification" section select iOS, Android, Web options under question \'How should your application be built?\'', selectiOSAndroidWebBuild);

    it('Select "No" for the question \'Is offline access required for your application?\'', () => {
      const s = '#devSpecification-questions > div.content-boxs > div > div:nth-child(2) > div.content-col > div > div > div > div:nth-child(2)';
      const s2 = '//*[@id="details.devSpecification.offlineAccess-opt-1"]';
      browser.click(s);
      browser.getValue(s2).should.be.equal('false');
    });

    it('Select "Maximum" for the question \'What level of security is needed for your application?\'', () => {
      const s = '#devSpecification-questions > div.content-boxs > div > div:nth-child(3) > div.content-col > div > div > div > div:nth-child(3)';
      const s2 = '//*[@id="details.devSpecification.securityLevel-opt-2"]';
      browser.click(s);
      browser.getValue(s2).should.be.equal('maximumm');
    });

    it('Click "Save Changes" button', () => {
      const s = '#wrapper-main > div > div > div:nth-child(2) > section > div > div.right-area > div:nth-child(1) > form > div:nth-child(3) > div.section-footer.section-footer-spec > button';
      saveSpecChanges(s, 'Project updated.');
      const dis = browser.getAttribute(s, 'disabled');
      assert.equal(dis, 'true');
    });

  });

});
