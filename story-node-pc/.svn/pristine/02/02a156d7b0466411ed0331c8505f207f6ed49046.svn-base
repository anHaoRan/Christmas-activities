var fetch = require('../utils/fetch');

// slider
exports.slider = function () {
  return fetch.get('/c/banner/column/6001')
    .then(function (resp) {
      var slider = resp.data || [];
      return {slider: slider};
    });
};

// 资讯
exports.infor = function () {
  return fetch.get('/c/event/column/6006')
    .then(function (resp) {
      var infor = resp.data || [];
      return {infor: infor.slice(0, 4)};
    });
};

//  左侧大字推荐
exports.bigleft = function () {
  return fetch.get('/c/recommend/column/6004')
    .then(function (resp) {
      var list = resp.data || [{story: {}}];
      return {bigleft: list[0]};
    });
};

//  左侧小字推荐
exports.smallleft = function () {
  return fetch.get('/c/recommend/column/6005')
    .then(function (resp) {
      var list = resp.data || [];
      return {smallleft: list.slice(0, 3)};
    });
};

//  右侧大字推荐
exports.bigright = function () {
  return fetch.get('/c/recommend/column/6012')
    .then(function (resp) {
      var list = resp.data || [{story: {}}];
      return {bigright: list[0]};
    });
};

//  右侧小字推荐
exports.smallright = function () {
  return fetch.get('/c/recommend/column/6013')
    .then(function (resp) {
      var list = resp.data || [];
      return {smallright: list.slice(0, 3)};
    });
};

// 女生人气榜
exports.girlPopular = function () {
  return fetch.get('/c/recommend/column/6003')
    .then(function (resp) {
      var list = resp.data || [];
      return {girlPopular: list};
    });
};

// 男生人气榜
exports.boyPopular = function () {
  return fetch.get('/c/recommend/column/6002')
    .then(function (resp) {
      var list = resp.data || [];
      return {boyPopular: list};
    });
};

// 女生火力推荐
exports.girlFire = function () {
  return fetch.get('/c/recommend/column/6007')
    .then(function (resp) {
      var list = resp.data || [];
      return {girlFire: list.slice(0, 3)};
    });
};

// 男生火力推荐
exports.boyFire = function () {
  return fetch.get('/c/recommend/column/6008')
    .then(function (resp) {
      var list = resp.data || [];
      return {boyFire: list.slice(0, 3)};
    });
};

// 最近免费小说更新
exports.freeList = function () {
  return fetch.get('/c/ranking/list?novelColumn=6009&timeType=0&pageSize=18')
    .then(function (resp) {
      var list = resp.data || [];
      return {freeList: list};
    });
};

// 最新VIP小说更新
exports.vipList = function () {
  return fetch.get('/c/ranking/list?novelColumn=6010&timeType=0&pageSize=18')
    .then(function (resp) {
      var list = resp.data || [];
      return {vipList: list};
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
      return {typeRecommend: list[0] || {}};
    });
};

