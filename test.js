const config = {
  AWS_S3_SERVICE: {
    ACCESS_KEY_ID: 'AKIAJRI4W64YCVQSC3TQ',
    SECRET_KEY: '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',
    REGION: 'us-east-1',
    BUCKET: 'tc-qaframework-reports'
  }
};

const aws = require('aws-sdk');

// Set aws configuration
aws.config.update({
  region: config.AWS_S3_SERVICE.REGION,
  credentials: {
    accessKeyId: config.AWS_S3_SERVICE.ACCESS_KEY_ID,
    secretAccessKey: config.AWS_S3_SERVICE.SECRET_KEY
  }
});

const s3 = new aws.S3();

s3.listBuckets().promise()
  .then((response) => {
    console.log(response);
  });
