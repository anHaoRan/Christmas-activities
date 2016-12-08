import React, { Component } from 'react';
import { Link } from 'react-router';
import Menu from '../../components/Menu';
// import queryString from 'query-string';

export default class PayResult extends Component {

  // static fetchData(dispatch, fetch, query, params, request) {
  //   return fetch('/api/user/c/product/alipay/notify?' + queryString.stringify(query),{
  //     method: 'POST'
  //   }).then(resp => {
  //     console.log(resp);
  //   });
  // }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Menu />

        <div style={{
          width: '1002px',
          margin: '0 auto',
          padding: '100px 0 124px',
          textAlign: 'center',
          fontSize: '18px',
          color: '#f00'
        }}>
          恭喜您，充值成功！
          进入<Link to="/userCenter">个人中心</Link>，可以查看充值记录。
        </div>
      </div>
    );
  }
}