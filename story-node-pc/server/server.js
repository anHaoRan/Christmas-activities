import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import useragent from 'express-useragent';
import router from './routes';
import thirdLogin from './routes/third-router';
import configAPI from './api';
import auth from '../try/routes/auth';
import author from '../try/routes/author';
const node_env = process.env.NODE_ENV || 'development';
const APP = express();

if (node_env === 'production') {
  APP.use(logger('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
  }));
} else {
  APP.use(logger('dev'));
}

APP.use(bodyParser.json());
APP.use(bodyParser.urlencoded({ extended: false }));
APP.use(cookieParser());

// 静态资源路径
if (node_env === 'development') {
  APP.use(express.static(path.join(__dirname, '/../public')));
  APP.use('/assets', express.static(path.join(__dirname + '/../assets')));
  APP.use('/tops', express.static(path.join(__dirname + '/../tops')));
} else {
  APP.use(express.static(path.join(__dirname, '/../../public')));
  APP.use('/assets', express.static(path.join(__dirname + '/../../assets')));
  APP.use('/tops', express.static(path.join(__dirname + '/../../tops')));
}

APP.use(useragent.express());

// 所有数据接口全部经由此处
configAPI(APP);
// 所有NODEJS路由全部经由此处
APP.use('/core/auth', auth);
APP.use('/author', author);
APP.use('/login', thirdLogin);
APP.use('/', router);


export default APP;
