import { Router } from 'express';
import fetch, { login, register, recover } from '../fetch';
import {
  encrypt,
  getClientIp
} from '../../utils';
import { isOnlineUser, validCaptcha } from '../../utils';
import { validateRegister, validateRecover } from '../../../src/utils/validate';
import config from '../../config';

const router = Router();
const maxAge = config.cookieMaxAge;

// 当前用户
router.get('/user', (req, res) => {
  if (isOnlineUser(req)) {
    fetch('/api/auth/user', {}, req).then((resp) => {
      // console.log('[log] online user: ', resp.data);
      res.send(resp);
    });
  } else {
    res.send({});
  }
});

// 请求登录
router.post('/login', (req, res) => {
  if (!validCaptcha(req)) {
    res.send({
      error: 1,
      msg: '验证码不正确'
    });
  } else {
    login(req.body).then((resp) => {
      let { result } = resp;
      if (result.errorCode > 0) {
        res.send({
          error: 1,
          msg: result.message
        });
      } else {
        let codes = encrypt(JSON.stringify({
          'X-I': resp['X-I'],
          'X-S': resp['X-S'],
          // 'phone': req.body.username,
          'IP': getClientIp(req)
        }));

        res.cookie('Auth-Codes', codes, { domain: config.domain, maxAge, httpOnly: true });

        res.send({
          error: 0
        });
      }
    });
  }
});

// 请求注册
router.post('/register', (req, res) => {
  let result = validateRegister(req.body);
  if (result.error > 0) {
    res.send(result);
    return false;
  }

  if (!validCaptcha(req)) {
    res.send({
      error: 1,
      msg: '验证码不正确',
      target: 'captcha'
    });
  } else {
    register(req.body).then((resp) => {
      let { result } = resp;
      if (result.errorCode > 0) {
        res.send({
          error: 1,
          msg: result.message
        });
      } else {

        let codes = encrypt(JSON.stringify({
          'X-I': resp['X-I'],
          'X-S': resp['X-S'],
          'IP': getClientIp(req)
        }));

        res.cookie('Auth-Codes', codes, { domain: config.domain, maxAge, httpOnly: true });

        res.send({
          error: 0
        });
      }
    });
  }
});

// 忘记密码
router.post('/recoverPwd', (req, res) => {
  let result = validateRecover(req.body);
  if (result.error > 0) {
    res.send(result);
    return false;
  }
  recover(req.body).then((resp) => {
    if (resp.errorCode > 0) {
      res.send({
        error: 1,
        msg: resp.message
      });
    } else {
      res.send({
        error: 0
      });
    }
  });
});

// 请求退出
router.get('/logout', (req, res) => {
  res.clearCookie('Auth-Codes', { domain: config.domain, maxAge, httpOnly: true });
  res.send({});
});

// 发送短信验证码
router.post('/message/code', (req, res) => {
  fetch('/message/code', {
    method: 'POST',
    body: req.body
  }).then((resp) => {
    res.send(resp);
  });
});

// 发送找回密码验证码
router.post('/message/recover/code', (req, res) => {
  fetch('/message/recover/code', {
    method: 'POST',
    body: req.body
  }).then((resp) => {
    res.send(resp);
  });
});

export default router;
