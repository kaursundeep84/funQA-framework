/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_011
 */
import { checkSection, hooverSectionCheckBtnClick, checkSubPage } from './helpers/common';

describe('#TC_ConnApp_011 - Connect Application : GUI Verification of the "Create a new project" page elements', () => {

  describe('Verification of the "Create a new project" page elements', () => {

    before(function() {
      browser.loginToConnApp();
    });

    browser.createProject();

    it('Check the topcoder connect Logo', () => {
      const s = '.icon-connect-logo-mono';
      const location = browser.getLocation(s);
      browser.isVisibleWithinViewport(s).should.be.true;
      location.x.should.be.below(50);
      location.y.should.be.below(50);
    });

    it('Check the "ESC" button', () => {
      const s = '.escape-button';
      const s2 = '#root > div > div.TopBarContainer > div > div > div > div > div.actions > div.welcome-info > div > div > div > div > div > div > div.dropdown-menu-header > img';
      const s3 = '.new-project-link';
      browser.click(s);
      browser.getUrl().should.contain('/projects');
      browser.waitForVisible(s2);
      browser.click(s3);
      browser.getUrl().should.contain('/new-project');
    });

    it('Check the "App" section', () => {
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(1)',
        title: 'App',
        desc: 'Build a phone, tablet, wearable, or desktop app'
      });
    });

    it('Check the "Website" section', () => {
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(2)',
        title: 'Website',
        desc: 'Design and build the high-impact pages for your blog, online store, or company'
      });
    });

    it('Check the "Chatbot" section', () => {
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(3)',
        title: 'Chatbot',
        desc: 'Build, train and test a custom conversation for your chatbot'
      });
    });

    it('Check the "Design" section and subsections', () => {
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(4)',
        title: 'Design',
        desc: 'Pick the right design project for your needs - wireframes, visual, or other'
      });
      hooverSectionCheckBtnClick(
        '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(4)',
        'View All'
      );
      checkSubPage('Design projects', 'What kind of design do you need?');
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(1)',
        title: 'Wireframes',
        desc: 'Plan and explore the navigation and structure of your app'
      });
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(2)',
        title: 'Visual Design',
        desc: 'Create development-ready designs'
      });
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(3)',
        title: 'Other Design',
        desc: 'Get help with other types of design'
      });
      browser.click('.back-button');
    });

    it('Check the "Software Development" section and subsections', () => {
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(5)',
        title: 'Software Development',
        desc: 'Get help with any part of your development lifecycle'
      });
      hooverSectionCheckBtnClick(
        '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(5)',
        'View All'
      );
      checkSubPage('Software Development projects', 'What kind of development do you need?');
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(1)',
        title: 'Front-end',
        desc: 'Translate your designs into Web or Mobile front-end'
      });
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(2)',
        title: 'Back-end & API',
        desc: 'Build the server, DB, and API for your app'
      });
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(3)',
        title: 'Development Integration',
        desc: 'Get help with any part of your app or software'
      });
      browser.click('.back-button');
    });

    it('Check the "QA" section and subsections', () => {
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(6)',
        title: 'QA',
        desc: 'Test and fix bugs in your software'
      });
      hooverSectionCheckBtnClick(
        '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.cards > div:nth-child(6)',
        'View All'
      );
      checkSubPage('QA projects', 'What kind of quality assurance (QA) do you need?');
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(1)',
        title: 'Real World Testing',
        desc: 'Exploratory Testing, Cross browser-device Testing'
      });
      checkSection({
        selector: '#wrapper-main > div > div > div > div:nth-child(3) > div.SelectProduct > div.cards > div:nth-child(2)',
        title: 'Mobility Testing',
        desc: 'App Certification, Lab on Hire, User Sentiment Analysis'
      });
      browser.click('.back-button');
    });

    it('Click on the hyperlink on "Looking for something else? Get in touch with us."', () => {
      const s = '#wrapper-main > div > div > div > div:nth-child(2) > div.SelectProjectType > div.footer > a';
      browser.click(s);
      browser.getUrl().should.contain('http://crowdsourcing.topcoder.com/piqued_by_crowdsourcing');
    });

  });

});
