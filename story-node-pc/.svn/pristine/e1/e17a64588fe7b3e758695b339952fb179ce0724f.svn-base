import React, { Component } from 'react';
import { Link } from 'react-router';
import { post } from '../../../utils/fetch';
import queryString from 'query-string';
import {loginQQ, loginWB} from '../../../../config';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      captcha: '/api/captcha/code',
      error: '',
      username: '',
      password: '',
      code: ''
    };
  }

  componentDidMount() {
    this.updateCaptcha();
  }

  updateCaptcha() {
    this.setState({
      captcha: '/api/captcha/code?t=' + (new Date - 0)
    });
  }

  doLogin(evt) {
    evt.preventDefault();
    post('/api/auth/login', {
      body: {
        username: this.refs.username.value,
        password: this.refs.password.value,
        captcha: this.refs.captcha.value
      }
    }).then(json => {
      if (json.error === 0) {
        console.info('登录成功');
        _alertCenter('登录成功');
        this.setState({
          error: ''
        });
        let query = queryString.parse(location.search);
        let originalUrl = decodeURIComponent(query.originalUrl || '');
        this.context.router.replace(originalUrl || '/');
      } else {
        console.info('登录失败 %s', json.msg);
        this.setState({
          error: json.msg
        });
        _alertCenter(json.msg, 'error');
      }
    });
  }

  render() {
    let { route } = this.props;
    return (
      <div className="container clearfix">
        <div className="auth-banner">
          <Link to="/">
            <img src={route.CDN + '/assets/images/logo.png'} className="logo" />
          </Link>
        </div>
        <form onSubmit={this.doLogin.bind(this)} className="auth-form">
          <h2>登录</h2>
          <div className="auth-switch">
            <Link to="/recover">忘记密码？</Link>
            <Link to="/register">立即注册</Link>
          </div>
          <div className="form-box">
            <div className="form-group account">
              <div className={'form-control' + (this.state.username ? ' has-value' : '')} data-placeholder="请输入手机号码">
                <input type="text" ref="username" onChange={(evt) => {
                  this.setState({
                    username: evt.target.value
                  });
                }}/>
              </div>
            </div>
            <div className="form-group password">
              <div className={'form-control' + (this.state.password ? ' has-value' : '')} data-placeholder="请输入密码">
                <input type="password" ref="password" onChange={(evt) => {
                  this.setState({
                    password: evt.target.value
                  });
                }}/>
              </div>
            </div>
            <div className="form-group verify-box">
              <div className={'form-control' + (this.state.code ? ' has-value' : '')} data-placeholder="请输入验证码">
                <input type="text" ref="captcha" onChange={(evt) => {
                  this.setState({
                    code: evt.target.value
                  });
                }}/>
              </div>
              <img src={this.state.captcha} className="verify" onClick={this.updateCaptcha.bind(this)}/>
              <span className="verify-btn" onClick={this.updateCaptcha.bind(this)}>换一换</span>
            </div>
            <div className="submit-box">
              <input type="submit" value="登录" className="submit" />
            </div>
          </div>
          <div className="third-login">
            <strong>第三方登录</strong>
            <a className="third-btn qq" href={loginQQ}>QQ登录</a>
            <a className="third-btn weibo" href={loginWB}>微博登录</a>
          </div>
        </form>
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};