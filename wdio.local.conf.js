/**
 * Local configuration for wdio which inherits from wdio.conf.js
 */

const { config } = require('./wdio.conf.js');

// clone main config and add new properties/overrides
const localConfig = Object.assign(config, {
	reporters: ['spec', 'allure'],
	reporterOptions: {
	  allure: {
	    outputDir: 'allure-data'
	  }
	}
});

exports.config = localConfig