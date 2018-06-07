/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_029
 */

describe('#TC_ConnApp_029 - Connect Application : E2E Dashboard Functionalities', () => {

  describe('Filtering the projects by the Status', () => {
    // style of active filter
    const active = 'E7SY3s';

    before(function () {
      browser.loginToConnApp('admin');

      browser.waitForVisible('#wrapper-main .content-pane section > div > div > section > div > div.container > div > div > div:nth-child(2) .row');
      const s = '#wrapper-main .list-nav-container .left-wrapper > div > :nth-child(2) > ul > li:nth-child(3)';
      browser.click(s);
      browser.waitForVisible(`${s}.${active}`);
      browser.pause(10000);//** wait the data loaded.
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

    it('Check the options available for "Status" filtering', () => {
      const s = '#wrapper-main .list-nav-container .left-wrapper > div > :nth-child(2) > ul > li';
      const items = browser.getText(s);
      assert.equal(items.length, 8);
      const filters = ['All Projects', 'Active', 'Draft', 'In review', 'Reviewed', 'Completed', 'Cancelled', 'Paused'];
      for (var i = 0; i < items.length; i++) {
        items[i].should.be.equal(filters[i]);
      }
    });

    it('Check Draft filter function', () => {
      const s = '#wrapper-main .list-nav-container .left-wrapper > div > :nth-child(2) > ul > li:nth-child(3)';
      browser.click(s);
      browser.waitForVisible(`${s}.${active}`);
      browser.pause(10000);
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
      browser.pause(10000);
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
      browser.pause(10000);
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
      browser.pause(10000);
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
      browser.pause(10000);
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
      browser.pause(10000);
      browser.elements(projectStatusListDraft).value.should.be.empty;
      browser.elements(projectStatusListInReview).value.should.be.empty;
      browser.elements(projectStatusListReviewed).value.should.be.empty;
      browser.elements(projectStatusListActive).value.should.be.empty;
      browser.elements(projectStatusListCompleted).value.should.be.empty;
      browser.elements(projectStatusListCancelled).value.should.be.empty;
      browser.elements(projectStatusListPaused).value.should.not.be.empty;
    });
  });


});
