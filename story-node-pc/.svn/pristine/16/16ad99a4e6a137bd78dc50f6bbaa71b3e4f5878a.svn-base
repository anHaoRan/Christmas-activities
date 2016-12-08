var clientConfig = require('../config');
var node_env = process.env.NODE_ENV || 'development';
var config = {
  production: {
    api: 'http://w.hotread.com',
    cdn: clientConfig.cdn,
    domain: 'www.hotread.com',
    image_server: 'http://p.duyao001.com/upload_image.do',
    mobile: 'http://mobile.hotread.com/',
    port: 3335,
    QQ_APPID: '101346160',
    QQ_APPKEY: 'a60dd792066ee51d5e9505045d2f0310',
    redirect_uri_qq: 'http%3A%2F%2Fwww.hotread.com%2Flogin%2Fqq',
    WB_APPID: '605132052',
    WB_APPKEY: '75ea19069c36d37482da0195530ad309',
    redirect_uri_wb: 'http%3A%2F%2Fwww.hotread.com%2Flogin%2Fweibo',
  },
  development: {
    api: 'http://127.0.0.1:8090/story-web',
    // api: 'http://10.10.11.166:8081/story-web',
    cdn: clientConfig.cdn,
    domain: 'www.hotread.com',
    image_server: 'http://112.126.68.72/upload_image.do',
    mobile: 'http://wap.hotread.com/',
    port: 3333,
    QQ_APPID: '101346160',
    QQ_APPKEY: 'a60dd792066ee51d5e9505045d2f0310',
    redirect_uri_qq: 'http%3A%2F%2Fwww.hotread.com%2Flogin%2Fqq',
    WB_APPID: '605132052',
    WB_APPKEY: '75ea19069c36d37482da0195530ad309',
    redirect_uri_wb: 'http%3A%2F%2Fwww.hotread.com%2Flogin%2Fweibo',
  },
  test: {
    // api: 'http://127.0.0.1:8080/story-web',
    api: 'http://10.10.10.138:8200/story-web',
    cdn: clientConfig.cdn,
    domain: 't.hotread.com',
    image_server: 'http://112.126.68.72/upload_image.do',
    mobile: 'http://testwap.hotread.com/',
    port: 3333,
    QQ_APPID: '101346160',
    QQ_APPKEY: 'a60dd792066ee51d5e9505045d2f0310',
    redirect_uri_qq: 'http%3A%2F%2Fwww.hotread.com%2Flogin%2Fqq',
    WB_APPID: '605132052',
    WB_APPKEY: '75ea19069c36d37482da0195530ad309',
    redirect_uri_wb: 'http%3A%2F%2Fwww.hotread.com%2Flogin%2Fweibo',
  }
};

exports = module.exports = config[node_env];
exports.cookieMaxAge = 24 * 60 * 60 * 1000;
