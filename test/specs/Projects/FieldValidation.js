/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_024
 */

import {
  checkInputValue,
  checkTextMatch
}
from "../helpers/common"

describe('#TC_ConnApp_024 - Connect Application : Field validations of the Dashboard elements', () => {

  //Execute FieldValidation only when GuiNavigation Scenario is all passed
  if (global.testHistory['Projects_GuiNavigation']) {

    describe('Searching projects using "Search for projects" search bar', () => {

      before(function () {
        browser.loginToConnApp('admin');
      });

      const clearBtn = '#root .TopBarContainer .search-widget .SearchBar img.search-bar__clear';
      const searchInput = '#root .TopBarContainer .search-widget .SearchBar > input';
      const searchWrapper = '#root .TopBarContainer .search-widget .SearchBar';
      const searchBtnWrapper = '#root .TopBarContainer .search-widget .SearchBar .search-icon-wrap';
      const searchBtnContent = '#root .TopBarContainer .search-widget .SearchBar .search-icon-wrap .search-txt';
      const projects = '#wrapper-main .gridview-content .flex-data > div:nth-child(2) .item-projects';
      var fullProjectNum = 0;

      it('Click on "Search for Project" text box', () => {
        browser.getCssProperty(clearBtn, "display").value.should.be.equal('none');
        browser.getCssProperty(searchBtnWrapper, "background-color").value.should.be.equal('rgba(116,116,128,1)');
        browser.getCssProperty(searchBtnContent, "display").value.should.be.equal('none');
        browser.getAttribute(searchWrapper, "className").should.be.equal('SearchBar state-empty');
        browser.click(searchInput);
        browser.getCssProperty(clearBtn, "display").value.should.not.be.equal('none');
        browser.getCssProperty(searchBtnWrapper, "background-color").value.should.be.equal('rgba(6,129,255,1)');
        browser.getCssProperty(searchBtnContent, "display").value.should.not.be.equal('none');
        browser.getAttribute(searchWrapper, "className").should.be.equal('SearchBar state-focused');
      });

      it('Enter "test" as the search keyword', () => {
        checkInputValue(searchInput, 'test');
      });

      it('Click "Search" button to perform the search', () => {
        fullProjectNum = browser.elements(projects).value.length;

        //verify the result
        var projectTitleList = browser.getText(`${projects}` + ' .project-title > a');
        var projectDescriptionList = browser.getText(`${projects}` + ' .project-description > div');
        if (projectTitleList != null) {
          if (typeof projectTitleList === 'string') {
            checkTextMatch(projectTitleList, 'test').should.be.equal(true);
          } else if (Array.isArray(projectTitleList)) {
            for (var i = 0; i < projectTitleList.length; i++) {
              var result = false;
              if (checkTextMatch(projectTitleList[i], 'test')) {
                result = true;
              } else if (checkTextMatch(projectDescriptionList[i], 'test')) {
                result = true;
              }
              result.should.be.equal(true);
            }
          }
        }
      });

      it('Click "Clear" icon to clear the text', () => {
        browser.moveToObject(clearBtn).leftClick();
        browser.pause(500);
        browser.getCssProperty(clearBtn, "display").value.should.be.equal('none');
        browser.getCssProperty(searchBtnContent, "display").value.should.be.equal('none');
        browser.getCssProperty(searchBtnWrapper, "background-color").value.should.be.equal('rgba(116,116,128,1)');
        browser.getAttribute(searchWrapper, "className").should.be.equal('SearchBar state-empty');
        browser.pause(3500);
        browser.elements(projects).value.length.should.be.equal(fullProjectNum);
      });

      it('Enable the toggle "My Project" from the header', () => {
        const s = 'div.main-wrapper .list-nav-container div.right-wrapper  > div > div > div';
        browser.waitForVisible(s);
        browser.click(s);
        browser.getValue(`${s} > label > input[type="checkbox"]`).should.be.equal('on');
      });

      it('Check the Project listing', () => {
        browser.elements('#wrapper-main .content-pane .container .gridview-content .flex-data > div:nth-child(2) > div .flex-row').value.length.should.be.above(0);
      });
    });

    describe('Validate List and Grid views', () => {


      before(function () {
        browser.loginToConnApp('admin');
        browser.waitForVisible('#wrapper-main > div > div > section > div > div > section > div > div.container > div > div > div:nth-child(2)');
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
        const homepage = '#root .primary-toolbar .logo-wrapper a.logo';
        browser.click(homepage);
        const listViewBtn = '#wrapper-main .container .list-nav-container .right-wrapper > div:nth-child(2) > a';
        browser.click(listViewBtn);
        browser.waitForVisible(`${listCardView}` + ' .row');
        browser.elements(`${listCardView}` + ' .row').value.length.should.be.within(0, 50);
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

    describe('Verify "Filter projects" ', () => {

      before(function () {
        browser.loginToConnApp('admin');
        browser.waitForVisible('#wrapper-main > div > div > section > div > div > section > div > div.container > div > div > div:nth-child(2)');
      });

      //the second tool bar
      const secondToolbar = '#root .TopBarContainer .secondary-toolbar';
      //the filter btn
      const filterBtn = '#root .TopBarContainer .primary-toolbar .search-widget .search-filter > a:nth-child(2)';
      // the project type drop down wrapper
      const pjTypeDropdown = `${secondToolbar}` + ' .search-panel .search-select-field';
      // the clear filter btn
      const clearFilterBtn = `${secondToolbar}` + ' .tc-btn-secondary';

      it('Click "Filter" button from the header and check', () => {
        const homepage = '#root .primary-toolbar .logo-wrapper a.logo';
        browser.click(homepage);
        browser.click(filterBtn);
        browser.pause(3500);
        browser.getCssProperty(filterBtn, 'color').value.should.be.equal('rgba(149,149,150,1)');
        browser.isVisibleWithinViewport(secondToolbar);
        browser.isVisibleWithinViewport(pjTypeDropdown);
        browser.isVisibleWithinViewport(clearFilterBtn);
      });


    });


  }
});
