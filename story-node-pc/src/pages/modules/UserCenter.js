import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import fetch, { post } from '../../utils/fetch';
import Menu from '../../components/Menu';

import BookRack from './user-center/BookRack';
import UserMsg from './user-center/UserMsg';
import AmendPassword from './user-center/AmendPassword';
import InfoCenter from './user-center/InfoCenter';
import AccountManage from './user-center/AccountManage';
import { updateCurrentUser } from '../../actions/commonActions';
import {
  updateUserShelf
} from '../../actions/userActions';
import Q from 'q';

class UserCenter extends Component {

  static fetchData(dispatch, Fetch=fetch, query, params, request) {
    return Q.all([
      Fetch('/api/auth/user', {}, request).then(resp => {
        return dispatch(updateCurrentUser(resp.data || {}));
      }),
      Fetch('/api/user/shelf', {}, request).then(resp => {
        return dispatch(updateUserShelf(resp.data));
      })
    ]);
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.styleMap.userCenter.disabled = false;
    }
  }

  componentWillUnmount() {
    window.styleMap.userCenter.disabled = true;
  }

  constructor(props) {
    super(props);
    this.state = {
      centerNav: 0,
      smallCenterNav: 0
    };
  }

  componentDidMount() {
    UserCenter.fetchData(this.props.dispatch);
  }

  render() {
    let { route } = this.props;
    let { centerNav, smallCenterNav } = this.state;
    return (
      <div>
        <link rel="stylesheet" href={route.CDN + '/assets/styles/userCenter.min.css'}/>
        <Menu />
        <div className="userCenter">
          <div className="userCenter-leftNav">
            <dl className={'userCenter-navList' + (centerNav == 0 ? ' on': '')} >
              <dt onClick={() => this.setState({centerNav: 0, smallCenterNav:0})}>我的书架</dt>
            </dl>
            <dl className={'userCenter-navList' + (centerNav == 1 ? ' on': '')} >
              <dt onClick={() => this.setState({centerNav: 1, smallCenterNav:1})}>我的账户<i></i></dt>
              <dd className={smallCenterNav == 1 ? 'on': ''} onClick={() => this.setState({smallCenterNav: 1, centerNav: 1})}>个人信息</dd>
              <dd className={smallCenterNav == 2 ? 'on': ''} onClick={() => this.setState({smallCenterNav: 2, centerNav: 1})}>修改密码</dd>
            </dl>
            {
              // <dl className={'userCenter-navList' + (centerNav == 2 ? ' on': '')}>
              //   <dt onClick={() => this.setState({centerNav: 2, smallCenterNav:0})}>消息中心</dt>
              // </dl>
            }
            <dl className={'userCenter-navList' + (centerNav == 3 ? ' on': '')}>
              <dt onClick={() => this.setState({centerNav: 3, smallCenterNav:0})}>账户管理</dt>
            </dl>
          </div>
          <div className="userCenter-rightBox">
              <BookRack {...this.props} display={this.state.centerNav == 0 ? 1: 0} />
              <UserMsg {...this.props} display={this.state.smallCenterNav == 1 ? 1: 0} />
              <AmendPassword {...this.props} display={this.state.smallCenterNav == 2 ? 1: 0} />
              {
                // <InfoCenter {...this.props} display={this.state.centerNav == 2 ? 1: 0} />
              }
              <AccountManage {...this.props} display={this.state.centerNav == 3 ? 1: 0} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      user: state.common.user,
      shelf: state.user.shelf,
      notice: state.user.notice,
      comment: state.user.comment,
      recomment: state.user.recomment,
      payRecord: state.user.payRecord,
      payChapterConsumeRecord: state.user.payChapterConsumeRecord,
      rewardConsumeRecord: state.user.rewardConsumeRecord,
      voteConsumeRecord: state.user.voteConsumeRecord,
    };
  }
)(UserCenter);