const config = require('../config/config');
const path = require('path');
const EasyZip = require('easy-zip').EasyZip;
const zip = new EasyZip();
const now = new Date();
const pathToZip = path.resolve(__dirname, '../../allure-report');
const zipName = `tc-e2e-${now.getTime()}.zip`;
const fs = require('fs');
const dropboxV2Api = require('dropbox-v2-api');
const dropbox = dropboxV2Api.authenticate({
    token: config.DROPBOX_ACCESS_TOKEN
});
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL_SERVICE.USER,
    pass: config.EMAIL_SERVICE.PASS,
  }
});

/**
 * Zip allure-report and
 * send it to the email recipients
 */
zip.zipFolder(pathToZip, function() {
  zip.writeToFile(`${pathToZip}/${zipName}`, function(err) {
    if (err) {
      throw err;
    }
    console.log(`Allure report zip created. Uploading to dropbox`);
    dropbox({
      resource: 'files/upload',
      parameters: {
        path: `/${zipName}`
      },
      readStream: fs.createReadStream(`${pathToZip}/${zipName}`)
    }, (err) => {
      if (err) {
        throw err;
      }
      console.log('Upload done. Create shared link');
      dropbox({
        resource: 'sharing/create_shared_link_with_settings',
        parameters: {
          path: `/${zipName}`,
          settings: {
            requested_visibility: 'public'
          }
        }
      }, (err, result) => {
        if (err) {
          throw err;
        }
        console.log(`Link created. Sending to ${config.SEND_RESULTS_TO.length} emails`);
        const mailOptions = {
          from: config.EMAIL_SERVICE.SENDER,
          to: config.SEND_RESULTS_TO,
          subject: 'TC E2E Test Results',
          html: `<h1>TC E2E Test Results Available</h1><p>Download link: ${result.url}</p>`
        };
        transporter.sendMail(mailOptions, function(err, info) {
          if (err) {
            throw err;
          } else {
            console.log('Emails sent', info);
          }
        });
      });
    });
  });
});
