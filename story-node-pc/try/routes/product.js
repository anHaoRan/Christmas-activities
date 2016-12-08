var express = require('express');
var router = express.Router();
var product = require('../query/product');

function pipe(stream, fn){
  var buffers = [];
  stream.on('data', function (trunk) {
    buffers.push(trunk);
  });
  stream.on('end', function () {
    fn(null, Buffer.concat(buffers));
  });
  stream.once('error', fn);
};

// 支付notify
router.post('/notifyalipay', function (req, res) {
  product.alipayNotify(req.body).then(function (resp) {
    console.log('alipay java return ', resp)
    res.end('SUCCESS');
  });
});

// 支付notify
router.post('/notifywxpay', function (req, res) {
  pipe(req, function(err, data){
    var xml = data.toString('utf8');
    console.log('notifywxpay ', xml);
    product.wxPayNotify(xml).then(function (resp) {
      console.log('notifywxpay return wx message ', resp)
      res.end(resp);
    });
  });
});

module.exports = router;