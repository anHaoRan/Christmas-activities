import { Router } from 'express';
import fetch from '../fetch';
const router = Router();

router.get('/reading/:storyId', (req, res) => {
  let { storyId } = req.params;

  fetch('/api/details/c/story/' + storyId + '/volumes')
    .then(resp => {
      return resp.data;
    })
    .then(volumes => {

      let index = 0;
      let size = volumes.length;

      function getVolumeChapterOne() {
        let volume = volumes[index];
        fetch('/api/details/c/story/volume/' + volume.id + '/chapters').then(resp => {
          return resp.data && resp.data.length && resp.data[0];
        }).then(chapter => {
          if (chapter) {
            res.send({
              storyId,
              chapterId: chapter.id,
              volumeId: chapter.volumeId
            });
          } else {
            index += 1;
            if (index < size) {
              getVolumeChapterOne();
            } else {
              res.send({});
            }
          }
        });
      }

      getVolumeChapterOne();
    });
});

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