import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginModal from './modules/LoginModal';
import { find, indexOf } from 'lodash';
import RouterList from '../routerConfig';
const SP = ['/login', '/register', '/recover'];

export default class Wrap extends Component {

  changeTitle() {
    if (typeof window === 'undefined') {
      return false;
    }
    let { location } = this.props;
    let pathname = location.pathname;
    let current = find(RouterList, (route) => {
      return route.path === pathname;
    }) || {};
    if (current.title && current.title !== '首页') {
      document.title = '火星小说 ' + current.title;
    } else {
      document.title = '火星小说';
    }
  }

  render() {
    // this.changeTitle();
    let { location, opened, route } = this.props;
    if (indexOf(SP, location.pathname) > -1) {
      return (<div>{this.props.children}<Footer route={route} /></div>);
    }
    if (location.pathname.indexOf('/reading') > -1) {
      return (<div>{this.props.children}<LoginModal /></div>);
    }
    return (
      <div>
        <Header route={route}/>
          {this.props.children}
        <Footer route={route}/>
        <LoginModal />
      </div>
    );
  }
}