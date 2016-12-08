var fetch = require('../utils/fetch');
var config = require('../config');

// 支付宝网页支付
exports.doAlipay = function (body, auth) {
  return fetch.post('/c/product/alipay/create', body, auth, true)
    .then(function (resp) {
      return resp;
    });
};

// 微信扫码支付
exports.doWXPay = function (body, auth) {
  return fetch.post('/c/product/weixin/create', body, auth, true)
    .then(function (resp) {
      if (resp.errorCode === 401) {
        return {error: 401};
      }
      return resp.body;
    });
};

// 支付宝网页支付构造表单
exports.renderAlipayForm = function (data) {
  var formHtml = ['<!DOCTYPE html><html><head><meta charset="utf8"><title>正在请求支付宝</title></head><body><form method="get" action="https://mapi.alipay.com/gateway.do?_input_charset=utf-8" id="alipayForm">'];
  for (var key in data) {
    if (key === 'orderSpec') {
      continue;
    }
    formHtml.push('<input type="hidden" name="' + key + '" value="' + data[key] + '"/>');
  }
  formHtml.push('<input type="submit" value="submit" style="display: none;"/>');
  formHtml.push('</form>');
  formHtml.push('<script type="text/javascript">document.getElementById("alipayForm").submit();</script></body>');
  return formHtml.join('');
};