import apiMapping from './apiMapping';
import config from '../config';
import { decrypt } from '../utils';
import queryString from 'query-string';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const isPro = process.env.NODE_ENV === 'production';

export function login(body) {
  // console.log('login ', body);
  return fetch(apiMapping.login, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: body.username,
        password: body.password
      })
    })
    .then(resp => {
      return resp.json().then((json) => {
        return {
          result: json,
          'X-I': resp.headers.get('X-I'),
          'X-S': resp.headers.get('X-S')
        };
      })
    })
    .catch(err => console.log('[warn] Restful Login failed. ', err));
}

export function loginThird(body) {
  return fetch(apiMapping.thirdLogin, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then(resp => {
      return resp.json().then((json) => {
        return {
          result: json,
          'X-I': resp.headers.get('X-I'),
          'X-S': resp.headers.get('X-S')
        };
      })
    })
    .catch(err => console.log('[warn] Third Restful Login failed. ', err));
}

export function register(body) {
  return fetch(apiMapping.register, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then(resp => {
      return resp.json().then((json) => {
        return {
          result: json,
          'X-I': resp.headers.get('X-I'),
          'X-S': resp.headers.get('X-S')
        };
      })
    })
    .catch(err => console.log('[warn] Restful Register failed. ', err));
}

export function recover(body) {
  return fetch(apiMapping.recover, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .catch(err => console.log('[warn] Restful Recover failed. ', err));
}

export default (url, options={}, request) => {
  let wholeUrl = apiMapping[url];
  // 自定义动态参数，无法绝对匹配
  if (!wholeUrl) {
    // 去除类似/api/home的部分
    // 此时要求前端接口地址的抬头有而且必须有两层
    wholeUrl = config.api + url.replace(/\/[^\/]+\/[^\/]+/, '');
  }

  options.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  if (request && request.cookies) {
    let { cookies } = request;
    let codes = cookies['Auth-Codes'];

    if (codes) {
      let auth = JSON.parse(decrypt(codes));
      options.headers['X-I'] = auth['X-I'];
      options.headers['X-S'] = auth['X-S'];
    }
  }

  if (!isPro) {
    console.log('\n[log] Fetch Restful API URL [ %s ]', wholeUrl);
    if (options.method === 'POST') {
      let logdash = '---------------------------------------------------';
      console.log(logdash, '\n option body \n \n', options.body, '\n', logdash, '\n');
    }
  }

  options.body = JSON.stringify(options.body);
  
  return fetch(wholeUrl, options).then(resp => {
    return resp.json();
  }).catch(err => console.log('[warn] Restful Fetch failed. \n----[url]', wholeUrl, '\n----[err]', err));
};

export function wxPayNotify(body) {
  let wholeUrl = apiMapping.wxnotify;
  let options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: body
  };
  
  return fetch(wholeUrl, options).then(resp => {
    return resp.text();
  }).catch(err => console.log('[warn] Restful Fetch failed. \n----[url]', wholeUrl, '\n----[err]', err));
};

export function alipayNotify(body) {
  let wholeUrl = apiMapping.alipaynotify;
  let options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  console.log(wholeUrl + '?' + queryString.stringify(body));
  
  return fetch(wholeUrl + '?' + queryString.stringify(body), options).then(resp => {
    return resp.text();
  }).catch(err => console.log('[warn] Restful Fetch failed. \n----[url]', wholeUrl, '\n----[err]', err));
};