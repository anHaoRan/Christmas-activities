var express = require('express');
var router = express.Router();
var utils = require('../utils');
var userQuery = require('../query/user');
var pay = require('../query/pay');

// 书架
router.get('/shelf', function (req, res) {
  userQuery.shelf(utils.isOnlineUser(req))
    .then(function (resp) {
      res.send(resp);
    })
});

// 加入书架
router.post('/shelf/add/:storyId', function (req, res) {
  userQuery.addShelf(req.params.storyId, utils.isOnlineUser(req))
    .then(function (resp) {
      res.send(resp);
    })
});

// 移除书架
router.post('/shelf/remove/:storyIds', function (req, res) {
  userQuery.removeShelf(req.params.storyIds, utils.isOnlineUser(req))
    .then(function (resp) {
      res.send(resp);
    })
});

// 购买章节
router.post('/chapter/buy/:chapterId', function (req, res) {
  userQuery.buyChapter(req.params.chapterId, utils.isOnlineUser(req))
    .then(function (resp) {
      res.send(resp);
    });
});

// 设置自动购买
router.post('/autoPay/:autoPayChapter', function (req, res) {
  userQuery.setAutoPay(req.params.autoPayChapter, utils.isOnlineUser(req))
    .then(function (resp) {
      res.send(resp);
    });
});

// 投月票
router.post('/vote/month', function (req, res) {
  userQuery.voteMonth(req.body, utils.isOnlineUser(req))
    .then(function (resp) {
      res.send(resp);
    });
});

// 投推荐票
router.post('/vote/recommend', function (req, res) {
  userQuery.voteRecommend(req.body, utils.isOnlineUser(req))
    .then(function (resp) {
      res.send(resp);
    });
});

// 打赏
router.post('/vote/reward', function (req, res) {
  userQuery.voteReward(req.body, utils.isOnlineUser(req))
    .then(function (resp) {
      res.send(resp);
    });
});

// 评论
router.post('/comment', function (req, res) {
  userQuery.comment(req.body, utils.isOnlineUser(req))
    .then(function (resp) {
      res.send(resp);
    });
});

// 回复
router.post('/reply', function (req, res) {
  userQuery.reply(req.body, utils.isOnlineUser(req))
    .then(function (resp) {
      res.send(resp);
    });
});

// 修改密码
router.post('/modifyPwd', function (req, res) {
  userQuery.modifyPwd(req.body, utils.isOnlineUser(req))
    .then(function (resp) {
      res.send(resp);
    });
});

// 修改个人信息
router.post('/modifyInfo', function (req, res) {
  userQuery.modifyInfo(req.body, utils.isOnlineUser(req))
    .then(function (resp) {
      res.send(resp);
    });
});

// 充值记录
router.get('/payRecord', function (req, res) {
  userQuery.payRecord(utils.isOnlineUser(req), req.query.pageNo || 1)
    .then(function (resp) {
      res.send(resp);
    });
});

// 付费章节消费记录
router.get('/payChapterRecord', function (req, res) {
  userQuery.payChapterRecord(utils.isOnlineUser(req), req.query.pageNo || 1)
    .then(function (resp) {
      res.send(resp);
    });
});

// 打赏记录
router.get('/rewardRecord', function (req, res) {
  userQuery.rewardRecord(utils.isOnlineUser(req), req.query.pageNo || 1)
    .then(function (resp) {
      res.send(resp);
    });
});

// 投票记录
router.get('/voteRecord', function (req, res) {
  userQuery.voteRecord(utils.isOnlineUser(req), req.query.pageNo || 1)
    .then(function (resp) {
      res.send(resp);
    });
});

// 微信支付
router.post('/pay/wxpay', function (req, res) {
  pay.doWXPay(req.body, utils.isOnlineUser(req))
    .then(function (resp) {
      res.send(resp);
    });
});

module.exports = router;