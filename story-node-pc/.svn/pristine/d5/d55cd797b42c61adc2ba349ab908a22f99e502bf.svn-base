var express = require('express');
var router = express.Router();
var Q = require('q');
var qs = require('query-string');
var utils = require('../utils');
var config = require('../config');
var commomQuery = require('../query/common');
var homeQuery = require('../query/home');
var channelQuery = require('../query/channel');
var copyrightQuery = require('../query/copyright');
var storyQuery = require('../query/story');
var auth = require('../query/auth');
var pay = require('../query/pay');

// 首页
router.get('/', function(req, res) {
  var staticData = Object.assign({
    nav: 'home',
    css: 'index.min.css'
  }, utils.commonData(req));

  Q.all([
    commomQuery.hot(),
    commomQuery.onlineUser(req),
    homeQuery.slider(),
    homeQuery.infor(),
    homeQuery.bigleft(),
    homeQuery.smallleft(),
    homeQuery.bigright(),
    homeQuery.smallright(),
    homeQuery.girlPopular(),
  ]).then(function (result) {
    var data = utils.pushArray(result, staticData);
    res.render('index', data);
  });
});

// 个人中心
router.get('/userCenter', function (req, res) {

  if (!utils.isOnlineUser(req)) {
    res.redirect('/login?originalUrl=' + encodeURIComponent(req.originalUrl));
    return false;
  }

  var staticData = Object.assign({
    nav: 'userCenter',
    css: 'userCenter.min.css',
    query: req.query
  }, utils.commonData(req));

  Q.all([
    commomQuery.hot(),
    commomQuery.onlineUser(req),
  ]).then(function (result) {
    var data = utils.pushArray(result, staticData);
    res.render('user-center', data);
  });
});

// 充值
router.get('/pay', function (req, res) {

  if (!utils.isOnlineUser(req)) {
    res.redirect('/login?originalUrl=' + encodeURIComponent(req.originalUrl));
    return false;
  }

  var staticData = Object.assign({
    nav: 'topUp',
    css: 'topUp.min.css'
  }, utils.commonData(req));

  Q.all([
    commomQuery.hot(),
    commomQuery.products(),
    commomQuery.onlineUser(req),
  ]).then(function (result) {
    var data = utils.pushArray(result, staticData);
    res.render('pay', data);
  });
});

// 详情页
router.get('/story/:id', detail);
router.get('/details/:id', function (req, res) {
  var search = qs.stringify(req.query);
  var storyId = req.params.id;
  var url = '/story/' + storyId + (search ? ('?' + search) : '' );
  if (req.useragent.isMobile) {
    url = config.mobile + url;
  }
  res.redirect(url);
});

function detail(req, res, next) {
  var storyId = req.params.id;
  if (req.useragent.isMobile) {
    var search = qs.stringify(req.query);
    var url = '/story/' + storyId + (search ? ('?' + search) : '' );
    url = config.mobile + url;
    res.redirect(url);
    return true;
  }

  // 统计
  storyQuery.collect({
    storyId: storyId,
    chapterId: 0,
    uri: 'story/' + storyId,
    page: 'profile',
    action: 'visit',
    ip: utils.getClientIp(req)
  });

  var staticData = Object.assign({
    nav: 'detail',
    css: 'details.min.css',
    query: req.query
  }, utils.commonData(req));

  Q.all([
    commomQuery.hot(),
    commomQuery.onlineUser(req),
    storyQuery.detail(storyId),
    storyQuery.readChapter(storyId)
  ]).then(function (result) {
    var data = utils.pushArray(result, staticData);
    if (!data.story || !data.story.id) {
      next();
    } else {
      data.title = '《' + data.story.name + '》| ' + data.story.author + ' 著 • 火星小说';
      data.keywords = data.story.name + ',' + data.story.author + ',' + data.story.type;
      data.description = data.story.name + ',' + data.story.author + '著,' + data.story.type + '小说,' + (data.story.introduce || '').replace(/\n+/g, '').replace(/\s+/g, '');
      res.render('detail', data);
    }
  });
}

