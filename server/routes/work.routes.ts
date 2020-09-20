import { Router } from 'express';

import Work from '../../models/Work';
import { checkJwt, checkRole } from './../middleware/auth.middleware';
import { Role } from '../../types';

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

router.post('/new', checkJwt, checkRole(Role.admin), async (req, res) => {
  const workData = req.body;
  workData.userId = req.user.sub;
  try {
    const newWork = new Work(workData);
    await newWork.save();
    return res.json(newWork);
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

router.patch('/:id', checkJwt, checkRole(Role.admin), async (req, res) => {
  const { body,  params: { id }} = req;
  try {
    const updatedWork = await Work.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (updatedWork) return res.json(updatedWork);
    return res.status(404).send('No found work with this id');
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

router.delete('/:id', checkJwt, checkRole(Role.admin), async (req, res) => {
  const { params: { id }} = req;
  try {
    const deletedWork = await Work.findByIdAndDelete(id);
    if (deletedWork) return res.json(deletedWork);
    return res.status(404).send('No found work with this id');
  } catch (e) {
    return res.status(422).send(e.message);
  }
})

export default router;
