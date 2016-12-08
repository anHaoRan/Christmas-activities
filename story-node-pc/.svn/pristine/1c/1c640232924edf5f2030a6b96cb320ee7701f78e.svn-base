import { Router } from 'express';
require('es6-promise').polyfill();
require('isomorphic-fetch');
import queryString from 'query-string';
import { loginThird } from '../api/fetch';
import config from '../config';
import {
  encrypt,
  getClientIp
} from '../utils';

const router = Router();
const maxAge = config.cookieMaxAge

const QQ_APPID = config.QQ_APPID;
const QQ_APPKEY = config.QQ_APPKEY;

const QQ_TOKEN_URL = 'https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=' + QQ_APPID
  + '&client_secret=' + QQ_APPKEY
  + '&redirect_uri=' + config.redirect_uri_qq
  + '&code=';
const QQ_OPENID = 'https://graph.qq.com/oauth2.0/me?access_token=';

const QQ_USER_INFO = 'https://graph.qq.com/user/get_user_info?access_token=$1&oauth_consumer_key=$2&openid=$3';

const QQ_GENDER = { '男': 1, '女': 0 };

const WB_APPID = config.WB_APPID;
const WB_APPKEY = config.WB_APPKEY;

const WB_TOKEN_URL = 'https://api.weibo.com/oauth2/access_token?client_id=' + WB_APPID 
  + '&client_secret=' + WB_APPKEY 
  + '&grant_type=authorization_code&redirect_uri=' + config.redirect_uri_wb 
  + '&code=';

const WB_USER_INFO = 'https://api.weibo.com/2/users/show.json?access_token=';
const WB_DENGER = { m: 1, f: 0 };


function callback(json) { return json; }

// https://api.weibo.com/oauth2/authorize?client_id=605132052&response_type=code&redirect_uri=http%3A%2F%2Fwww.hotread.com%2Flogin%2Fweibo
// 微博 第三方登录
router.get('/weibo', (req, res) => {
  let { code } = req.query;
  if (!code) {
    res.redirect('/login');
    return false;
  }
  fetch(WB_TOKEN_URL + code, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then(resp => resp.json())
    .catch(err => console.log('[warn] get WEIBO access token failed. ', err))
    .then(json => {
      let {
        access_token,
        remind_in,
        expires_in,
        uid,
      } = json;

      return fetch(WB_USER_INFO + access_token + '&uid=' + uid)
        .then(resp => resp.json())
        .catch(err => console.log('[warn] get WEIBO openid failed. ', err))
        .then(result => {
          return Object.assign({}, result, {
            openid: uid
          });
        })
    })
    .then(json => {
      loginThird({
        openId: json.openid,
        nickName: json.name,
        sex: WB_DENGER[json.gender],
        location: json.location,
        country: '中国',
        description: json.description || '微博用户',
        other: '',
        headImgUrl: json.avatar_large,
        loginSource: 'WB',
        pushToken: 'PC', //req.headers['user-agent'],
        phoneModel: 'PC', //req.headers['user-agent'],
        type: 3
      })
      .then(resp => {
        let codes = encrypt(JSON.stringify({
          'X-I': resp['X-I'],
          'X-S': resp['X-S'],
          // 'phone': req.body.username,
          'IP': getClientIp(req)
        }));

        res.cookie('Auth-Codes', codes, { domain: config.domain, maxAge, httpOnly: true });
        res.redirect('/');
      })
    })
});

// https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101346160&redirect_uri=http%3A%2F%2Fwww.hotread.com%2Flogin%2Fqq
// QQ 第三方登录
router.get('/qq', (req, res) => {
  let { code } = req.query;
  if (!code) {
    res.redirect('/login');
    return false;
  }
  fetch(QQ_TOKEN_URL + code)
    .then(resp => resp.text())
    .catch(err => console.log('[warn] get QQ access token failed. ', err))
    .then(text => {
      let {
        access_token,
        expires_in,
        refresh_token
      } = queryString.parse(text);

      return fetch(QQ_OPENID + access_token)
        .then(resp => resp.text())
        .catch(err => console.log('[warn] get QQ openid failed. ', err))
        .then(text => {
          let {
            client_id,
            openid
          } = new Function(callback.toString() + 'return ' + text)();
          
          let url = QQ_USER_INFO.replace(/\$1/, access_token).replace(/\$2/, client_id).replace(/\$3/, openid);
          return fetch(url)
            .then(resp => resp.json())
            .catch(err => console.log('[warn] get QQ user info failed. ', err))
            .then(json => {
              return Object.assign({}, json, {openid});
            })
        })
    })
    .then(json => {
      // res.send(json)
      // console.log(json);
      loginThird({
        openId: json.openid,
        nickName: json.nickname,
        sex: QQ_GENDER[json.gender],
        location: json.province + json.city,
        country: '中国',
        description: 'QQ用户',
        other: '',
        headImgUrl: json.figureurl_2,
        loginSource: 'QQ',
        pushToken: 'PC', //req.headers['user-agent'],
        phoneModel: 'PC', //req.headers['user-agent'],
        type: 3
      })
      .then(resp => {
        let codes = encrypt(JSON.stringify({
          'X-I': resp['X-I'],
          'X-S': resp['X-S'],
          // 'phone': req.body.username,
          'IP': getClientIp(req)
        }));

        res.cookie('Auth-Codes', codes, { domain: config.domain, maxAge, httpOnly: true });
        res.redirect('/');
      })
    })
});

export default router;