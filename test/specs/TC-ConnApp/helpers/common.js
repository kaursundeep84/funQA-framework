/**
 * Common helpers used in TC Connect App tests
 */

const { context } = module.parent.context;
const browser = context.browser;

// Export common helpers
module.exports = {
  hasESCButton,
  hasBACKButton,
  checkSection,
  checkSubPage,
  hooverSectionCheckBtnClick,
  checkCurrentDate,
  checkFeatureNote,
  clickFeatureCheck,
  saveSpecChanges,
  clickAddNewCheckIncomplete,
  enterRelevantNotes,
  setValueAndCheck,
  clickContinueBtn,
  clickSpecLinkInText,
  clickAddEditFeatures,
  clickAddFile,
  selectAnyColor,
  selectiOSAndroidWebBuild,
  selectScreenImportance
};

/**
 * hasESCButton
 */
function hasESCButton() {
  const s = '.escape-button';
  browser.isVisibleWithinViewport(s).should.be.true;
}

/**
 * hasBACKButton
 */
function hasBACKButton() {
  const s = '.back-button';
  browser.isVisibleWithinViewport(s).should.be.true;
}

/**
 * checkSection
 * @param  {Object} options Section options
 *
 */
function checkSection(options) {
  browser.isVisibleWithinViewport(`${options.selector} .icon-wrapper`).should.be.true;
  browser.getText(`${options.selector} .header`).should.be.equal(options.title);
  browser.getText(`${options.selector} .details, ${options.selector} .sub-type-details`).should.be.equal(options.desc);
}

/**
 * checkSubPage
 * @param  {String} title    Title text
 * @param  {String} subtitle The subtitle text
 */
function checkSubPage(title, subtitle) {
  const s6 = '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > h1';
  const s7 = '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > h2';
  const s8 = '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards';
  browser.getText(s6).should.be.equal(title);
  browser.getText(s7).should.be.equal(subtitle);
  hasESCButton();
  hasBACKButton();
  browser.isVisibleWithinViewport(s8).should.be.true;
}

/**
 * checkFeatureNote
 * @param  {String} noteTxt The text to set/check
 */
function checkFeatureNote(noteTxt) {
  const s = '#notes';
  browser.setValue(s, noteTxt);
  browser.getValue(s).should.be.equal(noteTxt);
}

/**
 * hooverSectionCheckBtnClick
 * @param  {String} section Section selector
 * @param  {String} buttonTxt  Button text
 */
function hooverSectionCheckBtnClick(section, buttonTxt) {
  browser.moveToObject(section);
  browser.isVisibleWithinViewport(`${section} > button`).should.be.true;
  browser.getText(`${section} > button`).should.be.equal(buttonTxt);
  browser.click(section);
}

/**
 * checkCurrentDate
 * @param  {String} selector The element selector to check
 */
function checkCurrentDate(selector) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  let nowInFormat = new Date();
  nowInFormat = `${months[nowInFormat.getMonth()].toUpperCase()} ${nowInFormat.getDate()}, ${nowInFormat.getFullYear()}`;
  browser.getText(selector).should.be.equal(nowInFormat);
}

/**
 * clickFeatureCheck
 * @param  {String} s  Selector menu
 * @param  {String} s2 Selector toggle
 * @param  {String} s3 Selector input
 */
function clickFeatureCheck(s, s2, s3) {
  const s4 = '#notes';
  browser.click(s);
  browser.click(s2);
  browser.getValue(s3).should.be.equal('on');
  browser.waitForVisible(s4).should.be.true;
}

/**
 * saveSpecChanges
 * @param  {String} selector Selector of save button
 * @param  {String} alertTxt Save alert text
 */
function saveSpecChanges(selector, alertTxt) {
  const s2 = '.s-alert-box-inner';
  browser.waitForEnabled(selector);
  browser.click(selector);
  browser.waitForVisible(s2).should.be.true;
  browser.getText(`${s2} > span`).should.be.equal(alertTxt);
  browser.waitUntil(() => {
    return $(s2).type === 'NoSuchElement';
  });
}

/**
 * clickAddNewCheckIncomplete
 */
function clickAddNewCheckIncomplete() {
  const s2 = '#root > div > div.TopBarContainer > div > div > div > div > div.actions > div.welcome-info > div > div > div > div > div > div > div.dropdown-menu-header > img';
  const s3 = '.new-project-link';
  const s4 = '#wrapper-main > div > div > div > div.IncompleteProjectConfirmation > div.actions > button.tc-btn.tc-btn-primary.tc-btn-md';
  const s5 = '#wrapper-main > div > div > div > div.IncompleteProjectConfirmation > div.actions > button.tc-btn.tc-btn-default.tc-btn-md';
  browser.waitForVisible(s2);
  browser.click(s3);
  browser.getUrl().should.contain('/new-project/incomplete');
  browser.getText(s4).should.be.equal('Continue where I left off');
  browser.getText(s5).should.be.equal('Create a new project');
}

/**
 * enterRelevantNotes
 * @param  {Object} testData The data to enter
 */
