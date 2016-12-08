import aesjs from 'aes-js';
import crypto from 'crypto';

export function getClientIp(req) {
  return req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress;
}

export function validCaptcha(req) {
  let requireCode = req.body.captcha || '';
  let cookiCode = req.cookies.LJ;
  let requireCodeMD5 = crypto.createHash('md5').update(requireCode.toUpperCase(), 'utf-8').digest('hex');
  return requireCodeMD5 === cookiCode;
}

export function isOnlineUser(req) {
  if (!req.cookies) {
    return false;
  }

  let codes = req.cookies['Auth-Codes'];
  
  if (!codes) {
    return false;
  }

  let auth = JSON.parse(decrypt(codes));
  let ip = getClientIp(req);
  // console.log(auth)
  // auth['X-I']
  // auth['X-S']
  // return ip === auth['IP'] && auth['X-I'] && auth['X-S'];
  return auth['X-I'] && auth['X-S'];
}

const ENC_KEY = aesjs.util.convertStringToBytes('hjxenjoy@gmail.com#duyao');

export function encrypt(string) {
  let bytes = aesjs.util.convertStringToBytes(string);
  let ctr = new aesjs.ModeOfOperation.ctr(ENC_KEY, new aesjs.Counter(5));
  let encryptedBytes = ctr.encrypt(bytes);

  return Object.keys(encryptedBytes).map(function (key) {
    return encryptedBytes[key].toString(16);
  }).join('-');
}

export function decrypt(string) {
  let bytes = new Buffer(string.split('-').map(function (x) {
    return parseInt(x, 16);
  }));
  let ctr = new aesjs.ModeOfOperation.ctr(ENC_KEY, new aesjs.Counter(5));
  let decryptedBytes = ctr.decrypt(bytes);
  return aesjs.util.convertBytesToString(decryptedBytes);
}