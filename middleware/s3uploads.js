const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

// Cofigure aws stuff
aws.config.update({
  secretAccessKey: process.env.iamS3Key,
  accessKeyId: process.env.iamS3Id,
  region: "us-east-1"
});

// Creates upload middleware
const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "bucket-owner-full-control",
    serverSideEncryption: "AES256",
    bucket: "tik-tak-eastern-images/images",
    key: function(req, file, callback) {
      const filename = file.originalname + "-" + Date.now().toString() + ".png";
      callback(null, filename);
    }
  })
}).single("image");

module.exports = upload;
