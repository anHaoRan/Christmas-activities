var express = require('express');
var router = express.Router();
var utils = require('../utils');
var auth = require('../query/auth');
var config = require('../config');
var validate = require('../utils/validate');

// 登录
router.post('/login', function (req, res) {
  if (!utils.validCaptcha(req)) {
    res.send({
      error: 1,
      msg: '验证码不正确'
    });
    return false;
  }

  auth.login(req.body).then(function(resp) {
    var result = resp.result;
    if (result.errorCode > 0) {
      res.send({
        error: 1,
        msg: result.message
      });
    } else {
      var codes = utils.encrypt(JSON.stringify({
        'X-I': resp['X-I'],
        'X-S': resp['X-S'],
        'IP': utils.getClientIp(req)
      }));
      res.cookie('Auth-Codes', codes, { 
        domain: config.domain, 
        maxAge: config.maxAge, 
        httpOnly: true
      });

      res.send({
        error: 0
      });
    }
  });
});

// 请求注册
router.post('/register', function (req, res) {
  var result = validate.validateRegister(req.body);
  if (result.error > 0) {
    res.send(result);
    return false;
  }

  if (!utils.validCaptcha(req)) {
    res.send({
      error: 1,
      msg: '验证码不正确',
      target: 'code'
    });
  } else {
    auth.register(req.body).then(function(resp) {
      var result = resp.result;
      if (result.errorCode > 0) {
        res.send({
          error: 1,
          msg: result.message
        });
      } else {
        var codes = utils.encrypt(JSON.stringify({
          'X-I': resp['X-I'],
          'X-S': resp['X-S'],
          'IP': utils.getClientIp(req)
        }));
        res.cookie('Auth-Codes', codes, { 
          domain: config.domain, 
          maxAge: config.maxAge, 
          httpOnly: true
        });

        res.send({
          error: 0
        });
      }
    });
  }
});

// 忘记密码
router.post('/recover', function (req, res) {
  var result = validate.validateRecover(req.body);
  if (result.error > 0) {
    res.send(result);
    return false;
  }
  auth.recover(req.body).then(function (resp) {
    if (resp.errorCode > 0) {
      res.send({
        error: 1,
        msg: resp.message
      });
    } else {
      res.send({
        error: 0
      });
    }
  });
});

// 发送注册短信验证码
router.post('/register/code', function (req, res) {
  auth.sendRegisterCode({
    mobilePhone: req.body.mobilePhone
  }).then(function (resp) {
    res.send(resp.body);
  });
});

// 发送注册短信验证码
router.post('/recover/code', function (req, res) {
  auth.sendRecoverCode({
    mobilePhone: req.body.mobilePhone
  }).then(function (resp) {
    res.send(resp.body);
  });
});

module.exports = router;