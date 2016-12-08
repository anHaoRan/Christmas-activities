var express = require('express');
var ccap = require('ccap');
var crypto = require('crypto');

var router = express.Router();

// 图片验证码
router.get('/', (req, res) => {
  var text = Math.random().toString().substr(2, 4);
  var captcha = ccap({
    width: 318,
    height: 81,
    offset: 70,
    quality: 200,
    fontsize: 86,
    generate: function() {
      return text;
    }
  });

  var codeMD5 = crypto.createHash('md5').update(text, 'utf-8').digest('hex');
  res.cookie('LJ', codeMD5, { maxAge: 180000, httpOnly: true});

  res.end(captcha.get()[1]);
});

module.exports = router;
