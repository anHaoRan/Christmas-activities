var fetch = require('../utils/fetch');

// 注册作者
exports.doRegister = function (body, clientCode) {
  return fetch.post('/c/author/register?clientCode=' + clientCode, body)
    .then(function (resp) {
      return resp.body;
    });
};