import { Router } from 'express';
import fetch from '../fetch';
import { isOnlineUser, decrypt } from '../../utils';
import queryString from 'query-string';
const router = Router();

router.get('/alipay', (req, res) => {
  fetch('/api/user/alipay', {
    method: 'POST',
    body: req.query
  }, req).then((resp) => {
    let formHtml = ['<form method="get" action="https://mapi.alipay.com/gateway.do?_input_charset=utf-8" id="alipayForm">'];
    console.log(resp.data)
    let { data } = resp;
    for (let key in data) {
      if (key === 'orderSpec') {
        continue;
      }
      formHtml.push('<input type="hidden" name="' + key + '" value="' + data[key] + '"/>');
    }

    formHtml.push('<input type="submit" value="submit" style="display: none;"/>');

    formHtml.push('</form>');

    // let query = Object.assign({}, data);
    // delete query.orderSpec;

    // let param = [];
    // for (let key in query) {
    //   param.push(key + '=' + query[key]);
    // }

    // let url = 'https://mapi.alipay.com/gateway.do?' + queryString.stringify(query);
    // let url = 'https://mapi.alipay.com/gateway.do?' + param.join('&');
    // console.log(url)
    formHtml.push('<script type="text/javascript">document.getElementById("alipayForm").submit();</script>');
    res.send(formHtml.join(''));
    // res.send('<script type="text/javascript">location.href="' + url + '"</script>');
  });
});

router.get('*', (req, res) => {
  if (isOnlineUser(req)) {
    fetch(req.originalUrl, {
      // headers: req.headers
    }, req).then(data => {
      res.send(data);
    });
  } else {
    res.send({
      status: 401
    });
  }
});

router.post('/modifyPwd', (req, res) => {
  if (isOnlineUser(req)) {
    let codes = req.cookies['Auth-Codes'];
    let auth = JSON.parse(decrypt(codes));
    // let phone = auth.phone;

    fetch(req.originalUrl, {
      method: 'POST',
      body: {
        oldPwd: req.body.oldPwd,
        newPwd: req.body.newPwd,
        // phone
      }
    }, req).then(data => {
      res.send(data);
    });
  } else {
    res.send({
      status: 401
    });
  }
});

router.post('*', (req, res) => {
  if (isOnlineUser(req)) {
    fetch(req.originalUrl, {
      method: 'POST',
      body: req.body
    }, req).then(data => {
      res.send(data);
    });
  } else {
    res.send({
      status: 401
    });
  }
});

export default router;