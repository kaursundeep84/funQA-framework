/* global Promise */
const config = require('../config/config');
const path = require('path');
const now = new Date();
const fs = require('fs');
const aws = require('aws-sdk');
const mime = require('mime-types');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(config.SENDGRID_API_KEY);

// if local = true then upload allure report
const directoryToUpload = path.resolve(__dirname, '../../allure-report');

// Set aws configuration
aws.config.update({
  region: config.AWS_S3_SERVICE.REGION,
  credentials: {
    accessKeyId: config.AWS_S3_SERVICE.ACCESS_KEY_ID,
    secretAccessKey: config.AWS_S3_SERVICE.SECRET_KEY
  }
});

/**
 * Creates and configures S3 bucket if required
 * @param {S3} s3 S3 client
 */
function createAndConfigureBucket(s3) {
  console.log('Listing buckets...');
  return s3.listBuckets().promise()
    .then((response) => {
      if (response.Buckets.some(bucket => bucket.Name == config.AWS_S3_SERVICE.BUCKET)) {
        console.log(`Bucket ${config.AWS_S3_SERVICE.BUCKET} already exists`)
        return Promise.resolve();
      } else {
        console.log(`Trying to create bucket ${config.AWS_S3_SERVICE.BUCKET}`)
        return s3.createBucket({
          Bucket: config.AWS_S3_SERVICE.BUCKET,
          ACL: 'public-read'
        }).promise()
        .then(() => {
          return s3.putBucketWebsite({
            Bucket: config.AWS_S3_SERVICE.BUCKET,
            WebsiteConfiguration: {
              // Index document is mandatory but does not point to existing document, as report is available only by direct link
              IndexDocument: {
                Suffix: "index.html"
              }
             }
          }).promise()
        });
      }
    })
    .then(() => {
      return s3.getBucketWebsite({
        Bucket: config.AWS_S3_SERVICE.BUCKET,
      });
    })
    .then((req) => {
      console.log(`Endpoint: ${config.AWS_S3_SERVICE.BUCKET}.${req.service.config.endpoint}`);
      return Promise.resolve(`${config.AWS_S3_SERVICE.BUCKET}.${req.service.config.endpoint}`);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

/**
 * Uploads directory recursively on s3
 * @param {S3} s3 S3 client
 * @param {String} dirToUpload Path to directory that needs to be uploaded
 * @param {String} s3key S3 destination key
 */
function uploadDirectory(s3, dirToUpload, s3key) {
  const files = walkDir(dirToUpload);
  console.log(`Uploading ${files.length} files to s3://${config.AWS_S3_SERVICE.BUCKET}/${s3key}`);
  return Promise.all(files.map((filePath) => {
    const keyPath = filePath.replace(dirToUpload, '');
    const uploadKey = path.join(s3key, keyPath);
    return s3.putObject({
      Bucket: config.AWS_S3_SERVICE.BUCKET,
      Key: uploadKey,
      Body: fs.readFileSync(filePath),
      ContentType: mime.lookup(filePath),
      ACL: 'public-read', // Make file accessible for everyone
    }).promise();
  }));
}

/**
 * Scan directory recursively
 * @param {String} directory to scan
 */
function walkDir(directory) {
  let result = [];
  const files = fs.readdirSync(directory);
  files.forEach((fileName) => {
    const fullPath = path.join(directory, fileName);
    if (fs.lstatSync(fullPath).isDirectory()) {
      result = result.concat(walkDir(fullPath));
    } else {
      result.push(fullPath);
    }
  })

  return result;
}

let reportUrl = '';
const s3 = new aws.S3();
createAndConfigureBucket(s3)
  .then((endpoint) => {
    const destinationKey = `${config.SUIT_NAME}/${now.getTime()}`;
    reportUrl = `http://${endpoint}/${destinationKey}/index.html`;
    return uploadDirectory(s3, directoryToUpload, destinationKey);
  }).then(() => {
      console.log(`Link ${reportUrl} created. Sending to ${config.SEND_RESULTS_TO.length} emails`);
      const mailOptions = {
        from: config.EMAIL_SERVICE.SENDER,
        to: config.SEND_RESULTS_TO,
        subject: 'TC E2E Test Results',
        text: `TC E2E Test Results Available\nDownload link: ${reportUrl}`,
        html: `<h1>TC E2E Test Results Available</h1><p>Download link: ${reportUrl}</p>`
      };
      sgMail.send(mailOptions);
  }).catch((error) => {
    console.error(`Error: ${error}`);
    process.exit(1);
  });
