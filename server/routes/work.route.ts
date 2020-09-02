import { Router } from 'express';

import Work from '../../models/Work';

const router = Router();

router.get('/works', async (req, res) => {
  const works = await Work.find({});
  return res.json(works);
});

export default router;
