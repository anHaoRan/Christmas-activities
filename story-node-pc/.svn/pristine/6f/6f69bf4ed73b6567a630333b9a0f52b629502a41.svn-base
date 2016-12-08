var links = require('./links.json');
var node_env = process.env.NODE_ENV || 'development';

var config = {
  production: {
    api: 'http://w.hotread.com',
    cdn: '//c.hotread.com',
    domain: '.hotread.com',
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
    cdn: "",
    domain: '.hotread.com',
    image_server: 'http://112.126.68.72/upload_image.do',
    mobile: 'http://testwap.hotread.com/',
    port: 3333,
    QQ_APPID: '101346160',
    QQ_APPKEY: 'a60dd792066ee51d5e9505045d2f0310',
    redirect_uri_qq: 'http%3A%2F%2Fwww.hotread.com%2Flogin%2Fqq',
    WB_APPID: '605132052',
    WB_APPKEY: '75ea19069c36d37482da0195530ad309',
    redirect_uri_wb: 'http%3A%2F%2Fwww.hotread.com%2Flogin%2Fweibo',
  },
  test: {
    api: 'http://10.10.10.138:8200/story-web',
    cdn: "//c.hotread.com",
    domain: '.hotread.com',
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
exports.env = node_env;
exports.maxAge = 24 * 60 * 60 * 1000;
exports.inforType = ['', '活动', '公告', '资讯'];
exports.girlType = ['现代言情', '古代言情', '仙侠奇幻', '耽美纯爱'];
exports.boyType = ['现代都市', '悬疑灵异', '玄幻仙侠', '历史军事'];
exports.title = '火星小说，提供最新最热的免费小说在线阅读，各种好看的都市小说、悬疑小说、军事历史小说、玄幻小说、言情小说、穿越小说、耽美小说';
exports.keywords = '小说,网络小说,小说网,免费小说,完本小说,都市小说,悬疑小说,玄幻小说,军事小说,历史小说,言情小说,耽美小说,穿越小说';
exports.description = '火星小说，提供最新最热的免费小说在线阅读，各种好看的都市小说、悬疑小说、军事历史小说、玄幻小说、言情小说、穿越小说、耽美小说尽汇于此。';
exports.links = links;
exports.loginQQ = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101346160&redirect_uri=http%3A%2F%2Fwww.hotread.com%2Flogin%2Fqq';
exports.loginWB = 'https://api.weibo.com/oauth2/authorize?client_id=605132052&response_type=code&redirect_uri=http%3A%2F%2Fwww.hotread.com%2Flogin%2Fweibo';