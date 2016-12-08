var Q = require('q');
var utils = require('../utils');
var commomQuery = require('../query/common');

exports.notFound = function (req, res) {
  var staticData = Object.assign({
    nav: '404',
    css: ''
  }, utils.commonData(req));

  Q.all([
    commomQuery.hot(),
    commomQuery.onlineUser(req)
  ]).then(function (result) {
    var data = utils.pushArray(result, staticData);
    res.render('not-found', data);
  });
};