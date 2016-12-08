import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetch, { post } from '../../../utils/fetch';
import { checkPhone } from '../../../utils';
import { validateRegister } from '../../../utils/validate';
import {
  updateCurrentUser,
  updateLoginModalState
} from '../../../actions/commonActions';
import {loginQQ, loginWB} from '../../../../config';

const COUNT = 60;

class Register extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      captchaUrl: '/api/captcha/code',
      seconds: COUNT,
      sending: false,
      errorTarget: '',
      nickName: '',
      mobilePhone: '',
      clientCode: '',
      password: '',
      confirmPassword: '',
      captcha: '',
    };
  }

  componentDidMount() {
    this.updateCaptcha();
  }

  updateCaptcha() {
    this.setState({
      captchaUrl: '/api/captcha/code?t=' + (new Date - 0)
    });
  }

  sendMessageCode() {
    let { sending } = this.state;
    if (sending) {
      return false;
    }
    let mobilePhone = this.refs.mobilePhone.value.trim();
    if (!checkPhone(mobilePhone)) {
      _alertCenter('请输入正确的手机号码', 'error', 300);
      return false;
    }
    _loading();
    post('/api/auth/message/code', {
      body: {
        mobilePhone
      }
    }).then((resp) => {
      _loading(1);
      if (resp.errorCode > 0) {
        _alertCenter(resp.message, 'error', 300);
        this.setState({
          sending: false,
          seconds: COUNT
        });
      } else {
        this.startCounting();
      }
    });
  }

  startCounting(count=COUNT) {
    this.setState({
      sending: true,
      seconds: count
    });

    if (count === 0) {
      this.setState({
        sending: false,
        seconds: COUNT
      });
      return false;
    }
    setTimeout(() => {
      count -= 1;
      this.startCounting(count);
    }, 1000);
  }

  getFormData() {
    let {
      nickName,
      mobilePhone,
      clientCode,
      password,
      confirmPassword,
      captcha,
    } = this.refs;

    return {
      nickName: nickName.value.trim(),
      mobilePhone: mobilePhone.value.trim(),
      clientCode: clientCode.value.trim(),
      password: password.value.trim(),
      confirmPassword: confirmPassword.value.trim(),
      captcha: captcha.value.trim(),
    };
  }

  register(evt) {
    evt.preventDefault();

    let formData = this.getFormData();

    let {
      target,
      error,
      msg
    } = validateRegister(formData);

    this.setState({
      errorTarget: target || ''
    });

    if (error === 0) {
      _loading();
      post('/api/auth/register', {
        body: formData
      }).then(resp => {
        _loading(1);
        let { target, error, msg } = resp;
        this.setState({
          errorTarget: target || ''
        });
        if (error > 0) {
          console.info('注册出错：', msg);
          alert(msg);
        } else {
          console.info('注册成功');
          _alertCenter('注册成功');
          let { dispatch } = this.props;
          fetch('/api/auth/user?t=' + (new Date - 0), {}).then(resp => {
            return dispatch(updateCurrentUser(resp.data || {}));
          }).then(() => {
            dispatch(updateLoginModalState(false));
          });
        }
      });

    } else {
      console.info('注册出错：', msg);
      alert(msg);
    }
  }

  getValidateStyle(target) {
    if (target === this.state.errorTarget) {
      return { 'borderColor': '#f00' };
    }
    return {};
  }

  automaticValid(target, node) {
    let { errorTarget } = this.state;
    let json = {};
    json[target] = node.value;
    this.setState(json);
    let value = node.value.trim();
    let clean = false;
    // 如果正在编辑的是标记验证失败的那个
    if (target === errorTarget) {
      switch(target) {
        case 'nickName': {
          clean = !!value;
          break;
        }
        case 'mobilePhone': {
          clean = checkPhone(value);
          break;
        }
        case 'clientCode': {
          clean = /^\d{4}$/.test(value);
          break;
        }
        case 'password': {
          clean = !!value;
          break;
        }
        case 'confirmPassword': {
          clean = value === this.refs.password.value.trim();
          break;
        }
        case 'captcha': {
          clean = value.length === 4;
          break;
        }
      }
    } else {
      if (errorTarget === 'confirmPassword' && target === 'password') {
        clean = value === this.refs.confirmPassword.value.trim();
      }
    }

    if (clean) {
      this.setState({
        errorTarget: ''
      });
    }
  }

  renderCodeBtn() {
    let { sending, seconds } = this.state;
    if (sending) {
      return (<span className="get">{seconds}s后重新获取</span>);
    }
    return (<span className="get" onClick={this.sendMessageCode.bind(this)}>获取短信验证码</span>);
  }

  closeModal() {
    this.props.dispatch(updateLoginModalState(false));
  }

  render() {
    return (
      <form onSubmit={this.register.bind(this)} className="auth-form register-modal">
        <span className="close-btn" onClick={this.closeModal.bind(this)}>&times;</span>
        <h2>注册</h2>
        <div className="auth-switch">已有账号？<a href="javascript:void(0)" onClick={() => {this.props.onChange(1)}}>立即登录</a></div>
        <div className="form-box">
          <div className="form-group account">
            <div 
              className={'form-control' + (this.state.nickName ? ' has-value' : '')} 
              style={this.getValidateStyle('nickName')}
              data-placeholder="给自己设置一个牛逼的昵称吧~" >
              <input type="text" 
                ref="nickName"
                onChange={({target}) => {
                this.automaticValid('nickName', target);
              }}/>
            </div>
          </div>
          <div className="form-group phone">
            <div 
              className={'form-control' + (this.state.mobilePhone ? ' has-value' : '')} 
              style={this.getValidateStyle('mobilePhone')}
              data-placeholder="请输入11位手机号" >
              <input type="text" 
                ref="mobilePhone"
                onChange={({target}) => {
                this.automaticValid('mobilePhone', target);
              }}/>
            </div>
          </div>
          <div className="form-group note">
            <div 
              className={'form-control' + (this.state.clientCode ? ' has-value' : '')} 
              style={this.getValidateStyle('clientCode')}
              data-placeholder="请输入短信验证码" >
              <input type="text" 
                ref="clientCode"
                onChange={({target}) => {
                this.automaticValid('clientCode', target);
              }}/>
            </div>
            {this.renderCodeBtn()}
          </div>
          <div className="form-group password">
            <div 
              className={'form-control' + (this.state.password ? ' has-value' : '')} 
              style={this.getValidateStyle('password')}
              data-placeholder="请输入密码" >
              <input type="password" 
                ref="password"
                onChange={({target}) => {
                this.automaticValid('password', target);
              }}/>
            </div>
          </div>
          <div className="form-group password-confirm">
            <div 
              className={'form-control' + (this.state.confirmPassword ? ' has-value' : '')} 
              style={this.getValidateStyle('confirmPassword')}
              data-placeholder="请确认密码" >
              <input type="password" 
                ref="confirmPassword"
                onChange={({target}) => {
                this.automaticValid('confirmPassword', target);
              }}/>
            </div>
          </div>
          <div className="form-group verify-box">
            <div 
              className={'form-control' + (this.state.captcha ? ' has-value' : '')} 
              style={this.getValidateStyle('captcha')}
              data-placeholder="请输入验证码">
              <input type="text" 
                ref="captcha"
                onChange={({target}) => {
                this.automaticValid('captcha', target);
              }}/>
            </div>
            <img src={this.state.captchaUrl} className="verify" onClick={this.updateCaptcha.bind(this)} />
            <span className="verify-btn" onClick={this.updateCaptcha.bind(this)} >换一换</span>
          </div>
          <div className="submit-box">
            <input type="submit" value="注册" className="submit" />
          </div>
        </div>
        <div className="third-login">
          <strong>第三方登录</strong>
          <a href={loginQQ} className="third-btn qq">QQ登录</a>
          <a href={loginWB} className="third-btn weibo">微博登录</a>
        </div>
      </form>
    );
  }
}

export default connect()(Register);