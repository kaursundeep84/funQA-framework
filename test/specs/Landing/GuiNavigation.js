/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_001
 */

describe('#TC_ConnApp_001 - Connect Application : Landing page : Gui Navigation', () => {

  before(function () {
    browser.url(TEST_SUITE_CONFIG.TC_CONN_APP.URL);
  });

  it('Connect application landing page should be displayed', () => {

    browser.getUrl().should.contain(TEST_SUITE_CONFIG.TC_CONN_APP.URL);
  });

  it('Logo should be displayed on upper left corner', () => {

    browser.isVisible('.logo > svg.icon-connect-logo-mono > g').should.be.true;
    const location = browser.getLocation('.logo > svg.icon-connect-logo-mono');
    location.x.should.be.below(50);
    location.y.should.be.below(50);
  });

  it('The intro text should be visible in the main content of the page', () => {

    browser.isVisibleWithinViewport('.main-wrapper > div > div > div.image-container > img').should.be.true;
    browser.getText('.container .content-container > h1').should.be.equal('Topcoder Connect: the easiest way to go from idea to app');
  });

  it('The copyright text should be visible in the bottom left corner of the page', () => {

    browser.isVisible('.Footer .copyright-notice').should.be.true;
    browser.getText('.Footer .copyright-notice').should.be.equal('© Topcoder 2018');
    const location = browser.getLocation('.Footer .copyright-notice');
    location.x.should.be.below(50);
    location.y.should.be.above(50);
  });


  it('The About, Contact us, Privacy & Terms links should be visible on the bottom right corner of the page', () => {

    browser.isVisible('.Footer .footer-menu').should.be.true;
    browser.getText('.Footer .footer-menu > ul > li:nth-child(1) > a').should.be.equal('About');
    browser.getText('.Footer .footer-menu > ul > li:nth-child(2) > a').should.be.equal('Contact us');
    browser.getText('.Footer .footer-menu > ul > li:nth-child(3) > a').should.be.equal('Privacy');
    browser.getText('.Footer .footer-menu > ul > li:nth-child(4) > a').should.be.equal('Terms');

  });

  it('Start a project link should be visible', () => {

    browser.isVisible('.container .content-container .button-bar > a.tc-btn').should.be.true;
    browser.getText('.container .content-container .button-bar > a.tc-btn').should.be.equal('Start a project');
    browser.getAttribute('.container .content-container .button-bar > a.tc-btn', 'href').should.be.equal(`${TEST_SUITE_CONFIG.TC_CONN_APP.URL}/new-project`);

  });

  it('Learn more button should be visible', () => {

    browser.isVisible('.container .content-container .button-bar > a.tc-link').should.be.true;
    browser.getText('.container .content-container .button-bar > a.tc-link').should.be.equal('Learn more about Connect');
    browser.getAttribute('.container .content-container .button-bar > a.tc-link', 'href').should.be.equal('https://www.topcoder-dev.com/about-topcoder/connect/');
  });

  it('Login button should be visible on the upper right corner and the link should take you to the login page', () => {

    browser.isVisible('.primary-toolbar .login-wrapper > a').should.be.true;
    const location = browser.getLocation('.primary-toolbar .actions .login-wrapper > a');
    browser.getText('.primary-toolbar .login-wrapper > a').should.be.equal('Log in');
    location.x.should.be.above(50);
    location.y.should.be.below(50);

    //Test Login link and subsequent login page.
    browser.click('#root > div > div.TopBarContainer > div > div > div > div > div.actions > div > a');
    browser.getUrl().should.contain('/connect');
    browser.getText('div.connect-accounts-content > h2').should.be.equal('Log in to Topcoder');
  });


});
