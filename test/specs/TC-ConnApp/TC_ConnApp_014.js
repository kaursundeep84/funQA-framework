/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_014
 */
import {
  checkCurrentDate,
  saveSpecChanges,
  clickContinueBtn,
  clickAddFile,
  setValueAndCheck
} from './helpers/common';
const fillData = require('./helpers/fillData.json');

describe('#TC_ConnApp_014 - Connect Application : E2E Create Chatbot Project', () => {

  describe('Create a Chatbot project with the specification', () => {

    before(function() {
      browser.loginToConnApp();
    });

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

});
