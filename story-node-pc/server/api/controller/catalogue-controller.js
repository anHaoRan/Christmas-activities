import { Router } from 'express';
import fetch from '../fetch';
import { getClientIp } from '../../utils';
const router = Router();

router.get('*', (req, res) => {
  fetch(req.originalUrl, {
    // headers: req.headers
  }, req).then(data => {
    res.send(data);
  });
});

router.post('*', (req, res) => {
  fetch(req.originalUrl, {
    method: 'POST',
    body: req.body
  }, req).then(data => {
    res.send(data);
  });
});

export default router;