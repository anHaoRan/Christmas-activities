var fetch = require('../utils/fetch');
var config = require('../config');
var qs = require('query-string');

// 支付回调notify
exports.alipayNotify = function (body) {
  return fetch.post('/c/product/alipay/notify?' + qs.stringify(body), {})
    .then(function (resp) {
      return resp;
    });
};

// 支付回调notify
exports.wxPayNotify = function (body) {
  return fetch.data('/c/product/weixin/notify', body)
    .then(function (resp) {
      return resp.body;
    });
};