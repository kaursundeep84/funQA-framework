/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_032
 */
describe('#TC_ConnApp_032 - Connect Application : E2E Dashboard Functionalities', () => {

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
      browser.pause(5000);
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
      browser.pause(5000);
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
      browser.pause(5000);
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
      browser.pause(5000);
      browser.getAttribute(projectList, 'title').length.should.be.equal(fullProjectNum);
    });

    it('Select "QA" from the "Project Type" drop down and see the result', () => {
      browser.moveToObject(searchWrapper).leftClick();
      const qaOption = `${selectMenuOuter}` + ' > div > div:nth-child(7)';
      browser.moveToObject(qaOption).leftClick();
      browser.pause(5000);
      if (browser.elements(projectList).value.length > 0) {
        projectListTypeText = browser.getAttribute(projectList, 'title');
        if (projectListTypeText != null) {
          var result = false;
          if (typeof projectListTypeText === 'string') {
            result = true;
          }
          if (Array.isArray(projectListTypeText)) {
            for (var j = 0; j < projectListTypeText.length; j++) {
              if (projectListTypeText[j] === qaPjType) {
                result = true;
                break;
              }
            }
            result.should.be.equal(true);
          }
        }
      }
    });

    it('Click "Clear Filters" button in the Search field and see the result', () => {
      const filterIndicator = `${filterBtn}` + ' .filter-indicator';
      browser.getText(filterIndicator).should.be.equal('1');

      const clearBtn = `${pjTypeDropdown}` + ' .Select-control .Select-clear-zone';
      browser.isVisibleWithinViewport(clearBtn);
      browser.moveToObject(clearBtn).leftClick();
      browser.pause(5000);
      browser.getAttribute(projectList, 'title').length.should.be.equal(fullProjectNum);
    });

  });
});
