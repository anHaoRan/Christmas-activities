var fetch = require('../utils/fetch');
var config = require('../config');
var qs = require('query-string');

var QQ_APPID = config.QQ_APPID;
var QQ_APPKEY = config.QQ_APPKEY;

var QQ_TOKEN_URL = 'https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=' + QQ_APPID
  + '&client_secret=' + QQ_APPKEY
  + '&redirect_uri=' + config.redirect_uri_qq
  + '&code=';
var QQ_OPENID = 'https://graph.qq.com/oauth2.0/me?access_token=';

var QQ_USER_INFO = 'https://graph.qq.com/user/get_user_info?access_token=$1&oauth_consumer_key=$2&openid=$3';

var QQ_GENDER = { '男': 1, '女': 0 };

var WB_APPID = config.WB_APPID;
var WB_APPKEY = config.WB_APPKEY;

var WB_TOKEN_URL = 'https://api.weibo.com/oauth2/access_token?client_id=' + WB_APPID 
  + '&client_secret=' + WB_APPKEY 
  + '&grant_type=authorization_code&redirect_uri=' + config.redirect_uri_wb 
  + '&code=';

var WB_USER_INFO = 'https://api.weibo.com/2/users/show.json?access_token=';
var WB_DENGER = { m: 1, f: 0 };

function callback(json) { return json; }

// 登录操作
exports.login = function (body) {
  return fetch.post('/c/user/login', {
      name: body.username,
      password: body.password
    }).then(function (resp) {
      return {
        result: resp.body,
        'X-I': resp.headers['x-i'],
        'X-S': resp.headers['x-s']
      };
    });
};

// 注册操作
exports.register = function (body) {
  return fetch.post('/c/user/register', {
      nickName: body.nickName,
      mobilePhone: body.mobilePhone,
      password: body.password,
      clientCode: body.clientCode
    }).then(function (resp) {
      return {
        result: resp.body,
        'X-I': resp.headers['x-i'],
        'X-S': resp.headers['x-s']
      };
    });
};

// 找回密码操作
exports.recover = function (body) {
  return fetch.post('/c/user/recoverPwd', {
      mobilePhone: body.mobilePhone,
      password: body.password,
      clientCode: body.clientCode
    }).then(function (resp) {
      return {
        result: resp.body
      };
    });
};

// 发送注册短信验证码
exports.sendRegisterCode = function (body) {
  return fetch.post('/c/user/rcode', body)
    .then(function (resp) {
      return resp;
    });
};

// 发送找回密码验证码
exports.sendRecoverCode = function (body) {
  return fetch.post('/c/user/mobileCode', body)
    .then(function (resp) {
      return resp;
    });
};

// 微博登录请求
exports.doWeiboLogin = function (code) {
  return fetch.post(WB_TOKEN_URL + code, {})
    .then(function (json) {
      var data = json.body;
      var uid = data.uid;
      return fetch.get(WB_USER_INFO + data.access_token + '&uid=' + uid)
        .then(function(resp) {
          return loginThird({
            openId: uid,
            nickName: resp.name,
            sex: WB_DENGER[resp.gender],
            location: resp.location,
            country: '中国',
            description: resp.description || '微博用户',
            other: '',
            headImgUrl: resp.avatar_large,
            loginSource: 'WB',
            pushToken: 'PC',
            phoneModel: 'PC',
            type: 3
          })
          .then(function (resp) {
            return {
              result: resp.body,
              'X-I': resp.headers['x-i'],
              'X-S': resp.headers['x-s']
            };
          })
        });
    });
};

// QQ登录请求
exports.doQQLogin = function (code) {
  return fetch.get(QQ_TOKEN_URL + code)
    .then(function (result) {
      var data = qs.parse(result.text);
      var access_token = data.access_token;
      
      return fetch.get(QQ_OPENID + access_token)
        .then(function (resp) {
          var cbJson = new Function(callback.toString() + 'return ' + resp.text)();

          var url = QQ_USER_INFO.replace(/\$1/, access_token).replace(/\$2/, cbJson.client_id).replace(/\$3/, cbJson.openid);

          return fetch.get(url)
            .then(function (resp) {
              return loginThird({
                openId: cbJson.openid,
                nickName: resp.nickname,
                sex: QQ_GENDER[resp.gender],
                location: resp.province + resp.city,
                country: '中国',
                description: 'QQ用户',
                other: '',
                headImgUrl: resp.figureurl_2,
                loginSource: 'QQ',
                pushToken: 'PC',
                phoneModel: 'PC',
                type: 3
              })
              .then(function (resp) {
                return {
                  result: resp.body,
                  'X-I': resp.headers['x-i'],
                  'X-S': resp.headers['x-s']
                };
              });
            })
        });
    });
};

function loginThird (body) {
  return fetch.post('/c/user/login_from_thirdparty', body)
    .then(function (resp) {
      return resp;
    });
}