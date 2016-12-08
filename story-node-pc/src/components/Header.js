import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import fetch from '../utils/fetch';
import { map, find } from 'lodash';
import {
  updateSearchResultList
} from '../actions/searchActions';
import {
  updateLoginModalState,
  updateHeaderHotpushList,
  updateCurrentUser
} from '../actions/commonActions';
import routerList from '../routerConfig';
import Q from 'q';

const SEARCH = (dispatch, fetch, query) => {
  return fetch('/api/search/c/common/search?keyWord=' + query.keyWord).then(resp => {
    return dispatch(updateSearchResultList(resp.data));
  });
}

const LOGOUT = (dispatch, fetch, router) => {
  _loading();
  return fetch('/api/auth/logout').then(resp => {
    dispatch(updateCurrentUser({}));
    _loading(1);
    let route = find(routerList, (route) => {
      return route.path === location.pathname;
    });
    if (route && route.auth) {
      router.replace('/');
    }
    return true;
  });
}

class Header extends Component {

  static fetchData(dispatch, Fetch = fetch, query, params, request) {
    return Q.all([
      Fetch('/api/search/hot').then(resp => {
        return dispatch(updateHeaderHotpushList(resp.data));
      }),
      Fetch('/api/auth/user', {}, request).then(resp => {
        return dispatch(updateCurrentUser(resp.data || {}));
      })
    ]);
  }

  static headControl() {
    let menu = document.getElementById('hotr-nav');
    //let hotrWrap = document.getElementById('hotr-wrap');
    let header = document.getElementById('hotr-header');
    let isDetail = location.href.indexOf('/story/') > -1;
    if (menu) {
      if (window.scrollY > 245) {
        menu.style.position = 'fixed';
        header.style.marginBottom = isDetail ? '133px' : '83px';
      } else {
        menu.style.position = 'static';
        header.style.marginBottom = '0'
      }
    }
  }

  componentDidMount() {
    let { dispatch } = this.props;
    Header.fetchData(dispatch);
    window.onscroll = Header.headControl;
    Header.headControl();
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  constructor(props, context) {
    super(props);
  }

  search(evt) {
    evt.preventDefault();
    let value = this.refs.searchKey.value;
    let placeholder = this.refs.searchKey.placeholder;
    this.context.router.push('/search?keyWord=' + (value || placeholder));
    if (location.pathname.indexOf('/search') > -1) {
      let { dispatch } = this.props;
      SEARCH(dispatch, fetch, {
        keyWord: (value || placeholder)
      });
    }
  }

  clickEvent(keyWord) {
    if (location.pathname.indexOf('/search') > -1) {
      let { dispatch } = this.props;
      SEARCH(dispatch, fetch, {
        keyWord
      });
    }
    this.context.router.push('/search?keyWord=' + (keyWord || ''));
  }

  doLogout() {
    LOGOUT(this.props.dispatch, fetch, this.context.router);
  }

  openLoginModal(type) {
    this.props.dispatch(updateLoginModalState(type));
  }

  render() {
    let { headerHotpush, user, route } = this.props;
    let defaultSearch = '';
    if (headerHotpush.length) {
      defaultSearch = headerHotpush[0].keyWord;
    }
    return (
      <div className="hotr-header" id='hotr-header'>
        <div className="header-bg">
          <div className="header-main">
            <ul>
              <li className="logo">
                <Link to='/'>
                  <img src={route.indexRoute.CDN + '/assets/images/logo.png'} className="logo" alt=""/>
                </Link>
              </li>
              <li>
                <form className="header-search" onSubmit={this.search.bind(this)}>
                  <input type="text" ref="searchKey" 
                    autoComplete="off"
                    className="search-text" 
                    placeholder={defaultSearch} />
                  <input type="submit" value=" " className="search-btn"/>
                </form>
                <p className="header-recommend">
                  {
                    map(headerHotpush, (item, index) => {
                      return (
                        <a href='javascript:void(0)' key={index} onClick={() => this.clickEvent(item.keyWord)}>{item.keyWord}</a>
                      )
                    })
                  }
                </p>
              </li>
            </ul>
            {
              user.id ? (
                <div className="user-state">
                  <Link to="/userCenter">{user.nickName}</Link>
                  |
                  <a href="javascript:void(0)" onClick={this.doLogout.bind(this)}>退出</a>
                  |
                  <a href="http://author.hotread.com/login">作者中心</a>
                </div>
              ) : (
                <div className="user-state">
                  <a href="javascript:void(0)" onClick={this.openLoginModal.bind(this, 1)}>登录</a>
                  |
                  <a href="javascript:void(0)" onClick={this.openLoginModal.bind(this, 2)}>注册</a>
                  |
                  <a href="http://author.hotread.com/login">作者中心</a>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(
  (state) => {
    return {
      user: state.common.user,
      headerHotpush: state.common.headerHotpush
    };
  }
)(Header)
