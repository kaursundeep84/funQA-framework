/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_029
 */

import {
  checkRibbon,
  waitRibbonDisappear,
  getRecordWithManager
} from '../helpers/common'

describe('#TC_ConnApp_029 - Connect Application : Positive E2E Functionalities', () => {

  //Execute PositiveE2E only when FieldValidation Scenario is all passed
  if (global.testHistory['Projects_FieldValidation']) {
    describe('Filtering the projects by the Status', () => {
      // style of active filter
      const active = 'E7SY3s';

      before(function () {
        browser.loginToConnApp('admin');
        browser.waitForVisible('#wrapper-main .content-pane section > div > div > section > div > div.container > div > div > div:nth-child(2) .row');
        const s = '#wrapper-main .list-nav-container .left-wrapper > div > :nth-child(2) > ul > li:nth-child(3)';
        browser.click(s);
        browser.waitForVisible(`${s}.${active}`);
        browser.pause(3500); //** wait the data loaded.
      });

      var projectStatusList = '#wrapper-main .gridview-content .flex-data > div:nth-child(2) .item-status .EditableProjectStatus';
      //selector for all draft project
      const projectStatusListDraft = `${projectStatusList}` + ' .ProjectStatus.status-draft';
      //selector for all in-review project
      const projectStatusListInReview = `${projectStatusList}` + ' .ProjectStatus.status-in_review';
      //selector for all reviewed project
      const projectStatusListReviewed = `${projectStatusList}` + ' .ProjectStatus.status-reviewed';
      //selector for all active project
      const projectStatusListActive = `${projectStatusList}` + ' .ProjectStatus.status-active';
      //selector for all completed project
      const projectStatusListCompleted = `${projectStatusList}` + ' .ProjectStatus.status-completed';
      //selector for all cancelled project
      const projectStatusListCancelled = `${projectStatusList}` + ' .ProjectStatus.status-cancelled';
      //selector for all paused project
      const projectStatusListPaused = `${projectStatusList}` + ' .ProjectStatus.status-paused';



      it('Check Draft filter function', () => {
        const s = '#wrapper-main .list-nav-container .left-wrapper > div > :nth-child(2) > ul > li:nth-child(3)';
        browser.click(s);
        browser.waitForVisible(`${s}.${active}`);
        browser.pause(3500);
        browser.elements(projectStatusListInReview).value.should.be.empty;
        browser.elements(projectStatusListReviewed).value.should.be.empty;
        browser.elements(projectStatusListActive).value.should.be.empty;
        browser.elements(projectStatusListCompleted).value.should.be.empty;
        browser.elements(projectStatusListCancelled).value.should.be.empty;
        browser.elements(projectStatusListPaused).value.should.be.empty;
        browser.elements(projectStatusListDraft).value.should.not.be.empty;
      });

      it('Check In review filter function', () => {
        const s = '#wrapper-main .list-nav-container .left-wrapper > div > :nth-child(2) > ul > li:nth-child(4)';
        browser.click(s);
        browser.waitForVisible(`${s}.${active}`);
        browser.pause(3500);
        browser.elements(projectStatusListDraft).value.should.be.empty;
        browser.elements(projectStatusListReviewed).value.should.be.empty;
        browser.elements(projectStatusListActive).value.should.be.empty;
        browser.elements(projectStatusListCompleted).value.should.be.empty;
        browser.elements(projectStatusListCancelled).value.should.be.empty;
        browser.elements(projectStatusListPaused).value.should.be.empty;
        browser.elements(projectStatusListInReview).value.should.not.be.empty;
      });

      it('Check Reviewed filter function', () => {
        const s = '#wrapper-main .list-nav-container .left-wrapper > div > :nth-child(2) > ul > li:nth-child(5)';
        browser.click(s);
        browser.waitForVisible(`${s}.${active}`);
        browser.pause(3500);
        browser.elements(projectStatusListDraft).value.should.be.empty;
        browser.elements(projectStatusListInReview).value.should.be.empty;
        browser.elements(projectStatusListActive).value.should.be.empty;
        browser.elements(projectStatusListCompleted).value.should.be.empty;
        browser.elements(projectStatusListCancelled).value.should.be.empty;
        browser.elements(projectStatusListPaused).value.should.be.empty;
        browser.elements(projectStatusListReviewed).value.should.not.be.empty;

      });

      it('Check Completed filter function', () => {
        const s = '#wrapper-main .list-nav-container .left-wrapper > div > :nth-child(2) > ul > li:nth-child(6)';
        browser.click(s);
        browser.waitForVisible(`${s}.${active}`);
        browser.pause(3500);
        browser.elements(projectStatusListDraft).value.should.be.empty;
        browser.elements(projectStatusListInReview).value.should.be.empty;
        browser.elements(projectStatusListReviewed).value.should.be.empty;
        browser.elements(projectStatusListActive).value.should.be.empty;
        browser.elements(projectStatusListCancelled).value.should.be.empty;
        browser.elements(projectStatusListPaused).value.should.be.empty;
        browser.elements(projectStatusListCompleted).value.should.not.be.empty;
      });

      it('Check Cancelled filter function', () => {
        const s = '#wrapper-main .list-nav-container .left-wrapper > div > :nth-child(2) > ul > li:nth-child(7)';
        browser.click(s);
        browser.waitForVisible(`${s}.${active}`);
        browser.pause(3500);
        browser.elements(projectStatusListDraft).value.should.be.empty;
        browser.elements(projectStatusListInReview).value.should.be.empty;
        browser.elements(projectStatusListReviewed).value.should.be.empty;
        browser.elements(projectStatusListActive).value.should.be.empty;
        browser.elements(projectStatusListCompleted).value.should.be.empty;
        browser.elements(projectStatusListPaused).value.should.be.empty;
        browser.elements(projectStatusListCancelled).value.should.not.be.empty;
      });

      it('Check Paused filter function', () => {
        const s = '#wrapper-main .list-nav-container .left-wrapper > div > :nth-child(2) > ul > li:nth-child(8)';
        browser.click(s);
        browser.waitForVisible(`${s}.${active}`);
        browser.pause(3500);
        browser.elements(projectStatusListDraft).value.should.be.empty;
        browser.elements(projectStatusListInReview).value.should.be.empty;
        browser.elements(projectStatusListReviewed).value.should.be.empty;
        browser.elements(projectStatusListActive).value.should.be.empty;
        browser.elements(projectStatusListCompleted).value.should.be.empty;
        browser.elements(projectStatusListCancelled).value.should.be.empty;
        browser.elements(projectStatusListPaused).value.should.not.be.empty;
      });

      /* Here we will pick up a record with managers */
      var firstRecord = getRecordWithManager();



      it('Check to change project status as In review', () => {
        browser.moveToObject(firstRecord).leftClick();
        const inReviewItem = `${firstRecord}` + ' .status-dropdown > ul > li:nth-child(2) > a';
        browser.waitForVisible(inReviewItem);
        browser.moveToObject(inReviewItem).click(inReviewItem);
        browser.waitForVisible(`${firstRecord}` + ' .ProjectStatus.status-in_review');
        checkRibbon('Project updated.');
        browser.getAttribute(`${firstRecord}` + ' .ProjectStatus', 'class').should.be.equal('ProjectStatus status-in_review');
        waitRibbonDisappear();
      });

      it('Check to change project status as Reviewed.', () => {
        browser.moveToObject(firstRecord).leftClick();
        const reviewedItem = `${firstRecord}` + ' .status-dropdown > ul > li:nth-child(3) > a';
        browser.waitForVisible(reviewedItem);
        browser.click(reviewedItem);
        browser.waitForVisible(`${firstRecord}` + ' .ProjectStatus.status-reviewed');
        checkRibbon('Project updated.');
        browser.getAttribute(`${firstRecord}` + ' .ProjectStatus', 'class').should.be.equal('ProjectStatus status-reviewed');
        waitRibbonDisappear();
      });

      it('Check to change project status as Active.', () => {
        browser.moveToObject(firstRecord).leftClick();
        const activeItem = `${firstRecord}` + ' .status-dropdown > ul > li:nth-child(4) > a';
        browser.waitForVisible(activeItem);
        browser.click(activeItem);
        browser.waitForVisible(`${firstRecord}` + ' .ProjectStatus.status-active');
        checkRibbon('Project updated.');
        browser.getAttribute(`${firstRecord}` + ' .ProjectStatus', 'class').should.be.equal('ProjectStatus status-active');
        waitRibbonDisappear();
      });

      it('Check to change project status as Paused with confirmation operation.', () => {
        browser.moveToObject(firstRecord).leftClick();
        const pausedItem = `${firstRecord}` + ' .status-dropdown > ul > li:nth-child(7) > a';
        browser.waitForVisible(pausedItem);
        browser.click(pausedItem);
        browser.waitForVisible(`${firstRecord}` + ' .ProjectStatus.status-paused');
        checkRibbon('Project updated.');
        browser.getAttribute(`${firstRecord}` + ' .ProjectStatus', 'class').should.be.equal('ProjectStatus status-paused');
        waitRibbonDisappear();
      });

      it('Check to change project status as Cancelled with cancel operation.', () => {
        browser.moveToObject(firstRecord).leftClick();
        const canceledItem = `${firstRecord}` + ' .status-dropdown > ul > li:nth-child(6) > a';
        browser.waitForVisible(canceledItem);
        browser.click(canceledItem);
        browser.pause(500);
        const changeModelCancelBtn = `${firstRecord}` + ' .project-status-change-modal .btn-cancel';
        browser.click(changeModelCancelBtn);
        browser.getAttribute(`${firstRecord}` + ' .ProjectStatus', 'class').should.be.equal('ProjectStatus status-paused');
      });

      it('Check to change project status as Cancelled with confirmation operation.', () => {
        browser.moveToObject(firstRecord).leftClick();
        const canceledItem = `${firstRecord}` + ' .status-dropdown > ul > li:nth-child(6) > a';
        browser.waitForVisible(canceledItem);
        browser.click(canceledItem);
        browser.pause(500);
        const dropDownWrapper = `${firstRecord}` + ' .project-status-change-modal .cancellation-reason .dropdown-wrap';
        browser.moveToObject(`${dropDownWrapper}` + ' .SelectDropdown').leftClick();
        const dropDownItem = `${dropDownWrapper}` + ' .SelectDropdown > div:nth-child(2) > ul > li:nth-child(3) > a';
        browser.moveToObject(dropDownItem).leftClick();
        browser.pause(500);
        const changeModelConfirmBtn = `${firstRecord}` + ' .project-status-change-modal .tc-btn-warning';
        browser.click(changeModelConfirmBtn);
        browser.waitForVisible(`${firstRecord}` + ' .ProjectStatus.status-cancelled');
        checkRibbon('Project updated.')
        browser.getAttribute(`${firstRecord}` + ' .ProjectStatus', 'class').should.be.equal('ProjectStatus status-cancelled');
        waitRibbonDisappear();
      });

      it('Check to change project status as Completed with cancel operation.', () => {
        browser.moveToObject(firstRecord).leftClick();
        const completedItem = `${firstRecord}` + ' .status-dropdown > ul > li:nth-child(5) > a';
        browser.waitForVisible(completedItem);
        browser.click(completedItem);
        browser.pause(500);
        const changeModelCancelBtn = `${firstRecord}` + ' .project-status-change-modal .btn-cancel';
        browser.click(changeModelCancelBtn);
        browser.getAttribute(`${firstRecord}` + ' .ProjectStatus', 'class').should.be.equal('ProjectStatus status-cancelled');
      });

      it('Check to change project status as Completed with confirmation operation.', () => {
        browser.moveToObject(firstRecord).leftClick();
        const completedItem = `${firstRecord}` + ' .status-dropdown > ul > li:nth-child(5) > a';
        browser.waitForVisible(completedItem);
        browser.click(completedItem);
        browser.pause(500);
        const changeModelConfirmlBtn = `${firstRecord}` + ' .project-status-change-modal .tc-btn-warning';
        browser.click(changeModelConfirmlBtn);
        browser.waitForVisible(`${firstRecord}` + ' .ProjectStatus.status-completed');
        checkRibbon('Project updated.');
        browser.getAttribute(`${firstRecord}` + ' .ProjectStatus', 'class').should.be.equal('ProjectStatus status-completed');
        waitRibbonDisappear();
      });

    });


    describe('Filter projects by the Project type by using the Filter in the header', () => {

      before(function () {
        browser.loginToConnApp('admin');
        browser.waitForVisible('#wrapper-main .content-pane section > div > div > section > div > div.container > div > div > div:nth-child(2) .row');
      });

      //the second tool bar
      const secondToolbar = '#root .TopBarContainer .secondary-toolbar';
      //the filter btn
      const filterBtn = '#root .TopBarContainer .primary-toolbar .search-widget .search-filter > a:nth-child(2)';
      // the project type drop down wrapper
      const pjTypeDropdown = `${secondToolbar}` + ' .search-panel .search-select-field';
      // the clear filter btn
      const clearFilterBtn = `${secondToolbar}` + ' .tc-btn-secondary';

      // the chatbot
      const chatBotPjType = 'Chatbot';
      // the qa
      const qaPjType = 'Quality assurance';
      // the filter wrapper
      const searchWrapper = `${pjTypeDropdown}` + ' .Select-control';
      // the candidate list of the filter
      const selectMenuOuter = `${pjTypeDropdown}` + ' .Select-menu-outer';

      // the project list underneath.
      const projectList = '#wrapper-main .content-pane section > div > div > section > div > div.container > div > div > div:nth-child(2) .row .project-type-icon';


      // the initial loaded project number
      var fullProjectNum = 0;
      var projectListTypeText;


      it('Select "Chatbot" from the "Project Type" drop down and see the result', () => {
        browser.moveToObject(pjTypeDropdown).leftClick();
        browser.isVisibleWithinViewport(selectMenuOuter);

        fullProjectNum = browser.getAttribute(projectList, 'title').length;

        const listText = ['App', 'Website', 'Chatbot', 'Design', 'Software Development', 'Analytics & Data Science', 'QA'];
        const listItems = `${selectMenuOuter}` + ' .Select-option';
        for (var i = 0; i < listText.length; i++) {
          listText[i].should.be.equal(browser.getText(listItems)[i]);
        }

        browser.moveToObject(searchWrapper).leftClick();
        const chatBotOption = `${selectMenuOuter}` + ' > div > div:nth-child(3)';
        browser.moveToObject(chatBotOption).leftClick();
        browser.pause(3500);
        if (browser.elements(projectList).value.length > 0) {
          projectListTypeText = browser.getAttribute(projectList, 'title');
          if (projectListTypeText != null) {
            if (typeof projectListTypeText === 'string') {
              projectListTypeText.should.be.equal(chatBotPjType);
            }
            if (Array.isArray(projectListTypeText)) {
              for (var j = 0; j < projectListTypeText.length; j++) {
                projectListTypeText[j].should.be.equal(chatBotPjType);
              }
            }
          }
        }
      });

      it('Select "QA" from the "Project Type" drop down and see the result', () => {
        browser.moveToObject(searchWrapper).leftClick();
        const qaOption = `${selectMenuOuter}` + ' > div > div:nth-child(6)';
        browser.moveToObject(qaOption).leftClick();
        browser.pause(3500);
        if (browser.elements(projectList).value.length > 0) {
          projectListTypeText = browser.getAttribute(projectList, 'title');
          if (projectListTypeText != null) {
            var result = false;
            if (typeof projectListTypeText === 'string') {
              if (projectListTypeText === chatBotPjType) {
                result = true;
              } else if (projectListTypeText === qaPjType) {
                result = true;
              }
            }
            if (Array.isArray(projectListTypeText)) {
              for (var j = 0; j < projectListTypeText.length; j++) {
                if (projectListTypeText[j] === chatBotPjType) {
                  result = true;
                  break;
                } else if (projectListTypeText[j] === qaPjType) {
                  result = true;
                  break;
                }
              }
            }
            result.should.be.equal(true);
          }
        }
      });

      it('Click "Clear" button in the Search field and see the result', () => {
        const filterIndicator = `${filterBtn}` + ' .filter-indicator';
        browser.getText(filterIndicator).should.be.equal('1');

        const clearBtn = `${pjTypeDropdown}` + ' .Select-control .Select-clear-zone';
        browser.isVisibleWithinViewport(clearBtn);
        browser.moveToObject(clearBtn).leftClick();
        browser.pause(3500);
        browser.getAttribute(projectList, 'title').length.should.be.equal(fullProjectNum);
      });

      it('Select "Chatbot" from the "Project Type" drop down and see the result', () => {
        browser.moveToObject(pjTypeDropdown).leftClick();
        browser.isVisibleWithinViewport(selectMenuOuter);

        fullProjectNum = browser.getAttribute(projectList, 'title').length;

        const listText = ['App', 'Website', 'Chatbot', 'Design', 'Software Development', 'Analytics & Data Science', 'QA'];
        const listItems = `${selectMenuOuter}` + ' .Select-option';
        for (var i = 0; i < listText.length; i++) {
          listText[i].should.be.equal(browser.getText(listItems)[i]);
        }

        browser.moveToObject(searchWrapper).leftClick();
        const chatBotOption = `${selectMenuOuter}` + ' > div > div:nth-child(3)';
        browser.moveToObject(chatBotOption).leftClick();
        browser.pause(3500);
        if (browser.elements(projectList).value.length > 0) {
          projectListTypeText = browser.getAttribute(projectList, 'title');
          if (projectListTypeText != null) {
            if (typeof projectListTypeText === 'string') {
              projectListTypeText.should.be.equal(chatBotPjType);
            }
            if (Array.isArray(projectListTypeText)) {
              for (var j = 0; j < projectListTypeText.length; j++) {
                projectListTypeText[j].should.be.equal(chatBotPjType);
              }
            }
          }
        }
      });

      it('Click "Clear Filters" button in the Search field and see the result', () => {
        const filterIndicator = `${filterBtn}` + ' .filter-indicator';
        browser.getText(filterIndicator).should.be.equal('1');

        browser.isVisibleWithinViewport(clearFilterBtn);
        browser.moveToObject(clearFilterBtn).leftClick();
        browser.pause(3500);
        browser.getAttribute(projectList, 'title').length.should.be.equal(fullProjectNum);
      });

    });
  }

});
