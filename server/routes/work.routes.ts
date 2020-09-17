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
  const workData = req.body;
  workData.userId = req.user.sub;
  try {
    const newWork = new Work(workData);
    // const userId = 'google-oauth2|100859891013293195235';
    await newWork.save();
    return res.json(newWork);
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

router.patch('/:id', checkJwt, async (req, res) => {
  const { body,  params: { id }} = req;
  try {
    const updatedWork = await Work.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true });
    if (updatedWork) return res.json(updatedWork);
    return res.status(404).send('No found work with this id');
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

export default router;
