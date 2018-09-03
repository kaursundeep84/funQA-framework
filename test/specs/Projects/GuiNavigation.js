/**
 * TC Connect Application
 * Test case ID: TC_ConnApp_024
 */

import {
    checkLink
}
    from "../helpers/common"

describe('#TC_ConnApp_024 - Connect Application : GUI Navigation : Projects Page: ', () => {

    describe('Ensure that all the elements are available in the header for Manager user', () => {

        before(function () {
            browser.loginToConnApp('admin');
            //#wrapper-main > div > div > section > div > div > section > div > div.container > div > div > div:nth-child(2)
            browser.waitForVisible('#wrapper-main > div > div > section > div > div > section > div > div.container > div > div > div:nth-child(2)');
            //browser.waitForVisible('#wrapper-main .content-pane section > div > div > section > div > div.container > div > div > div:nth-child(2)');
        });

        it('Assert admin login visible elements', () => {
            browser.isVisible('#root .primary-toolbar .logo-wrapper a.logo').should.be.true;
            browser.isVisible('#root .primary-toolbar .search-widget .SearchBar input').should.be.true;
            browser.isVisible('#root .primary-toolbar .search-widget .search-filter a:nth-child(2)').should.be.true;
            browser.isVisible('#root .primary-toolbar .actions a.new-project-link').should.be.true;
            browser.isVisible('#root .primary-toolbar .actions .welcome-info .sb-avatar').should.be.true;
            browser.isVisible('#root .primary-toolbar .actions .notifications-dropdown').should.be.true;
            browser.isVisibleWithinViewport('#root #wrapper-main section .right-wrapper .SwitchButton').should.be.true;
            const s = '#wrapper-main .list-nav-container .left-wrapper > div > :nth-child(2) > ul > li';
            const items = browser.getText(s);
            assert.equal(items.length, 8);
            const filters = ['All Projects', 'Active', 'Draft', 'In review', 'Reviewed', 'Completed', 'Cancelled', 'Paused'];
            for (var i = 0; i < items.length; i++) {
                items[i].should.be.equal(filters[i]);
            }
        });

        it('Grid view button & List view button is visible', () => {

            //Grid View
            const s = '#root #wrapper-main section .grid-view-ico';
            browser.isVisibleWithinViewport(s).should.be.true;
            browser.click(s);
            const gradView = '#wrapper-main .container section.gridview-content';
            browser.isVisibleWithinViewport(gradView).should.be.true;

            //Card View
            const s1 = '#root #wrapper-main section .card-view-ico';
            browser.isVisibleWithinViewport(s1).should.be.true;
            browser.click(s1);
            const cardView = '#wrapper-main .container .card-view';
            browser.isVisibleWithinViewport(cardView).should.be.true;
        });


        it('Check the options available for "Status" filtering', () => {
            const s = '#wrapper-main .list-nav-container .left-wrapper > div > :nth-child(2) > ul > li';
            const items = browser.getText(s);
            assert.equal(items.length, 8);
            const filters = ['All Projects', 'Active', 'Draft', 'In review', 'Reviewed', 'Completed', 'Cancelled', 'Paused'];
            for (var i = 0; i < items.length; i++) {
                items[i].should.be.equal(filters[i]);
            }
        });
    });

    describe('Ensure that all the elements are available for user login and footer contains all elements', () => {

        before(function () {
            browser.loginToConnApp('user');
            const s = '#root > div > div.TopBarContainer > div > div > div';
            browser.waitForVisible(s);
            browser.getUrl().should.contain('/projects');
        });

        it('Verify all elements', () => {
            checkLink('#root > div > div.Footer > div > ul > li:nth-child(1) > a', 'About', 'https://www.topcoder.com/about-topcoder/')
            checkLink('#root > div > div.Footer > div > ul > li:nth-child(2) > a', 'Contact us', 'https://www.topcoder.com/about-topcoder/contact/')
            checkLink('#root > div > div.Footer > div > ul > li:nth-child(3) > a', 'Privacy', 'https://www.topcoder.com/community/how-it-works/privacy-policy')
            checkLink('#root > div > div.Footer > div > ul > li:nth-child(4) > a', 'Terms', 'https://connect.topcoder.com/terms');
            const s = '#root > div > div.Footer > p';
            browser.getText(s).should.be.equal('© Topcoder 2018');
        });

    });


});
