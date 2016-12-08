import { Router } from 'express';
import fetch from '../fetch';
import { getClientIp } from '../../utils';
const router = Router();
const NUM_ARG = /^\d+$/;

router.get('/story', (req, res) => {
  let { storyId } = req.query;
  let uri = 'story/' + storyId;
  console.log('[log collect profile] %s', uri);

  if (!NUM_ARG.test(storyId)) {
    res.send({});
    return true;
  }

  fetch('bookLog', {
    method: 'POST',
    body: {
      storyId: storyId,
      chapterId: 0,
      uri: uri,
      page: 'profile',
      action: 'visit',
      ip: getClientIp(req)
    }
  }, req).then(resp => {
    res.send(resp);
  });
});

router.get('/chapter', (req, res) => {
  let { storyId, chapterId } = req.query;
  let uri = 'story/' + storyId + '/' + chapterId;
  console.log('[log collect chapter] %s', uri);

  if (!NUM_ARG.test(storyId) || !NUM_ARG.test(chapterId)) {
    res.send({});
    return true;
  }

  fetch('bookLog', {
    method: 'POST',
    body: {
      storyId: storyId,
      chapterId: chapterId,
      uri: uri,
      page: 'chapter',
      action: 'visit',
      ip: getClientIp(req)
    }
  }, req).then(resp => {
    res.send(resp);
  });
});

export default router;
