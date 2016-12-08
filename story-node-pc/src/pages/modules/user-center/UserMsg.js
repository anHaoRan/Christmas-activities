import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
import fetch, { post } from '../../../utils/fetch';
import Avatar from '../../../components/Avatar';
import { updateCurrentUser } from '../../../actions/commonActions';

const updateUser = (dispatch, fetch) => {
  return fetch('/api/auth/user').then(resp => {
    return dispatch(updateCurrentUser(resp.data || {}));
  });
}

class UserMsg extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sex: '',
      nickName: '',
      faceUrl: ''
    };
  }

  uploadAvatar(evt) {
    let result = evt.target.contentWindow.document.body.querySelector('pre').innerHTML;
    this.refs.avatarUploadForm.reset();
    let json = JSON.parse(result);
    if (json.error === 0) {
      let url = json.message[0];
      this.setState({
        faceUrl: url
      });
    }
  }

  submitUpload(evt) {
    if (evt.target.value) {
      this.refs.avatarUploadForm.submit();
    }
  }

  saveUserInfo() {
    let {
      sex,
      nickName,
      faceUrl,
    } = this.state;

    if (!sex && !nickName && !faceUrl) {
      return false;
    }

    let { user, dispatch } = this.props;

    _loading();
    post('/api/user/modifyInfo', {
      body: {
        sex: sex || user.sex,
        nickName: nickName || user.nickName,
        faceUrl: faceUrl || user.face_url
      }
    }).then((resp) => {
      _loading(1);
      if (resp.errorCode > 0) {
        alert(resp.message);
      } else {
        _alertCenter('修改个人信息成功');
        updateUser(dispatch, fetch);
      }
    });
  }


  render() {
    let { display, user } = this.props;
    return (
      <div className="usermsg" style={{display:display ? 'block': 'none'}}>
        <div style={{overflow: 'hidden'}}>
          <div className="uploadingTx">
            <dl className="uploadingTxRect">
              <dt className="tx">
                <Avatar url={this.state.faceUrl || user.face_url} />
              </dt>
              <dd style={{overflow: 'hidden'}} className="btn blue">
                上传头像
                <iframe style={{display: 'none'}} name="uploadAvatar" onLoad={this.uploadAvatar.bind(this)}></iframe>
                <form ref="avatarUploadForm" action="/api/image/upload" method="post" target="uploadAvatar" encType="multipart/form-data">
                  <input 
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      fontSize: '100px',
                      opacity: 0
                    }}
                    onChange={this.submitUpload.bind(this)} type="file" name="uploadFile" accept=".jpg,.jpeg,.png,.gif" />
                </form>
              </dd>
            </dl>
            <p className="uploadingTxMsg">头像只支持JPG、PNG大小 不要超过2M </p>
          </div>
          <div className="usermsg-rect">
            <div className="nameRect">
              <label>昵称</label>
              <input type="text" className="nameTxt" defaultValue={user.nickName} onChange={({target}) => {
                this.setState({
                  nickName: target.value.trim()
                });
              }}/>
              <p className="nameMsg">昵称可以使用中英文或者数字符号，限制长度在10个汉字或者20个字符。</p>
            </div>
            <div className="sexRect">
              <label>性别</label>
              <div className="sexRect-box" onClick={() => this.setState({sex: '1'})}>
                <span className={'sex' + ( (this.state.sex || user.sex) === '1' ? ' checked' : '' )}><i></i></span> 男
              </div>
              <div className="sexRect-box" onClick={() => this.setState({sex: '0'})}>
                <span className={'sex' + ( (this.state.sex || user.sex) === '0' ? ' checked' : '' )}><i></i></span> 女
              </div>
            </div>
          </div>
        </div>
        <span className="stockpile-btn" onClick={this.saveUserInfo.bind(this)}>保存</span>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      user: state.common.user
    };
  }
)(UserMsg);