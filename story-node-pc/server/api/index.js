import homeController from './controller/home-controller';
import girlController from './controller/girl-controller';
import boyController from './controller/boy-controller';
import searchController from './controller/search-controller';
import libraryController from './controller/library-controller';
import copyRightController from './controller/copyRight-controller';
import detailsController from './controller/details-controller';
import chartController from './controller/chart-controller';
import rankController from './controller/rank-controller';
import fansController from './controller/fans-controller';
import userController from './controller/user-controller';
import catalogueController from './controller/catalogue-controller';
import eventController from './controller/event-controller';
import productController from './controller/product-controller';

import captchaController from './cores/captcha-controller';
import authController from './cores/auth-controller';
import imageController from './cores/image-controller';
import collectController from './cores/collect-controller';

export default function (APP) {
  APP.use('/api/captcha', captchaController);
  APP.use('/api/auth', authController);
  APP.use('/api/image', imageController);
  APP.use('/api/collect', collectController);

  APP.use('/api/user', userController);
  APP.use('/api/home', homeController);
  APP.use('/api/girl', girlController);
  APP.use('/api/boy', girlController);
  APP.use('/api/search', searchController);
  APP.use('/api/rank', rankController);
  APP.use('/api/library', libraryController);
  APP.use('/api/copyright', copyRightController);
  APP.use('/api/details', detailsController);
  APP.use('/api/chart', chartController);
  APP.use('/api/fans', fansController);
  APP.use('/api/cata', catalogueController);
  APP.use('/api/event', eventController);
  APP.use('/api/product', productController);
};