import config from '../config';
const apiMapping = {
  'login': config.api + '/c/user/login',
  'register': config.api + '/c/user/register',
  'recover': config.api + '/c/user/recoverPwd',
  'thirdLogin': config.api + '/c/user/login_from_thirdparty',
  '/api/auth/user': config.api + '/c/user/getUserInfo',
  '/message/code': config.api + '/c/user/rcode',
  '/message/recover/code': config.api + '/c/user/mobileCode',
  'wxnotify': config.api + '/c/product/weixin/notify',
  'alipaynotify': config.api + '/c/product/alipay/notify',
  'bookLog': config.api + '/c/dataLog/bookLog',

  // 投月票
  '/api/user/monthVote/add': config.api + '/c/story/monthVote/add',
  // 投推荐票
  '/api/user/recommendVote/add': config.api + '/c/story/recommendVote/add',
  '/api/user/reward/add': config.api + '/c/story/reward/add',
  // 评论
  '/api/user/comment/add': config.api + '/c/story/comment/add',
  // 评论回复
  '/api/user/actComment/add': config.api + '/c/story/actComment/add',
  '/api/user/shelf': config.api + '/c/shelf/myStories',
  '/api/user/modifyInfo': config.api + '/c/user/modifyInfo',
  '/api/user/modifyPwd': config.api + '/c/user/modifyPwd',
  '/api/user/alipay': config.api + '/c/product/alipay/create',
  '/api/user/wxpay': config.api + '/c/product/weixin/create',
  '/api/user/updateAutoPay': config.api + '/c/user/updateAutoPay',
  '/api/user/praise/add': config.api + '/c/story/praise/add',

  '/api/details/actComment/list': config.api + '/c/story/actComment/list',
  '/api/details/comment/list': config.api + '/c/story/comment/list',

  // 热搜
  '/api/search/hot': config.api + '/c/hotSearch/column/6011',

  // 首页资讯
  '/api/home/infor': config.api + '/c/event/column/6006',
  // 首页男频长Banner
  '/api/boy/banner': config.api + '/c/banner/column/6101',
  // 首页女频长Banner
  '/api/girl/banner': config.api + '/c/banner/column/6201',
  // 左侧大字推
  '/api/home/leftBigRecommend': config.api + '/c/recommend/column/6004',
  // 左侧小字推
  '/api/home/leftSmallRecommend': config.api + '/c/recommend/column/6005',
  // 右侧大字推
  '/api/home/rightBigRecommend': config.api + '/c/recommend/column/6012',
  // 右侧小字推
  '/api/home/rightSmallRecommend': config.api + '/c/recommend/column/6013',
  // 首页女生人气榜
  '/api/home/popularity/list/female': config.api + '/c/recommend/column/6003',
  // 首页男生人气榜
  '/api/home/popularity/list/male': config.api + '/c/recommend/column/6002',
  // 首页轮播图
  '/api/home/sliderList': config.api + '/c/banner/column/6001',

  // 首页女频火力强推
  '/api/home/girl/recombook': config.api + '/c/recommend/column/6007',
  // 首页男频火力强推
  '/api/home/boy/recombook': config.api + '/c/recommend/column/6008',
  // 免费更新榜
  '/api/home/update/freebook': config.api + '/c/ranking/list?novelColumn=6009&timeType=0&pageSize=18',
  // VIP更新榜
  '/api/home/update/vipbook': config.api + '/c/ranking/list?novelColumn=6010&timeType=0&pageSize=18',
  // 女频
  // Banner图
  '/api/girl/banner': config.api + '/c/banner/column/6201',
  // 本周热推
  '/api/girl/hotwomen': config.api + '/c/recommend/column/6202',
  // 大字推
  '/api/girl/hotwomenBigPush': config.api + '/c/recommend/column/6203',
  // 小字推
  '/api/girl/hotwomenSmallPush': config.api + '/c/recommend/column/6204',
  // 6205  2    精品推荐大图          女频
  '/api/girl/bigProductsRecommended': config.api + '/c/recommend/column/6205',
  // 6207  2    精品推荐小图          女频
  '/api/girl/smallProductsRecommended': config.api + '/c/recommend/column/6207',
  // -----------------------------------------------------
  //6106  1    分类推荐          男频
  '/api/boy/classification': config.api + '/c/recommend/column/6106',
  //6206  2    分类推荐          女频
  '/api/girl/classification': config.api + '/c/recommend/column/6206',
  // --------------------------------------------------------------------------------------------
  // 女频 分类推荐 - 1
  '/api/girl/type/one': config.api + '/c/recommend/column/6211',
  // 女频 分类推荐 - 2
  '/api/girl/type/two': config.api + '/c/recommend/column/6212',
  // 女频 分类推荐 - 3
  '/api/girl/type/three': config.api + '/c/recommend/column/6213',
  // 女频 分类推荐 - 4
  '/api/girl/type/four': config.api + '/c/recommend/column/6214',

  // 男频 分类推荐 - 1
  '/api/boy/type/one': config.api + '/c/recommend/column/6111',
  // 男频 分类推荐 - 2
  '/api/boy/type/two': config.api + '/c/recommend/column/6112',
  // 男频 分类推荐 - 3
  '/api/boy/type/three': config.api + '/c/recommend/column/6113',
  // 男频 分类推荐 - 4
  '/api/boy/type/four': config.api + '/c/recommend/column/6114',
  
  //6102  1    本周热推          男频
  '/api/boy/hotwomen': config.api + '/c/recommend/column/6102',
  //6103  1    大字推            男频
  '/api/boy/hotwomenBigPush': config.api + '/c/recommend/column/6103',
  //6104  1    小字推            男频
  '/api/boy/hotwomenSmallPush': config.api + '/c/recommend/column/6104',
  //6106  1    分类推荐          男频
  '/api/boy/classification': config.api + '/c/recommend/column/6106',
  // 6105  1    精品推荐大图          男频  
  '/api/boy/bigProductsRecommended': config.api + '/c/recommend/column/6105',
  // 6107  1    精品推荐小图          男频
  '/api/boy/smallProductsRecommended': config.api + '/c/recommend/column/6107',

  //优质版权
  //6302  3    资讯              优质版权
  '/api/copyright/information': config.api + '/c/event/column/6302',
  //6303  3    最新出售作品        优质版权
  '/api/copyright/works': config.api + '/c/recommend/column/6303',
  //6304  3    精选版权推荐 大图        优质版权
  '/api/copyright/recommend': config.api + '/c/recommend/column/6304',
  //6305  3    精选版权推荐 小图        优质版权
  '/api/copyright/smallRecommend': config.api + '/c/recommend/column/6305',
  //banner
  '/api/copyright/slider': config.api + '/c/banner/column/6301',
};

export default apiMapping;
