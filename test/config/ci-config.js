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
  SUIT_NAME: process.env.SUIT_NAME || 'TC-ConnApp',
  SEND_RESULTS_TO: ['kranitsasthomas@gmail.com'],
  EMAIL_SERVICE: {
    SENDER: process.env.EMAIL_SERVICE_SENDER || '',
    USER: process.env.EMAIL_SERVICE_USER || '',
    PASS: process.env.EMAIL_SERVICE_PASS || ''
  },
  AWS_S3_SERVICE: {
    ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID || '',
    SECRET_KEY: process.env.AWS_S3_SECRET_KEY || '',
    REGION: process.env.AWS_S3_REGION || 'us-west-1',
    BUCKET: process.env.AWS_S3_BUCKET || '',
  },
  // Suite specific configuration
  TC_CONN_APP: {
    URL: process.env.TC_CONN_APP_URL || 'https://connect.topcoder-dev.com',
    TC_CONN_APP_VALID_LOGIN_AS_MANAGER: {
      USER: process.env.TC_CONN_APP_VALID_LOGIN_USER || 'pshah_manager',
      PASS: process.env.TC_CONN_APP_VALID_LOGIN_PASS || 'topcoder123',
      NAME: process.env.TC_CONN_APP_NAME || 'Parth Manager',
      AVATAR: process.env.TC_CONN_APP_AVATAR || 'PM',
    },
    TC_CONN_APP_VALID_LOGIN_AS_USER: {
      USER: process.env.TC_CONN_APP_VALID_LOGIN_USER || 'pshah_customer',
      PASS: process.env.TC_CONN_APP_VALID_LOGIN_PASS || 'topcoder123',
      NAME: process.env.TC_CONN_APP_NAME || 'Parth Customer',
      AVATAR: process.env.TC_CONN_APP_AVATAR || 'PC',
    },
    TC_CONN_APP_VALID_LOGIN_AS_COPILOT: {
      USER: process.env.TC_CONN_APP_VALID_COPLIOT_USER || 'pshah_copilot',
      PASS: process.env.TC_CONN_APP_VALID_COPLIOT_PASS || 'topcoder123',
      NAME: process.env.TC_CONN_APP_NAME || 'Parth Copilot',
      AVATAR: process.env.TC_CONN_APP_AVATAR || 'PC',
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
