var fetch = require('../utils/fetch');

// slider
exports.slider = function () {
  return fetch.get('/c/banner/column/6301')
    .then(function (resp) {
      var slider = resp.data || [];
      return {slider: slider};
    });
};

// infor
exports.infor = function () {
  return fetch.get('/c/event/column/6302')
    .then(function (resp) {
      var infor = resp.data || [];
      return {infor: infor};
    });
};

// 最新出售作品
exports.newBooks = function () {
  return fetch.get('/c/recommend/column/6303')
    .then(function (resp) {
      var newBooks = resp.data || [];
      return {newBooks: newBooks};
    });
};

// 精品版权推荐-有图
exports.bigGood = function () {
  return fetch.get('/c/recommend/column/6304')
    .then(function (resp) {
      var bigGood = resp.data || [];
      return {list: bigGood.slice(0, 6)};
    });
};

// 精品版权推荐-无图
exports.smallGood = function () {
  return fetch.get('/c/recommend/column/6305')
    .then(function (resp) {
      var smallGood = resp.data || [];
      return {list: smallGood};
    });
};

