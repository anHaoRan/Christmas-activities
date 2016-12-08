import React, { Component } from 'react';
import { connect } from 'react-redux';
import { post } from '../../../utils/fetch';
import {
  updateLoginModalState
} from '../../../actions/commonActions';
import { checkPhone } from '../../../utils';
import { validateRecover } from '../../../utils/validate';

const COUNT = 60;

class Recover extends Component {

  constructor(props) {
    super(props);
    this.state = {
      seconds: COUNT,
      sending: false,
      errorTarget: '',
      mobilePhone: '',
      clientCode: '',
      password: '',
      confirmPassword: '',
    };
  }

  componentWillUnmount() {
    this.setState({
      sending: false,
      seconds: COUNT
    });
    window.clearTimeout(this.timer);
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
    post('/api/auth/message/recover/code', {
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

    this.timer = setTimeout(() => {
      count -= 1;
      this.startCounting(count);
    }, 1000);
  }

  getFormData() {
    let {
      mobilePhone,
      clientCode,
      password,
      confirmPassword,
    } = this.refs;

    return {
      mobilePhone: mobilePhone.value.trim(),
      clientCode: clientCode.value.trim(),
      password: password.value.trim(),
      confirmPassword: confirmPassword.value.trim(),
    };
  }

  doRecover(evt) {
    evt.preventDefault();

    let formData = this.getFormData();

    let {
      target,
      error,
      msg
    } = validateRecover(formData);

    this.setState({
      errorTarget: target || ''
    });

    if (error === 0) {

      post('/api/auth/recoverPwd', {
        body: formData
      }).then(resp => {
        let { target, error, msg } = resp;
        this.setState({
          errorTarget: target || ''
        });
        if (error > 0) {
          console.info('修改密码失败：', msg);
          alert(msg);
        } else {
          console.info('修改密码成功');
          _alertCenter('修改密码成功');
          this.context.router.replace('/login');
        }
      });

    } else {
      console.info('修改密码失败：', msg);
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

  render() {
    let { route } = this.props;
    return (
      <form onSubmit={this.doRecover.bind(this)} className="auth-form recover-modal">
        <span className="close-btn" onClick={this.closeModal.bind(this)}>&times;</span>
        <h2>忘记密码</h2>
        <div className="auth-switch">
          已有账号？
          <a href="javascript:void(0)" onClick={() => {this.props.onChange(1)}}>立即登录</a>
        </div>
        <div className="form-box no-icon">
          <div className="form-group">
            <div 
              className={'form-control mobile' + (this.state.mobilePhone ? ' has-value' : '')} 
              style={this.getValidateStyle('mobilePhone')}
              data-placeholder="请输入手机号" >
              <input type="text" 
                ref="mobilePhone"
                onChange={({target}) => {
                this.automaticValid('mobilePhone', target);
              }}/>
            </div>
          </div>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="submit-box">
            <input type="submit" value="确认修改" className="submit" />
          </div>
        </div>
      </form>
    )
  }


  closeModal() {
    this.props.dispatch(updateLoginModalState(false));
  }
}

export default connect()(Recover);