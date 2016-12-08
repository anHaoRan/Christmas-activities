var aesjs = require('aes-js');
var crypto = require('crypto');
var config = require('../config');
var fetch = require('./fetch');

var ENC_KEY = aesjs.util.convertStringToBytes('hjxenjoy@gmail.com#duyao');

// 全局通用服务配置
exports.commonData = function (req) {
  var ua = req.useragent;
  var data = {
    originalUrl: encodeURIComponent(req.originalUrl),
    rootClass: 'root' + (ua.isMac ? ' platform-mac' : '') + (ua.isWindows ? ' platform-win' : '')
  };
  return Object.assign(data, config);
};

var getClientIp = function (req) {
  return req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress;
};

var isOnlineUser = function (req) {
  if (!req.cookies) {
    return false;
  }
  var codes = req.cookies['Auth-Codes'];
  if (!codes) {
    return false;
  }
  var auth = JSON.parse(decrypt(codes));
  var ip = getClientIp(req);
  if (auth['X-I'] && auth['X-S']) {
    return auth;
  } else {
    return false;
  }
};

var encrypt = function (string) {
  var bytes = aesjs.util.convertStringToBytes(string);
  var ctr = new aesjs.ModeOfOperation.ctr(ENC_KEY, new aesjs.Counter(5));
  var encryptedBytes = ctr.encrypt(bytes);

  return Object.keys(encryptedBytes).map(function (key) {
    return encryptedBytes[key].toString(16);
  }).join('-');
};

var decrypt = function (string) {
  var bytes = new Buffer(string.split('-').map(function (x) {
    return parseInt(x, 16);
  }));
  var ctr = new aesjs.ModeOfOperation.ctr(ENC_KEY, new aesjs.Counter(5));
  var decryptedBytes = ctr.decrypt(bytes);
  return aesjs.util.convertBytesToString(decryptedBytes);
};

exports.getClientIp = getClientIp;
exports.isOnlineUser = isOnlineUser;
exports.encrypt = encrypt;
exports.decrypt = decrypt;

exports.validCaptcha = function (req) {
  var requireCode = req.body.captcha || '';
  var cookiCode = req.cookies.LJ;
  var requireCodeMD5 = crypto.createHash('md5').update(requireCode.toUpperCase(), 'utf-8').digest('hex');
  console.log(requireCode, cookiCode, requireCodeMD5);
  return requireCodeMD5 === cookiCode;
};

exports.pushArray = function (array, object) {
  if (!array) {
    return object;
  }
  array.forEach(function (item) {
    Object.assign(object, item);
  });

  return object;
};