import { Router } from 'express';
import path from 'path';
import { map } from 'lodash';
import Q from 'q';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

import configureStore from '../../src/store/configStore';
import RouterMap from '../../src/routerConfig';
import template from '../template';
// 服务端Fetch，避免接口参数暴露给浏览器
import fetch from '../api/fetch';
import routes from '../../src/pages/App';
import Header from '../../src/components/Header';
import { isOnlineUser } from '../utils';
import sysConfig from '../config';
import queryString from 'query-string';

const router = Router();

// 小说详情页和阅读页对接WAP站
function matchMobile(name, req, res) {
  let search = queryString.stringify(req.query);
  search = search ? ('?' + search) : '';
  if (name === 'reading') {
    let { storyId, volumeId, chapterId } = req.params;
    return sysConfig.mobile + 'story/reading/' + storyId + '/' + volumeId + '/' + chapterId + search;
  } else if (name === 'details') {
    return sysConfig.mobile + 'story/' + req.params.storyId + search;
  } else {
    return sysConfig.mobile;
  }
}

router.get('/details/:storyId', (req, res) => {
  let { isMobile } = req.useragent;
  let { storyId } = req.params;
  let url = '/story/' + storyId;
  if (isMobile) {
    res.redirect(sysConfig.mobile + url);
    return true;
  }
  res.redirect(url);
});

router.get('/reading/:storyId/:volumeId/:chapterId', (req, res) => {
  let { isMobile } = req.useragent;
  let { storyId, volumeId, chapterId } = req.params;
  let url = '/story/reading/' + storyId + '/' + volumeId + '/' + chapterId;
  if (isMobile) {
    res.redirect(sysConfig.mobile + url);
    return true;
  }
  res.redirect(url);
});

// 客户端服务端共用一套路由映射机制
map(RouterMap, (config) => {

  router.get(config.path, (req, res) => {
    // console.log('--------------------------------\n       %s   \n--------------------------------', req.originalUrl)
    let { isMobile, isMac, isWindows } = req.useragent;
    if (isMobile) {
      let url = matchMobile(config.name, req, res);
      res.redirect(url);
      return true;
    }
    
    // console.time('match');

    let isLogined = isOnlineUser(req);
    // 安全路由过滤
    if (config.auth && !isLogined) {
      res.redirect('/login?originalUrl=' + encodeURIComponent(req.originalUrl));
      return false;
    }
    
    let store = configureStore();

    match({
      routes: (<Router>{routes}</Router>),
      location: req.originalUrl
    }, (error, redirectLocation, renderProps) => {
      // console.timeEnd('match');
      // console.time('fetch');
      // 服务端获取异步数据，刷新Redux
      let { dispatch } = store;
      // console.log('logined: [ %s ]', isLogined)
      let fetchDatas = renderProps.components.filter(c => {
        return c && c.fetchData;
      }).concat(isLogined ? [Header] : []).map(c => {
        return c.fetchData(dispatch, fetch, req.query, req.params, req, isLogined);
      });

      Q.all(fetchDatas).then(() => {
        // console.timeEnd('fetch');
        // console.time('render');
        const initialState = store.getState();
        // console.log(initialState);
        let bodyHtml = renderToString((
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          ));
        template('default', {
          // 页面TITLE
          title: config.title,
          // React render内容
          body: bodyHtml,
          cdn: sysConfig.cdn,
          css: config.css || '',
          rootClass: 'root' + (isMac ? ' platform-mac' : '') + (isWindows ? ' platform-win' : ''),
          // 共享State数据
          initialState: JSON.stringify(initialState)
        }, (page) => {
          res.send(page);
        });
      });
    });
  });

});

export default router;