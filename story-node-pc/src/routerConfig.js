const RouterMap = [
  {
    path: '/',
    title: '',
    name: 'home',
    page: 'modules/Index',
    sync: true,
    css: 'index',
  },
  // {
  //   // url/路由路径
  //   path: '/demo',
  //   // page title标签
  //   title: '测试DEMO',
  //   name: 'demo',
  //   // react Component path
  //   page: 'modules/Demo',
  //   // 异步抓取react方法 在src/pages/page.js中配置
  //   method: 'getComponentDemo'
  // },
  {
    path: '/payresult',
    title: '充值完成',
    name: 'payresult',
    page: 'modules/PayResult',
    method: 'getComponentPayResult',
  },
  {
    path: '/search',
    title: '搜索',
    name: 'search',
    page: 'modules/Search',
    method: 'getComponentSearch',
    css: 'search',
  },
  {
    path: '/download',
    title: '下载客户端',
    name: 'download',
    page: 'modules/Download',
    method: 'getComponentDownload',
    css: 'download'
  },
  {
    path: '/catalogue',
    title: '章节详情',
    name: 'catalogue',
    page: 'modules/Catalogue',
    method: 'getComponentCatalogue',
    css: 'catalogue'
  },
  {
    path: '/userCenter',
    title: '个人中心',
    name: 'userCenter',
    page: 'modules/UserCenter',
    method: 'getComponentUserCenter',
    auth: true,
    css: 'userCenter',
  },
  {
    path: '/fans',
    title: '粉丝榜',
    name: 'fans',
    page: 'modules/Fans',
    method: 'getComponentFans',
  },
  {
    path: '/story/:storyId',
    title: '详情',
    name: 'details',
    page: 'modules/Details',
    method: 'getComponentDetails',
    css: 'details'
  },
  {
    path: '/girl',
    title: '女频',
    name: 'girl',
    page: 'modules/Girl',
    method: 'getComponentGirl',
    css: 'girl'
  },
    {
    path: '/boy',
    title: '男频',
    name: 'boy',
    page: 'modules/Boy',
    method: 'getComponentBoy',
    css: 'girl'
  },
  {
    path: '/chart',
    title: '排行榜',
    name: 'chart',
    page: 'modules/chart',
    method: 'getComponentChart',
    css: 'chart'
  },
  {
    path: '/copyright',
    title: '优质版权',
    name: 'copyright',
    page: 'modules/copyright',
    method: 'getComponentCopyright',
    css: 'qualityCopyright',
  },
  {
    path: '/library',
    title: '书库',
    name: 'library',
    page: 'modules/library',
    method: 'getComponentLibrary',
    css: 'library'
  },
  {
    path: '/login',
    title: '登录',
    name: 'login',
    page: 'modules/login',
    method: 'getComponentLogin',
    css: 'auth'
  },
  {
    path: '/register',
    title: '注册',
    name: 'register',
    page: 'modules/register',
    method: 'getComponentRegister',
    css: 'auth'
  },
  {
    path: '/recover',
    title: '忘记密码',
    name: 'recover',
    page: 'modules/recover',
    method: 'getComponentRecover',
    css: 'auth'
  },
  {
    path: '/pay',
    title: '充值',
    name: 'pay',
    page: 'modules/pay',
    method: 'getComponentPay',
    auth: true,
    css: 'topUp'
  },
  {
    path: '/story/reading/:storyId/:volumeId/:chapterId',
    title: '阅读页',
    name: 'reading',
    page: 'modules/reading',
    method: 'getComponentReading',
    css: 'readTheArticle'
  },
  {
    path: '/newsPage',
    title: '消息页',
    name: 'newsPage',
    page: 'modules/newsPage',
    method: 'getComponentNewsPage',
  },
  {
    path: '/atlas/static',
    title: '图集',
    name: 'atlasStatic',
    page: 'modules/AtlasStatic',
    method: 'getComponentAtlasStatic',
  },
  {
    path: '*',
    title: 'Not Found',
    name: 'notfound',
    page: 'NotFound',
    sync: true
  },
];

export default RouterMap;