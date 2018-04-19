/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_018
 */
import {
  checkCurrentDate,
  clickFeatureCheck,
  checkFeatureNote,
  saveSpecChanges,
  clickContinueBtn,
  clickSpecLinkInText,
  clickAddEditFeatures,
  selectAnyColor,
  selectiOSAndroidWebBuild,
  setValueAndCheck
} from './helpers/common';
const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_018 - Connect Application : E2E Create Front End Project', () => {

  describe('Create a Front End project with the specification by editing the options given in project details', () => {

    before(function() {
      browser.loginToConnApp();
    });

    browser.createProject('Software Development', {
      selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(5)',
      buttonTxt: 'View All'
    });

    it('Click on Front-end section', () => {
      browser.getUrl().should.contain('/new-project/all-development');
      const s = '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(1)';
      browser.click(s);
      const s2 = '#wrapper-main > div > div > div > div.FillProjectDetailsWrapper > div.FillProjectDetails > div > h1';
      browser.getUrl().should.contain('/new-project/frontend-development');
      browser.getText(s2).should.be.equal('Let\'s setup your Front-end project');
      checkCurrentDate('div.ProjectOutline > div.project-card-header > div > div.project-header-details > div.project-date');
    });

    it(`Enter "${fillData.FrontEnd.projectName}" in the "Project Name" text box`, () => {
      setValueAndCheck('#appDefinition-projectName > div.content-boxs > div > div.editable-project-name > div > input', fillData.FrontEnd.projectName);
    });

    it(`Enter text in the Description text box`, () => {
      setValueAndCheck('#description', fillData.FrontEnd.desc);
    });

    it('Select "wearable" from Which is your primary device target?', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(4)';
      browser.click(s);
      browser.waitForVisible(`${s} a.active`);
    });

    it('Enter text in "What is the goal..." text box', () => {
      setValueAndCheck('//*[@id="details.appDefinition.goal.value"]', fillData.FrontEnd.goal);
    });

    it('Enter text in "Who are the users..." text box', () => {
      const s2 = 'div.FillProjectDetails > section > div > div.left-area > div.left-area-content > div > form > div > div.section-footer.section-footer-spec > button';
      setValueAndCheck('//*[@id="details.appDefinition.users.value"]', fillData.FrontEnd.users);
      const dis = browser.getAttribute(s2, 'disabled');
      assert.equal(dis, null);
    });

    it(`Enter "${fillData.FrontEnd.notes}" in the "Notes" text box`, () => {
      setValueAndCheck('//*[@id="details.appDefinition.notes"]', fillData.FrontEnd.notes);
    });

    it('Click on the "Continue" button', () => {
      clickContinueBtn(fillData.FrontEnd.projectName);
    });

    it('Click on the "Specification" link in the text paragraph', () => {
      const s3 = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(4)';
      clickSpecLinkInText(fillData.FrontEnd.projectName, [
        ['#description', fillData.FrontEnd.desc],
        ['//*[@id="details.appDefinition.goal.value"]', fillData.FrontEnd.goal],
        ['//*[@id="details.appDefinition.users.value"]', fillData.FrontEnd.users],
        ['//*[@id="details.appDefinition.notes"]', fillData.FrontEnd.notes]
      ]);
      browser.waitForVisible(`${s3} a.active`).should.be.true;
    });

    it('Select the Skip question checkbox under the question "What is the goal of your application? How will people use it?"', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(3) > div.content-col > div > div > div.checkbox-group-item > label';
      const s2 = '#appDefinition-questions > div > div > div:nth-child(3) > div.content-col > div > div > div.row';
      browser.click(s);
      browser.waitUntil(() => {
        return $(s2).type === 'NoSuchElement';
      });
    });

    it('Select the Skip question checkbox under the question "Who are the users of your application?"', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(4) > div.content-col > div > div > div.checkbox-group-item > label';
      const s2 = '#appDefinition-questions > div > div > div:nth-child(4) > div.content-col > div > div > div.row';
      browser.click(s);
      browser.waitUntil(() => {
        return $(s2).type === 'NoSuchElement';
      });
    });

    it('Deselect the Skip question checkbox under the question "Who are the users of your application?"', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(4) > div.content-col > div > div > div.checkbox-group-item > label';
      const s2 = '#appDefinition-questions > div > div > div:nth-child(4) > div.content-col > div > div > div.row';
      const s3 = '//*[@id="details.appDefinition.users.value"]';
      browser.click(s);
      browser.waitForExist(s2);
      browser.getValue(s3).should.be.equal(fillData.FrontEnd.users);
    });

    it(`Enter "${fillData.FrontEnd.budget}" in What is your project budget? field`, () => {
      setValueAndCheck('#appDefinition-questions > div > div > div:nth-child(5) > div.content-col > div > div > input', fillData.FrontEnd.budget);
    });

    it('Select "Precise to the penny" in How precise is your budget?', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(6) > div.content-col > div > div > div > div.rc-slider-step > span:nth-child(3)';
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

    it('Click on "Onboarding" in the \'Login & Registration\' section >> Switch on the "Enable feature" toggle', () => {
      clickFeatureCheck(
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.features.flex.column > ul > li:nth-child(1) > div > ul > li:nth-child(5) > a > div > span.feature-title',
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div',
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div > label > input[type="checkbox"]'
      );
    });

    it(`Enter the note "${fillData.FrontEnd.onboardingNote}"` , () => {
      checkFeatureNote(fillData.FrontEnd.onboardingNote);
    });

    it('Click on "Admin Functionality" in the \'General Building Blocks\' section >> Switch on the "Enable feature" toggle', () => {
      clickFeatureCheck(
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.features.flex.column > ul > li:nth-child(2) > div > ul > li:nth-child(8) > a > div > span.feature-title',
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div',
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div > label > input[type="checkbox"]'
      );
    });

    it(`Enter the note "${fillData.FrontEnd.adminNote}"` , () => {
      checkFeatureNote(fillData.FrontEnd.adminNote);
    });

    it('Click on "Shopping Cart" in the \'Ecommerce\' section >> Switch on the "Enable feature" toggle', () => {
      clickFeatureCheck(
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.features.flex.column > ul > li:nth-child(3) > div > ul > li:nth-child(4) > a > div > span.feature-title',
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div',
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div > label > input[type="checkbox"]'
      );
    });

    it('Click "Save and Close" button', () => {
      const s = 'body > div.ReactModalPortal > div > div > div.feature-selection-dialog-close';
      browser.click(s);
      browser.getUrl().should.contain('/specification');
      $$('.flattened-feature-list > .flattened-feature-list-item').map((result, indx) => {
        let check = '';
        switch (indx) {
          case 0:
            check = 'Onboarding';
            break;
          case 1:
            check = 'Admin Functionality';
            break;
          case 2:
            check = 'Shopping Cart';
            break;
        }
        result.getText('.content-col h4').should.be.equal(check);
      });
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

    it(`Enter "${fillData.FrontEnd.sampleNote}" in the Notes section`, () => {
      setValueAndCheck('//*[@id="details.designSpecification.notes"]', fillData.FrontEnd.sampleNote);
    });

    it('Click "Save Changes" button', () => {
      const s = '#wrapper-main > div > div > div:nth-child(2) > section > div > div.right-area > div:nth-child(1) > form > div:nth-child(3) > div.section-footer.section-footer-spec > button';
      saveSpecChanges(s, 'Project updated.');
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
