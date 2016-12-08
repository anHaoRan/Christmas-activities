import { Router } from 'express';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import request from 'request';
import { isOnlineUser } from '../../utils';
import config from '../../config';
const router = Router();

const TEMP_PATH = path.join(__dirname, '../../../uploads');

const upload = multer({ 
  dest: TEMP_PATH
});
const singleUpload = upload.single('uploadFile');

const IMG_SUFFIX_REG = /jpg|jpeg|png|gif/i;
const MAX_SIZE = 10 * 1024 * 1024;

router.post('/upload', singleUpload, function (req, res) {
  if (!isOnlineUser(req)) {
    res.send({
      status: 401
    });
    return false;
  }
  let { file } = req;
  let { originalname, path } = file;
  let suffix = originalname.split('.').pop();
  let newFile = TEMP_PATH + '/' + Math.random().toString(32).substr(2) + (new Date - 0).toString(32) + '.' + suffix;

  fs.readFile(path, (err, data) => {
    fs.writeFile(newFile, data, (error) => {
      // 删除临时旧文件
      fs.unlink(file.path);

      request.post({url: config.image_server, formData: {
        files: fs.createReadStream(newFile)
      }}, (err, response, body) => {
        if (err) {
          console.log('[error] upload image error ' + err);
          res.send({message: err, error: 1});
        } else {
          console.log('[log] upload image success ' + body);
          fs.unlink(newFile);
          let result = JSON.parse(body);
          res.send(result);
        }
      });
    });
  });
});

export default router;