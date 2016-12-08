var node_env = process.env.NODE_ENV || 'development';
var config = {
  production: {
    host: '',
    cdn: '//c.hotread.com',
  },
  development: {
    host: '',
    cdn: ''
  },
  test: {
    host: '',
    cdn: ''
  }
};

exports = module.exports = config[node_env];
exports.girlType = ['现代言情', '古代言情', '仙侠奇幻', '耽美纯爱'];
exports.boyType = ['现代都市', '悬疑灵异', '玄幻仙侠', '历史军事'];
exports.loginQQ = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101346160&redirect_uri=http%3A%2F%2Fwww.hotread.com%2Flogin%2Fqq';
exports.loginWB = 'https://api.weibo.com/oauth2/authorize?client_id=605132052&response_type=code&redirect_uri=http%3A%2F%2Fwww.hotread.com%2Flogin%2Fweibo';
exports.defaultCover = {
  boy: 'http://c.hotread.com/assets/images/default-cover-boy.jpg',
  girl: 'http://c.hotread.com/assets/images/default-cover-girl.jpg',
  boy_s: 'http://c.hotread.com/assets/images/default-cover-boy-s.jpg',
  girl_s: 'http://c.hotread.com/assets/images/default-cover-girl-s.jpg'
};