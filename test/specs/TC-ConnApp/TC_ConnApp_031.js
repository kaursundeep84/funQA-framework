/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_031
 */
describe('#TC_ConnApp_031 - Connect Application : E2E Dashboard Functionalities', () => {

  describe('Check the functionality of the List and Grid views', () => {

    before(function () {
      browser.loginToConnApp('admin');
      browser.waitForVisible('#wrapper-main .content-pane section > div > div > section > div > div.container > div > div > div:nth-child(2) .row');
    });

    //list view wrapper
    const listViewWrapper = "#wrapper-main .container .gridview-content";
    //grid view wrapper
    const gridViewWrapper = "#wrapper-main .container .card-view";
    //card view
    const gridCardView = `${gridViewWrapper}` + ' .project-card .ProjectCard.enabled';
    //create project card
    const createProjInCardView = `${gridViewWrapper}` + ' .project-card .ProjectCard.NewProjectCard';
    //load more btn in gridview
    const loadMoreBtnInGridView = `${gridViewWrapper}` + ' > button';
    //load more lable in gridview
    const loadMoreLabelInGridView = `${gridViewWrapper}` + ' .cardview-no-more';
    //list row view
    const listCardView = `${listViewWrapper}` + ' .container .flex-area .flex-data > div:nth-child(2)';

    //load more btn in list view
    const loadMoreBtnInListView = `${listViewWrapper}` + ' .gridview-load-more';
    //load more label in list view
    const loadMoreLabelInListView = `${listViewWrapper}` + ' .gridview-no-more';


    it('Check the default view when user first login to the topcoder connect app', () => {
      browser.isVisibleWithinViewport(listViewWrapper);
      browser.elements(gridViewWrapper).value.should.be.empty;
    });

    it('Check the view when click on Grid View button', () => {
      const gridViewBtn = '#wrapper-main .container .list-nav-container .right-wrapper > div:nth-child(3) > a';
      browser.leftClick(gridViewBtn);
      browser.waitForVisible(createProjInCardView);
      browser.elements(gridCardView).value.length.should.be.within(0, 20);
      var result = false;
      result = browser.isVisible(loadMoreLabelInGridView) || browser.isVisible(loadMoreBtnInGridView);
      result.should.be.true;
      browser.elements(createProjInCardView).value.length.should.be.equal(1);
      browser.moveToObject(createProjInCardView);
      var num = browser.elements(`${gridViewWrapper}` + ' .project-card').value.length;
      $(`${gridViewWrapper}` + ' > div > div:nth-child(' + `${num}` + ') > a').getAttribute('class').should.be.equal('ProjectCard NewProjectCard');
    });

    it('Check the elements of the Project card under Grid View', () => {
      var projects = browser.elements(gridCardView).value.length;
      for (var i = 1; i <= projects; i++) {
        const projectIcon = `${gridViewWrapper}` + ' > div > div:nth-child(' + `${i}` + ')' + ' .project-type-icon';
        const projectName = `${gridViewWrapper}` + ' > div > div:nth-child(' + `${i}` + ')' + ' .project-header-details';
        const projectCreatedDate = `${gridViewWrapper}` + ' > div > div:nth-child(' + `${i}` + ')' + ' .project-date';
        const projectDescription = `${gridViewWrapper}` + ' > div > div:nth-child(' + `${i}` + ')' + ' .project-description';
        const currentProjectStatus = `${gridViewWrapper}` + ' > div > div:nth-child(' + `${i}` + ')' + ' .project-status';
        const projectTeamAvatars = `${gridViewWrapper}` + ' > div > div:nth-child(' + `${i}` + ')' + ' .card-footer';

        browser.isVisible(projectIcon).should.be.true;
        browser.isVisible(projectName).should.be.true;
        browser.isVisible(projectCreatedDate).should.be.true;
        browser.isVisible(projectDescription).should.be.true;
        browser.isVisible(currentProjectStatus).should.be.true;
        browser.isVisible(projectTeamAvatars).should.be.true;
      }
    });

    it('Check the view when click on List View button', () => {
      const homepage= '#root .primary-toolbar .logo-wrapper a.logo';
      browser.click(homepage);
      browser.waitForVisible('#wrapper-main .content-pane section > div > div > section > div > div.container > div > div > div:nth-child(2) .row');
      const listViewBtn = '#wrapper-main .container .list-nav-container .right-wrapper > div:nth-child(2) > a';
      browser.click(listViewBtn);
      browser.waitForVisible(`${listCardView}` + ' .row');
      browser.elements(`${listCardView}` + ' .row').value.length.should.be.within(0, 20);
      var result = false;
      result = browser.isVisible(loadMoreBtnInListView) || browser.isVisible(loadMoreLabelInListView);
      result.should.be.true;
    });

    it('Check the elements of the Project card under List View', () => {
      //check header
      var expectedValue = [' item-id', ' item-icon', ' item-projects', ' item-status-date', ' item-customer', ' item-manager', ' item-status'];
      for (var j = 0; j < expectedValue.length; j++) {
        var header = `${listViewWrapper}` + ' .container .flex-data > div:nth-child(1) > div > div:nth-child(' + `${j + 2}` + ')';
        browser.element(header).getAttribute('class').should.be.equal('flex-item-title' + expectedValue[j]);
      }
      //checker rows
      var projects = browser.elements(`${listCardView}` + ' .row').value.length;
      for (var i = 1; i <= projects; i++) {
        const projectId = `${listCardView}` + ' > div:nth-child(' + `${i}` + ') > div > div.flex-item-title.item-id';
        const projectIcon = `${listCardView}` + ' > div:nth-child(' + `${i}` + ') > div > div.item-icon';
        const projectName = `${listCardView}` + ' > div:nth-child(' + `${i}` + ') > div > div.item-projects';
        const projectCreatedDate = `${listCardView}` + ' > div:nth-child(' + `${i}` + ') > div > div.item-status-date';
        const projectDescription = `${listCardView}` + ' > div:nth-child(' + `${i}` + ') > div > div.item-customer';
        const currentProjectStatus = `${listCardView}` + ' > div:nth-child(' + `${i}` + ') > div > div.item-manager';
        const projectTeamAvatars = `${listCardView}` + ' > div:nth-child(' + `${i}` + ') > div > div.item-status';

        browser.elements(projectId).value.should.not.be.empty;
        browser.elements(projectIcon).value.should.not.be.empty;
        browser.elements(projectName).value.should.not.be.empty;
        browser.elements(projectCreatedDate).value.should.not.be.empty;
        browser.elements(projectDescription).value.should.not.be.empty;
        browser.elements(currentProjectStatus).value.should.not.be.empty;
        browser.elements(projectTeamAvatars).value.should.not.be.empty;
      }
    });
  });
});
