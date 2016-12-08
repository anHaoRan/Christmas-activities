import { Router } from 'express';
import fetch from '../fetch';
const router = Router();

router.get('*', (req, res) => {
  fetch(req.originalUrl).then(data => {
    res.send(data);
  }, req);
});

export default router;