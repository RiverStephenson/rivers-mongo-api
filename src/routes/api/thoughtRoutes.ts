import { Router } from 'express';
const router = Router();

import { getThoughts, getSingleThought, createThought, updateThought, deleteThought} from '../../controllers/thoughtController.js';

import { createReaction, deleteReaction } from '../../controllers/reactionController.js';

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

router.route('/:thoughtId/reactions').post(createReaction);
// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts/:ThoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);



export default router;
