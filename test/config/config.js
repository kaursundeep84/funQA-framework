/**
 * This is the suite configuration
 * it is available to all test cases
 */

/**
 * TC E2E Test Suite configuration
 * Try load from environment variables
 * when not fallback to default values
 * @type {Object}
 */
const TEST_SUITE_CONFIG = {
  SEND_RESULTS_TO: ['gair_2015@hotmail.com'],
  EMAIL_SERVICE: {
    SENDER: process.env.EMAIL_SERVICE_SENDER || '',
    USER: process.env.EMAIL_SERVICE_USER || '',
    PASS: process.env.EMAIL_SERVICE_PASS || ''
  },
  DROPBOX_ACCESS_TOKEN: process.env.DROPBOX_ACCESS_TOKEN || 'znOgOvfs3uAAAAAAAAAAF8FkI3t32hignCp1P9K3OXKRcFkmgJ2a-arVUwqPT-kv',
  // Suite specific configuration
  TC_CONN_APP: {
    URL: process.env.TC_CONN_APP_URL || 'https://connect.topcoder-dev.com',
    TC_CONN_APP_VALID_LOGIN: {
      /*
        pshah_manager/topcoder123
        as manager
        pshah_customer/topcoder123

        as customer
        pshah_copilot/topcoder123
      */
      USER: process.env.TC_CONN_APP_VALID_LOGIN_USER || 'pshah_manager',
      PASS: process.env.TC_CONN_APP_VALID_LOGIN_PASS || 'topcoder123',
    },
    TC_CONN_APP_VALID_LOGIN_AS_USER: {
      USER: process.env.TC_CONN_APP_VALID_LOGIN_USER || 'pshah_customer',
      PASS: process.env.TC_CONN_APP_VALID_LOGIN_PASS || 'topcoder123',
    }
  }
};

// Export it in test context
if (module.parent.context) {
  const { context } = module.parent.context;
  context.TEST_SUITE_CONFIG = TEST_SUITE_CONFIG;
}
// Export configuration as module
module.exports = TEST_SUITE_CONFIG;
