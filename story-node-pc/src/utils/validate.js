import { checkPhone } from './index';

export function validateRegister(formData) {
  let {
    nickName,
    mobilePhone,
    clientCode,
    password,
    confirmPassword,
    captcha,
  } = formData;

  if (!nickName) {
    return {
      error: 1,
      msg: '请输入用户名',
      target: 'nickName'
    };
  }

  if (!checkPhone(mobilePhone)) {
    return {
      error: 1,
      msg: '请输入正确的手机号码',
      target: 'mobilePhone'
    };
  }

  if (!/^\d{4}$/.test(clientCode)) {
    return {
      error: 1,
      msg: '请输入4位数字短信验证码',
      target: 'clientCode'
    };
  }

  if (!password) {
    return {
      error: 1,
      msg: '请输入登录密码',
      target: 'password'
    };
  }

  if (password !== confirmPassword) {
    return {
      error: 1,
      msg: '两次密码输入不一致',
      target: 'confirmPassword'
    };
  }

  if (!captcha || captcha.length !== 4) {
    return {
      error: 1,
      msg: '请输入4位图片验证码',
      target: 'captcha'
    };
  }

  return {error: 0};
}

export function validateRecover(formData) {
  let {
    mobilePhone,
    clientCode,
    password,
    confirmPassword,
  } = formData;

  if (!checkPhone(mobilePhone)) {
    return {
      error: 1,
      msg: '请输入正确的手机号码',
      target: 'mobilePhone'
    };
  }

  if (!/^\d{4}$/.test(clientCode)) {
    return {
      error: 1,
      msg: '请输入4位数字短信验证码',
      target: 'clientCode'
    };
  }

  if (!password) {
    return {
      error: 1,
      msg: '请输入登录密码',
      target: 'password'
    };
  }

  if (password !== confirmPassword) {
    return {
      error: 1,
      msg: '两次密码输入不一致',
      target: 'confirmPassword'
    };
  }

  return {error: 0};
}