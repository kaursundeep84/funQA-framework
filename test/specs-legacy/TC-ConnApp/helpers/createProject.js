/**
 * Create project factory
 */

const { context } = module.parent.context;
const browser = context.browser;

// Export as module and command
module.exports = createProject;
browser.addCommand("createProject", createProject);

/**
 * createProject
 * @param  {String} [projectType] Project type to create
 * @param  {Object} [data]        Specific data to use
 */
function createProject(projectType, data) {

  it('Click "New Project" (+) button in the header', () => {
    const s = '.new-project-link';
    browser.click(s);
    browser.getUrl().should.contain('/new-project');
  });

  if (projectType) {
    it(`Hover on the "${projectType}" section`, () => {
      browser.moveToObject(data.selector);
      browser.isVisibleWithinViewport(`${data.selector} > button`).should.be.true;
      browser.getText(`${data.selector} > button`).should.be.equal(data.buttonTxt);
      browser.click(data.selector);
    });
  }

}
