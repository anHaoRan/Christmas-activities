var express = require('express');
var router = express.Router();
var commomQuery = require('../query/common');
var homeQuery = require('../query/home');
var channelQuery = require('../query/channel');
var copyrightQuery = require('../query/copyright');
var storyQuery = require('../query/story');
var config = require('../config');

// 首页 -- 男生人气榜
router.get('/home/boyPopular', function (req, res) {
  homeQuery.boyPopular().then(function (resp) {
    res.send(resp);
  })
});

// 首页 -- 女生火力推荐
router.get('/home/girlFire', function (req, res) {
  homeQuery.girlFire().then(function (resp) {
    res.send(resp);
  })
});

// 首页 -- 男生火力推荐
router.get('/home/boyFire', function (req, res) {
  homeQuery.boyFire().then(function (resp) {
    res.send(resp);
  })
});

// 首页 -- 最近免费小说更新
router.get('/home/freeList', function (req, res) {
  homeQuery.freeList().then(function (resp) {
    res.send(resp);
  })
});

// 首页 -- 最新VIP小说更新
router.get('/home/vipList', function (req, res) {
  homeQuery.vipList().then(function (resp) {
    res.send(resp);
  })
});

var BANNERS = [6101, 6201];
// 首页 -- 男女频banner
router.get('/home/banner/:channel', function (req, res) {
  homeQuery.banner(BANNERS[req.params.channel])
    .then(function (resp) {
      res.send(resp);
    });
});

var TYPES = [[6111, 6112, 6113, 6114], [6211, 6212, 6213, 6214]];
// 首页 -- 男女频分类推荐
router.get('/home/type/:channel/:type', function (req, res) {
  var params = req.params;
  homeQuery.typeRecommend(TYPES[params.channel][params.type])
    .then(function (resp) {
      res.send(resp);
    });
});

// 通用 - 排行版
router.get('/common/rank/:column/:time/:size', function (req, res) {
  var params = req.params;
  commomQuery.rank(params.column, params.time, params.size, req.query.pageNo || 1)
    .then(function (resp) {
      res.send(resp);
    });
});

var HOT_COLUMN = [6102, 6202];
// 男女频 -- 本周热推
router.get('/channel/weetHot/:channel', function (req, res) {
  var params = req.params;
  channelQuery.weetHot(HOT_COLUMN[params.channel])
    .then(function (resp) {
      res.send(resp);
    });
});

var BIG_WORD_COLUMN = [6103, 6203];
// 男女频 -- 大字热推
router.get('/channel/bigWord/:channel', function (req, res) {
  var params = req.params;
  channelQuery.bigWord(BIG_WORD_COLUMN[params.channel])
    .then(function (resp) {
      res.send(resp);
    });
});

var SMALL_WORD_COLUMN = [6104, 6204];
// 男女频 -- 小字热推
router.get('/channel/smallWord/:channel', function (req, res) {
  var params = req.params;
  channelQuery.smallWord(SMALL_WORD_COLUMN[params.channel])
    .then(function (resp) {
      res.send(resp);
    });
});

var BIG_GOOD_COLUMN = [6105, 6205];
// 男女频 -- 精品推荐-大图
router.get('/channel/bigGood/:channel', function (req, res) {
  var params = req.params;
  channelQuery.bigGood(BIG_GOOD_COLUMN[params.channel])
    .then(function (resp) {
      res.send(resp);
    });
});

var SMALL_GOOD_COLUMN = [6107, 6207];
// 男女频 -- 精品推荐-小图
router.get('/channel/smallGood/:channel', function (req, res) {
  var params = req.params;
  channelQuery.smallGood(SMALL_GOOD_COLUMN[params.channel])
    .then(function (resp) {
      res.send(resp);
    });
});

var CHANNLE_BANNERS = [6101, 6201];
// 男女频 -- banner
router.get('/channel/banner/:channel', function (req, res) {
  channelQuery.banner(CHANNLE_BANNERS[req.params.channel])
    .then(function (resp) {
      res.send(resp);
    });
});

var CHANNEL_TYPES = [[6111, 6112, 6113, 6114], [6211, 6212, 6213, 6214]];
// 男女频分类推荐
router.get('/channel/type/:channel/:type', function (req, res) {
  var params = req.params;
  channelQuery.typeRecommend(CHANNEL_TYPES[params.channel][params.type])
    .then(function (resp) {
      res.send(resp);
    });
});

// 精品版权推荐-有图
router.get('/copyright/bigGood', function (req, res) {
  copyrightQuery.bigGood()
    .then(function (resp) {
      res.send(resp);
    });
});

// 精品版权推荐-无图
router.get('/copyright/smallGood', function (req, res) {
  copyrightQuery.smallGood()
    .then(function (resp) {
      res.send(resp);
    });
});

// 月票类型列表
router.get('/story/monthTicketList', function (req, res) {
  storyQuery.monthTicketList(req.query.storyId)
    .then(function (resp) {
      res.send(resp);
    })
});

// 小说卷列表
router.get('/story/volumes', function (req, res) {
  storyQuery.volumes(req.query.storyId)
    .then(function (resp) {
      res.send(resp);
    });
});

// 小说指定卷章节列表
router.get('/story/chapters', function (req, res) {
  storyQuery.chapters(req.query.volumeId)
    .then(function (resp) {
      res.send(resp);
    });
});

// 打赏物品列表
router.get('/story/rewards', function (req, res) {
  storyQuery.rewards(req.query.channel || 1)
    .then(function (resp) {
      res.send(resp);
    });
});

// 猜你喜欢、相关推荐
router.get('/story/typeRecommend', function (req, res) {
  storyQuery.typeRecommend(req.query.type)
    .then(function (resp) {
      res.send(resp);
    });
});

// 小说评论分页
router.get('/story/comment/page', function (req, res) {
  storyQuery.commentPage(req.query.storyId, req.query.pageNo || 1)
    .then(function (resp) {
      res.send(resp);
    });
});

// 评论回复分页
router.get('/story/reply/page', function (req, res) {
  storyQuery.replyPage(req.query.resourceId, req.query.pageNo || 1)
    .then(function (resp) {
      res.send(resp);
    });
});

// 阅读设置cookie
router.post('/story/setting', function (req, res) {
  res.cookie('Read-Setting', JSON.stringify(req.body), { 
    domain: config.domain,
    maxAge: config.maxAge * 365,
    httpOnly: true
  });
  res.end('ok');
});

// 小说投月票记录
router.get('/story/record/vote/:storyId', function (req, res) {
  storyQuery.monthTicketRecord(req.params.storyId)
    .then(function (resp) {
      res.send(resp);
    });
});

// 小说打赏记录
router.get('/story/record/reward/:storyId', function (req, res) {
  storyQuery.rewardRecord(req.params.storyId)
    .then(function (resp) {
      res.send(resp);
    });
});

module.exports = router;