import { Router, Request } from 'express';

import Work from '../../models/Work';
import { checkJwt } from './../middleware/auth.middleware';
import { RequestHandler } from 'express-jwt';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const works = await Work.find({});
    return res.json(works);
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (work) return res.json(work); 
    return res.status(404).send('No found work with this id');
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

// interface RequestWithAuth0 extends Request, RequestHandler {}

router.post('/new', checkJwt, async (req, res) => {
  console.log(req);
  const workData = req.body;
  try {
    const newWork = new Work(workData);
    // const userId = 'google-oauth2|100859891013293195235';
    await newWork.save();
    return res.json(newWork);
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

// router.patch('/:id', async (req, res) => {

// });

export default router;
