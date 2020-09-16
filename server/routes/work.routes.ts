import { Router } from 'express';

import Work from '../../models/Work';
import { checkJwt } from './../middleware/auth.middleware';

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

router.post('/new', checkJwt, async (req, res) => {
  const workData = req.body;
  try {
    const newWork = new Work(workData);
    // const userId = 'google-oauth2|100859891013293195235';
    await newWork.save();
    return res.json(newWork);
  } catch (e) {
    console.log(e);
    return res.status(422).send(e.message);
  }
});

export default router;