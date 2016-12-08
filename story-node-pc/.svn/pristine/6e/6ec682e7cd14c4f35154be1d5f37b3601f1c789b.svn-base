var fetch = require('../utils/fetch');

// 修改个人信息
exports.modifyInfo = function (body, auth) {
  return fetch.post('/c/user/modifyInfo', body, auth, true)
    .then(function (resp) {
      if (resp.errorCode === 401) {
        return {error: 401};
      }
      return resp.body;
    });
};

// 修改密码
exports.modifyPwd = function (body, auth) {
  return fetch.post('/c/user/modifyPwd', body, auth, true)
    .then(function (resp) {
      if (resp.errorCode === 401) {
        return {error: 401};
      }
      return resp.body;
    });
};

// 添加评论
exports.comment = function (body, auth) {
  return fetch.post('/c/story/comment/add', body, auth, true)
    .then(function (resp) {
      if (resp.errorCode === 401) {
        return {error: 401};
      }
      return resp.body;
    });
};

// 添加回复
exports.reply = function (body, auth) {
  return fetch.post('/c/story/actComment/add', body, auth, true)
    .then(function (resp) {
      if (resp.errorCode === 401) {
        return {error: 401};
      }
      return resp.body;
    });
};

// 投月票
exports.voteMonth = function (body, auth) {
  return fetch.post('/c/story/monthVote/add', body, auth, true)
    .then(function (resp) {
      if (resp.errorCode === 401) {
        return {error: 401};
      }
      return resp.body;
    });
};

// 投推荐票
exports.voteRecommend = function (body, auth) {
  return fetch.post('/c/story/recommendVote/add', body, auth, true)
    .then(function (resp) {
      if (resp.errorCode === 401) {
        return {error: 401};
      }
      return resp.body;
    });
};

// 投推荐票
exports.voteReward = function (body, auth) {
  return fetch.post('/c/story/reward/add', body, auth, true)
    .then(function (resp) {
      if (resp.errorCode === 401) {
        return {error: 401};
      }
      return resp.body;
    });
};

// 购买章节
exports.setAutoPay = function (autoPayChapter, auth) {
  return fetch.post('/c/user/updateAutoPay', {
    autoPayChapter: autoPayChapter
  }, auth, true).then(function (resp) {
      if (resp.errorCode === 401) {
        return {error: 401};
      }
      return {autoPayChapter: autoPayChapter - 0};
    });
};

// 购买章节
exports.buyChapter = function (chapterId, auth) {
  return fetch.post('/c/product/chapter/pay?cids=' + chapterId, {}, auth, true)
    .then(function (resp) {
      if (resp.errorCode === 401) {
        return {error: 401};
      }
      return resp.data;
    });
};

// 移除书架
exports.removeShelf = function (storyIds, auth) {
  return fetch.post('/c/shelf/remove/' + storyIds, {}, auth, true)
    .then(function (resp) {
      if (resp.errorCode === 401) {
        return {error: 401};
      }
      return resp.data;
    });
};

// 加入书架
exports.addShelf = function (storyId, auth) {
  return fetch.post('/c/shelf/add/' + storyId, {}, auth, true)
    .then(function (resp) {
      if (resp.errorCode === 401) {
        return {error: 401};
      }
      return resp.data;
    });
};

// 查询书架
exports.shelf = function (auth) {
  return fetch.get('/c/shelf/myStories', auth, true)
    .then(function (resp) {
      if (resp.errorCode === 401) {
        return {error: 401};
      }
      return {
        shelf: resp.data
      };
    });
};

// 充值记录
exports.payRecord = function (auth, pageNo) {
  return fetch.get('/c/user/getRechargeRecord?pageNo=' + (pageNo || 1), auth, true)
    .then(function (resp) {
      if (resp.errorCode === 401) {
        return {error: 401};
      }
      return {
        payRecord: resp.data
      };
    });
};

// 付费章节消费记录
exports.payChapterRecord = function (auth, pageNo) {
  return fetch.get('/c/user/getUserPayRecord?pageNo=' + (pageNo || 1), auth, true)
    .then(function (resp) {
      if (resp.errorCode === 401) {
        return {error: 401};
      }
      return {
        payChapterRecord: resp.data
      };
    });
};

// 打赏记录
exports.rewardRecord = function (auth, pageNo) {
  return fetch.get('/c/user/getUserRewardRecord?pageNo=' + (pageNo || 1), auth, true)
    .then(function (resp) {
      if (resp.errorCode === 401) {
        return {error: 401};
      }
      return {
        rewardRecord: resp.data
      };
    });
};

// 投票记录
exports.voteRecord = function (auth, pageNo) {
  return fetch.get('/c/user/getUserVoteRecord?pageNo=' + (pageNo || 1), auth, true)
    .then(function (resp) {
      if (resp.errorCode === 401) {
        return {error: 401};
      }
      return {
        voteRecord: resp.data
      };
    });
};