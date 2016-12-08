var express = require('express');
var path = require('path');
var multer = require('multer');
var fs = require('fs');
var request = require('request');

var router = express.Router();

var utils = require('../utils');
var config = require('../config');

var TEMP_PATH = path.join(__dirname, '../uploads');

var upload = multer({ 
  dest: TEMP_PATH
});
var singleUpload = upload.single('uploadFile');

var IMG_SUFFIX_REG = /jpg|jpeg|png|gif/i;
var MAX_SIZE = 10 * 1024 * 1024;

router.post('/upload', singleUpload, function (req, res) {
  if (!utils.isOnlineUser(req)) {
    res.send({
      error: 401
    });
    return false;
  }
  var file = req.file;
  var originalname = file.originalname;
  var path = file.path;
  var suffix = originalname.split('.').pop();
  var newFile = TEMP_PATH + '/' + Math.random().toString(32).substr(2) + (new Date - 0).toString(32) + '.' + suffix;

  fs.readFile(path, function (err, data) {
    fs.writeFile(newFile, data, function (error) {
      // 删除临时旧文件
      fs.unlink(file.path);

      request.post({url: config.image_server, formData: {
        files: fs.createReadStream(newFile)
      }}, function (err, response, body) {
        if (err) {
          console.log('[error] upload image error ' + err);
          res.send({message: err, error: 1});
        } else {
          console.log('[log] upload image success ' + body);
          fs.unlink(newFile);
          var result = JSON.parse(body);
          res.send(result);
        }
      });
    });
  });
});

module.exports = router;