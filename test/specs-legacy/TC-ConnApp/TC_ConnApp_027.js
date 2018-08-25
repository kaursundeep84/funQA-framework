/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_027
 */

import {
  checkInputValue,
  checkTextMatch
} from './helpers/common'

describe('#TC_ConnApp_027 - Connect Application : E2E Dashboard Functionalities', () => {

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
        if ( typeof projectTitleList === 'string') {
          checkTextMatch(projectTitleList, 'test').should.be.equal(true);
        }
        else if (Array.isArray(projectTitleList)) {
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

});
