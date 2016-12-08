var express = require('express');
var router = express.Router();
var path = require('path');
var validate = require('../utils/validate');
var author = require('../query/author');

// 作者注册页面
router.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/author-register.html'));
});

// 注册
router.post('/register', function (req, res) {
  var data = req.body;
  var result = validate.validateAuthor(data);
  if (result.error > 0) {
    res.send(result);
    return false;
  }
  author.doRegister({
    mobilephone: data.mobilephone,
    password: data.password,
    name: data.name,
    introduce: data.introduce.substr(0, 150),
    publishedStorys: data.publishedStorys.substr(0, 150),
    realName: data.realName,
    contactWay1: data.contactWay1,
    contactWay2: data.contactWay2,
    contactWay3: data.contactWay3,
    paperType: data.paperType,
    paperInfo: data.paperInfo,
    bankAddress: data.bankAddress,
    bankCard: data.bankCard
  }, data.clientCode).then(function (resp) {
    res.send(resp);
  });
});

module.exports = router;