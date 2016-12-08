var fetch = require('../utils/fetch');
var utils = require('../utils');

// 统计
exports.collect = function (body) {
  return fetch.post('/c/dataLog/bookLog', body)
    .then(function (resp) {
      console.log('[ 统计 %s 成功，所在IP %s, 访问uri %s ]', body.page, body.ip, body.uri);
    });
};

// 小说基本信息
exports.story = function (storyId) {
  return fetch.get('/c/story/' + storyId)
    .then(function (resp) {
      return {story: resp.data || {}};
    });
};

// 小说详情
exports.detail = function (storyId) {
  return fetch.get('/c/story/' + storyId + '/detail')
    .then(function (resp) {
      return {story: resp.data || {}};
    });
};

// 小说继续阅读章节
exports.readChapter = function (storyId) {
  return fetch.get('/c/story/readChapter?storyId=' + storyId)
    .then(function (resp) {
      return {readChapter: resp.data || {}};
    });
};

// 投月票记录
exports.monthTicketRecord = function (storyId) {
  return fetch.get('/c/story/searchRecords?type=7&pageSize=0&storyId=' + storyId)
    .then(function (resp) {
      var list = resp.data || [];
      return {record: list.slice(0, 3)};
    });
};

// 打赏记录
exports.rewardRecord = function (storyId) {
  return fetch.get('/c/story/searchRecords?type=6&pageSize=0&storyId=' + storyId)
    .then(function (resp) {
      var list = resp.data || [];
      return {record: list.slice(0, 3)};
    });
};

// 月票类型列表
exports.monthTicketList = function (storyId) {
  return fetch.get('/c/product/monthProducts?storyId=' + storyId)
    .then(function (resp) {
      return {monthTicketList: resp.data || []};
    });
};

// 小说卷列表
exports.volumes = function (storyId) {
  return fetch.get('/c/story/' + storyId + '/volumes')
    .then(function (resp) {
      return {volumes: resp.data || []};
    });
};

// 小说指定卷章节列表
exports.chapters = function (volumeId) {
  return fetch.get('/c/story/volume/' + volumeId + '/chapters')
    .then(function (resp) {
      return {chapters: resp.data || []};
    });
};

// 打赏物品
exports.rewards = function (channel) {
  return fetch.get('/c/product/rewardProducts?channel=' + channel)
    .then(function (resp) {
      return {rewards: resp.data || []};
    });
};

// 小说评论列表
exports.commentPage = function (storyId, pageNo) {
  return fetch.get('/c/story/comment/page?storyId=' + storyId + '&pageSize=10&pageNo=' + (pageNo || 1))
    .then(function (resp) {
      return {commentPage: resp.data};
    });
};

// 评论回复列表
exports.replyPage = function (resourceId, pageNo) {
  return fetch.get('/c/story/actComment/page?pageSize=5&resourceId=' + resourceId + '&pageNo=' + (pageNo || 1))
    .then(function (resp) {
      return {replyPage: resp.data};
    });
};

// 获取指定章节内容
exports.content = function (chapterId, request) {
  var auth = {};
  if (request.cookies) {
    var codes = request.cookies['Auth-Codes'];
    if (codes) {
      auth = JSON.parse(utils.decrypt(codes));
    }
  }
  
  return fetch.get('/c/story/chapter/' + chapterId + '/content', auth)
    .then(function (resp) {
      return {
        content: resp.data || '',
        buyed: !!resp.data
      };
    });
};

// 获取章节章节详情
exports.chapter = function (chapterId) {
  return fetch.get('/c/story/chapter/' + chapterId)
    .then(function (resp) {
      return {
        chapter: resp.data.chapter,
        next: resp.data.next,
        prev: resp.data.prev
      };
    });
};

// 猜你喜欢，精彩推荐
exports.typeRecommend = function (type, size) {
  return fetch.get('/c/recommend/type?size=' + (size || 4) + '&type=' + encodeURIComponent(type))
    .then(function (resp) {
      return {typeRecommend: resp.data || []};
    });
};