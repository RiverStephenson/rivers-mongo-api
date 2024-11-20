import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser } from '../../controllers/userController.js';
// /api/users
router.route('/').get(getUsers).post(createUser);
// /api/users/:userId
router.route('/:userId').get(getSingleUser);
router.route('/').get(getUsers);
export default router;
