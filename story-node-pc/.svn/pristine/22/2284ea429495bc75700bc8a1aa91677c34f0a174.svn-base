import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../../components/Menu';
import PayComponent from './pay/PayComponent';
import fetch from '../../utils/fetch';
import { updateProductList } from '../../actions/payActions';
import {
  updateCurrentUser
} from '../../actions/commonActions';

const FetchUserInfo = (dispatch, Fetch) => {
  return Fetch('/api/auth/user?t=' + (new Date - 0), {}).then(resp => {
    return dispatch(updateCurrentUser(resp.data || {}));
  });
}

class Pay extends Component {

  static fetchData(dispatch, fetch) {
    return fetch('/api/details/c/product/goldProducts').then((resp) => {
      return dispatch(updateProductList(resp.data));
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      opened: 'none'
    };
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.styleMap.topUp.disabled = false;
    }
  }

  componentWillUnmount() {
    window.styleMap.topUp.disabled = true;
  }

  componentDidMount() {
    Pay.fetchData(this.props.dispatch, fetch);
  }

  render() {
    let { route } = this.props;
    return (
      <div>
        <link rel="stylesheet" href={route.CDN + '/assets/styles/topUp.min.css'}/>
        <Menu/>
        <PayComponent {...this.props} 
          updateUser={() => {
            FetchUserInfo(this.props.dispatch, fetch);
          }}
          onPaying={() => {
            this.setState({opened: 'block'});
          }}/>
        <div className="popup-box" style={{
          display: this.state.opened,
          position: 'fixed',
          zIndex: 99999
        }}>
          <div className="pop-msg" style={{display: 'block'}}>
            <h2 className="msg-title">完成付款</h2>
            <p>付款完成前请不要关闭此窗口，完成付款后请根据您的情况 点击下面的按钮：</p>
            <span>请在新开页面完成付款后再选择</span>
            <ul>
              <li onClick={() => {
                this.setState({opened: 'none'});
                FetchUserInfo(this.props.dispatch, fetch);
              }}>已完成付款</li>
              <li onClick={() => this.setState({opened: 'none'})}>选择其他支付方式</li>
            </ul>
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
      productList: state.pay.productList
    };
  }
)(Pay);