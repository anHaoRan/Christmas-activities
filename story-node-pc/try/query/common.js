var fetch = require('../utils/fetch');
var utils = require('../utils');
var queryString = require('query-string');

// 当前登录用户
exports.onlineUser = function (req) {
  var defaults = {onlineUser: {}};
  if (!req.cookies) {
    return defaults;
  }
  var codes = req.cookies['Auth-Codes'];
  if (!codes) {
    return defaults;
  }

  var auth = JSON.parse(utils.decrypt(codes));
  if (auth['X-I'] && auth['X-S']) {
    return fetch.get('/c/user/getUserInfo', auth)
      .then(function (resp) {
        if (resp.errorCode > 0) {
          return defaults;
        } else {
          return {
            onlineUser: resp.data || {}
          };
        }
      });
  } else {
    return defaults;
  }
};

// 热搜
exports.hot = function () {
  return fetch.get('/c/hotSearch/column/6011')
    .then(function (resp) {
      var hotList = resp.data;
      return {hotList: hotList || ['']};
    });
};

// 榜单带分页
exports.rank = function (column, timeType, pageSize, pageNo) {
  var url = '/c/ranking/page?novelColumn=' + column + '&timeType=' + timeType + '&pageNo=' + pageNo + '&pageSize=' + (pageSize || 10);
  if (column == 6166 || column == 6266) {
    url = '/c/ranking/tuhao/page?novelColumn=' + column + '&timeType=' + timeType + '&pageNo=' + pageNo + '&pageSize=' + (pageSize || 10);
  }
  return fetch.get(url).then(function (resp) {
    var data = resp.data || {};
    return {list: data.list || [], pageNo: data.pageNo || 0, totalPages: data.totalPages || 0};
  });
};

// 书库搜搜
exports.library = function (query) {
  query.pageSize = 20;
  var url = '/c/story/search?' + queryString.stringify(query);
  return fetch.get(url).then(function (resp) {
    return {library: resp.data || {}};
  });
};

// 搜索
exports.search = function (query) {
  var url = '/c/common/search?' + queryString.stringify(query);
  return fetch.get(url).then(function (resp) {
    return {searchResult: resp.data || {list: [], pageNo: 0, totalPages: 0}};
  });
};

// 充值金额类型
exports.products = function () {
  return fetch.get('/c/product/goldProducts')
    .then(function (resp) {
      return {products: (resp.data || []).slice(0, 5)};
    });
};

// 资讯、活动
exports.event = function (eventId) {
  return fetch.get('/c/event/' + eventId)
    .then(function (resp) {
      return {event: resp.data || {}};
    });
};