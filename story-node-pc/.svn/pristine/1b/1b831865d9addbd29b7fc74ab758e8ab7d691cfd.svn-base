var fetch = require('../utils/fetch');

// 本周热推
exports.weekHot = function (column) {
  return fetch.get('/c/recommend/column/' + column)
    .then(function (resp) {
      var list = resp.data || [];
      return {weekHot: list.slice(0, 5)};
    });
};

// 大字推荐
exports.bigWord = function (column) {
  return fetch.get('/c/recommend/column/' + column)
    .then(function (resp) {
      var list = resp.data || [];
      return {bigWord: list.slice(0, 3)};
    });
};

// 小字推荐
exports.smallWord = function (column) {
  return fetch.get('/c/recommend/column/' + column)
    .then(function (resp) {
      var list = resp.data || [];
      return {smallWord: list.slice(0, 12)};
    });
};

// 精品推荐大图
exports.bigGood = function (column) {
  return fetch.get('/c/recommend/column/' + column)
    .then(function (resp) {
      var list = resp.data || [];
      return {
        bigGood: list[0] || {}
      };
    });
};

// 精品推荐小图
exports.smallGood = function (column) {
  return fetch.get('/c/recommend/column/' + column)
    .then(function (resp) {
      var list = resp.data || [];
      return {
        smallGood: list.slice(0, 3)
      };
    });
};

// banner
exports.banner = function (column) {
  return fetch.get('/c/banner/column/' + column)
    .then(function (resp) {
      var list = resp.data || [];
      return {banner: list[0] || {}};
    });
};

// 男女频分类推荐
exports.typeRecommend = function (column) {
  return fetch.get('/c/recommend/column/' + column)
    .then(function (resp) {
      var list = resp.data || [];
      return {typeRecommend: list.slice(0, 4)};
    });
};