// 详情页，下面顺序不要变
router.get('/story/:storyId/:chapterId', reading);
router.get('/story/reading/:storyId/:chapterId', readingRedirect);
router.get('/story/reading/:storyId/:volumeId/:chapterId', readingRedirect);
router.get('/story/:storyId/:volumeId/:chapterId', readingRedirect);
router.get('/reading/:storyId/:chapterId', readingRedirect);
router.get('/reading/:storyId/:volumeId/:chapterId', readingRedirect);

function readingRedirect(req, res) {
  var search = qs.stringify(req.query);
  var storyId = req.params.storyId;
  var chapterId = req.params.chapterId;
  var url = '/story/' + storyId + '/' + chapterId + (search ? ('?' + search) : '' );
  if (req.useragent.isMobile) {
    url = config.mobile + url;
  }
  res.redirect(url);
}

function reading(req, res, next) {
  var storyId = req.params.storyId;
  var chapterId = req.params.chapterId;

  if (req.useragent.isMobile) {
    var search = qs.stringify(req.query);
    var url = '/story/' + storyId + '/' + chapterId + (search ? ('?' + search) : '' );
    url = config.mobile + url;
    res.redirect(url);
    return true;
  }

  // 统计
  storyQuery.collect({
    storyId: storyId,
    chapterId: chapterId,
    uri: 'story/' + storyId + '/' + chapterId,
    page: 'chapter',
    action: 'visit',
    ip: utils.getClientIp(req)
  });

  var setting = req.cookies['Read-Setting'];
  if (setting) {
    setting = JSON.parse(setting);
  } else {
    setting = {
      fontSize: 18,
      theme: 'normal'
    };
  }
  var staticData = Object.assign({
    nav: 'reading',
    css: 'readTheArticle.min.css',
    setting: setting
  }, utils.commonData(req));

  Q.all([
    commomQuery.onlineUser(req),
    storyQuery.story(storyId),
    storyQuery.chapter(chapterId),
    storyQuery.content(chapterId, req),
  ]).then(function (result) {
    var data = utils.pushArray(result, staticData);
    if (!data.story || !data.story.id || !data.chapter || !data.chapter.id) {
      next();
    } else {
      res.render('reading', data);
    }
  });
}

// 目录
router.get('/catalogue', function(req, res) {

  var staticData = Object.assign({
    nav: 'catalogue',
    css: 'catalogue.min.css'
  }, utils.commonData(req));

  var storyId = req.query.storyId;

  Q.all([
    commomQuery.hot(),
    commomQuery.onlineUser(req),
    storyQuery.story(storyId),
    storyQuery.volumes(storyId)
  ]).then(function (result) {
    var data = utils.pushArray(result, staticData);
    res.render('catalogue', data);
  });
});

// 登录页
router.get('/logout', function(req, res) {
  res.clearCookie('Auth-Codes', { domain: config.domain, maxAge: config.maxAge, httpOnly: true });
  res.redirect(req.query.originalUrl || '/');
});

// 登录页
router.get('/login', function(req, res) {

  var staticData = Object.assign({
    nav: 'auth',
    css: 'auth.min.css',
    type: 1,
    query: req.query
  }, utils.commonData(req));

  res.render('auth', staticData);
});

// 注册页
router.get('/register', function(req, res) {

  var staticData = Object.assign({
    nav: 'auth',
    css: 'auth.min.css',
    type: 2,
    query: req.query
  }, utils.commonData(req));

  res.render('auth', staticData);
});

// 忘记密码页
router.get('/recover', function(req, res) {

  var staticData = Object.assign({
    nav: 'auth',
    css: 'auth.min.css',
    type: 3,
    query: req.query
  }, utils.commonData(req));

  res.render('auth', staticData);
});

