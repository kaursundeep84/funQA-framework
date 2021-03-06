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
    const loadMoreBtnInGridView = `${gridViewWrapper}` + ' > div > button';
    //load more lable in gridview
    const loadMoreLabelInGridView = `${gridViewWrapper}` + ' > div > .cardview-no-more';
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
      // there is additional div added in between 'create new project' card and exiting projects
      var num = browser.elements(`${gridViewWrapper}` + ' .project-card').value.length + 1;
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
    it('Click "Filter" button from the header and check', () => {
      browser.click(filterBtn);
      browser.pause(3500);
      browser.getCssProperty(filterBtn, 'color').value.should.be.equal('rgba(163,163,173,1)');
      browser.isVisibleWithinViewport(secondToolbar);
      browser.isVisibleWithinViewport(pjTypeDropdown);
      browser.isVisibleWithinViewport(clearFilterBtn);
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

    it('Click "Clear Filters" button in the Search field and see the result', () => {
      const filterIndicator = `${filterBtn}` + ' .filter-indicator';
      browser.getText(filterIndicator).should.be.equal('1');

      const clearBtn = `${pjTypeDropdown}` + ' .Select-control .Select-clear-zone';
      browser.isVisibleWithinViewport(clearBtn);
      browser.moveToObject(clearBtn).leftClick();
      browser.pause(3500);
      browser.getAttribute(projectList, 'title').length.should.be.equal(fullProjectNum);
    });

  });
});
