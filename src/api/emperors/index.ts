import * as express from 'express';
import { deleteEmperor, getLiveEmperors, getEmperor, getEmperors, newEmperor, setLiveEmperor, updateEmperor, getUsers, getUser } from './controller';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';

const router = express.Router();


router.get('/live', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(getLiveEmperors());
});

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(getEmperor(req.params.id));
});

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(getEmperors());
});

router.get('/auth/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(getUsers());
});

router.get('/auth/users/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(getUser(req.params.id));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const emperor = req.body;
  newEmperor(emperor, (err, emperors) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(emperors);
    }
  });
});

router.put('/', passport.authenticate('jwt', { session: false }), (req, res) =>  {
  updateEmperor(req.body, (err, emperors) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(emperors);
    }
  });
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  deleteEmperor(req.params.id, (err, emperors) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(emperors);
    }
  });
});

router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  setLiveEmperor(req.params.id, true, (err, emperors) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(emperors);
    }
  });
});

router.delete('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  setLiveEmperor(req.params.id, false, (err, emperors) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(emperors);
    }
  });
});

export = router;