// 搜索
router.get('/search', function (req, res) {
  var staticData = Object.assign({
    nav: 'search',
    css: 'search.min.css'
  }, utils.commonData(req));

  Q.all([
    commomQuery.hot(),
    commomQuery.onlineUser(req),
    commomQuery.search(req.query)
  ]).then(function (result) {
    var data = utils.pushArray(result, staticData);
    data.query = req.query;
    res.render('search', data);
  });
});

// 女频
router.get('/girl', function (req, res) {
  var staticData = Object.assign({
    nav: 'girl',
    css: 'girl.min.css'
  }, utils.commonData(req));

  Q.all([
    commomQuery.hot(),
    commomQuery.onlineUser(req),
    channelQuery.weekHot(6202),
    channelQuery.bigWord(6203),
    channelQuery.smallWord(6204),
  ]).then(function (result) {
    var data = utils.pushArray(result, staticData);
    res.render('girl', data);
  });
});

// 男频
router.get('/boy', function (req, res) {
  var staticData = Object.assign({
    nav: 'boy',
    css: 'girl.min.css'
  }, utils.commonData(req));

  Q.all([
    commomQuery.hot(),
    commomQuery.onlineUser(req),
    channelQuery.weekHot(6102),
    channelQuery.bigWord(6103),
    channelQuery.smallWord(6104),
  ]).then(function (result) {
    var data = utils.pushArray(result, staticData);
    res.render('boy', data);
  });
});

// 排行榜
router.get('/chart', function (req, res) {
  var staticData = Object.assign({
    nav: 'chart',
    css: 'chart.min.css'
  }, utils.commonData(req));

  var query = Object.assign({}, {
    scope: '0',
    type: '0'
  }, req.query);

  Q.all([
    commomQuery.hot(),
    commomQuery.onlineUser(req),
  ]).then(function (result) {
    var data = utils.pushArray(result, staticData);
    data.query = query;
    res.render('chart', data);
  });
});

// 书库
router.get('/library', function (req, res) {
  var staticData = Object.assign({
    nav: 'library',
    css: 'library.min.css'
  }, utils.commonData(req));

  var query = Object.assign({}, {
      channel: '2',
      type: '全部',
      tag: '全部',
      wordNumber: '全部',
      updateTime: '全部',
      option: '全部',
      pageNo: '1'
    }, req.query);

  Q.all([
    commomQuery.hot(),
    commomQuery.onlineUser(req),
    commomQuery.library(query)
  ]).then(function (result) {
    var data = utils.pushArray(result, staticData);
    data.query = query;
    var girlTags = [
      '穿越','悬疑','耽美','架空','甜宠','历史','重生','宅斗','仙侠','复仇','种田','宫斗','虐恋','女强','豪门','灵异','都市','末世','科幻','江湖','学生','教师','总裁','高干','百合','娱乐圈','时尚','青春','性别转换','宫廷','西方罗曼','异世大陆','欢喜冤家','恋爱契约','前世今生','青梅竹马','古穿今','强强','网游','职场','婆媳','商战','相爱相杀','制服','精英','破镜重圆','民国','星际','公路文','武侠','爆笑','婚恋','权谋','奇幻','竞技','美食','推理','系统','随身空间','乡村田园','异国情缘','军旅','其他'
    ];
    var boyTags = [
      '热血','仙侠','逆袭','种田','游戏','兵王','穿越','悬疑','历史','重生','异能','医生','废材','凡人流','竞技','惊悚','灵异','扮猪吃虎','校园','天才流','二次元','爽文','都市','刑侦','升级','末世','推理','科幻','学生','教师','军事','奇幻','异世大陆','网游','星际','鉴宝','英雄联盟','进化','无限','异世','无敌','异界','玄幻','魔幻','武侠','架空','外国历史','职场','娱乐','乡土','同人','都市修真','系统流','西游','三国','杀伐果断','盗墓','其他'
    ];

    if (data.query.channel == '2') {
      data.tags = girlTags;
      data.types = data.girlType;
    } else {
      data.tags = boyTags;
      data.types = data.boyType;
    }

    res.render('library', data);
  });
});

