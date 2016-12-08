import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pathname: '/3ufafau3orfs'
    };
  }

  componentDidMount() {
    this.setState({
      pathname: location.pathname
    });
  }

  render() {
    return (
      <div style={{zIndex:6,top:0,left:0}} id='hotr-nav' className="hotr-nav">
        <ul className="nav-main win-head">
          <li className={this.state.pathname === '/' ? 'on' : ''}>
            <Link to="/">首页</Link>
          </li>
          <li className={this.state.pathname === '/girl' ? 'on' : ''}>
            <Link to="/girl">女频</Link>
          </li>
          <li className={this.state.pathname === '/boy' ? 'on' : ''}>
            <Link to="/boy">男频</Link>
          </li>
          <li className={this.state.pathname === '/chart' ? 'on' : ''}>
            <Link to="/chart">排行</Link>
          </li>
          <li className={this.state.pathname === '/library' ? 'on' : ''}>
            <Link to="/library">书库</Link>
          </li>
          <li className={this.state.pathname === '/copyright' ? 'on' : ''}>
            <a href="/copyright" target="_blank">优质版权</a>
          </li>
          <li className={this.state.pathname === '/pay' ? 'on' : ''}>
            <Link to="/pay">充值</Link>
          </li>
          <li><a href="http://author.hotread.com/boon" target="_blank">福利</a></li>
          <li className={this.state.pathname === '/download' ? 'on' : ''}>
            <a href="/download" target="_blank">下载客户端</a>
          </li>
        </ul>
      </div>
    );
  }
}