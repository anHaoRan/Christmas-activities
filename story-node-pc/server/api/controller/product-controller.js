import { Router } from 'express';
import { wxPayNotify, alipayNotify } from '../fetch';
const router = Router();

let pipe = function(stream, fn){
  var buffers = [];
  stream.on('data', function (trunk) {
    buffers.push(trunk);
  });
  stream.on('end', function () {
    fn(null, Buffer.concat(buffers));
  });
  stream.once('error', fn);
};

router.post('/notifyalipay', (req, res) => {
  console.log(req.originalUrl, req.query, req.params, req.body);
  alipayNotify(req.body).then(resp => {
    console.log('alipay java return ', resp)
    res.end('SUCCESS');
  });
});

router.post('/notifywxpay', (req, res) => {

  pipe(req, function(err, data){
    var xml = data.toString('utf8');
    console.log('notifywxpay ', xml);
    wxPayNotify(xml).then(resp => {
      console.log('notifywxpay return wx message ', resp)
      res.end(resp);
    });
  });
});

export default router;