function enterRelevantNotes(testData) {
  const s = '//*[@id="details.testingNeeds.description"]';
  const s2 = '//*[@id="details.testingNeeds.inScope"]';
  const s3 = '//*[@id="details.testingNeeds.outOfScope"]';
  const s4 = '//*[@id="details.testingNeeds.duration"]';
  browser.setValue(s, testData.testingNeeds1);
  browser.getValue(s).should.be.equal(testData.testingNeeds1);
  browser.setValue(s2, testData.testingNeeds2);
  browser.getValue(s2).should.be.equal(testData.testingNeeds2);
  browser.setValue(s3, testData.testingNeeds3);
  browser.getValue(s3).should.be.equal(testData.testingNeeds3);
  browser.setValue(s4, testData.testingNeeds3);
  browser.getValue(s4).should.be.equal(testData.testingNeeds3);
}

/**
 * setValueAndCheck
 * @param  {String} selector Selector of element
 * @param  {String} value Value to set
 */
function setValueAndCheck(selector, value) {
  browser.setValue(selector, value);
  browser.getValue(selector).should.be.equal(value);
}

/**
 * clickContinueBtn
 * @param  {String} projectName The project name to check
 */
function clickContinueBtn(projectName) {
  const s = 'div.FillProjectDetails > section > div > div.left-area > div.left-area-content > div > form > div > div.section-footer.section-footer-spec > button';
  const s2 = '.s-alert-box-inner';
  const s3 = '#root > div > div.TopBarContainer > div > div > div > div > div.bar-column.project-name > span';
  browser.click(s);
  browser.waitForVisible(s2).should.be.true;
  browser.getText(`${s2} > span`).should.be.equal(`Project '${projectName}' created`);
  browser.waitForVisible(s3).should.be.true;
  browser.getText(s3).should.be.equal(projectName.replace('&', '&amp;'));
}

/**
 * clickSpecLinkInText
 * @param {String} projectName The project name to check
 * @param {Array} checkValues Array of elements to check for values
 */
function clickSpecLinkInText(projectName, checkValues) {
  const s = 'div.right-area > div > div > div.feed-action-card > div > div.panel-body > div.object.topicBody > div.card-body.draftjs-post > p > a:nth-child(1)';
  const s2 = '#appDefinition-projectName > div.content-boxs > div > div.editable-project-name > div > input';
  browser.waitForVisible(s).should.be.true;
  browser.click(s);
  browser.getUrl().should.contain('/specification');
  browser.waitForVisible(s2).should.be.true;
  browser.getValue(s2).should.be.equal(projectName.replace('&', '&amp;'));
  checkValues.forEach(v => {
    browser.getValue(v[0]).should.be.equal(v[1]);
  });
}

/**
 * clickAddEditFeatures
 */
function clickAddEditFeatures() {
  const s = '.add-edit-features__header > button';
  const s2 = 'div.define-features > h2';
  browser.click(s);
  browser.waitForVisible(s2).should.be.true;
}

/**
 * clickAddFile
 */
function clickAddFile() {
  const s = '#appDefinition-files > div.content-boxs > div > div.add-file > div > div.filepicker-drag-drop-pane > button';
  const s2 = '#filepicker_dialog_container';
  const s3 = '#filepicker_shade > div.fp__close > a';
  browser.click(s);
  browser.waitForVisible(s2).should.be.true;
  browser.click(s3);
}

/**
 * selectAnyColor
 */
function selectAnyColor() {
  const s = '#designSpecification-questions > div.content-boxs > div > div:nth-child(2) > div.content-col > div > div > a';
  const s2 = '#designSpecification-questions > div.content-boxs > div > div:nth-child(2) > div.content-col > div > div > a > div > div.sketch-picker > div:nth-child(4) > div:nth-child(1) > span > div';
  const s3 = '#designSpecification-questions > div.content-boxs > div > div:nth-child(2) > div.content-col > div > div > a > div > div.buttons > button.tc-btn.tc-btn-primary.tc-btn-md';
  const s4 = '#designSpecification-questions > div.content-boxs > div > div:nth-child(2) > div.content-col > div > div > a:nth-child(1)';
  browser.click(s);
  browser.waitForVisible(s2).should.be.true;
  browser.click(s2);
  browser.click(s3);
  browser.waitForVisible(s4).should.be.true;
}

/**
 * selectiOSAndroidWebBuild
 */
function selectiOSAndroidWebBuild() {
  const s = '#devSpecification-questions > div.content-boxs > div > div:nth-child(1) > div.content-col > div > div > div > div:nth-child(1)';
  const s2 = '#devSpecification-questions > div.content-boxs > div > div:nth-child(1) > div.content-col > div > div > div > div:nth-child(2)';
  const s3 = '#devSpecification-questions > div.content-boxs > div > div:nth-child(1) > div.content-col > div > div > div > div:nth-child(3)';
  const s4 = '//*[@id="details.devSpecification.platform-opt-0"]';
  const s5 = '//*[@id="details.devSpecification.platform-opt-1"]';
  const s6 = '//*[@id="details.devSpecification.platform-opt-2"]';
  browser.click(s);
  browser.click(s2);
  browser.click(s3);
  browser.getValue(s4).should.be.equal('on');
  browser.getValue(s5).should.be.equal('on');
  browser.getValue(s6).should.be.equal('on');
}

/**
 * selectScreenImportance
 * @param  {String} selector Selector of element
 * @param  {String} value Value to set
 */
function selectScreenImportance(selector, value) {
  const s2 = `${selector} > div.Dropdown.pointer-hide > ul > li:nth-child(${value}) > a`;
  const s3 = `${selector} > div.dropdown-menu-header > span`;
  browser.click(selector);
  browser.click(s2);
  browser.getText(s3).should.be.equal(`${value}`);
}
