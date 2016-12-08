var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var useragent = require('express-useragent');
var qs = require('query-string');

var config = require('./config');

var routes = require('./routes');
var api = require('./routes/api');
var captcha = require('./routes/captcha');
var auth = require('./routes/auth');
var user = require('./routes/user');
var image = require('./routes/image');
var handler = require('./routes/handler');
var author = require('./routes/author');
var product = require('./routes/product');
var node_env = process.env.NODE_ENV || 'development';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (node_env === 'production') {
  app.use(logger('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
  }));
} else {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/../public')));
app.use('/assets', express.static(path.join(__dirname + '/../assets')));
app.use('/tops', express.static(path.join(__dirname + '/../tops')));

app.use(useragent.express());

var PATH_REG = /\/api\/|\/core\//;
var PATH_REG2 = /\/story\/|\/reading\/|\/details\//;
// 全平台总入口
app.use(function (req, res, next) {
  var path = req.path;
  // 页面路由
  if (!PATH_REG.test(path) && req.useragent.isMobile) {
    if (PATH_REG2.test(path)) {
      next();
      return true;
    }
    var search = qs.stringify(req.query);
    res.redirect(config.mobile + path + (search ? ('?' + search) : '' ));
    return true;
  }
  next();
});

// 图片验证码
app.use('/core/code', captcha);
// 认证操作：登录、注册、找回密码
app.use('/core/auth', auth);
// 作者中心
app.use('/author', author);
// 所有页面操作
app.use('/', routes);
// 所有普通接口方法
app.use('/api', api);
// 所有需要认证的接口
app.use('/api/user', user);
// 图片上传
app.use('/api/image', image);
// 支付回调notify
app.use('/api/product', product);

// catch 404 and forward to error handler
app.use(handler.notFound);

// production error handler
app.use(function(err, req, res, next) {
  handler.notFound(req, res);
  // res.status(err.status || 500);
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
});


module.exports = app;
