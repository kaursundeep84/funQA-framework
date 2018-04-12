/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_030
 */
import {
  checkRibbon,
  waitRibbonDisappear,
  getRecordWithManager
} from './helpers/common'

describe('#TC_ConnApp_030 - Connect Application : E2E Dashboard Functionalities', () => {

  describe('Project "Status" changing via Action column in the table', () => {

    before(function () {
      browser.loginToConnApp('admin');
      browser.waitForVisible('#wrapper-main .content-pane section > div > div > section > div > div.container > div > div > div:nth-child(2) .row');
      const s = '#wrapper-main .list-nav-container .left-wrapper > li:nth-child(3) > a';
      browser.click(s);
      browser.waitForVisible(`${s}.active`);
      browser.pause(10000);//* wait for data loaded and rendered

    });

    /* Here we will pick up a record with managers */
    var firstRecord = getRecordWithManager();

    //base
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


    it('Check the options available for "Status" filtering', () => {
      const s = '#wrapper-main .list-nav-container .left-wrapper > li a';
      const items = browser.getText(s);
      assert.equal(items.length, 8);
      const filters = ['All projects', 'Active', 'Draft', 'In review', 'Reviewed', 'Completed', 'Cancelled', 'Paused'];
      for (var i = 0; i < items.length; i++) {
        items[i].should.be.equal(filters[i]);
      }
    });

    it('Check Draft filter function', () => {
      const s = '#wrapper-main .list-nav-container .left-wrapper > li:nth-child(3) > a';
      browser.click(s);
      browser.waitForVisible(`${s}.active`);
      browser.pause(10000);
      browser.elements(projectStatusListInReview).value.should.be.empty;
      browser.elements(projectStatusListReviewed).value.should.be.empty;
      browser.elements(projectStatusListActive).value.should.be.empty;
      browser.elements(projectStatusListCompleted).value.should.be.empty;
      browser.elements(projectStatusListCancelled).value.should.be.empty;
      browser.elements(projectStatusListPaused).value.should.be.empty;
      browser.elements(projectStatusListDraft).value.should.not.be.empty;
    });

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

    it('Check to change project status as Paused with confirmation operation.', () => {
      browser.moveToObject(firstRecord).leftClick();
      const canceledItem = `${firstRecord}` + ' .status-dropdown > ul > li:nth-child(7) > a';
      browser.waitForVisible(canceledItem);
      browser.click(canceledItem);
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
});
