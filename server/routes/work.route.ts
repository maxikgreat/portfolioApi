import { Router } from 'express';

import Work from '../../models/Work';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const works = await Work.find({});
    return res.json(works);
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

router.post('/new', async (req, res) => {
  const workData = req.body;
  try {
    const newWork = new Work(workData);
    await newWork.save();
    return res.json('Record added...');
  } catch (e) {
    console.log(e);
    return res.status(422).send(e.message);
  }
});

export default router;
