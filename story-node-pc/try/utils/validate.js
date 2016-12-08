var PHONE_REG = /^1[3|5|7|8]\d{9}$/;

function checkPhone(mobilePhone) {
  return PHONE_REG.test(mobilePhone);
};

exports.validateAuthor = function (data) {

  if (!checkPhone(data.mobilephone)) {
    return {
      error: 1,
      msg: '请输入正确的手机号码',
      target: 'mobilephone'
    };
  }

  if (!/^\d{4}$/.test(data.clientCode)) {
    return {
      error: 1,
      msg: '请输入4位数字验证码',
      target: 'clientCode'
    };
  }

  if (data.password.length < 6) {
    return {
      error: 1,
      msg: '请输入至少6位密码',
      target: 'password'
    };
  }

  if (data.password !== data.confirmPwd) {
    return {
      error: 1,
      msg: '两次密码输入不一致',
      target: 'confirmPwd'
    };
  }

  if (!data.name) {
    return {
      error: 1,
      msg: '请输入笔名',
      target: 'name'
    };
  }

  if (!data.introduce) {
    return {
      error: 1,
      msg: '请填写个人说明',
      target: 'introduce'
    };
  }

  if (!data.publishedStorys) {
    return {
      error: 1,
      msg: '请填写已发表过的作品说明',
      target: 'publishedStorys'
    };
  }

  if (!data.realName) {
    return {
      error: 1,
      msg: '请输入真实姓名',
      target: 'realName'
    };
  }

  if (!data.contactWay1) {
    return {
      error: 1,
      msg: '请输入QQ/MSN',
      target: 'contactWay1'
    };
  }

  if (!data.contactWay2) {
    return {
      error: 1,
      msg: '请输入联系地址',
      target: 'contactWay2'
    };
  }

  if (!data.contactWay3) {
    return {
      error: 1,
      msg: '请输入邮编',
      target: 'contactWay3'
    };
  }

  if (!data.paperType) {
    return {
      error: 1,
      msg: '请选择证件类型',
      target: 'paperType'
    };
  }

  if (!data.paperInfo) {
    return {
      error: 1,
      msg: '请输入证件号码',
      target: 'paperInfo'
    };
  }

  if (!data.bankAddress) {
    return {
      error: 1,
      msg: '请填写开户行全称',
      target: 'bankAddress'
    };
  }

  if (!data.bankCard) {
    return {
      error: 1,
      msg: '请填写银行账号',
      target: 'bankCard'
    };
  }

  return {error: 0};
};

exports.validateRegister = function (data) {
  if (!data.nickName) {
    return {
      error: 1,
      msg: '请输入用户名',
      target: 'nickName'
    };
  }

  if (!checkPhone(data.mobilePhone)) {
    return {
      error: 1,
      msg: '请输入正确的手机号码',
      target: 'mobilePhone'
    };
  }

  if (!/^\d{4}$/.test(data.clientCode)) {
    return {
      error: 1,
      msg: '请输入4位数字短信验证码',
      target: 'clientCode'
    };
  }

  if (!data.password) {
    return {
      error: 1,
      msg: '请输入登录密码',
      target: 'password'
    };
  }

  if (data.password !== data.confirmPassword) {
    return {
      error: 1,
      msg: '两次密码输入不一致',
      target: 'confirmPassword'
    };
  }

  if (!data.captcha || data.captcha.length !== 4) {
    return {
      error: 1,
      msg: '请输入4位图片验证码',
      target: 'code'
    };
  }

  return {error: 0};
}

exports.validateRecover = function (data) {
  if (!checkPhone(data.mobilePhone)) {
    return {
      error: 1,
      msg: '请输入正确的手机号码',
      target: 'mobilePhone'
    };
  }

  if (!/^\d{4}$/.test(data.clientCode)) {
    return {
      error: 1,
      msg: '请输入4位数字短信验证码',
      target: 'clientCode'
    };
  }

  if (!data.password) {
    return {
      error: 1,
      msg: '请输入登录密码',
      target: 'password'
    };
  }

  if (data.password !== data.confirmPassword) {
    return {
      error: 1,
      msg: '两次密码输入不一致',
      target: 'confirmPassword'
    };
  }

  return {error: 0};
}