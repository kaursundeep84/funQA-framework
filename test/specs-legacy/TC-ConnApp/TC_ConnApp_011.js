/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_011
 */
import {
  checkSection,
  hooverSectionCheckBtnClick,
  checkSubPage,
  setValueAndCheck,
  checkFeatureNote,
  clickAddEditFeatures,
  clickAddFile,
  clickFeatureCheck,
  saveSpecChanges,
  clickSpecLinkInText,
  checkCurrentDate,
  clickContinueBtn,
  selectAnyColor,
  selectiOSAndroidWebBuild,
  clickAddNewCheckIncomplete,
  projectInfo,
  projectTeam,
  projectMessageBox,
  enterRelevantNotes
} from './helpers/common';

const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_011 - Connect Application : GUI Verification of the "Create a new project" page elements', () => {

  before(function() {
    browser.loginToConnApp();
  });

  describe('Verification of the "Create a new project" page elements', () => {

    browser.createProject();

    it('Check the topcoder connect Logo', () => {
      const s = '.icon-connect-logo-mono';
      const location = browser.getLocation(s);
      browser.isVisibleWithinViewport(s).should.be.true;
      location.x.should.be.below(50);
      location.y.should.be.below(50);
    });

    it('Check the "ESC" button', () => {
      const s = '.escape-button';
      const s2 = '#root > div > div.TopBarContainer > div > div > div > div > div.actions > div.welcome-info > div > div > div > div > div > div > div.dropdown-menu-header > img';
      const s3 = '.new-project-link';
      browser.click(s);
      browser.getUrl().should.contain('/projects');
      browser.waitForVisible(s2);
      browser.click(s3);
      browser.getUrl().should.contain('/new-project');
    });

    it('Check the "App" section', () => {
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(1)',
        title: 'App',
        desc: 'Build a phone, tablet, wearable, or desktop app'
      });
    });

    it('Check the "Website" section', () => {
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(2)',
        title: 'Website',
        desc: 'Design and build the high-impact pages for your blog, online store, or company'
      });
    });

    it('Check the "Chatbot" section', () => {
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(3)',
        title: 'Chatbot',
        desc: 'Build, train and test a custom conversation for your chatbot'
      });
    });

    it('Check the "Design" section and subsections', () => {
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(4)',
        title: 'Design',
        desc: 'Pick the right design project for your needs - wireframes, visual, or other'
      });
      hooverSectionCheckBtnClick(
        '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(4)',
        'View All'
      );
      checkSubPage('Design projects', 'What kind of design do you need?');
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
      browser.click('.back-button');
    });

    it('Check the "Software Development" section and subsections', () => {
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(5)',
        title: 'Software Development',
        desc: 'Get help with any part of your development lifecycle'
      });
      hooverSectionCheckBtnClick(
        '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(5)',
        'View All'
      );
      checkSubPage('Software Development projects', 'What kind of development do you need?');
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(1)',
        title: 'Front-end',
        desc: 'Translate your designs into Web or Mobile front-end'
      });
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(2)',
        title: 'Back-end & API',
        desc: 'Build the server, DB, and API for your app'
      });
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(3)',
        title: 'Development Integration',
        desc: 'Get help with any part of your app or software'
      });
      browser.click('.back-button');
    });

    it('Check the "QA" section and subsections', () => {
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(6)',
        title: 'QA',
        desc: 'Test and fix bugs in your software'
      });
      hooverSectionCheckBtnClick(
        '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(6)',
        'View All'
      );
      checkSubPage('QA projects', 'What kind of quality assurance (QA) do you need?');
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(1)',
        title: 'Real World Testing',
        desc: 'Exploratory Testing, Cross browser-device Testing'
      });
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(2)',
        title: 'Mobility Testing',
        desc: 'App Certification, Lab on Hire, User Sentiment Analysis'
      });
      browser.click('.back-button');
    });

    it('Click on the hyperlink on "Looking for something else? Get in touch with us."', () => {
      const s = '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.footer > a';
      browser.click(s);
      browser.getUrl().should.contain('http://crowdsourcing.topcoder.com/piqued_by_crowdsourcing');
    });

  });

  describe('Create an App project with the specification', () => {

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

  describe('Create a Website project with the specification', () => {

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

  describe('Create a Chatbot project with the specification', () => {

    browser.createProject('Chatbot', {
      selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(3)',
      buttonTxt: 'Select Project'
    });

    it('Click anywhere on the "Chatbot" section', () => {
      // Already clicked by the factory function
      const s = '#wrapper-main > div > div > div > div.FillProjectDetailsWrapper > div.FillProjectDetails > div > h1';
      browser.getUrl().should.contain('/new-project/chatbot');
      browser.getText(s).should.be.equal('Let\'s setup your Chatbot project');
      checkCurrentDate('div.ProjectOutline > div.project-card-header > div > div.project-header-details > div.project-date');
    });

    it(`Enter "${fillData.Chatbot.projectName}" in the "Project Name" text box`, () => {
      setValueAndCheck('#appDefinition-projectName > div.content-boxs > div > div.editable-project-name > div > input', fillData.Chatbot.projectName);
    });

    it(`Enter "${fillData.Chatbot.refCode}" in the "REF code" text box`, () => {
      setValueAndCheck('#appDefinition-projectName > div.content-boxs > div > div.textinput-refcode > div.project-refcode.paper-form-dotted > input', fillData.Chatbot.refCode);
    });

    it('Enter text in description text box', () => {
      const s2 = '#wrapper-main > div > div > div > div.FillProjectDetailsWrapper > div.FillProjectDetails > section > div > div.right-area > div > div > div.ProjectOutline > ul > div';
      setValueAndCheck('#description', fillData.Chatbot.desc);
      browser.waitForVisible(s2);
    });

    it('Select options \'Order management\', \'Information\', \'Help\' under the question What capabilities does the chatbot need to support?', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(2) > div.content-col > div > div > div > div:nth-child(1) > div';
      const s2 = '#appDefinition-questions > div > div > div:nth-child(2) > div.content-col > div > div > div > div:nth-child(2) > div';
      const s3 = '#appDefinition-questions > div > div > div:nth-child(2) > div.content-col > div > div > div > div:nth-child(3) > div';
      const s4 = '//*[@id="details.appDefinition.capabilities-opt-0"]';
      const s5 = '//*[@id="details.appDefinition.capabilities-opt-1"]';
      const s6 = '//*[@id="details.appDefinition.capabilities-opt-2"]';
      browser.click(s);
      browser.click(s2);
      browser.click(s3);
      browser.getValue(s4).should.be.equal('on');
      browser.getValue(s5).should.be.equal('on');
      browser.getValue(s6).should.be.equal('on');
    });

    it(`Enter "${fillData.Chatbot.accessData}" in the "Will the chatbot need to access data from any systems to support the capabilities you listed above? If so, please list the systems below." text box`, () => {
      setValueAndCheck('//*[@id="details.appDefinition.integrationSystems"]', fillData.Chatbot.accessData);
    });

    it(`Enter "${fillData.Chatbot.existingAgentScripts}" in the "Do you have any example agent conversations you can provide? If so, please paste them or any links to documents below (you’ll be able to upload documents later)." text box" text box`, () => {
      setValueAndCheck('//*[@id="details.appDefinition.existingAgentScripts"]', fillData.Chatbot.existingAgentScripts);
    });

    it(`Enter "${fillData.Chatbot.transferToHumanAgents}" in the "Are you planning to transfer conversations to human agents? If so, please list the agents’ communication tools (e.g., Slack, LiveAgent, Intercom, etc.)." text box`, () => {
      setValueAndCheck('//*[@id="details.appDefinition.transferToHumanAgents"]', fillData.Chatbot.transferToHumanAgents);
    });

    it(`Enter "${fillData.Chatbot.notes}" in the "Notes" text box`, () => {
      setValueAndCheck('//*[@id="details.appDefinition.notes"]', fillData.Chatbot.notes);
    });

    it('Click on the "Continue" button', () => {
      clickContinueBtn(fillData.Chatbot.projectName);
    });

    it('Click on the "Read more" link in the specification section on left side of the page', () => {
      const s = '#wrapper-main > div > div > div:nth-child(2) > div > div > div.left-area > div > div > div > div > div.sideAreaWrapper > div.project-info > div div.project-card-body > div.project-description > div > a';
      browser.waitForVisible(s).should.be.true;
      browser.click(s);
      const s2 = '#appDefinition-projectName > div.content-boxs > div > div.editable-project-name > div > input';
      const s4 = '#description';
      const s7 = '//*[@id="details.appDefinition.notes"]';
      browser.getUrl().should.contain('/specification');
      browser.waitForVisible(s2).should.be.true;
      browser.getValue(s2).should.be.equal(fillData.Chatbot.projectName);
      browser.getValue(s4).should.be.equal(fillData.Chatbot.desc);
      browser.getValue(s7).should.be.equal(fillData.Chatbot.notes);
      const s8 = '//*[@id="details.appDefinition.integrationSystems"]';
      browser.getValue(s8).should.be.equal(fillData.Chatbot.accessData);
      const s9 = '//*[@id="details.appDefinition.existingAgentScripts"]';
      browser.getValue(s9).should.be.equal(fillData.Chatbot.existingAgentScripts);
      const s10 = '//*[@id="details.appDefinition.transferToHumanAgents"]';
      browser.getValue(s10).should.be.equal(fillData.Chatbot.transferToHumanAgents);
    });

    it('Click "Add File" button from \'Project Files\' section', clickAddFile);

    it('Click "Save Changes" button', () => {
      const s = '#wrapper-main > div > div > div:nth-child(2) > section > div > div.right-area > div:nth-child(1) > form > div > div.section-footer.section-footer-spec > button';
      browser.waitForVisible(s).should.be.true;
      if(browser.getAttribute(s, 'disabled')) {
        const s = '//*[@id="details.appDefinition.notes"]';
        browser.setValue(s, fillData.Chatbot.notes + Math.random());
      }
      saveSpecChanges(s, `Project updated.`);
      const dis = browser.getAttribute(s, 'disabled');
      assert.equal(dis, 'true');
    });

  });

  describe('Create a Wireframe project with the specification', () => {

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
      const s4 = '#wrapper-main > div > div > div:nth-child(2) > section > div > div.left-area > div > div > div > div.projectSpecSidebar > div:nth-child(3) > div > h3:nth-child(3)';
      const s5 = '#wrapper-main > div > div > div:nth-child(2) > section > div > div.left-area > div > div > div > div.projectSpecSidebar > div:nth-child(3) > div > h3:nth-child(5)';
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

  describe('Create a Visual Design project with the specification by editing the options given in project details', () => {

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
      const s4 = '#wrapper-main > div > div > div:nth-child(2) > section > div > div.left-area > div > div > div > div.projectSpecSidebar > div:nth-child(3) > div > h3:nth-child(3)';
      const s5 = '#wrapper-main > div > div > div:nth-child(2) > section > div > div.left-area > div > div > div > div.projectSpecSidebar > div:nth-child(3) > div > h3:nth-child(5)';
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

  describe('Create a Other Design project with the specification by editing the options given in project details', () => {

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

  describe('Create a Front End project with the specification by editing the options given in project details', () => {

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

  describe('Create a Back-End & API project with the specification', () => {

    browser.createProject('Software Development', {
      selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(5)',
      buttonTxt: 'View All'
    });

    it('Click on Back-End & API section', () => {
      browser.getUrl().should.contain('/new-project/all-development');
      const s = '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(2)';
      browser.click(s);
      const s2 = '#wrapper-main > div > div > div > div.FillProjectDetailsWrapper > div.FillProjectDetails > div > h1';
      browser.getUrl().should.contain('/new-project/api-development');
      browser.getText(s2).should.be.equal('Let\'s setup your Back-end & API project');
      checkCurrentDate('div.ProjectOutline > div.project-card-header > div > div.project-header-details > div.project-date');
    });

    it(`Enter "${fillData.BackEnd.projectName}" in the "Project Name" text box`, () => {
      setValueAndCheck('#appDefinition-projectName > div.content-boxs > div > div.editable-project-name > div > input', fillData.BackEnd.projectName);
    });

    it(`Enter text in the Description text box`, () => {
      setValueAndCheck('#description', fillData.BackEnd.desc);
    });

    it('Select "Tablet" from Which is your primary device target?', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(2)';
      browser.click(s);
      browser.waitForVisible(`${s} a.active`);
    });

    it('Enter text in "What is the goal..." text box', () => {
      setValueAndCheck('//*[@id="details.appDefinition.goal.value"]', fillData.BackEnd.goal);
    });

    it('Enter text in "Who are the users..." text box', () => {
      const s2 = 'div.FillProjectDetails > section > div > div.left-area > div.left-area-content > div > form > div > div.section-footer.section-footer-spec > button';
      setValueAndCheck('//*[@id="details.appDefinition.users.value"]', fillData.BackEnd.users);
      const dis = browser.getAttribute(s2, 'disabled');
      assert.equal(dis, null);
    });

    it(`Enter "${fillData.BackEnd.notes}" in the "Notes" text box`, () => {
      setValueAndCheck('//*[@id="details.appDefinition.notes"]', fillData.BackEnd.notes);
    });

    it('Click on the "Continue" button', () => {
      clickContinueBtn(fillData.BackEnd.projectName);
    });

    it('Click on the "Specification" link in the text paragraph', () => {
      const s3 = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(2)';
      clickSpecLinkInText(fillData.BackEnd.projectName, [
        ['#description', fillData.BackEnd.desc],
        ['//*[@id="details.appDefinition.goal.value"]', fillData.BackEnd.goal],
        ['//*[@id="details.appDefinition.users.value"]', fillData.BackEnd.users],
        ['//*[@id="details.appDefinition.notes"]', fillData.BackEnd.notes]
      ]);
      browser.waitForVisible(`${s3} a.active`).should.be.true;
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

    it('Click "Add/Edit Features" button in Feature requirements section', clickAddEditFeatures);

    it('Click on "Onboarding" in the \'Login & Registration\' section >> Switch on the "Enable feature" toggle', () => {
      clickFeatureCheck(
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.features.flex.column > ul > li:nth-child(1) > div > ul > li:nth-child(5) > a > div > span.feature-title',
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div',
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div > label > input[type="checkbox"]'
      );
    });

    it(`Enter the note "${fillData.BackEnd.onboardingNote}"` , () => {
      checkFeatureNote(fillData.BackEnd.onboardingNote);
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

    it(`Enter "${fillData.BackEnd.sampleNote}" in the Notes section`, () => {
      setValueAndCheck('//*[@id="details.designSpecification.notes"]', fillData.BackEnd.sampleNote);
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

  describe('Create a Development Integration project with the specification', () => {

    browser.createProject('Software Development', {
      selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(5)',
      buttonTxt: 'View All'
    });

    it('Click on Development Integration section', () => {
      browser.getUrl().should.contain('/new-project/all-development');
      const s = '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(3)';
      browser.click(s);
      const s2 = '#wrapper-main > div > div > div > div.FillProjectDetailsWrapper > div.FillProjectDetails > div > h1';
      browser.getUrl().should.contain('/new-project/generic-development');
      browser.getText(s2).should.be.equal('Let\'s setup your Development Integration project');
      checkCurrentDate('div.ProjectOutline > div.project-card-header > div > div.project-header-details > div.project-date');
    });

    it(`Enter "${fillData.Dev.projectName}" in the "Project Name" text box`, () => {
      setValueAndCheck('#appDefinition-projectName > div.content-boxs > div > div.editable-project-name > div > input', fillData.Dev.projectName);
    });

    it(`Enter text in the Description text box`, () => {
      setValueAndCheck('#description', fillData.Dev.desc);
    });

    it('Select "Phone" from Which is your primary device target?', () => {
      const s = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(1)';
      browser.click(s);
      browser.waitForVisible(`${s} a.active`);
    });

    it('Enter text in "What is the goal..." text box', () => {
      setValueAndCheck('//*[@id="details.appDefinition.goal.value"]', fillData.Dev.goal);
    });

    it('Enter text in "Who are the users..." text box', () => {
      const s2 = 'div.FillProjectDetails > section > div > div.left-area > div.left-area-content > div > form > div > div.section-footer.section-footer-spec > button';
      setValueAndCheck('//*[@id="details.appDefinition.users.value"]', fillData.Dev.users);
      const dis = browser.getAttribute(s2, 'disabled');
      assert.equal(dis, null);
    });

    it(`Enter "${fillData.Dev.notes}" in the "Notes" text box`, () => {
      setValueAndCheck('//*[@id="details.appDefinition.notes"]', fillData.Dev.notes);
    });

    it('Click on the "Continue" button', () => {
      clickContinueBtn(fillData.Dev.projectName);
    });

    it('Click on the "Specification" link in the text paragraph', () => {
      const s3 = '#appDefinition-questions > div > div > div:nth-child(1) > div.content-col > div > div > span:nth-child(1)';
      clickSpecLinkInText(fillData.Dev.projectName, [
        ['#description', fillData.Dev.desc],
        ['//*[@id="details.appDefinition.goal.value"]', fillData.Dev.goal],
        ['//*[@id="details.appDefinition.users.value"]', fillData.Dev.users],
        ['//*[@id="details.appDefinition.notes"]', fillData.Dev.notes]
      ]);
      browser.waitForVisible(`${s3} a.active`).should.be.true;
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

    it('Click "Add/Edit Features" button in Feature requirements section', clickAddEditFeatures);

    it('Click on "Onboarding" in the \'Login & Registration\' section >> Switch on the "Enable feature" toggle', () => {
      clickFeatureCheck(
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.features.flex.column > ul > li:nth-child(1) > div > ul > li:nth-child(5) > a > div > span.feature-title',
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div',
        'body > div.ReactModalPortal > div > div > div.define-features > main > div.contents.features-content.flex.column.flex-grow > div > div.feature-title-row.flex.space-between > div > label > input[type="checkbox"]'
      );
    });

    it(`Enter the note "${fillData.Dev.onboardingNote}"` , () => {
      checkFeatureNote(fillData.Dev.onboardingNote);
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

    it(`Enter "${fillData.Dev.sampleNote}" in the Notes section`, () => {
      setValueAndCheck('//*[@id="details.designSpecification.notes"]', fillData.Dev.sampleNote);
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

  describe('Create a QA project with the specification', () => {

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

  describe('Create a QA Mobility project with the specification', () => {

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

  describe('Verify continuing an app from where the user left off', () => {

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

  describe('Accessing "Help" page from sub-menu', () => {

    it('Click on User avatar from the header and click "Help" button from sub-menu', () => {
      const s = '#root > div > div.TopBarContainer > div > div > div .links-section';
      browser.waitForVisible(s).should.be.true;
      browser.click(s);
      browser.waitForVisible(`${s} .dropdown-menu-list`).should.be.true;
      browser.click(`${s} .dropdown-menu-list > ul:nth-child(1) > li:nth-child(2) > a`);
      browser.getUrl().should.contain('https://help.topcoder.com');
    });

  });

  describe('Verification of the Project status', () => {

    it(`Open the project "${fillData.App.projectName}" from the Dashboard`, () => {
      projectInfo(fillData.App);
      projectTeam({
        avatar: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.AVATAR,
        name: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.NAME,
        handle: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_USER.USER,
      }, {
        avatar: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.AVATAR,
        name: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.NAME,
        handle: TEST_SUITE_CONFIG.TC_CONN_APP.TC_CONN_APP_VALID_LOGIN_AS_MANAGER.USER,
      });
      projectMessageBox();
    });

    it('Click on "Project Status" drop down', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .project-info';
      browser.waitForVisible(`${s} .project-status .dropdown-wrap`).should.be.true;
      browser.click(`${s} .project-status .dropdown-wrap`);
      browser.waitForVisible(`${s} .status-dropdown`).should.be.true;
      browser.getText(`${s} .status-dropdown > ul > li:nth-child(1) .status-label`).should.equal('Draft');
      browser.getText(`${s} .status-dropdown > ul > li:nth-child(2) .status-label`).should.equal('In review');
      browser.getText(`${s} .status-dropdown > ul > li:nth-child(3) .status-label`).should.equal('Reviewed');
      browser.getText(`${s} .status-dropdown > ul > li:nth-child(4) .status-label`).should.equal('Active');
      browser.getText(`${s} .status-dropdown > ul > li:nth-child(5) .status-label`).should.equal('Completed');
      browser.getText(`${s} .status-dropdown > ul > li:nth-child(6) .status-label`).should.equal('Cancelled');
      browser.getText(`${s} .status-dropdown > ul > li:nth-child(7) .status-label`).should.equal('Paused');
    });

    it('Select "In Review" from the list', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .project-info';
      browser.click(`${s} .status-dropdown > ul > li:nth-child(2) .status-label`);
      browser.waitUntil(() => {
        return browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`) == 'PROJECT IS IN REVIEW';
      });
      browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`).should.be.equal('PROJECT IS IN REVIEW');
      const s1 = '.s-alert-box-inner';
      browser.waitForVisible(s1).should.be.true;
      browser.getText(`${s1} > span`).should.be.equal(`Project submitted.`);
      browser.waitUntil(() => {
        return $(s1).type === 'NoSuchElement';
      });
    });

    it('Click on "Project Status" drop down and select "Reviewed" from the list', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .project-info';
      browser.click(`${s} .project-status .dropdown-wrap`);
      browser.waitForVisible(`${s} .status-dropdown`).should.be.true;
      browser.click(`${s} .status-dropdown > ul > li:nth-child(3) .status-label`);
      browser.waitUntil(() => {
        return browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`) == 'PROJECT IS REVIEWED';
      });
      browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`).should.be.equal('PROJECT IS REVIEWED');
      const s1 = '.s-alert-box-inner';
      browser.waitForVisible(s1).should.be.true;
      browser.getText(`${s1} > span`).should.be.equal(`Project updated.`);
      browser.waitUntil(() => {
        return $(s1).type === 'NoSuchElement';
      });
    });

    it('Click on "Project Status" drop down and select "Active" from the list', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .project-info';
      browser.click(`${s} .project-status .dropdown-wrap`);
      browser.waitForVisible(`${s} .status-dropdown`).should.be.true;
      browser.click(`${s} .status-dropdown > ul > li:nth-child(4) .status-label`);
      browser.waitUntil(() => {
        return browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`) == 'PROJECT IS ACTIVE';
      });
      browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`).should.be.equal('PROJECT IS ACTIVE');

      const s1 = '.s-alert-box-inner';
      browser.waitForVisible(s1).should.be.true;
      browser.getText(`${s1} > span`).should.be.equal(`Project updated.`);
      browser.waitUntil(() => {
        return $(s1).type === 'NoSuchElement';
      });
    });

    it('Click on "Project Status" drop down and select "Paused" from the list', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .project-info';
      browser.click(`${s} .project-status .dropdown-wrap`);
      browser.waitForVisible(`${s} .status-dropdown`).should.be.true;
      browser.click(`${s} .status-dropdown > ul > li:nth-child(7) .status-label`);
      browser.waitUntil(() => {
        return browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`) == 'PROJECT IS PAUSED';
      });
      browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`).should.be.equal('PROJECT IS PAUSED');
      const s1 = '.s-alert-box-inner';
      browser.waitForVisible(s1).should.be.true;
      browser.getText(`${s1} > span`).should.be.equal(`Project updated.`);
      browser.waitUntil(() => {
        return $(s1).type === 'NoSuchElement';
      });
    });

    it('Click on "Project Status" drop down and select "Completed" from the list', () => {
      const s = '#wrapper-main .dashboard-container .left-area .sideAreaWrapper .project-info';
      const s1 = '.s-alert-box-inner';
      browser.click(`${s} .project-status .dropdown-wrap`);
      browser.waitForVisible(`${s} .status-dropdown`).should.be.true;
      browser.click(`${s} .status-dropdown > ul > li:nth-child(5) .status-label`);
      browser.getText(`${s} .modal .modal-title`).should.be.equal('You are about to close the project');
      browser.getText(`${s} .modal .modal-body .message`).should.be.equal('This action will permanently change the status of your project and cannot be undone.');
      browser.getText(`${s} .modal .modal-body .button-area > button:nth-child(1)`).should.be.equal('Cancel');
      browser.getText(`${s} .modal .modal-body .button-area > button:nth-child(2)`).should.be.equal('Close Project');
      browser.click(`${s} .modal .modal-body .button-area > button:nth-child(2)`);
      browser.waitUntil(() => {
        return browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`) == 'PROJECT IS COMPLETED';
      });
      browser.getText(`${s} .project-status .project-status-dropdown .status-header .status-label`).should.be.equal('PROJECT IS COMPLETED');
      browser.waitForVisible(s1).should.be.true;
      browser.getText(`${s1} > span`).should.be.equal(`Project updated.`);
      browser.waitUntil(() => {
        return $(s1).type === 'NoSuchElement';
      });
    });

  });

});
