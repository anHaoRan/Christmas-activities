import config from '../../config';
const isPro = process.env.NODE_ENV === 'production';
require('es6-promise').polyfill();
require('isomorphic-fetch');

export default (url, options={}) => {
  if (url.indexOf('/api/auth/user') > -1) {
    _loading();
  }
  let wholeUrl = config.host + url;
  if (!isPro) {
    console.log('\nBrowser Fetch URL %c[ %s ]\n\n', 'color: #099', wholeUrl);
  }
  options.credentials = 'same-origin';
  options.headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'pragma': 'no-cache',
    'cache-control': 'no-cache',
  };
  return fetch(wholeUrl, options).then(resp => {
    _loading(1);
    return resp.json();
  }).catch(err => console.warn('Fetch failed. %s\n%s', wholeUrl, err));
};

export function get(url) {
  let wholeUrl = config.host + url;
  if (!isPro) {
    console.log('\nBrowser Fetch [GET] URL %c[ %s ]\n\n', 'color: #099', wholeUrl);
  }
  return fetch(wholeUrl, {
    'credentials': 'same-origin',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'pragma': 'no-cache',
      'cache-control': 'no-cache',
    }
  }).then(resp => resp.json()).catch(err => console.warn('Get Fetch failed. %s\n%s', wholeUrl, err));
};

export function post(url, options={}) {
  let wholeUrl = config.host + url;
  options.method = 'POST';
  options.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'pragma': 'no-cache',
    'cache-control': 'no-cache',
  };
  options.credentials = 'same-origin';
  options.body = JSON.stringify(options.body);
  if (!isPro) {
    console.log('\nBrowser Fetch [POST] URL %c[ %s ]\n\n', 'color: #099', wholeUrl);
  }
  return fetch(wholeUrl, options).then(resp => resp.json()).catch(err => console.warn('POST Fetch failed.%s\n%s', url, err));
}