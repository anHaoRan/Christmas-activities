import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { post } from '../../../utils/fetch';

export default class AmendPassword extends Component {

  constructor(props) {
    super(props);
  }

  savePassword(evt) {
    evt.preventDefault();
    let {
      oldPassword,
      newPassword,
      newConfirmPassword,
    } = this.refs;

    let oldPwd = oldPassword.value.trim();
    let newPwd = newPassword.value.trim();
    let newCon = newConfirmPassword.value.trim();

    if (!oldPwd) {
      _alertCenter('请输入原密码');
      return false;
    }

    if (!newPwd) {
      _alertCenter('请输入新密码');
      return false;
    }

    if (newPwd !== newCon) {
      _alertCenter('两次密码输入不一致');
      return false;
    }

    post('/api/user/modifyPwd', {
      body: {
        oldPwd,
        newPwd
      }
    }).then((resp) => {
      if (resp.errorCode > 0) {
        alert(resp.message);
      } else {
        alert(resp.data);
        oldPassword.value = '';
        newPassword.value = '';
        newConfirmPassword.value = '';
      }
    });
  }

  render() {
    let { display } = this.props;
    return (
      <form onSubmit={this.savePassword.bind(this)} className="amendpassword" style={{display:display?'block': 'none'}}>
        <p>
          <label htmlFor="">原密码</label>
          <input type="password" autoComplete="off" ref="oldPassword" placeholder="原来的密码" />
        </p>
        <p>
          <label htmlFor="">新密码</label>
          <input type="password" autoComplete="off" ref="newPassword" placeholder="请输入不少于6位的新密码" />
        </p>
        <p>
          <label htmlFor="">确认密码</label>
          <input type="password" autoComplete="off" ref="newConfirmPassword" placeholder="确认密码" />
        </p>
        <input type="submit" value="保存" style={{display: 'none'}}/>
        <span className="stockpile-btn" onClick={this.savePassword.bind(this)}>保存</span>
      </form>
    );
  }
}