// 优质版权
router.get('/copyright', function (req, res) {
  var staticData = Object.assign({
    nav: 'copyright',
    css: 'qualityCopyright.min.css'
  }, utils.commonData(req));

  Q.all([
    commomQuery.hot(),
    commomQuery.onlineUser(req),
    copyrightQuery.slider(),
    copyrightQuery.infor(),
    copyrightQuery.newBooks(),
  ]).then(function (result) {
    var data = utils.pushArray(result, staticData);
    res.render('copyright', data);
  });
});

// 优质版权
router.get('/download', function (req, res) {
  var staticData = Object.assign({
    nav: 'download',
    css: 'download.min.css'
  }, utils.commonData(req));

  Q.all([
    commomQuery.hot(),
    commomQuery.onlineUser(req),
  ]).then(function (result) {
    var data = utils.pushArray(result, staticData);
    res.render('download', data);
  });
});

// 资讯页
router.get('/newspage', function (req, res, next) {
  var staticData = Object.assign({
    nav: 'newspage',
    css: ''
  }, utils.commonData(req));

  Q.all([
    commomQuery.hot(),
    commomQuery.event(req.query.id),
    commomQuery.onlineUser(req)
  ]).then(function (result) {
    var data = utils.pushArray(result, staticData);
    if (!data.event || !data.event.id) {
      next();
    } else {
      res.render('newspage', data);
    }
  });
});

// 微博登录
router.get('/login/weibo', (req, res) => {
  var code = req.query.code;
  if (!code) {
    res.redirect('/login');
    return false;
  }
  auth.doWeiboLogin(code).then(function (resp) {
    var result = resp.result;
    if (result.errorCode > 0) {
      res.redirect('/login');
    } else {
      var codes = utils.encrypt(JSON.stringify({
        'X-I': resp['X-I'],
        'X-S': resp['X-S'],
        'IP': utils.getClientIp(req)
      }));
      res.cookie('Auth-Codes', codes, { 
        domain: config.domain, 
        maxAge: config.maxAge, 
        httpOnly: true
      });
      res.redirect('/');
    }
  });
});

// QQ登录
router.get('/login/qq', (req, res) => {
  var code = req.query.code;
  if (!code) {
    res.redirect('/login');
    return false;
  }
  auth.doQQLogin(code).then(function (resp) {
    var result = resp.result;
    if (result.errorCode > 0) {
      res.redirect('/login');
    } else {
      var codes = utils.encrypt(JSON.stringify({
        'X-I': resp['X-I'],
        'X-S': resp['X-S'],
        'IP': utils.getClientIp(req)
      }));
      res.cookie('Auth-Codes', codes, { 
        domain: config.domain, 
        maxAge: config.maxAge, 
        httpOnly: true
      });
      res.redirect('/');
    }
  });
});

// alipay
router.post('/pay/alipay', function (req, res) {
  var auth = utils.isOnlineUser(req);
  if (!auth) {
    res.redirect('/login?originalUrl=' + encodeURIComponent('/pay'));
    return false;
  }
  pay.doAlipay(req.body, auth)
    .then(function (resp) {
      res.send(pay.renderAlipayForm(resp.body.data));
    });
});

// 支付结果
router.get('/payresult', function (req, res) {
  var auth = utils.isOnlineUser(req);
  if (!auth) {
    res.redirect('/login?originalUrl=' + encodeURIComponent('/pay'));
    return false;
  }
  var staticData = Object.assign({
    nav: 'payresult',
    css: ''
  }, utils.commonData(req));

  Q.all([
    commomQuery.hot(),
    commomQuery.onlineUser(req)
  ]).then(function (result) {
    var data = utils.pushArray(result, staticData);
    res.render('payresult', data);
  });
});

module.exports = router;