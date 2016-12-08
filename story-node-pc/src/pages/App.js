import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Wrap from './Wrap';
import NotFound from './NotFound';
import fetch from '../utils/fetch';
import { filter, map, find } from 'lodash';
import RouterList from '../routerConfig';
import config from '../../config';
import * as methodMap from './pages';
import queryString from 'query-string';
const getComponent = (method) => methodMap[method];
let AsyncRouterList = filter(RouterList, (item) => {
  return !item.sync;
});

// 安全路由过滤
const checkAuth = (nextState, replace, callback) => {
  if (typeof window === 'undefined') {
    callback();
  } else {
    
    let { location } = nextState;
    // 增加异步百度统计
    // console.log('准备百度统计', window._hmt);
    if (window._hmt && window._hmt.push) {
      _hmt.push(['_trackPageview', location.pathname + location.search]);
    }
    if (window.scrollY > 245) {
      window.scrollTo(0, 246);
    } else {
      window.scrollTo(0, 0);
    }
    let route = find(RouterList, (route) => {
      return route.path === location.pathname;
    });
    if (route && route.auth) {
      fetch('/api/auth/user?t=' + (new Date - 0)).then(resp => {
        if (!resp.data) {
          replace('/login?originalUrl=' + encodeURIComponent(location.pathname + location.search));
          callback();
        } else {
          callback();
        }
      });
    } else {
      callback();
    }
  }
}

// 所有异步加载的页面
let asyncRoutes = map(AsyncRouterList, (item, index) => {
  return (
    <Route {...item} CDN={config.cdn} getComponent={getComponent(item.method)} key={index} onEnter={checkAuth} />
  );
});

export default (
  <Route path="/" component={Wrap}>
    <IndexRoute CDN={config.cdn} getComponent={getComponent('getComponentIndex')} />
    {asyncRoutes}
    <Route CDN={config.cdn} name="notfound" path="*" component={NotFound} />
  </Route>
)
